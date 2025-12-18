<template>
  <div
    class="relative px-2 py-1 cursor-pointer flex items-center justify-center aspect-square"
    @click="$colorMode.preference = props.theme"
  >
    <HandDrawnShape
      v-if="isActive"
      variant="pill"
      :selected="true"
      :hover-morph="false"
    />
    <div class="relative z-10">
      <slot />
    </div>
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
