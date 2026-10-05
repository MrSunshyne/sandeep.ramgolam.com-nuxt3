<template>
    <div
        class="home-hero container mx-auto text-center sm:text-left flex flex-wrap items-center justify-between w-full"
      >
        <HomeSelfIntro />

        <div ref="splashWrapper" class="splash-wrapper hidden md:flex content-center md:w-1/3">
          <InspiraParticleImageBust
            v-if="isDesktop && bustHeight"
            ref="bust"
            image-src="/assets/sun-bust.png"
            :responsive-width="true"
            :canvas-height="String(bustHeight)"
            :noise="2"
            particle-size="2"
            particle-gap="1"
            :grow-duration="10"
            :initPosition="'bottom'"
            :initDirection="'bottom'"
            gravity="0.2"
          />
        </div>
      </div>
</template>

<script setup lang="ts">
import HomeSelfIntro from './home-self-intro.vue';
import InspiraParticleImageBust from './inspira/ParticleImage/Bust.vue';

const { isDesktop } = useBreakpoints();

// Natural height of /assets/sun-bust.png. The canvas falls back to it when no
// height is given, and the bust is never drawn larger than its source, so it
// is the ceiling.
const BUST_NATURAL_HEIGHT = 728;

const splashWrapper = ref<HTMLElement>();
const bust = ref<InstanceType<typeof InspiraParticleImageBust>>();
const bustHeight = ref(0);

// Left to itself the canvas is always 728px tall, which on a laptop-sized
// screen makes the hero taller than the viewport and pushes the dock below the
// fold. How much room is left is CSS's business (max-height on the wrapper);
// read that back and hand the canvas a pixel height it can respect.
const measureBust = () => {
  if (!splashWrapper.value) return;

  const available = Number.parseFloat(getComputedStyle(splashWrapper.value).maxHeight);

  // Snapped to 20px steps: the canvas is redrawn whenever this value changes,
  // so a drag-resize should not redraw it on every frame. A screen with room
  // to spare keeps the full-size bust.
  bustHeight.value = Number.isFinite(available) && available < BUST_NATURAL_HEIGHT
    ? Math.max(240, Math.floor(available / 20) * 20)
    : BUST_NATURAL_HEIGHT;

  // The prop only counts on the first render; afterwards the canvas is resized
  // in place, so the particle system is never torn down and rebuilt.
  bust.value?.resizeCanvas(bustHeight.value);
};

let resizeTimer: ReturnType<typeof setTimeout> | undefined;

const onResize = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(measureBust, 200);
};

onMounted(() => {
  measureBust();
  window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
  clearTimeout(resizeTimer);
  window.removeEventListener('resize', onResize);
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

/* The room the dock and the hero padding leave for the bust. Also the value
   the canvas height is measured from. */
.splash-wrapper {
  max-height: calc(100vh - var(--dock-height-unstuck) - var(--hero-padding-y) * 2);
  max-height: calc(100dvh - var(--dock-height-unstuck) - var(--hero-padding-y) * 2);
}
</style>
