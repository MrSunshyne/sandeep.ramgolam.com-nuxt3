<template>
  <div
    class="px-2 py-1 border cursor-pointer hover:border-gray-600 rounded-md"
    :class="[
      !!isActive ? 'border border-gray-600 rounded-md' : 'border-transparent',
    ]"
    @click="$colorMode.preference = props.theme"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  theme: "system" | "light" | "dark" | "sepia";
}>();

const colorMode = useColorMode();

const isActive = computed(() => {
  return colorMode.value === props.theme;
});
</script>
