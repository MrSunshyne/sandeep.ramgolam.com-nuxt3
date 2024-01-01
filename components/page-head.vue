<script setup lang="ts">
defineProps({
  title: {
    type: String as PropType<string>,
    required: true,
  },
});
</script>

<template>
  <header class="mx-auto px-20 max-w-4xl py-16">
    <div class="prose-responsive">
      <h1>{{ title }}</h1>
    </div>
  </header>
</template>
