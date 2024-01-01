<script setup lang="ts">
defineProps({
  title: String,
  backgroundColor: String,
});
</script>
<template>
  <div
    :class="[backgroundColor]"
    class="w-full h-full flex text-white items-center justify-center og-image-wrapper"
  ></div>
</template>

<style lang="postcss" scoped>
.og-image-wrapper {
  background-color: #000;
  background-image: url("/og-image-assets/index.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
