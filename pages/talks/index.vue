<template>
  <div class="contain pb-16 sm:pb-20">
    <div class="max-w-3xl mx-auto">
      <h1 class="font-bold tracking-tight text-3xl sm:text-4xl mb-2">Talks</h1>
      <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-12">
        {{ talks?.length }} talks I have given at conferences and meetups since {{ firstYear }}
      </p>

      <div class="space-y-10 sm:space-y-12">
        <section v-for="group in talksByYear" :key="group.year">
          <h2 class="text-xl sm:text-2xl font-bold tracking-tight mb-3 sm:mb-4">
            {{ group.year }}
          </h2>
          <ul class="flex flex-col gap-1">
            <li
              v-for="(talk, index) in group.talks"
              :key="talk.event_date + talk.event_name"
              class="talk-row rounded-lg px-3 -mx-3 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
              :style="'--delay:' + index + 's'"
            >
              <div class="flex items-baseline gap-3 min-w-0">
                <div class="shrink-0 w-10 sm:w-12 text-xs sm:text-sm font-bold tracking-wide text-gray-500 dark:text-gray-400 uppercase">
                  {{ new Date(talk.event_date).toLocaleDateString("en", { month: "short" }) }}
                </div>
                <h3
                  class="min-w-0 text-base sm:text-lg font-bold"
                  :title="talk.talk_title ?? talk.topic ?? talk.event_name"
                >
                  <!-- single link: the title is the link; multiple: drawer below -->
                  <a
                    v-if="talk.links?.length === 1"
                    :href="talk.links[0].url"
                    target="_blank"
                    rel="noopener"
                    class="title-link flex items-center gap-1 min-w-0 transition-colors hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    <span class="truncate">{{ talk.talk_title ?? talk.topic ?? talk.event_name }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="external-icon shrink-0 text-gray-400 dark:text-gray-500 transition-colors"
                      aria-hidden="true"
                    >
                      <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </a>
                  <span v-else class="block truncate">{{ talk.talk_title ?? talk.topic ?? talk.event_name }}</span>
                </h3>
                <div class="min-w-0 truncate text-sm sm:text-base text-gray-600 dark:text-gray-400 hidden sm:block">
                  {{ talk.event_name }}<span v-if="talk.location"> · {{ talk.location }}</span>
                </div>
              </div>

              <!-- Links drawer: expands under the row on hover / keyboard focus -->
              <div v-if="talk.links?.length > 1" class="links-reveal hidden sm:grid">
                <div class="links-clip">
                  <div class="links-row flex flex-wrap gap-x-4 gap-y-1 sm:pl-[60px] pt-1 pb-0.5">
                    <a
                      v-for="link in talk.links"
                      :key="link.url"
                      :href="link.url"
                      target="_blank"
                      rel="noopener"
                      class="text-xs font-bold uppercase tracking-wider text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors whitespace-nowrap"
                    >
                      {{ link.title }}
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: talks } = await useAsyncData("talks-list", async () => {
  const events = await queryCollection("events")
    .select("event_date", "event_name", "event_type", "topic", "talk_title", "location", "published", "links")
    .all();

  return events
    .filter(e => e.published !== false && e.event_type?.includes("speaking"))
    .sort(
      (a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    );
});

// talks are already sorted newest-first, so groups come out in order
const talksByYear = computed(() => {
  const groups: { year: number; talks: NonNullable<typeof talks.value> }[] = [];
  for (const talk of talks.value ?? []) {
    const year = new Date(talk.event_date).getFullYear();
    const last = groups[groups.length - 1];
    if (last?.year === year) last.talks.push(talk);
    else groups.push({ year, talks: [talk] });
  }
  return groups;
});

const firstYear = computed(() => {
  const last = talks.value?.[talks.value.length - 1];
  return last ? new Date(last.event_date).getFullYear() : "";
});

useHead({
  title: "Talks | Sandeep Ramgolam",
  meta: [
    {
      name: "description",
      content: "All the conference and meetup talks I have given over the years",
    },
    { property: "og:type", content: "page" },
    { property: "og:title", content: "Talks | Sandeep Ramgolam" },
    {
      property: "og:description",
      content: "All the conference and meetup talks I have given over the years",
    },
  ],
});

defineOgImage("GenericTemplate");
</script>

<style scoped>
/* Same staggered reveal as the events page */
.talk-row {
  opacity: 0;
  transform: translateY(10px);

  animation: reveal 0.5s ease-out 1 forwards;
  --multiplier: 0.05;
  animation-delay: calc(var(--delay) * var(--multiplier));
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth expand-to-auto-height via the grid 0fr -> 1fr transition */
.links-reveal {
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s ease;
}

.links-clip {
  overflow: hidden;
  min-height: 0;
}

.links-row {
  opacity: 0;
  transition: opacity 0.25s ease;
}

.talk-row:hover .links-reveal,
.talk-row:focus-within .links-reveal {
  grid-template-rows: 1fr;
}

.talk-row:hover .links-row,
.talk-row:focus-within .links-row {
  opacity: 1;
  transition-delay: 0.08s;
}

.title-link:hover .external-icon {
  color: currentColor;
}

@media (prefers-reduced-motion: reduce) {
  .links-reveal,
  .links-row,
  .talk-row {
    transition: none;
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
