<template>
  <div class="container flex flex-col gap-12 sm:gap-16 pb-16 sm:pb-20">
    <div>
      <h1 class="font-bold tracking-tight text-3xl sm:text-4xl mb-2">
        Wallpapers
      </h1>
      <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400">
        Photos I took across Mauritius and beyond — click any photo to view full
        screen or download for personal use.
      </p>
    </div>

    <div v-for="wallpaper in wallpapers" :key="wallpaper.path">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-start">
        <div class="md:col-span-1 min-w-0 space-y-3">
          <h2 class="font-bold text-xl">{{ wallpaper.title }}</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ wallpaper.metadata.description }}
          </p>
          <button
            type="button"
            class="border border-gray-300 dark:border-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            @click="downloadWallpaper(wallpaper.path)"
          >
            Download
          </button>
        </div>
        <div
          class="wallpaper-frame md:col-span-2 min-w-0 md:h-[50vh] bg-gray-100 dark:bg-slate-900/60 rounded-xl overflow-hidden aspect-video w-full grid place-items-center"
        >
          <NuxtImg
            :src="wallpaper.path"
            :alt="wallpaper.title"
            class="border-4 sm:border-8 border-transparent object-contain max-h-[50vh] max-w-full h-full w-auto cursor-zoom-in"
            @click="lightbox?.open(wallpaper)"
          />
        </div>
      </div>
    </div>

    <WallpaperLightbox ref="lightbox" :wallpapers="wallpapers" />
  </div>
</template>

<script setup lang="ts">
import type { Wallpaper } from "@/types/wallpaper";
import wallpapersData from "@/assets/data/wallpapers.json";

defineOgImage("GenericTemplate");

useHead({
  title: "Wallpapers by Sandeep Ramgolam.",
  meta: [
    {
      name: "description",
      content:
        "Download my photos and use as your wallpaper. All photos are taken by me. Please do not use them for commercial purposes.",
    },
  ],
});

const wallpapers: Ref<Wallpaper[]> = ref(wallpapersData);
const lightbox = ref<{ open: (wallpaper: Wallpaper) => void } | null>(null);

function downloadWallpaper(path: string) {
  const link = document.createElement("a");
  link.href = path;
  link.download = path.split("/").pop() || "wallpaper";
  link.click();
}
</script>

<style scoped>
.wallpaper-item {
  margin-bottom: 100px;
}

html.sepia .wallpaper-frame {
  background-color: #e8dec6;
}
</style>
