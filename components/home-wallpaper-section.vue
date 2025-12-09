<template>
  <div class="w-full py-16 overflow-hidden">
    <div class="container mx-auto px-4 mb-8">
      <h2 class="text-4xl font-bold mb-2">Gallery</h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Some of my photos
      </p>
    </div>

    <div
      ref="containerRef"
      class="flex overflow-x-auto gap-6 px-4 pb-8 -mx-4 md:px-8 md:-mx-8 scrollbar-hide snap-x snap-mandatory"
      :style="{ transform: `translateX(${parallaxOffset}px)` }"
    >
      <div
        v-for="wallpaper in wallpapers"
        :key="wallpaper.path"
        class="snap-center shrink-0 first:pl-4 last:pr-4"
      >
        <div class="relative group w-[300px] md:w-[400px] aspect-video rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
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
    
    <div class="container mx-auto px-4 mt-6 text-right">
        <NuxtLink to="/wallpapers" class="text-primary-500 hover:underline inline-flex items-center gap-1 font-medium">
            View all wallpapers
            <Icon name="solar:arrow-right-linear" />
        </NuxtLink>
    </div>

    <UModal v-model="isOpen" :ui="{ width: 'w-full sm:max-w-[95vw]', height: 'h-full' }">
      <div v-if="selectedWallpaper" class="relative flex items-center justify-center p-4 bg-black/90 h-[90vh] outline-none" tabindex="0" @keydown.left="prevWallpaper" @keydown.right="nextWallpaper">
        <img :src="selectedWallpaper.path" :alt="selectedWallpaper.title" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
        
        <!-- Close Button -->
        <button @click="isOpen = false" class="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors z-50">
            <Icon name="solar:close-circle-bold" class="w-8 h-8" />
        </button>

        <!-- Navigation Buttons -->
        <button @click.stop="prevWallpaper" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors">
            <Icon name="solar:alt-arrow-left-linear" class="w-8 h-8" />
        </button>
        <button @click.stop="nextWallpaper" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors">
            <Icon name="solar:alt-arrow-right-linear" class="w-8 h-8" />
        </button>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import wallpapersData from "@/assets/data/wallpapers.json";
import { onKeyStroke, useElementBounding, useWindowSize } from '@vueuse/core'

const wallpapers = ref(wallpapersData);
const isOpen = ref(false);
const selectedWallpaper = ref(null);
const containerRef = ref<HTMLElement | null>(null);

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

// Keyboard navigation
onKeyStroke('ArrowLeft', (e) => {
  if (isOpen.value) {
    e.preventDefault()
    prevWallpaper()
  }
})

onKeyStroke('ArrowRight', (e) => {
  if (isOpen.value) {
    e.preventDefault()
    nextWallpaper()
  }
})

function openWallpaper(wallpaper) {
    selectedWallpaper.value = wallpaper;
    isOpen.value = true;
}

function nextWallpaper() {
    if (!selectedWallpaper.value) return;
    const currentIndex = wallpapers.value.findIndex(w => w.path === selectedWallpaper.value.path);
    const nextIndex = (currentIndex + 1) % wallpapers.value.length;
    selectedWallpaper.value = wallpapers.value[nextIndex];
}

function prevWallpaper() {
    if (!selectedWallpaper.value) return;
    const currentIndex = wallpapers.value.findIndex(w => w.path === selectedWallpaper.value.path);
    const prevIndex = (currentIndex - 1 + wallpapers.value.length) % wallpapers.value.length;
    selectedWallpaper.value = wallpapers.value[prevIndex];
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
</style>
