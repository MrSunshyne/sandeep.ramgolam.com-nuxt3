import { Hono } from "hono";
import type { Context } from "hono";
import type { Env, PublicComment } from "../types";
import { validateSubmission } from "../lib/validate";
import { hashIp } from "../lib/hash";
import { verifyTurnstile } from "../lib/turnstile";
import { notifyDiscord } from "../lib/discord";

const MIN_FILL_TIME_MS = 3000;

export const publicRoutes = new Hono<{ Bindings: Env }>();

publicRoutes.get("/comments/:slug", async (c) => {
  const slug = c.req.param("slug");
  const { results } = await c.env.DB.prepare(
    `SELECT id, COALESCE(author_name, 'Anonymous') AS author_name, body, created_at
     FROM comments
     WHERE slug = ?1 AND status = 'approved'
     ORDER BY created_at ASC, id ASC`,
  )
    .bind(slug)
    .all<PublicComment>();

  return c.json({ slug, count: results.length, comments: results });
});

// Honeypot hits and shadow-banned IPs get a response indistinguishable from a
// real pending comment, so bots and banned trolls learn nothing.
function fakeAccept(c: Context<{ Bindings: Env }>) {
  return c.json({ id: 1000 + Math.floor(Math.random() * 9000), status: "pending" }, 201);
}

publicRoutes.post("/comments", async (c) => {
  let parsed: unknown;
  try {
    parsed = await c.req.json();
  } catch {
    return c.json({ error: "validation_failed", message: "Request body must be JSON" }, 400);
  }

  const result = validateSubmission(parsed);
  if (!result.ok) {
    return c.json({ error: "validation_failed", message: result.message }, 400);
  }
  const data = result.data;

  if (data.website !== "") return fakeAccept(c);

  if (!data.form_started_at || Date.now() - data.form_started_at < MIN_FILL_TIME_MS) {
    return c.json({ error: "too_fast", message: "Please take a moment before submitting." }, 400);
  }

  const ip = c.req.header("CF-Connecting-IP") ?? "127.0.0.1";

  const { success } = await c.env.POST_RATE_LIMITER.limit({ key: ip });
  if (!success) {
    return c.json({ error: "rate_limited", message: "Too many comments, try again in a minute." }, 429);
  }

  const ipHash = await hashIp(ip, c.env.IP_HASH_SALT);
  const banned = await c.env.DB.prepare("SELECT 1 FROM bans WHERE ip_hash = ?1")
    .bind(ipHash)
    .first();
  if (banned) return fakeAccept(c);

  const human = await verifyTurnstile(c.env.TURNSTILE_SECRET, data.turnstile_token, ip);
  if (!human) {
    return c.json(
      { error: "turnstile_failed", message: "Could not verify you are human, please try again." },
      403,
    );
  }

  const row = await c.env.DB.prepare(
    `INSERT INTO comments (slug, author_name, body, ip_hash, user_agent)
     VALUES (?1, ?2, ?3, ?4, ?5)
     RETURNING id`,
  )
    .bind(data.slug, data.author_name, data.body, ipHash, c.req.header("User-Agent") ?? null)
    .first<{ id: number }>();

  const id = row!.id;
  const apiOrigin = new URL(c.req.url).origin;
  c.executionCtx.waitUntil(
    notifyDiscord(c.env.DISCORD_WEBHOOK_URL, apiOrigin, {
      id,
      slug: data.slug,
      author_name: data.author_name,
      body: data.body,
    }),
  );

  return c.json({ id, status: "pending" }, 201);
});
