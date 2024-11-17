<template>
  <div class="container flex flex-col gap-16">
    <div v-for="wallpaper in wallpapers" :key="wallpaper.path">
      <div class="grid md:grid-cols-3 gap-10 ">
        <div class="col-span-1 space-y-2">
          <h2 class="font-bold text-xl">{{ wallpaper.title }}</h2>
          <p>{{ wallpaper.metadata.description }}</p>
          <button class="border p-2 rounded-lg" @click="downloadWallpaper(wallpaper.path)">Download</button>
        </div>
        <div class="md:h-[50vh] bg-white aspect-video w-auto col-span-2 grid place-items-center">
          <NuxtImg :src="wallpaper.path" alt="wallpaper.title" class="border-8 border-transparent object-contain max-h-[50vh] h-full w-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import type { Wallpaper } from '@/types/wallpaper';
import wallpapersData from '@/assets/data/wallpapers.json';

defineOgImageComponent("GenericTemplate");

useHead({
  title: 'Wallpapers by Sandeep Ramgolam.',
  meta: [
    {
      name: 'description',
      content: 'Download my photos and use as your wallpaper. All photos are taken by me. Please do not use them for commercial purposes.'
    }
  ]
})


const wallpapers = ref(wallpapersData) as Wallpaper[]

function downloadWallpaper(path: string) {
  const link = document.createElement('a');
  link.href = path;
  link.download = path.split('/').pop() || 'wallpaper';
  link.click();
}

</script>

<style scoped>
.wallpaper-item {
  margin-bottom: 100px;
}
</style>
