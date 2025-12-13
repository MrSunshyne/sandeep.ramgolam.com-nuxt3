<script setup lang="ts">
import type { BlogPost } from "@/types";

const props = defineProps<{
  post: BlogPost;
}>();

const clipId = computed(() => `organic-clip-${props.post.slug}`);

const coverImage = computed(() => {
  if (props.post.feature_image) {
    return props.post.feature_image;
  }

  return `/__og-image__/static/blog/${props.post.slug}/og.png`;
});
</script>

<template>
  <NuxtLink
    :href="`/blog/${post.slug}`"
    class="blog-card relative rounded overflow-visible transition-all duration-300 blog-box block"
  >
    <HandDrawnShape variant="card" :hover-morph="true" />
    <div class="card-content rounded overflow-hidden">
      <!-- SVG clip path definition for organic image shape -->
      <svg class="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath :id="clipId" clipPathUnits="objectBoundingBox">
            <path d="M0.02 0.04 Q0.01 0.02 0.03 0.01 L0.05 0.02 Q0.15 0 0.3 0.02 T0.6 0 Q0.8 0.02 0.95 0.01 Q0.98 0 0.99 0.03 Q1 0.06 0.99 0.12 L0.99 0.2 Q1 0.35 0.99 0.5 T1 0.75 Q0.99 0.88 0.99 0.94 Q1 0.98 0.97 0.99 Q0.94 1 0.88 0.99 L0.8 0.99 Q0.6 1 0.4 0.98 T0.12 1 Q0.05 0.99 0.03 0.99 Q0 0.98 0.01 0.94 Q0 0.88 0.01 0.75 L0.01 0.6 Q0 0.4 0.01 0.25 T0 0.1 Q0.01 0.06 0.02 0.04 Z" />
          </clipPath>
        </defs>
      </svg>
      <div
        class="image-container relative w-full aspect-[2/1] bg-gray-200 dark:bg-gray-800"
        :style="`clip-path: url(#${clipId})`"
      >
        <img
          :src="coverImage"
          :alt="post.title"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover"
          :style="transitionName(post.slug, 'blog-cover')"
        />
      </div>
    <div class="px-6 py-4">
      <div
        class="font-bold text-xl"
        :style="transitionName(post.slug, 'blog-title')"
      >
        {{ post.title }}
      </div>
      <div class="text-xs uppercase pt-2 pb-4">
        {{ dateFormat(new Date(post?.date)) }}
      </div>
      <p class="text-gray-700 dark:text-gray-400">
        {{ post.custom_excerpt }}
      </p>
    </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.blog-card {
  padding: 6px;
}

.card-content {
  position: relative;
  z-index: 1;
  background: white;
}

:deep(.dark) .card-content,
.dark .card-content {
  background: #1f2937;
}

.image-container {
  margin: 8px;
  margin-bottom: 0;
  width: calc(100% - 16px);
}

/* Hover color change */
.blog-card:hover :deep(.shape-path) {
  stroke: #3b82f6;
}

:deep(.dark) .blog-card:hover :deep(.shape-path),
.dark .blog-card:hover :deep(.shape-path) {
  stroke: #60a5fa;
}
</style>
