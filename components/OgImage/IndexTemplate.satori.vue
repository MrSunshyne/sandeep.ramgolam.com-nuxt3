<script setup lang="ts">
defineProps<{
  tailwindClass?: string;
}>();
</script>
<template>
  <div
    :class="[tailwindClass]"
    class="w-full h-full flex text-white items-center justify-center relative og-image-wrapper"
  >
    <img
      :style="{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }"
      src="/assets/images/og-image-assets/index.png"
    />
  </div>
</template>

<style  scoped>
.og-image-wrapper {
  background-color: #000;
}
</style>
