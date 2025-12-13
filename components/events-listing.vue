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
        :class="currentYear === 'all' ? 'active-year' : ''"
        class="pill-hand-drawn"
        @click="setCurrentYear('all')"
      >
        <svg class="pill-border" viewBox="0 0 120 50" fill="none" preserveAspectRatio="none">
          <path class="pill-path" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M8 4 Q3 3 2 8 Q1 12 2 20 T2 38 Q2 45 8 46 L15 46 Q35 47 60 46 T105 47 L112 46 Q117 45 118 40 Q119 35 118 25 T118 10 Q118 5 112 4 L100 4 Q75 3 50 4 T15 3 Z"/>
        </svg>
        <span class="pill-text">All Years</span>
      </button>
      <button
        v-for="year in availableYears"
        :key="year"
        :class="currentYear === year ? 'active-year' : ''"
        class="pill-hand-drawn"
        @click="setCurrentYear(year)"
      >
        <svg class="pill-border" viewBox="0 0 120 50" fill="none" preserveAspectRatio="none">
          <path class="pill-path" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M8 4 Q3 3 2 8 Q1 12 2 20 T2 38 Q2 45 8 46 L15 46 Q35 47 60 46 T105 47 L112 46 Q117 45 118 40 Q119 35 118 25 T118 10 Q118 5 112 4 L100 4 Q75 3 50 4 T15 3 Z"/>
        </svg>
        <span class="pill-text">{{ year }}</span>
      </button>
    </div>
    <div class="flex flex-wrap justify-center sm:justify-start my-4 gap-2">
      <button
        :class="currentEventType === 'all' ? 'active' : ''"
        class="pill-hand-drawn"
        @click="setCurrentEventType('all')"
      >
        <svg class="pill-border" viewBox="0 0 120 50" fill="none" preserveAspectRatio="none">
          <path class="pill-path" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M8 4 Q3 3 2 8 Q1 12 2 20 T2 38 Q2 45 8 46 L15 46 Q35 47 60 46 T105 47 L112 46 Q117 45 118 40 Q119 35 118 25 T118 10 Q118 5 112 4 L100 4 Q75 3 50 4 T15 3 Z"/>
        </svg>
        <span class="pill-text">Show All</span>
      </button>
      <button
        :class="currentEventType === 'speaking' ? 'active' : ''"
        class="pill-hand-drawn speaking"
        @click="setCurrentEventType('speaking')"
      >
        <svg class="pill-border" viewBox="0 0 120 50" fill="none" preserveAspectRatio="none">
          <path class="pill-path" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M8 4 Q3 3 2 8 Q1 12 2 20 T2 38 Q2 45 8 46 L15 46 Q35 47 60 46 T105 47 L112 46 Q117 45 118 40 Q119 35 118 25 T118 10 Q118 5 112 4 L100 4 Q75 3 50 4 T15 3 Z"/>
        </svg>
        <span class="pill-text">Speaking</span>
      </button>
      <button
        :class="currentEventType === 'attendee' ? 'active' : ''"
        class="pill-hand-drawn attendee"
        @click="setCurrentEventType('attendee')"
      >
        <svg class="pill-border" viewBox="0 0 120 50" fill="none" preserveAspectRatio="none">
          <path class="pill-path" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M8 4 Q3 3 2 8 Q1 12 2 20 T2 38 Q2 45 8 46 L15 46 Q35 47 60 46 T105 47 L112 46 Q117 45 118 40 Q119 35 118 25 T118 10 Q118 5 112 4 L100 4 Q75 3 50 4 T15 3 Z"/>
        </svg>
        <span class="pill-text">Attendee</span>
      </button>
      <button
        :class="currentEventType === 'organizer' ? 'active' : ''"
        class="pill-hand-drawn organizer"
        @click="setCurrentEventType('organizer')"
      >
        <svg class="pill-border" viewBox="0 0 120 50" fill="none" preserveAspectRatio="none">
          <path class="pill-path" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M8 4 Q3 3 2 8 Q1 12 2 20 T2 38 Q2 45 8 46 L15 46 Q35 47 60 46 T105 47 L112 46 Q117 45 118 40 Q119 35 118 25 T118 10 Q118 5 112 4 L100 4 Q75 3 50 4 T15 3 Z"/>
        </svg>
        <span class="pill-text">Organizer</span>
      </button>
      <button
        :class="currentEventType === 'competition' ? 'active' : ''"
        class="pill-hand-drawn competition"
        @click="setCurrentEventType('competition')"
      >
        <svg class="pill-border" viewBox="0 0 120 50" fill="none" preserveAspectRatio="none">
          <path class="pill-path" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M8 4 Q3 3 2 8 Q1 12 2 20 T2 38 Q2 45 8 46 L15 46 Q35 47 60 46 T105 47 L112 46 Q117 45 118 40 Q119 35 118 25 T118 10 Q118 5 112 4 L100 4 Q75 3 50 4 T15 3 Z"/>
        </svg>
        <span class="pill-text">Competition</span>
      </button>
      <button
        :class="currentEventType === 'jury' ? 'active' : ''"
        class="pill-hand-drawn jury"
        @click="setCurrentEventType('jury')"
      >
        <svg class="pill-border" viewBox="0 0 120 50" fill="none" preserveAspectRatio="none">
          <path class="pill-path" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M8 4 Q3 3 2 8 Q1 12 2 20 T2 38 Q2 45 8 46 L15 46 Q35 47 60 46 T105 47 L112 46 Q117 45 118 40 Q119 35 118 25 T118 10 Q118 5 112 4 L100 4 Q75 3 50 4 T15 3 Z"/>
        </svg>
        <span class="pill-text">Jury</span>
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

.pill-border {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.pill-path {
  stroke: currentColor;
  fill: transparent;
  color: #d1d5db;
  transition: color 0.3s ease-out, fill 0.3s ease-out, d 0.3s ease-out;
}

:deep(.dark) .pill-path,
.dark .pill-path {
  color: #4b5563;
}

.pill-text {
  position: relative;
  z-index: 1;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.3s ease-out;
}

.pill-hand-drawn:hover .pill-path {
  d: path("M6 3 Q2 2 1 7 Q0 13 1 22 T1 40 Q1 47 7 48 L18 47 Q40 49 62 47 T108 49 L114 48 Q119 47 120 42 Q121 36 120 26 T120 9 Q120 4 114 3 L95 4 Q70 2 45 4 T12 2 Z");
}

/* Active year pills - filled */
.pill-hand-drawn.active-year .pill-path {
  color: var(--color-indigo-500);
  fill: var(--color-indigo-100);
}
:deep(.dark) .pill-hand-drawn.active-year .pill-path,
.dark .pill-hand-drawn.active-year .pill-path {
  fill: rgba(99, 102, 241, 0.2);
}
.pill-hand-drawn.active-year .pill-text {
  color: var(--color-indigo-600);
  font-weight: 600;
}

/* Active "Show All" pill */
.pill-hand-drawn.active .pill-path {
  color: #6b7280;
  fill: #f3f4f6;
}
:deep(.dark) .pill-hand-drawn.active .pill-path,
.dark .pill-hand-drawn.active .pill-path {
  fill: rgba(107, 114, 128, 0.2);
}
.pill-hand-drawn.active .pill-text {
  font-weight: 600;
}

/* Event type pills with colors */
.pill-hand-drawn.speaking .pill-path {
  color: var(--speaking-color);
}
.pill-hand-drawn.speaking .pill-text {
  color: var(--speaking-color);
}
.pill-hand-drawn.speaking.active .pill-path {
  fill: rgba(59, 130, 246, 0.15);
}

.pill-hand-drawn.jury .pill-path {
  color: var(--jury-color);
}
.pill-hand-drawn.jury .pill-text {
  color: var(--jury-color);
}
.pill-hand-drawn.jury.active .pill-path {
  fill: rgba(234, 179, 8, 0.15);
}

.pill-hand-drawn.competition .pill-path {
  color: var(--competition-color);
}
.pill-hand-drawn.competition .pill-text {
  color: var(--competition-color);
}
.pill-hand-drawn.competition.active .pill-path {
  fill: rgba(239, 68, 68, 0.15);
}

.pill-hand-drawn.attendee .pill-path {
  color: var(--attendee-color);
}
.pill-hand-drawn.attendee .pill-text {
  color: var(--attendee-color);
}
.pill-hand-drawn.attendee.active .pill-path {
  fill: rgba(34, 197, 94, 0.15);
}

.pill-hand-drawn.organizer .pill-path {
  color: var(--organizer-color);
}
.pill-hand-drawn.organizer .pill-text {
  color: var(--organizer-color);
}
.pill-hand-drawn.organizer.active .pill-path {
  fill: rgba(168, 85, 247, 0.15);
}

</style>
