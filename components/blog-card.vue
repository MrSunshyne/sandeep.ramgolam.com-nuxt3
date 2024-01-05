<script setup lang="ts">
import type { BlogPost } from "@/types";

const props = defineProps<{
  post: BlogPost;
}>();

const coverImage = computed(() => {
  if (props.post.feature_image) {
    return props.post.feature_image;
  }

  return `/__og-image__/image/blog/${props.post.slug}/og.png?component=Wave`;
});
</script>

<template>
  <a
    :href="`/blog/${post.slug}`"
    class="rounded overflow-hidden shadow-neumorphismlight dark:shadow-neumorphismdark hover:shadow-lg transition-all duration-500 blog-box"
  >
    <img :src="coverImage" :alt="post.title" loading="lazy" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl">
        {{ post.title }}
      </div>
      <div class="text-xs uppercase pt-2 pb-4">
        {{ dateFormat(new Date(post?.date)) }}
      </div>
      <p class="text-gray-700 dark:text-gray-400">
        {{ post.custom_excerpt }}
      </p>
    </div>
  </a>
</template>
