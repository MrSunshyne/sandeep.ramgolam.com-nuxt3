<template>
  <div class="home-self-intro md:w-3/5 flex flex-col gap-6 md:gap-8">
    <h1
      class="text-3xl sm:text-4xl md:text-5xl tracking-tight text-left font-black w-full"
    >
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
        <NuxtLink class="hand-drawn-underline" to="/timeline/?type=project"
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
          events</NuxtLink
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
        class="role-item hand-drawn-underline-group group flex items-center gap-3"
      >
        <IconsCodersmuIcon
          alt="Coders.mu"
          class="role-icon w-10 h-10 shrink-0 dark:text-white text-black"
        />
        <span class="flex flex-col items-start text-left leading-snug">
          <span class="hand-drawn-underline-hover font-medium">Coders.mu</span>
          <span class="text-gray-500 dark:text-gray-400 text-sm"
            >Lead Organizer</span
          >
        </span>
      </a>
      <a
        href="https://livestorm.co"
        target="_blank"
        rel="noopener"
        class="role-item hand-drawn-underline-group group flex items-center gap-3"
      >
        <IconsLivestormIcon
          alt="Livestorm"
          class="role-icon w-10 h-10 shrink-0"
        />
        <span class="flex flex-col items-start text-left leading-snug">
          <span class="hand-drawn-underline-hover font-medium">Livestorm</span>
          <span class="text-gray-500 dark:text-gray-400 text-sm"
            >Sr. Front-end Engineer</span
          >
        </span>
      </a>
      <a
        href="https://biro.mu/"
        target="_blank"
        rel="noopener"
        class="role-item hand-drawn-underline-group group flex items-center gap-3"
      >
        <IconsBiroIcon
          alt="Biro.mu"
          class="role-icon w-10 h-10 shrink-0 text-[#1b2a3c] dark:text-white"
        />
        <span class="flex flex-col items-start text-left leading-snug">
          <span class="hand-drawn-underline-hover font-medium">Biro.mu</span>
          <span class="text-gray-500 dark:text-gray-400 text-sm"
            >Co-Founder</span
          >
        </span>
      </a>
      <a
        href="https://www.linkedin.com/company/upcodemu"
        target="_blank"
        rel="noopener"
        class="role-item hand-drawn-underline-group group flex items-center gap-3"
      >
        <IconsUpcodeIcon
          alt="Upcode"
          class="role-icon w-10 h-10 shrink-0 text-[#0031B0] dark:text-white"
        />
        <span class="flex flex-col items-start text-left leading-snug">
          <span class="hand-drawn-underline-hover font-medium">Upcode</span>
          <span class="text-gray-500 dark:text-gray-400 text-sm"
            >Co-Founder</span
          >
        </span>
      </a>
      <a
        href="https://developers.google.com/profile/u/112547642487044982413"
        target="_blank"
        rel="noopener"
        class="role-item hand-drawn-underline-group group flex items-center gap-3"
      >
        <IconsGdeIcon
          alt="Google Developer Expert"
          class="role-icon w-10 h-10 shrink-0 text-[#0031B0] dark:text-white"
        />
        <span class="flex flex-col items-start text-left leading-snug">
          <span class="hand-drawn-underline-hover font-medium"
            >Google Developer Expert</span
          >
          <span class="text-gray-500 dark:text-gray-400 text-sm">Web</span>
        </span>
      </a>
      <!-- Not a role: the way into everything above, in the order it happened -->
      <NuxtLink
        to="/timeline"
        class="role-item hand-drawn-underline-group group flex items-center gap-3"
      >
        <Icon
          name="solar:history-bold-duotone"
          class="role-icon w-10 h-10 shrink-0 text-black dark:text-white"
        />
        <span class="flex flex-col items-start text-left leading-snug">
          <span class="hand-drawn-underline-hover font-medium"
            >..and many more</span
          >
          <span class="text-gray-500 dark:text-gray-400 text-sm"
            >talks, blogs, and projects</span
          >
        </span>
      </NuxtLink>
    </div>

    <SharedProfileLinks />

    <div class="hidden md:block">
      <button
        type="button"
        title="Click to copy — yes, you can run that in your terminal"
        class="npx-pill inline-flex items-center gap-2.5 font-mono text-sm bg-gray-100 hover:bg-gray-200/80 dark:bg-slate-900/80 dark:hover:bg-slate-900 border border-gray-300/80 dark:border-slate-700 py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
        @click="copyNpxCommand"
      >
        <span
          class="text-green-600 dark:text-green-400 font-bold select-none"
          aria-hidden="true"
          >$</span
        >
        <span>npx sandeepramgolam</span>
        <span
          class="inline-flex items-center gap-1 text-xs font-sans font-medium"
          :class="
            copied
              ? 'text-green-600 dark:text-green-400'
              : 'text-gray-400 dark:text-gray-500'
          "
        >
          <Icon
            :name="copied ? 'lucide:check' : 'lucide:copy'"
            class="w-3.5 h-3.5"
          />
          <span v-if="copied">Copied</span>
        </span>
      </button>
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

const copied = ref(false);
let copyTimer: ReturnType<typeof setTimeout> | undefined;

async function copyNpxCommand() {
  try {
    await navigator.clipboard.writeText("npx sandeepramgolam");
    copied.value = true;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copied.value = false;
    }, 1800);
  } catch {
    // clipboard unavailable
  }
}

onBeforeUnmount(() => clearTimeout(copyTimer));
</script>

<style scoped>
.role-icon {
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.role-item:hover .role-icon,
.role-item:focus-visible .role-icon {
  transform: translateY(-2px) scale(1.06) rotate(-4deg);
}

html.sepia .npx-pill {
  background-color: #e8dec6;
  border-color: #cbb893;
}

html.sepia .npx-pill:hover {
  background-color: #dfd2b5;
}

@media (prefers-reduced-motion: reduce) {
  .role-icon {
    transition: none;
  }
  .role-item:hover .role-icon,
  .role-item:focus-visible .role-icon {
    transform: none;
  }
}
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
