<script setup lang="ts">
import type { PostOrPage } from "@tryghost/content-api";
import { dateFormat } from "~/utils/date-utils";

const props = defineProps({
  post: {
    type: Object as PropType<PostOrPage>,
    required: true,
  },
});

const formattedDate =
  props.post?.published_at && dateFormat(new Date(props.post?.published_at));
</script>

<template>
  <header class="mx-auto px-4 md:px-20 max-w-4xl py-8 md:py-16">
    <section class="post-full-tags" v-if="post.primary_tag">
      <a :href="`/tag/${post.primary_tag?.slug}`" class="pr-3 text-sm text-green-500">
        {{ post.primary_tag.name }}
      </a>
    </section>

    <div class="prose-responsive">
      <h1>{{ post.title }}</h1>

      <p class="text-xl text-gray-500">
        {{ post.custom_excerpt }}
      </p>
    </div>

    <div class="py-6">
      <section class="flex items-center gap-4">
        <ul class="author-list" v-if="post && post.primary_author">
          <li class="author-list-item">
            <a
              :href="`/author/${post.primary_author.slug}`"
              class="w-20 h-20 rounded-full overflow-hidden block"
            >
              <img
                v-if="post.primary_author.profile_image"
                class="w-full h-full block"
                :src="post.primary_author.profile_image"
                :alt="post.primary_author.name"
              />
            </a>
          </li>
        </ul>

        <section class="">
          <h4
            v-if="post.primary_author"
            class="text-lg md:text-xl font-semibold text-gray-600"
          >
            <a :href="`/author/${post.primary_author.slug}`">
              {{ post.primary_author.name }}
            </a>
          </h4>

          <div class="text-gray-500">
            <time class="byline-meta-date" datetime="post.published_at">
              {{ formattedDate }}
            </time>
            <span class="byline-reading-time">
              <span class="bull">•</span>
              {{ post.reading_time }} min read
            </span>
          </div>
        </section>
      </section>
    </div>
  </header>
</template>
