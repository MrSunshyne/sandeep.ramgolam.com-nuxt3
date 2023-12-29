<script setup lang="ts">
import { PostOrPage } from '@tryghost/content-api';


const props = defineProps({
    post: {
        type: Object as PropType<PostOrPage>,
        required: true,
    },
});


</script>


<template>
    <div class="content-container">
        <div class="flex gap-4 py-4">
            <template v-for="tag in post.tags" :key="tag.id">
                <NuxtLink :href="`/tag/${tag.name}`" class="text-xl font-medium">
                    #{{ tag.name }}
                </NuxtLink>
            </template>
        </div>
    </div>
</template>