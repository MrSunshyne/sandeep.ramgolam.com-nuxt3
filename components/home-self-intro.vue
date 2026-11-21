<template>
  <div class="home-self-intro md:w-3/5 flex flex-col gap-6 md:gap-8">
    <h1 class="text-2xl md:text-5xl text-left font-black w-full">
      Hi, I'm Sandeep
    </h1>

    <div class="flex flex-col gap-4 max-w-prose leading-relaxed md:text-lg">
      <p class="text-left">
        Technologist based in Mauritius, who loves front-end, UX design, Linux
        and nature.
        <br />This is where I share my
        <NuxtLink class="hand-drawn-underline" :to="{ path: '/blog' }"
          >thoughts</NuxtLink
        >,
        <NuxtLink class="hand-drawn-underline" :to="{ path: '/projects' }"
          >projects</NuxtLink
        >
        and
        <NuxtLink class="hand-drawn-underline" :to="{ path: '/events' }"
          >event</NuxtLink
        >
        participations.
      </p>

      <p class="text-left">
        <NuxtLink
          :to="{ path: '/events', query: { type: 'speaking' } }"
          class="hand-drawn-underline-hover"
        >
          Spoke at
          <span class="font-bold text-blue-500">{{ speakingCount }}</span>
        </NuxtLink>
        and
        <NuxtLink
          :to="{ path: '/events', query: { type: 'organizer' } }"
          class="hand-drawn-underline-hover"
        >
          organized
          <span class="font-bold text-purple-500">{{ organizerCount }}</span>
          events </NuxtLink
        >.
      </p>
    </div>

    <div
      class="intro-roles grid grid-cols-[repeat(auto-fit,minmax(15rem,max-content))] gap-4 md:text-base"
    >
      <a
        href="https://coders.mu"
        target="_blank"
        rel="noopener"
        class="hand-drawn-underline-group flex items-center gap-3"
      >
        <IconsCodersmuIcon
          alt="Coders.mu"
          class="w-10 h-10 dark:text-white text-black"
        />
        <span class="flex flex-col items-start text-left leading-snug">
          <span class="hand-drawn-underline-hover">Coders.mu</span>
          <span class="text-gray-500 text-sm">Lead Organizer</span>
        </span>
      </a>
      <a
        href="https://livestorm.co"
        target="_blank"
        rel="noopener"
        class="hand-drawn-underline-group flex items-center gap-3"
      >
        <IconsLivestormIcon alt="Livestorm" class="w-10 h-10" />
        <span class="flex flex-col items-start text-left leading-snug">
          <span class="hand-drawn-underline-hover">Livestorm</span>
          <span class="text-gray-500 text-sm">Sr. Front-end Engineer</span>
        </span>
      </a>
      <a
        href="https://biro.mu/"
        target="_blank"
        rel="noopener"
        class="hand-drawn-underline-group flex items-center gap-3"
      >
        <IconsBiroIcon
          alt="Biro.mu"
          class="w-10 h-10 text-[#1b2a3c] dark:text-white"
        />
        <span class="flex flex-col items-start text-left leading-snug">
          <span class="hand-drawn-underline-hover">Biro.mu</span>
          <span class="text-gray-500 text-sm">Co-Founder</span>
        </span>
      </a>
      <a
        href="https://www.linkedin.com/company/upcodemu"
        target="_blank"
        rel="noopener"
        class="hand-drawn-underline-group flex items-center gap-3"
      >
        <IconsUpcodeIcon
          alt="Upcode"
          class="w-10 h-10 text-[#0031B0] dark:text-white"
        />
        <span class="flex flex-col items-start text-left leading-snug">
          <span class="hand-drawn-underline-hover">Upcode</span>
          <span class="text-gray-500 text-sm">Co-Founder</span>
        </span>
      </a>
      <a
        href="https://developers.google.com/profile/u/112547642487044982413"
        target="_blank"
        rel="noopener"
        class="hand-drawn-underline-group flex items-center gap-3"
      >
        <IconsGdeIcon
          alt="Google Developer Expert"
          class="w-10 h-10 text-[#0031B0] dark:text-white"
        />
        <span class="flex flex-col items-start text-left leading-snug">
          <span class="hand-drawn-underline-hover"
            >Google Developer Expert</span
          >
          <span class="text-gray-500 text-sm">Web</span>
        </span>
      </a>
      <!-- Not a role: the way into everything above, in the order it happened -->
      <NuxtLink
        to="/timeline"
        class="hand-drawn-underline-group flex items-center gap-3"
      >
        <Icon
          name="solar:history-bold-duotone"
          class="w-10 h-10 text-black dark:text-white"
        />
        <span class="flex flex-col items-start text-left leading-snug">
          <span class="hand-drawn-underline-hover">My timeline</span>
          <span class="text-gray-500 text-sm"
            >Every talk, post and project</span
          >
        </span>
      </NuxtLink>
    </div>

    <SharedProfileLinks />

    <div class="hidden md:block">
      <div
        title="Yes, you can run that in your terminal"
        class="dark:bg-gray-900 bg-gray-200 py-1 px-2 rounded cursor-help inline-block"
      >
        $ npx sandeepramgolam
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Homepage: Only fetch event_type for counting - minimal payload
const { data: eventCounts } = await useAsyncData(
  "home-event-counts",
  async () => {
    const events = await queryCollection("events").select("event_type").all();

    return {
      speaking: events.filter((e) => e.event_type?.includes("speaking")).length,
      organizer: events.filter((e) => e.event_type?.includes("organizer"))
        .length,
    };
  },
);

const speakingCount = computed(() => eventCounts.value?.speaking ?? 0);
const organizerCount = computed(() => eventCounts.value?.organizer ?? 0);
</script>

<style scoped>
/* Laptops leave between 630px (a 1366x768 screen) and 660px (1280x800) of
   viewport once the browser chrome is accounted for, which the full spacing
   overshoots. The column gap holds at full size from 780px of viewport upwards
   and ramps down at 630px, so the intro, the bust and the dock share the first
   screen. The hero's own padding ramps over the same range.
   vh rather than dvh: a mobile toolbar sliding away must not make the spacing
   breathe mid-scroll. */
@media (min-width: 768px) {
  .home-self-intro {
    /* One rhythm unit. Everything else in the column is a multiple of it, so
       the whole block tightens together rather than piecemeal. */
    --rhythm: clamp(1rem, calc(1rem + (100vh - 630px) / 9.375), 2rem);
    gap: var(--rhythm);
  }

  /* The roles are one group, not six loose lines: more air around the group
     than inside it, and a gutter wide enough to read as two columns. */
  .intro-roles {
    row-gap: calc(var(--rhythm) * 0.75);
    column-gap: calc(var(--rhythm) * 2);
    margin-block: calc(var(--rhythm) * 0.5);
  }

  /* The headline carries more weight than a rhythm unit gives it. */
  .home-self-intro > h1 {
    margin-bottom: calc(var(--rhythm) * 0.25);
  }
}
</style>
