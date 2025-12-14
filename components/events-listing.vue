<script setup lang="ts">
import EventCard from "~/components/event-card.vue";

const { data: events } = await useAsyncData("events", () =>
  queryCollection("events").order("event_date", "DESC").all(),
);

defineProps({
  count: {
    type: Number,
    default: -1,
  },
});

const localEvents = ref(events);

type EventType =
  | "all"
  | "speaking"
  | "organizer"
  | "attendee"
  | "competition"
  | "jury"

const presentAsList: {
  [key in EventType]: string;
} = {
  all: "",
  speaking: "as a speaker",
  jury: "as a member of the jury",
  competition: "as a competitor",
  attendee: "as an attendee",
  organizer: "as an organizer",
};

const route = useRoute();
const router = useRouter();

const currentEventType: Ref<EventType> = ref(
  (route.query.type as EventType) || "all"
);
const currentYear: Ref<string> = ref((route.query.year as string) || "all");

const availableYears = computed(() => {
  if (!localEvents.value) return [];
  const years = localEvents.value.map((event) =>
    new Date(event.event_date).getFullYear().toString()
  );
  return [...new Set(years)].sort((a, b) => parseInt(b) - parseInt(a));
});

const eventsSortedByDate = computed(() => {
  if (localEvents.value && localEvents.value.length === 0) {
    return [];
  }

  return localEvents.value?.sort(
    (a, b) =>
      new Date(b.event_date).getTime() - new Date(a.event_date).getTime(),
  );
});

const showCurrentEventType = computed(() => {
  let filtered = eventsSortedByDate.value;

  if (currentEventType.value !== "all") {
    filtered = filtered?.filter((event) =>
      event.event_type?.includes(currentEventType.value)
    );
  }

  if (currentYear.value !== "all") {
    filtered = filtered?.filter(
      (event) =>
        new Date(event.event_date).getFullYear().toString() === currentYear.value
    );
  }

  return filtered;
  // if (currentEventType.value === "all") {
  //   return eventsSortedByDate.value;
  // } else {
  //   return eventsSortedByDate.value?.filter((event) =>
  //     event.event_type.includes(currentEventType.value),
  //   );
  // }
});

const presentAs = computed(() => {
  return presentAsList[currentEventType.value];
});

function setCurrentEventType(eventType: EventType) {
  const newType = currentEventType.value === eventType ? "all" : eventType;
  currentEventType.value = newType;
  updateQuery();
}

function setCurrentYear(year: string) {
  const newYear = currentYear.value === year ? "all" : year;
  currentYear.value = newYear;
  updateQuery();
}

function updateQuery() {
  router.push({
    query: {
      ...route.query,
      type: currentEventType.value === "all" ? undefined : currentEventType.value,
      year: currentYear.value === "all" ? undefined : currentYear.value,
    },
  });
}
</script>

<template>
  <div class="">
    <template v-if="count === -1">
      <h1 class="page-title">Events</h1>
      <p class="page-subtitle">
        <span class="font-bold text-indigo-500">{{
          showCurrentEventType?.length || 0
        }}</span>
        events I was involved in
        <span :class="currentEventType">{{ presentAs }}</span>
      </p>
    </template>
    <template v-else>
      <h2 class="text-3xl font-black pt-10 text-center">Events</h2>
      <p class="text-md text-gray-700 dark:text-gray-300 text-center">
        <span class="font-bold text-indigo-500">{{
          showCurrentEventType?.length || 0
        }}</span>
        event(s) I was involved in
        <span :class="currentEventType">{{ presentAs }}</span>
      </p>
    </template>
    <div class="flex flex-wrap justify-center sm:justify-start my-4 gap-2">
      <button
        class="pill-hand-drawn"
        @click="setCurrentYear('all')"
      >
        <HandDrawnShape
          variant="pill"
          :hover-morph="true"
          :selected="currentYear === 'all'"
          :color="currentYear === 'all' ? undefined : '#d1d5db'"
          :stroke-width="currentYear === 'all' ? 2.5 : 1.5"
        />
        <span class="pill-text">All Years</span>
      </button>
      <button
        v-for="year in availableYears"
        :key="year"
        class="pill-hand-drawn"
        @click="setCurrentYear(year)"
      >
        <HandDrawnShape
          variant="pill"
          :hover-morph="true"
          :selected="currentYear === year"
          :color="currentYear === year ? undefined : '#d1d5db'"
          :stroke-width="currentYear === year ? 2.5 : 1.5"
        />
        <span class="pill-text">{{ year }}</span>
      </button>
    </div>
    <div class="flex flex-wrap justify-center sm:justify-start my-4 gap-2">
      <button
        class="pill-hand-drawn"
        @click="setCurrentEventType('all')"
      >
        <HandDrawnShape
          variant="pill"
          :hover-morph="true"
          :selected="currentEventType === 'all'"
          :color="currentEventType === 'all' ? undefined : '#d1d5db'"
          :stroke-width="currentEventType === 'all' ? 2.5 : 1.5"
        />
        <span class="pill-text">Show All</span>
      </button>
      <button
        class="pill-hand-drawn"
        @click="setCurrentEventType('speaking')"
      >
        <HandDrawnShape
          variant="pill"
          :hover-morph="true"
          :selected="currentEventType === 'speaking'"
          :color="currentEventType === 'speaking' ? '#3b82f6' : '#d1d5db'"
          :stroke-width="currentEventType === 'speaking' ? 2.5 : 1.5"
        />
        <span class="pill-text" :class="{ 'text-blue-500': currentEventType === 'speaking' }">Speaking</span>
      </button>
      <button
        class="pill-hand-drawn"
        @click="setCurrentEventType('attendee')"
      >
        <HandDrawnShape
          variant="pill"
          :hover-morph="true"
          :selected="currentEventType === 'attendee'"
          :color="currentEventType === 'attendee' ? '#22c55e' : '#d1d5db'"
          :stroke-width="currentEventType === 'attendee' ? 2.5 : 1.5"
        />
        <span class="pill-text" :class="{ 'text-green-500': currentEventType === 'attendee' }">Attendee</span>
      </button>
      <button
        class="pill-hand-drawn"
        @click="setCurrentEventType('organizer')"
      >
        <HandDrawnShape
          variant="pill"
          :hover-morph="true"
          :selected="currentEventType === 'organizer'"
          :color="currentEventType === 'organizer' ? '#a855f7' : '#d1d5db'"
          :stroke-width="currentEventType === 'organizer' ? 2.5 : 1.5"
        />
        <span class="pill-text" :class="{ 'text-purple-500': currentEventType === 'organizer' }">Organizer</span>
      </button>
      <button
        class="pill-hand-drawn"
        @click="setCurrentEventType('competition')"
      >
        <HandDrawnShape
          variant="pill"
          :hover-morph="true"
          :selected="currentEventType === 'competition'"
          :color="currentEventType === 'competition' ? '#ef4444' : '#d1d5db'"
          :stroke-width="currentEventType === 'competition' ? 2.5 : 1.5"
        />
        <span class="pill-text" :class="{ 'text-red-500': currentEventType === 'competition' }">Competition</span>
      </button>
      <button
        class="pill-hand-drawn"
        @click="setCurrentEventType('jury')"
      >
        <HandDrawnShape
          variant="pill"
          :hover-morph="true"
          :selected="currentEventType === 'jury'"
          :color="currentEventType === 'jury' ? '#eab308' : '#d1d5db'"
          :stroke-width="currentEventType === 'jury' ? 2.5 : 1.5"
        />
        <span class="pill-text" :class="{ 'text-yellow-500': currentEventType === 'jury' }">Jury</span>
      </button>
    </div>

    <!-- {{ showCurrentEventType }} -->

    <div
      v-if="showCurrentEventType && showCurrentEventType.length > 0"
      class="event-wrapper"
    >
      <template
        v-for="(event, index) in showCurrentEventType.slice(0, count)"
        :key="event.topic + event.event_date"
      >
        <EventCard
          v-if="event?.published"
          :event="event"
          :class="event.event_type?.[0]"
          class="event-box"
          :style="'--delay:' + index + 's'"
        />
      </template>
    </div>
    <div v-else class="event-wrapper pt-10 text-3xl text-center">
      No events in the {{ currentEventType }} category
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.event-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 40px;
  /* background: #16181e; */
}

.event-page {
  --competition-color: var(--color-red-500);
  --speaking-color: var(--color-blue-500);
  --jury-color: var(--color-yellow-500);
  --attendee-color: var(--color-green-500);
  --organizer-color: var(--color-purple-500);
}

.event-box {
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

@media (min-width: 640px) {
  .event-wrapper {
    grid-gap: 40px;
  }
}

/* Hand-drawn pill styles */
.pill-hand-drawn {
  position: relative;
  padding: 8px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  min-width: 80px;
}

.pill-text {
  position: relative;
  z-index: 1;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.3s ease-out;
  color: #6b7280;
}

:deep(.dark) .pill-text,
.dark .pill-text {
  color: #9ca3af;
}

</style>
