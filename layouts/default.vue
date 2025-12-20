<template>
  <div class="relative dark:bg-slate-800 dark:text-gray-100 flex flex-col min-h-[100vh]">
    <!-- <SiteMenu /> -->
    <SiteNavBottom />
    <div class="flex-1 pt-8 md:pt-12">
      <!-- <NuxtLayout > -->
      <slot />
      <!-- </NuxtLayout> -->
    </div>
    <SiteFooter />
  </div>
</template>