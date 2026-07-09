<template>
  <div class="w-full py-16 overflow-hidden">
    <div class="container mx-auto px-4 mb-8">
      <h2 class="text-3xl font-black mb-2">Gallery</h2>
      <p class="text-md text-gray-600 dark:text-gray-400">
        Some of my photos
      </p>
    </div>

    <div
      ref="containerRef"
      class="flex overflow-x-auto gap-6 px-4 pb-8 -mx-4 md:px-8 md:-mx-8 scrollbar-hide snap-x snap-mandatory"
      :style="{ transform: `translateX(${parallaxOffset}px)` }"
    >
      <div
        v-for="(wallpaper, index) in wallpapers"
        :key="wallpaper.path"
        class="snap-center shrink-0 first:pl-4 last:pr-4"
      >
        <div class="wallpaper-card relative group w-[300px] md:w-[400px] aspect-video transition-transform hover:scale-[1.02]">
          <!-- SVG clip path for organic image shape -->
          <svg class="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <clipPath :id="`wallpaper-clip-${index}`" clipPathUnits="objectBoundingBox">
                <path d="M0.02 0.04 Q0.01 0.02 0.03 0.01 L0.05 0.02 Q0.15 0 0.3 0.02 T0.6 0 Q0.8 0.02 0.95 0.01 Q0.98 0 0.99 0.03 Q1 0.06 0.99 0.12 L0.99 0.2 Q1 0.35 0.99 0.5 T1 0.75 Q0.99 0.88 0.99 0.94 Q1 0.98 0.97 0.99 Q0.94 1 0.88 0.99 L0.8 0.99 Q0.6 1 0.4 0.98 T0.12 1 Q0.05 0.99 0.03 0.99 Q0 0.98 0.01 0.94 Q0 0.88 0.01 0.75 L0.01 0.6 Q0 0.4 0.01 0.25 T0 0.1 Q0.01 0.06 0.02 0.04 Z" />
              </clipPath>
            </defs>
          </svg>
          <div class="image-container" :style="`clip-path: url(#wallpaper-clip-${index})`">
            <NuxtImg
              :src="wallpaper.path"
              :alt="wallpaper.title"
              loading="lazy"
              class="w-full h-full object-cover"
              width="400"
              height="225"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 cursor-pointer" @click="openWallpaper(wallpaper)">
               <h3 class="text-white font-bold truncate">{{ wallpaper.title }}</h3>
               <button class="mt-2 inline-block bg-white text-black text-xs font-bold px-3 py-1 rounded-full w-fit hover:bg-gray-200">
                  View
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 mt-6 flex justify-center">
        <NuxtLink to="/wallpapers" class="text-primary-500 hover:underline inline-flex items-center gap-1 font-medium">
            View all wallpapers
            <Icon name="solar:arrow-right-linear" />
        </NuxtLink>
    </div>

    <WallpaperLightbox ref="lightbox" :wallpapers="wallpapers" />
  </div>
</template>

<script setup lang="ts">
import wallpapersData from "@/assets/data/wallpapers.json";
import { useElementBounding, useWindowSize } from '@vueuse/core'

const wallpapers = ref(wallpapersData);
const containerRef = ref<HTMLElement | null>(null);
const lightbox = ref<{ open: (wallpaper: any) => void } | null>(null);

// Parallax logic
const { top } = useElementBounding(containerRef);
const { height: windowHeight } = useWindowSize();

const parallaxOffset = computed(() => {
    if (!windowHeight.value) return 0;
    // Calculate progress of element through viewport (0 to 1 approx)
    // We want the movement to happen when it's visible
    const progress = 1 - (top.value / windowHeight.value);
    
    // Map progress to pixel offset (e.g. from 50px to -50px)
    // Clamping isn't strictly necessary but good for sanity
    return (progress - 0.5) * -100; 
});

onMounted(() => {
  if (containerRef.value) {
    const scrollLeft = (containerRef.value.scrollWidth - containerRef.value.clientWidth) / 2;
    containerRef.value.scrollLeft = scrollLeft;
  }
});

function openWallpaper(wallpaper) {
    lightbox.value?.open(wallpaper);
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.image-container {
    position: relative;
    width: 100%;
    height: 100%;
    background: #e5e7eb;
}

:deep(.dark) .image-container,
.dark .image-container {
    background: #374151;
}
</style>
