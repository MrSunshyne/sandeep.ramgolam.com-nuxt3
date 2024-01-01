<script setup lang="ts">
import type { BlogPost } from '@/types/types'

defineProps<{
    post: BlogPost 
}>()
</script>

<template>
    <a
       :href="`/blog/${post.slug}`"
       class="rounded bg-white overflow-hidden shadow-neumorphismlight dark:shadow-neumorphismdark hover:shadow-lg transition-all duration-500 blog-box">
        <img
             v-if="post?.feature_image"
             :src="post?.feature_image"
             :alt="post.title"
             loading="lazy" />
        <div class="px-6 py-4">
            <div class="font-bold text-xl">
                {{ post.title }}
            </div>
            <div class="text-xs uppercase pt-2 pb-4">
                {{ post?.published_at }}
            </div>
            <p class="text-gray-700 dark:text-gray-500">
                {{ post.custom_excerpt }}
            </p>
        </div>
</a>
</template>
