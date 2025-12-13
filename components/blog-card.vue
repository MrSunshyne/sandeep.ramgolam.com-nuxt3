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
    <!-- Hand-drawn border SVG -->
    <svg
      class="hand-drawn-border"
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        class="border-path"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6 Q8 5 5 8 Q3 11 4 16
           L4 18 Q2 50 5 80 T3 140 Q5 180 4 220 T5 270 Q3 285 5 290
           Q6 294 10 295
           L20 294 Q70 296 120 294 T220 296 Q280 294 340 296 T390 294
           Q394 294 396 290 Q398 286 396 280
           L397 270 Q395 230 397 190 T395 130 Q397 90 396 50 T397 16
           Q398 10 394 7 Q390 4 385 5
           L370 6 Q310 4 250 6 T130 4 Q70 6 20 5 Z"
      />
    </svg>
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

.hand-drawn-border {
  position: absolute;
  inset: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  z-index: 0;
  pointer-events: none;
}

.image-container {
  margin: 8px;
  margin-bottom: 0;
  width: calc(100% - 16px);
}

.border-path {
  color: #9ca3af;
  transition: color 0.4s ease-out, d 0.4s ease-out;
}

:deep(.dark) .border-path,
.dark .border-path {
  color: #6b7280;
}

.blog-card:hover .border-path {
  color: #3b82f6;
  d: path("M15 3 Q6 2 3 6 Q-1 12 2 20 L3 25 Q-2 60 4 95 T-1 160 Q6 200 2 240 T6 280 Q2 290 6 294 Q10 298 18 296 L30 297 Q80 292 140 298 T260 291 Q320 298 370 293 T392 297 Q398 296 399 290 Q402 284 398 275 L399 265 Q402 220 395 175 T402 115 Q394 75 399 40 T395 12 Q396 5 390 3 Q384 0 375 3 L360 4 Q290 8 220 2 T100 7 Q50 2 25 4 Z");
}

:deep(.dark) .blog-card:hover .border-path,
.dark .blog-card:hover .border-path {
  color: #60a5fa;
}
</style>
