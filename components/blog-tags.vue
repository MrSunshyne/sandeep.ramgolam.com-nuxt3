<script setup lang="ts">
import type { BlogPost } from '~/types/types';



const props = defineProps<{
    post: BlogPost;
}>();

const tags = computed(() => {
    return props.post.title.split(',').map((tag) => tag.trim());
})


</script>


<template>
    <div class="content-container">
        <div class="flex gap-4 py-4">
            <template v-for="tag in tags" :key="tag.id">
                <a :href="`/tag/${tag}`" class="text-xl font-medium">
                    #{{ tag }}
                </a>
            </template>
        </div>
    </div>
</template>