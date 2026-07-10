<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <div
    class="contain text-sm uppercase tracking-wide py-10 flex items-center justify-center md:justify-between"
  >
    <ul class="hidden md:block">
      <li>&copy; {{ year }} | Sandeep Ramgolam</li>
    </ul>
    <div class="flex items-center">
      <ul class="menu">
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/projects">Projects</a>
        </li>
      </ul>
      <div class="ml-4 pl-4 border-l border-gray-300 dark:border-slate-600">
        <ClientOnly>
          <site-color-picker />
          <template #fallback>
            <SiteColorPickerPlaceholder />
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.menu {
  display: flex;

  a {
    @apply pl-2;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
