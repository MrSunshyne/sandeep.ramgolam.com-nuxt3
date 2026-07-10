<template>
  <div class="contain pb-16 sm:pb-20">
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
            class="talk-row flex items-baseline gap-3 min-w-0 rounded-lg px-3 -mx-3 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
            :style="'--delay:' + index + 's'"
          >
            <div class="shrink-0 w-10 sm:w-12 text-xs sm:text-sm font-bold tracking-wide text-gray-500 dark:text-gray-400 uppercase">
              {{ new Date(talk.event_date).toLocaleDateString("en", { month: "short" }) }}
            </div>
            <h3 class="min-w-0 truncate text-base sm:text-lg font-bold" :title="talk.talk_title ?? talk.topic ?? talk.event_name">
              {{ talk.talk_title ?? talk.topic ?? talk.event_name }}
            </h3>
            <div class="min-w-0 truncate text-sm sm:text-base text-gray-600 dark:text-gray-400 hidden sm:block">
              {{ talk.event_name }}<span v-if="talk.location"> · {{ talk.location }}</span>
            </div>
            <div v-if="talk.links?.length" class="ml-auto shrink-0 hidden sm:flex items-baseline gap-3">
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
          </li>
        </ul>
      </section>
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
</style>
