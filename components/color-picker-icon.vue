<template>
  <button
    type="button"
    class="relative px-2 py-1 cursor-pointer flex items-center justify-center aspect-square bg-transparent border-0"
    :aria-label="label"
    :aria-pressed="isActive"
    :title="label"
    @click="$colorMode.preference = props.theme"
  >
    <HandDrawnShape
      v-if="isActive"
      variant="pill"
      :selected="true"
      :hover-morph="false"
    />
    <span class="relative z-10 flex items-center justify-center">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  theme: "system" | "light" | "dark" | "sepia";
}>();

const colorMode = useColorMode();

const isActive = computed(() => {
  return colorMode.value === props.theme;
});

const labels: Record<typeof props.theme, string> = {
  system: "Use system theme",
  light: "Switch to light theme",
  dark: "Switch to dark theme",
  sepia: "Switch to sepia theme",
};

const label = computed(() => labels[props.theme]);
</script>
