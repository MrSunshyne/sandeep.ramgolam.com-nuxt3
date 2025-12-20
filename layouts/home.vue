<template>
  <div class="relative dark:bg-slate-800 dark:text-gray-100 flex flex-col min-h-[100vh]">
    <!-- No nav here - homepage controls its own nav placement -->
    <div class="flex-1">
      <slot />
    </div>
    <SiteFooter />
  </div>
</template>
