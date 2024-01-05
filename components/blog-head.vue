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
  <header class="mx-auto px-4 md:px-20 max-w-4xl py-8 md:py-16">
    <div class="prose dark:prose-invert">
      <h1 :style="transitionName(post.slug, 'blog-title')">{{ post.title }}</h1>

      <p class="text-xl text-gray-500 dark:text-gray-300">
        {{ post.custom_excerpt }}
      </p>
    </div>

    <div class="py-6">
      <section class="flex items-center gap-4">
        <ul v-if="post" class="author-list">
          <li class="author-list-item">
            <a
              href="/about"
              class="w-20 h-20 rounded-full overflow-hidden block"
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
          <h4
            class="text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-300"
          >
            <a :href="`/about`"> Sandeep Ramgolam </a>
          </h4>

          <div class="text-gray-500">
            <time class="byline-meta-date" datetime="post.published_at">
              {{ formattedDate }}
            </time>
            <span class="byline-reading-time">
              <span class="bull">•</span>
              5 min read
            </span>
          </div>
        </section>
      </section>
    </div>
  </header>
</template>
