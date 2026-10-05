<template>
    <img
      ref="imageParticleRef"
      :src="imageSrc"
      :class="cn('hidden w-32 h-32', $props.class)"
      :data-particle-gap="particleGap"
      :data-width="canvasWidth"
      :data-height="canvasHeight"
      :data-gravity="gravity"
      :data-particle-size="particleSize"
      :data-mouse-force="mouseForce"
      :data-renderer="renderer"
      :data-color="color"
      :data-color-arr="colorArr"
      :data-init-position="initPosition"
      :data-init-direction="initDirection"
      :data-fade-position="fadePosition"
      :data-fade-direction="fadeDirection"
      :data-noise="noise"
      :data-responsive-width="responsiveWidth"
    />
  </template>
  
  <script lang="ts" setup>
  import { cn } from "@/lib/utils";
  import {
    inspiraImageParticles,
    type InspiraImageParticle as ImageParticle,
  } from "./inspiraImageParticles.js";
  import { ref, onMounted, onBeforeUnmount } from "vue";
  
  type ParticleImageProps = {
    imageSrc: string;
    class?: string;
    canvasWidth?: string;
    canvasHeight?: string;
    gravity?: string;
    particleSize?: string;
    particleGap?: string;
    mouseForce?: string;
    renderer?: "default" | "webgl";
    color?: string;
    colorArr?: number[];
    initPosition?: "random" | "top" | "left" | "bottom" | "right" | "misplaced" | "none";
    initDirection?: "random" | "top" | "left" | "bottom" | "right" | "none";
    fadePosition?: "explode" | "top" | "left" | "bottom" | "right" | "random" | "none";
    fadeDirection?: "random" | "top" | "left" | "bottom" | "right" | "none";
    noise?: number;
    responsiveWidth?: boolean;
  };
  
  defineProps<ParticleImageProps>();
  
  let particles: ImageParticle | undefined;
  const imageParticleRef = ref<HTMLImageElement>();
  
  onMounted(() => {
    const { InspiraImageParticle } = inspiraImageParticles();
    particles = new InspiraImageParticle(imageParticleRef.value);
  });

  onBeforeUnmount(() => {
    if (!particles) return;
    // Its own listeners go first: with responsive-width it restarts itself on
    // "stopped", which would keep the animation frame loop running after the
    // component is gone.
    particles.events = {};
    particles.stop();
    // The canvas is appended to the wrapper by the library, so Vue does not
    // take it down with the component. It goes once Vue has finished patching:
    // until then it is still the sibling Vue inserts the replacement against.
    const { canvas } = particles;
    queueMicrotask(() => canvas?.remove());
    particles = undefined;
  });

  // The canvas is sized from the dataset when the particle system is built, so
  // a viewport that changed since then has to be handed over by hand. The
  // width comes from the wrapper as it does on start: start() writes both onto
  // the canvas, and a responsive width picked up later would otherwise leave
  // the canvas element itself a step behind.
  const resizeCanvas = (height: number) => {
    if (!particles) return;

    const width = particles.wrapperElement?.clientWidth || particles.width;
    if (particles.height === height && particles.width === width) return;

    particles.height = height;
    particles.width = width;
    particles.start();
  };

  defineExpose({ resizeCanvas });
  </script>