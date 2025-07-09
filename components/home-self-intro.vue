<template>
  <div class="md:w-2/3 flex flex-col gap-4">
    <h1 class="text-2xl md:text-5xl font-black w-full">Hi, I'm Sandeep</h1>
    <div class="mb-4 flex flex-col gap-2">
      <div class="flex flex-col gap-2 text-xl">
        <div class="flex items-center gap-2">
          <IconsCodersmuIcon alt="Coders.mu" class="w-8 h-8 dark:text-white text-black" />
          <a href="https://coders.mu" target="_blank">Coders.mu</a>
          <span class="text-gray-500">Lead Organizer</span>
        </div>
        <div class="flex items-center gap-2">
          <IconsLivestormIcon alt="Livestorm" class="w-8 h-8" />
          <a href="https://livestorm.co"
            target="_blank">Livestorm</a>
          <span class="text-gray-500">Senior Front-end Engineer</span>
        </div>
        <div class="flex items-center gap-2">
          <IconsUpcodeIcon alt="Upcode" class="w-8 h-8 text-[#0031B0] dark:text-white" />
          <a href="https://www.linkedin.com/company/upcodemu"
            target="_blank">Upcode</a>
          <span class="text-gray-500">Co-Founder</span>
        </div>
      </div>

      <p class="inline sm:w-full ">
        Technologist based in Mauritius, who loves front-end, UX design, Linux, & nature.
        <br />This is where I share my
        <NuxtLink class="underline " :to="{ path: '/blog' }">thoughts</NuxtLink>,
        <NuxtLink class="underline  pr-1" target="_blank"
          href="https://github.com/MrSunshyne?tab=repositories&q=&type=&language=&sort=stargazers">experiments
        </NuxtLink>and
        <NuxtLink class="underline " :to="{ path: '/events' }">experiences</NuxtLink>.
      </p>



    </div>


    <SharedProfileLinks />

    <div>
      <div title="Yes, you can run that in your terminal"
        class="dark:bg-gray-900 bg-gray-200 py-1 px-2 mt-2 rounded cursor-help inline-block">
        $ npx sandeepramgolam
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  @apply font-medium underline underline-offset-4 decoration-green-200 hover:decoration-green-500 dark:decoration-slate-500 dark:hover:decoration-slate-200;
}
</style>