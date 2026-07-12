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
  <!-- intro band: a distinct surface so the cover reads separately from the post.
       The top edge is clipped along a gentle hand-drawn wobble (same organic
       language as the card thumbnails) instead of a straight line. -->
  <div
    class="blog-intro -mt-8 md:-mt-12 mb-8 bg-gray-50 dark:bg-slate-900/40 border-b border-gray-900/5 dark:border-white/10"
    style="clip-path: url(#blog-intro-edge)"
  >
    <svg class="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <clipPath id="blog-intro-edge" clipPathUnits="objectBoundingBox">
          <path
            d="M0,0.03 C0.015,0.05 0.03,0.012 0.05,0.028 C0.065,0.042 0.08,0.015 0.1,0.038 C0.115,0.055 0.135,0.02 0.16,0.03 C0.175,0.038 0.19,0.01 0.215,0.025 C0.235,0.04 0.25,0.018 0.275,0.045 C0.29,0.06 0.315,0.022 0.34,0.03 C0.36,0.038 0.375,0.012 0.4,0.028 C0.42,0.045 0.44,0.02 0.465,0.042 C0.48,0.055 0.5,0.015 0.525,0.025 C0.545,0.035 0.56,0.01 0.585,0.03 C0.605,0.048 0.625,0.02 0.65,0.04 C0.665,0.052 0.685,0.014 0.71,0.026 C0.73,0.038 0.745,0.012 0.77,0.032 C0.79,0.05 0.81,0.022 0.835,0.04 C0.85,0.052 0.87,0.015 0.895,0.025 C0.915,0.035 0.93,0.012 0.955,0.03 C0.97,0.042 0.985,0.02 1,0.032 L1,1 L0,1 Z"
          />
        </clipPath>
      </defs>
    </svg>
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
