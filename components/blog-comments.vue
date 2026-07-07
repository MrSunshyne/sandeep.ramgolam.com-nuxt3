<script setup lang="ts">
import type { CommentSubmission, PublicComment, PublicCommentsResponse } from "@/types";

const props = defineProps<{ slug: string }>();

const config = useRuntimeConfig();
const apiBase = config.public.commentsApiUrl;

// Same key the admin dashboard uses — but localStorage is per-origin, so the
// token must be set once on this site's origin (see comments-worker/README.md).
const ADMIN_TOKEN_KEY = "comments_admin_token";

type DisplayComment = PublicComment & { pending?: boolean };

const comments = ref<DisplayComment[]>([]);
const loading = ref(true);
const loadFailed = ref(false);

// Best-effort admin extra: when the moderator's token is in localStorage,
// pending comments show inline with a badge. No token → no admin request.
async function loadPendingAsAdmin(): Promise<DisplayComment[]> {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  if (!token) return [];
  try {
    const res = await $fetch<{ comments: Array<PublicComment & { author_name: string | null }> }>(
      `${apiBase}/api/admin/comments`,
      {
        query: { status: "pending", slug: props.slug },
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.comments.map((c) => ({
      id: c.id,
      author_name: c.author_name ?? "Anonymous",
      body: c.body,
      parent_id: c.parent_id,
      is_author: !!c.is_author,
      created_at: c.created_at,
      pending: true,
    }));
  } catch {
    return []; // stale token or offline — never break the public list
  }
}

// Commenters keep seeing their own not-yet-approved comments (remembered in
// localStorage) so a pending comment doesn't look like it silently vanished.
const MINE_KEY = "comments_mine";
const MINE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 60; // stop showing after 60 days

function readMine(): DisplayComment[] {
  try {
    const store = JSON.parse(localStorage.getItem(MINE_KEY) ?? "{}");
    const entries: DisplayComment[] = store[props.slug] ?? [];
    return entries.filter(
      (c) => Date.now() - new Date(c.created_at).getTime() < MINE_MAX_AGE_MS,
    );
  } catch {
    return [];
  }
}

function writeMine(entries: DisplayComment[]) {
  try {
    const store = JSON.parse(localStorage.getItem(MINE_KEY) ?? "{}");
    if (entries.length) store[props.slug] = entries;
    else delete store[props.slug];
    localStorage.setItem(MINE_KEY, JSON.stringify(store));
  } catch {
    // storage unavailable (private mode etc.) — feature degrades gracefully
  }
}

function sortByDate(list: DisplayComment[]): DisplayComment[] {
  return [...list].sort((a, b) => a.created_at.localeCompare(b.created_at));
}

async function loadComments() {
  loading.value = true;
  loadFailed.value = false;
  try {
    const [res, adminPending] = await Promise.all([
      $fetch<PublicCommentsResponse>(`${apiBase}/api/comments/${props.slug}`),
      loadPendingAsAdmin(),
    ]);
    // Own comments that got approved (or that the admin view already covers)
    // no longer need the local copy.
    const approvedIds = new Set(res.comments.map((c) => c.id));
    const mine = readMine();
    const stillPending = mine.filter((c) => !approvedIds.has(c.id));
    if (stillPending.length !== mine.length) writeMine(stillPending);
    const adminIds = new Set(adminPending.map((c) => c.id));
    const mineToShow = stillPending
      .filter((c) => !adminIds.has(c.id))
      .map((c) => ({ ...c, pending: true }));
    comments.value = sortByDate([...res.comments, ...adminPending, ...mineToShow]);
  } catch {
    loadFailed.value = true;
  } finally {
    loading.value = false;
  }
}

// One level of threading: replies nest under their parent; a reply whose
// parent isn't visible (e.g. parent deleted) falls back to top level.
type CommentThread = { comment: DisplayComment; replies: DisplayComment[] };

const threads = computed<CommentThread[]>(() => {
  const topLevel = new Map<number, CommentThread>();
  const orphans: DisplayComment[] = [];
  for (const comment of comments.value) {
    if (comment.parent_id === null) {
      topLevel.set(comment.id, { comment, replies: [] });
    }
  }
  for (const comment of comments.value) {
    if (comment.parent_id === null) continue;
    const parent = topLevel.get(comment.parent_id);
    if (parent) parent.replies.push(comment);
    else orphans.push(comment);
  }
  return [
    ...topLevel.values(),
    ...orphans.map((comment) => ({ comment, replies: [] })),
  ];
});

// Fetch lazily — only when the reader actually scrolls near the comments —
// so plain pageviews never hit the API.
const sectionEl = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!sectionEl.value || !("IntersectionObserver" in window)) {
    loadComments();
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer?.disconnect();
        observer = null;
        loadComments();
      }
    },
    { rootMargin: "300px" },
  );
  observer.observe(sectionEl.value);
});

onUnmounted(() => observer?.disconnect());

const authorName = ref("");
const body = ref("");
const website = ref(""); // honeypot — humans never see the field
const formStartedAt = ref(0);
const submitting = ref(false);
const submitted = ref(false);
const submitError = ref("");
const replyTo = ref<DisplayComment | null>(null);
const bodyEl = ref<HTMLTextAreaElement | null>(null);

function startReply(comment: DisplayComment) {
  replyTo.value = comment;
  bodyEl.value?.focus();
}

const turnstileEl = ref<HTMLElement | null>(null);
const { preload, getToken, reset } = useTurnstile(turnstileEl);

function onFormInteraction() {
  if (!formStartedAt.value) formStartedAt.value = Date.now();
  // The author path never runs Turnstile — don't load its script for nothing.
  if (!localStorage.getItem(ADMIN_TOKEN_KEY)) preload();
}

function friendlyError(error: unknown): string {
  const data = (error as { data?: { error?: string; message?: string } })?.data;
  switch (data?.error) {
    case "rate_limited":
      return "You're commenting a bit fast — try again in a minute.";
    case "too_fast":
      return "That was quick! Give it a second and try again.";
    case "turnstile_failed":
      return "We couldn't verify you're human. Please try again.";
    case "validation_failed":
      return data?.message ?? "Please check your comment and try again.";
    default:
      return "Something went wrong — please try again.";
  }
}

const submittedApproved = ref(false);

async function submit() {
  if (submitting.value) return;
  submitting.value = true;
  submitError.value = "";
  try {
    // The site author's comments are vouched for by the admin token instead
    // of Turnstile, and get published immediately.
    const adminToken = localStorage.getItem(ADMIN_TOKEN_KEY);
    const token = adminToken ? "" : await getToken();
    const submission: CommentSubmission = {
      slug: props.slug,
      author_name: authorName.value.trim() || undefined,
      body: body.value,
      turnstile_token: token,
      website: website.value,
      form_started_at: formStartedAt.value,
      parent_id: replyTo.value?.id,
    };
    const created = await $fetch<{ id: number; status: "pending" | "approved" }>(
      `${apiBase}/api/comments`,
      {
        method: "POST",
        body: submission,
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : undefined,
      },
    );
    const approved = created.status === "approved";
    const mineComment: DisplayComment = {
      id: created.id,
      author_name: authorName.value.trim() || "Anonymous",
      body: body.value.trim(),
      parent_id: replyTo.value?.id ?? null,
      is_author: approved,
      created_at: new Date().toISOString(),
      pending: !approved,
    };
    if (!approved) writeMine([...readMine(), mineComment]);
    comments.value = sortByDate([...comments.value, mineComment]);
    submittedApproved.value = approved;
    submitted.value = true;
  } catch (error) {
    reset();
    submitError.value = friendlyError(error);
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <section ref="sectionEl" class="mt-16 mb-24">
    <h2 class="text-2xl font-bold mb-6">Comments</h2>

    <ClientOnly>
      <div v-if="loading" class="comments-skeleton" aria-hidden="true">
        Loading comments…
      </div>

      <div v-else-if="loadFailed" class="text-gray-500 dark:text-gray-400">
        <p>
          Couldn't load comments.
          <button class="underline font-medium" type="button" @click="loadComments">
            Retry
          </button>
        </p>
      </div>

      <template v-else>
        <p v-if="comments.length === 0" class="text-gray-500 dark:text-gray-400">
          It's quiet in here. Say hi 👋
        </p>
        <ul v-else class="flex flex-col gap-4 list-none p-0">
          <li v-for="thread in threads" :key="thread.comment.id">
            <article
              class="rounded-xl border p-4"
              :class="
                thread.comment.pending
                  ? 'border-dashed border-amber-400/60 opacity-80'
                  : 'border-gray-200 dark:border-gray-800'
              "
            >
              <div class="flex items-baseline gap-2 mb-1">
                <span class="font-bold">{{ thread.comment.author_name }}</span>
                <time
                  class="text-sm text-gray-500 dark:text-gray-400"
                  :datetime="thread.comment.created_at"
                >
                  {{ dateFormat(new Date(thread.comment.created_at)) }}
                </time>
                <span
                  v-if="thread.comment.pending"
                  class="text-xs uppercase tracking-wide rounded-full border border-amber-400 text-amber-600 dark:text-amber-400 px-2 py-0.5"
                >
                  pending
                </span>
                <span
                  v-if="thread.comment.is_author"
                  class="text-xs uppercase tracking-wide rounded-full border border-green-500 text-green-600 dark:text-green-400 px-2 py-0.5"
                >
                  author
                </span>
              </div>
              <p class="whitespace-pre-line dark:text-gray-300 m-0">
                {{ thread.comment.body }}
              </p>
              <button
                v-if="!thread.comment.pending && !submitted"
                type="button"
                class="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2"
                @click="startReply(thread.comment)"
              >
                Reply
              </button>
            </article>

            <ul
              v-if="thread.replies.length"
              class="list-none p-0 mt-3 ml-4 sm:ml-8 flex flex-col gap-3 border-l-2 border-gray-200 dark:border-gray-800 pl-4"
            >
              <li v-for="reply in thread.replies" :key="reply.id">
                <article
                  class="rounded-xl border p-4"
                  :class="
                    reply.pending
                      ? 'border-dashed border-amber-400/60 opacity-80'
                      : 'border-gray-200 dark:border-gray-800'
                  "
                >
                  <div class="flex items-baseline gap-2 mb-1">
                    <span class="font-bold">{{ reply.author_name }}</span>
                    <time
                      class="text-sm text-gray-500 dark:text-gray-400"
                      :datetime="reply.created_at"
                    >
                      {{ dateFormat(new Date(reply.created_at)) }}
                    </time>
                    <span
                      v-if="reply.pending"
                      class="text-xs uppercase tracking-wide rounded-full border border-amber-400 text-amber-600 dark:text-amber-400 px-2 py-0.5"
                    >
                      pending
                    </span>
                    <span
                      v-if="reply.is_author"
                      class="text-xs uppercase tracking-wide rounded-full border border-green-500 text-green-600 dark:text-green-400 px-2 py-0.5"
                    >
                      author
                    </span>
                  </div>
                  <p class="whitespace-pre-line dark:text-gray-300 m-0">{{ reply.body }}</p>
                </article>
              </li>
            </ul>
          </li>
        </ul>
      </template>

      <div class="mt-8">
        <p
          v-if="submitted"
          class="rounded-xl border border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950/40 p-4 text-green-800 dark:text-green-300"
        >
          {{ submittedApproved ? "Posted!" : "Thanks! Your comment is awaiting moderation." }}
        </p>

        <form
          v-else
          class="flex flex-col gap-3"
          @focusin="onFormInteraction"
          @submit.prevent="submit"
        >
          <input
            v-model="authorName"
            type="text"
            maxlength="50"
            placeholder="Name (optional)"
            class="rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
          />
          <p
            v-if="replyTo"
            class="m-0 text-sm text-gray-500 dark:text-gray-400"
          >
            Replying to <span class="font-bold">{{ replyTo.author_name }}</span>
            <button
              type="button"
              class="ml-2 underline underline-offset-2"
              @click="replyTo = null"
            >
              cancel
            </button>
          </p>
          <textarea
            ref="bodyEl"
            v-model="body"
            required
            maxlength="4000"
            rows="4"
            :placeholder="replyTo ? `Reply to ${replyTo.author_name}…` : 'Leave a comment…'"
            class="rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
          />
          <input
            v-model="website"
            class="comments-hp"
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          />
          <div ref="turnstileEl" />

          <p v-if="submitError" class="text-sm text-red-600 dark:text-red-400 m-0">
            {{ submitError }}
          </p>

          <button
            type="submit"
            :disabled="submitting || body.trim().length < 2"
            class="self-start rounded-full border-2 border-gray-900 dark:border-gray-100 px-5 py-2 font-bold transition-colors hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current"
          >
            {{ submitting ? "Posting…" : replyTo ? "Post reply" : "Post comment" }}
          </button>
        </form>
      </div>

      <template #fallback>
        <div class="comments-skeleton" aria-hidden="true">Loading comments…</div>
      </template>
    </ClientOnly>
  </section>
</template>

<style scoped>
.comments-skeleton {
  border: 1px solid transparent;
  border-radius: 0.75rem;
  padding: 1rem;
  color: rgb(107 114 128);
  animation: comments-pulse 2s infinite;
}

@keyframes comments-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Honeypot: off-screen but not display:none, which naive bots skip */
.comments-hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}
</style>
