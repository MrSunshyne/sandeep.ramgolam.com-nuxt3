# comments-worker

Self-hosted comment system for [sandeep.ramgolam.com](https://sandeep.ramgolam.com), decoupled from the statically generated site. A Cloudflare Worker (Hono) with a D1 database, keyed by blog post slug. Anonymous-friendly: commenters optionally give a display name — no accounts, no email, no cookies.

All new comments enter a **pending queue**. Nothing is public until approved via the admin API below — by a human with curl, or by an AI agent following the [moderation policy](#moderation-policy).

**Production URL:** `https://comments.ramgolam.com` (until the custom domain is attached: the `*.workers.dev` URL printed by `wrangler deploy`).

## Architecture

```
Static blog page ──(client-side fetch by slug)──▶ this Worker
                                                    ├─ D1 "blog-comments" (comments, bans)
                                                    ├─ Rate limit: 5 POST/min/IP
                                                    ├─ Turnstile siteverify + honeypot + fill-time check
                                                    └─ Discord webhook on new pending comment
Moderator / AI agent ──(Bearer ADMIN_TOKEN)──▶ /api/admin/*
```

Spam defense is layered, cheapest first: honeypot field (`website` must stay empty) → minimum fill-time of 3s → per-IP rate limit → shadow-ban check → Cloudflare Turnstile server-side verification. Honeypot hits and shadow-banned IPs receive a **fake `201 pending`** response and are never stored — indistinguishable from success, so bots and banned trolls learn nothing.

IPs are never stored raw — only as `SHA-256(IP_HASH_SALT + ip)`. Bans operate on that hash.

## API contract

All responses are JSON. Errors are uniformly `{"error": "<machine_code>", "message": "<human text>"}`.

### Public endpoints (CORS: sandeep.ramgolam.com + localhost:4242)

#### `GET /api/comments/:slug`

Approved comments for a post, oldest first. Unknown slugs return an empty list, not 404.

```json
200 {
  "slug": "my-post",
  "count": 2,
  "comments": [
    { "id": 12, "author_name": "Anonymous", "body": "Great post!", "parent_id": null, "created_at": "2026-07-07T10:00:00Z" },
    { "id": 15, "author_name": "Riya", "body": "+1", "parent_id": 12, "created_at": "2026-07-07T11:30:00Z" }
  ]
}
```

`author_name` is coalesced to `"Anonymous"` server-side. Never exposes `ip_hash`, `status`, or `user_agent`. `parent_id` supports one level of threading — replies reference a top-level comment.

#### `POST /api/comments`

```json
{
  "slug": "my-post",
  "author_name": "Riya",
  "body": "Nice write-up",
  "turnstile_token": "<cf-turnstile-response>",
  "website": "",
  "form_started_at": 1751882400000
}
```

- `author_name` optional (≤50 chars); `body` required (2–4000 chars); `slug` must match `^[a-z0-9][a-z0-9-]{0,199}$`
- `website` is the honeypot — humans never see the field; it must be `""`
- `form_started_at` is epoch ms of the user's first interaction with the form
- `parent_id` optional — makes the comment a reply; must reference an **approved, top-level** comment on the same slug (one level of threading only), otherwise `400 validation_failed`

Responses:

| Status | Body | Meaning |
|---|---|---|
| 201 | `{"id": 17, "status": "pending"}` | Queued for moderation (also returned, without storing, for honeypot/banned submissions) |
| 400 | `{"error": "validation_failed", ...}` | Bad/missing fields |
| 400 | `{"error": "too_fast", ...}` | Submitted <3s after starting — retry succeeds |
| 403 | `{"error": "turnstile_failed", ...}` | Bot check failed (tokens are single-use — reset the widget before retrying) |
| 429 | `{"error": "rate_limited", ...}` | More than 5 comments/min from one IP |

### Admin endpoints (`Authorization: Bearer $ADMIN_TOKEN`, no CORS — curl/agents only)

```bash
export API=https://comments.ramgolam.com
export AUTH='Authorization: Bearer '"$ADMIN_TOKEN"

# Moderation queue (status defaults to pending; also: approved, spam; limit ≤200, offset for paging)
curl -H "$AUTH" "$API/api/admin/comments?status=pending&limit=50&offset=0"
# → {"count": 1, "comments": [{full rows incl. ip_hash, user_agent, status, parent_id}]}

curl -X POST   -H "$AUTH" "$API/api/admin/comments/17/approve"   # → {"id":17,"status":"approved"}
curl -X POST   -H "$AUTH" "$API/api/admin/comments/17/spam"      # → {"id":17,"status":"spam"}
curl -X DELETE -H "$AUTH" "$API/api/admin/comments/17"           # → {"id":17,"deleted":true} (replies go with it)

curl -H "$AUTH" "$API/api/admin/bans"
curl -X POST -H "$AUTH" -H 'Content-Type: application/json' \
  -d '{"ip_hash":"<64-hex from admin comment list>","reason":"spam wave"}' "$API/api/admin/bans"
curl -X DELETE -H "$AUTH" "$API/api/admin/bans/<ip_hash>"
```

The admin comment list exposes `ip_hash` precisely so a moderator can chain "mark spam → ban ip_hash" without extra lookups. Unknown comment ids return `404 {"error":"not_found"}`; a missing/wrong token returns `401 {"error":"unauthorized"}`.

## Moderating from the browser

- **Admin dashboard**: `https://comments.ramgolam.com/admin` — paste the admin token once (kept in that browser's localStorage under `comments_admin_token`). Tabs for pending/approved/spam/bans with approve/spam/delete/ban buttons. The page itself contains no data; every request goes through the bearer-auth API.
- **Pending comments inline on the blog**: the `<BlogComments>` component also shows the pending queue for that post — with a "pending" badge — when the same token is present in localStorage **on the blog's origin** (localStorage does not cross origins). Set it once in the devtools console on sandeep.ramgolam.com:

  ```js
  localStorage.setItem("comments_admin_token", "<token>")
  ```

  Without a token, the blog makes no admin request at all. A stale/wrong token fails silently (public comments still render).

Commenters also keep seeing **their own** pending comments on the blog: after a successful submission the component remembers the comment in localStorage (`comments_mine`, per slug, 60-day cap) and shows it with the "pending" badge until it appears in the approved list. This is purely client-side — other visitors see nothing, and shadow-banned submitters conveniently keep believing their comment is queued.

## Moderation policy

For human and AI moderators alike:

- **Approve** anything on-topic — including criticism, corrections, and disagreement. Tone may be blunt; that's fine.
- **Spam** = links to commercial/SEO content, gibberish, keyword stuffing, repeated identical bodies across posts.
- **Delete** (rather than spam) good-faith mistakes: accidental duplicates, test comments, "please remove this".
- **Ban** an `ip_hash` only after ≥2 spam comments from the same hash.
- When unsure, leave the comment pending and flag it for a human.

An AI agent moderating the queue should: fetch pending → judge each against this policy → approve/spam with one line of reasoning per comment → ban recurring spam hashes → report a summary.

## Development

```bash
pnpm install
cp .dev.vars.example .dev.vars    # Turnstile test secret in there always passes
pnpm db:migrate:local
pnpm dev                          # http://localhost:8787
```

Local D1 state persists under `.wrangler/state/`. `CF-Connecting-IP` is absent in `wrangler dev`; the code falls back to `127.0.0.1`.

## Deployment

```bash
pnpm exec wrangler login
pnpm exec wrangler d1 create blog-comments     # paste database_id into wrangler.jsonc
pnpm db:migrate:remote

# Secrets (mirror into .dev.vars for local dev)
pnpm exec wrangler secret put ADMIN_TOKEN      # e.g. openssl rand -hex 32
pnpm exec wrangler secret put TURNSTILE_SECRET # from the Turnstile widget (Invisible mode, hostname sandeep.ramgolam.com)
pnpm exec wrangler secret put IP_HASH_SALT     # random; never rotate casually — rotating orphans every ban
pnpm exec wrangler secret put DISCORD_WEBHOOK_URL

pnpm run deploy   # NB: "run" is required — bare `pnpm deploy` is a reserved pnpm command
# then uncomment "routes" in wrangler.jsonc (custom_domain comments.ramgolam.com) and deploy again
```

Schema changes: add a new file under `migrations/`, then apply with **both** `pnpm db:migrate:local` and `pnpm db:migrate:remote` — the two sides track migration state separately.

The frontend embed lives in the main site: `components/blog-comments.vue`, wired to this API via `runtimeConfig.public.commentsApiUrl` in `nuxt.config.ts`.
