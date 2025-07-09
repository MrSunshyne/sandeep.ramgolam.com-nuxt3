<template>
  <div class="md:w-2/3">
    <h1 class="text-2xl md:text-5xl font-black w-full">Sandeep Ramgolam</h1>
    <div class="mb-4">
      <div
        title="Yes, you can run that in your terminal"
        class="dark:bg-gray-900 bg-gray-200 py-1 px-2 mt-2 rounded cursor-help inline-block"
      >
        $ npx sandeepramgolam
      </div>

    </div>

    <p class="inline sm:w-full md:text-2xl pt-5">
      Technologist, Mauritian, who loves front-end, UX design, Linux, & nature.
      <br />This is where I share my
      <NuxtLink class="underline hover:text-green-500" :to="{ path: '/blog' }">thoughts</NuxtLink>,
      <NuxtLink
        class="underline hover:text-green-500 pr-1"
        target="_blank"
        href="https://github.com/MrSunshyne?tab=repositories&q=&type=&language=&sort=stargazers"
        >experiments </NuxtLink
      >and
      <NuxtLink class="underline hover:text-green-500" :to="{ path: '/events' }">experiences</NuxtLink>.
    </p>

    <SharedProfileLinks />
  </div>
</template>
