<template>
  <div class="md:w-2/3 flex flex-col gap-4">
    <h1 class="text-2xl md:text-5xl font-black w-full">Hi, I'm Sandeep</h1>
    <div class="mb-4 flex flex-col gap-2">
      <div class="flex flex-col gap-2 text-2xl">
        <div>
          <a class="font-medium underline hover:text-green-500" href="https://coders.mu" target="_blank">Coders.mu</a> -
          Lead Organizer
        </div>
        <div>
          <a class="font-medium underline hover:text-green-500" href="https://livestorm.co"
            target="_blank">Livestorm</a> - Senior Front-end Engineer
        </div>
        <div>
          <a class="font-medium underline hover:text-green-500" href="https://www.linkedin.com/company/upcodemu"
            target="_blank">Upcode</a> - Co-Founder
        </div>
      </div>

      <p class="inline sm:w-full ">
        Technologist based in Mauritius, who loves front-end, UX design, Linux, & nature.
        <br />This is where I share my
        <NuxtLink class="underline hover:text-green-500" :to="{ path: '/blog' }">thoughts</NuxtLink>,
        <NuxtLink class="underline hover:text-green-500 pr-1" target="_blank"
          href="https://github.com/MrSunshyne?tab=repositories&q=&type=&language=&sort=stargazers">experiments
        </NuxtLink>and
        <NuxtLink class="underline hover:text-green-500" :to="{ path: '/events' }">experiences</NuxtLink>.
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
