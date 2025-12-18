<template>
  <div>
    <div class="flex gap-2">
      <!-- Light theme placeholder -->
      <div class="relative px-2 py-1 cursor-pointer flex items-center justify-center aspect-square opacity-50">
        <Icon name="solar:sun-fog-linear" class="text-gray-400" />
      </div>
      <!-- Dark theme placeholder -->
      <div class="relative px-2 py-1 cursor-pointer flex items-center justify-center aspect-square opacity-50">
        <Icon name="solar:cloudy-moon-bold" class="text-gray-400" />
      </div>
      <!-- Sepia theme placeholder -->
      <div class="relative px-2 py-1 cursor-pointer flex items-center justify-center aspect-square opacity-50">
        <Icon name="solar:umbrella-line-duotone" class="text-gray-400" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This placeholder component matches the exact structure and dimensions
// of site-color-picker to prevent layout shifts during SSR
</script>
