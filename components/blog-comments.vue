<script setup lang="ts">
import type { CommentSubmission, PublicComment, PublicCommentsResponse } from "@/types";

const props = defineProps<{ slug: string }>();

const config = useRuntimeConfig();
const apiBase = config.public.commentsApiUrl;

const comments = ref<PublicComment[]>([]);
const loading = ref(true);
const loadFailed = ref(false);

async function loadComments() {
  loading.value = true;
  loadFailed.value = false;
  try {
    const res = await $fetch<PublicCommentsResponse>(
      `${apiBase}/api/comments/${props.slug}`,
    );
    comments.value = res.comments;
  } catch {
    loadFailed.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(loadComments);

const authorName = ref("");
const body = ref("");
const website = ref(""); // honeypot — humans never see the field
const formStartedAt = ref(0);
const submitting = ref(false);
const submitted = ref(false);
const submitError = ref("");

const turnstileEl = ref<HTMLElement | null>(null);
const { preload, getToken, reset } = useTurnstile(turnstileEl);

function onFormInteraction() {
  if (!formStartedAt.value) formStartedAt.value = Date.now();
  preload();
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

async function submit() {
  if (submitting.value) return;
  submitting.value = true;
  submitError.value = "";
  try {
    const token = await getToken();
    const submission: CommentSubmission = {
      slug: props.slug,
      author_name: authorName.value.trim() || undefined,
      body: body.value,
      turnstile_token: token,
      website: website.value,
      form_started_at: formStartedAt.value,
    };
    await $fetch(`${apiBase}/api/comments`, { method: "POST", body: submission });
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
  <section class="mt-16 mb-24">
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
          No comments yet — be the first!
        </p>
        <ul v-else class="flex flex-col gap-4 list-none p-0">
          <li
            v-for="comment in comments"
            :key="comment.id"
            class="rounded-xl border border-gray-200 dark:border-gray-800 p-4"
          >
            <div class="flex items-baseline gap-2 mb-1">
              <span class="font-bold">{{ comment.author_name }}</span>
              <time
                class="text-sm text-gray-500 dark:text-gray-400"
                :datetime="comment.created_at"
              >
                {{ dateFormat(new Date(comment.created_at)) }}
              </time>
            </div>
            <p class="whitespace-pre-line dark:text-gray-300 m-0">{{ comment.body }}</p>
          </li>
        </ul>
      </template>

      <div class="mt-8">
        <p
          v-if="submitted"
          class="rounded-xl border border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950/40 p-4 text-green-800 dark:text-green-300"
        >
          Thanks! Your comment is awaiting moderation.
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
          <textarea
            v-model="body"
            required
            maxlength="4000"
            rows="4"
            placeholder="Leave a comment…"
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
            {{ submitting ? "Posting…" : "Post comment" }}
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
