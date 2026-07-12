<script setup lang="ts">
import type { BlogPost } from "~/types";
import { dateFormat } from "~/utils/date-utils";

const props = defineProps<{
  post: BlogPost;
}>();

const formattedDate =
  props.post?.date && dateFormat(new Date(props.post?.date));
</script>

<template>
  <!-- intro band: a distinct surface so the cover reads separately from the post -->
  <div
    class="blog-intro -mt-8 md:-mt-12 mb-8 bg-gray-50 dark:bg-slate-900/40 border-b border-gray-900/5 dark:border-white/10"
  >
    <header class="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl pt-10 pb-8 sm:pt-14 sm:pb-10">
    <div class="prose dark:prose-invert">
      <h1 class="text-balance" :style="transitionName(post.slug, 'blog-title')">
        {{ post.title }}
      </h1>

      <p class="text-lg sm:text-xl text-gray-500 dark:text-gray-300 text-pretty">
        {{ post.custom_excerpt }}
      </p>
    </div>

    <div class="pt-6">
      <section class="flex items-center gap-4">
        <ul v-if="post" class="author-list">
          <li class="author-list-item">
            <a
              href="/about"
              class="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden block"
            >
              <img
                class="w-full h-full block"
                src="https://github.com/MrSunshyne.png"
                alt="Written by Sandeep Ramgolam"
              />
            </a>
          </li>
        </ul>

        <section class="">
          <div class="text-[11px] font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Written by
          </div>
          <h4
            class="text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-300"
          >
            <a :href="`/about`"> Sandeep Ramgolam </a>
          </h4>

          <div class="text-sm text-gray-500">
            <time class="byline-meta-date" datetime="post.published_at">
              {{ formattedDate }}
            </time>
            <span class="byline-reading-time">
              <span class="bull px-2">•</span>
              5 min read
            </span>
          </div>
        </section>
      </section>
    </div>
    </header>
  </div>
</template>
