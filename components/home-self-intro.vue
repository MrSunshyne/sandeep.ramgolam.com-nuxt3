<template>
  <div class="md:w-2/3 flex flex-col gap-8">
    <h1 class="text-2xl md:text-5xl text-left font-black w-full">Hi, I'm Sandeep</h1>
    <div class="mb-4 flex flex-col gap-4">
      <div class="flex flex-col gap-4 md:text-xl">
        <div class="flex gap-2">
          <IconsCodersmuIcon alt="Coders.mu" class="w-6 md:w-8 h-6 md:h-8 dark:text-white text-black" />
          <a href="https://coders.mu" target="_blank" class="hand-drawn-underline-hover">Coders.mu</a>
          <span class="text-gray-500">Lead Organizer</span>
        </div>
        <div class="flex gap-2">
          <IconsLivestormIcon alt="Livestorm" class="w-6 md:w-8 h-6 md:h-8" />
          <a href="https://livestorm.co"
            target="_blank" class="hand-drawn-underline-hover">Livestorm</a>
          <span class="text-gray-500">Sr. Front-end Engineer</span>
        </div>
        <div class="flex gap-2">
          <IconsUpcodeIcon alt="Upcode" class="w-6 md:w-8 h-6 md:h-8 text-[#0031B0] dark:text-white" />
          <a href="https://www.linkedin.com/company/upcodemu"
            target="_blank" class="hand-drawn-underline-hover">Upcode</a>
          <span class="text-gray-500">Co-Founder</span>
        </div>
        <div class="flex gap-2">
          <IconsGdeIcon alt="Upcode" class="w-6 md:w-8 h-6 md:h-8 text-[#0031B0] dark:text-white" />
          <a href="https://developers.google.com/profile/u/112547642487044982413"
            target="_blank" class="hand-drawn-underline-hover">Google Developer Expert</a>
          <span class="text-gray-500">Web</span>
        </div>
      </div>

      <p class="inline sm:w-full text-left">
        Technologist based in Mauritius, who loves front-end, UX design, Linux, & nature.
        <br />This is where I share my
        <NuxtLink class="hand-drawn-underline" :to="{ path: '/blog' }">thoughts</NuxtLink>,
        <NuxtLink class="hand-drawn-underline pr-1" target="_blank"
          href="https://github.com/MrSunshyne?tab=repositories&q=&type=&language=&sort=stargazers">experiments
        </NuxtLink>and
        <NuxtLink class="hand-drawn-underline" :to="{ path: '/events' }">experiences</NuxtLink>.
      </p>

      <p class="inline sm:w-full text-left">
        <NuxtLink :to="{ path: '/events', query: { type: 'speaking' } }" class="hand-drawn-underline-hover">
          Spoke at <span class="font-bold text-blue-500">{{ speakingCount }}</span>
        </NuxtLink>
        and
        <NuxtLink :to="{ path: '/events', query: { type: 'organizer' } }" class="hand-drawn-underline-hover">
          organized <span class="font-bold text-purple-500">{{ organizerCount }}</span> events
        </NuxtLink>.
      </p>
    </div>

    <SharedProfileLinks />

    <div class="hidden md:block">
      <div title="Yes, you can run that in your terminal"
        class="dark:bg-gray-900 bg-gray-200 py-1 px-2 mt-2 rounded cursor-help inline-block">
        $ npx sandeepramgolam
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Homepage: Only fetch event_type for counting - minimal payload
const { data: eventCounts } = await useAsyncData("home-event-counts", async () => {
  const events = await queryCollection("events")
    .select("event_type")
    .all();

  return {
    speaking: events.filter(e => e.event_type?.includes('speaking')).length,
    organizer: events.filter(e => e.event_type?.includes('organizer')).length
  };
});

const speakingCount = computed(() => eventCounts.value?.speaking ?? 0);
const organizerCount = computed(() => eventCounts.value?.organizer ?? 0);
</script>

