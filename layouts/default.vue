<template>
  <div class="relative dark:bg-slate-800 dark:text-gray-100">
    <SiteMenu />
    <div>
      <!-- <NuxtLayout > -->
      <slot />
      <!-- </NuxtLayout> -->
    </div>
    <SiteFooter />
  </div>
</template>
