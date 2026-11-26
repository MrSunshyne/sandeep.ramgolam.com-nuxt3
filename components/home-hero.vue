<template>
  <div
    class="home-hero container mx-auto text-center sm:text-left flex flex-wrap items-center justify-between w-full"
  >
    <HomeSelfIntro />

    <div
      ref="splashWrapper"
      class="splash-wrapper relative hidden md:flex items-center justify-center md:w-[36%]"
    >
      <ClientOnly>
        <HomeHeroPersona
          v-if="isDesktop && canvasHeight"
          :height="canvasHeight"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeSelfIntro from "./home-self-intro.vue";
import HomeHeroPersona from "./home-hero-persona.vue";

const { isDesktop } = useBreakpoints();

const MAX_CANVAS_HEIGHT = 620;

const splashWrapper = ref<HTMLElement>();
const canvasHeight = ref(0);

// Keep the hero within the first viewport so the nav dock clears the fold
// on laptop screens (1280x800, 1366x768) as well as large monitors.
const measureStage = () => {
  if (!splashWrapper.value) return;

  const available = Number.parseFloat(
    getComputedStyle(splashWrapper.value).maxHeight,
  );

  const usable = Number.isFinite(available)
    ? Math.max(260, available)
    : MAX_CANVAS_HEIGHT;

  canvasHeight.value = Math.min(
    MAX_CANVAS_HEIGHT,
    Math.floor(usable / 10) * 10,
  );
};

let resizeTimer: ReturnType<typeof setTimeout> | undefined;

const onResize = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(measureStage, 150);
};

onMounted(() => {
  measureStage();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  clearTimeout(resizeTimer);
  window.removeEventListener("resize", onResize);
});
</script>

<style scoped>
.home-hero {
  /* Tightens on short viewports so the dock still clears the fold there. */
  --hero-padding-y: clamp(1rem, calc(1rem + (100vh - 630px) / 9.4), 2rem);
  padding-block: var(--hero-padding-y);

  /* Use global dock height variable to ensure dock is fully visible */
  min-height: calc(100vh - var(--dock-height-unstuck));
  min-height: calc(100dvh - var(--dock-height-unstuck));
}

/* The room the dock and hero padding leave for the interactive portrait. */
.splash-wrapper {
  max-height: calc(
    100vh - var(--dock-height-unstuck) - var(--hero-padding-y) * 2
  );
  max-height: calc(
    100dvh - var(--dock-height-unstuck) - var(--hero-padding-y) * 2
  );
}
</style>
