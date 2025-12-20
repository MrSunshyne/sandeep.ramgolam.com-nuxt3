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
  <div class="" :class="{ 'has-filter-dock': count === -1 }">
    <template v-if="count === -1">
      <h1 class="page-title">Events</h1>
      <p class="page-subtitle mb-8 sm:mb-4">
        <template v-if="currentYear !== 'all' && currentEventType !== 'all'">
          <span class="font-bold text-indigo-500">{{
            showCurrentEventType?.length || 0
          }}</span>
          {{ currentEventType }} event{{ showCurrentEventType?.length === 1 ? '' : 's' }} in {{ currentYear }}
        </template>
        <template v-else-if="currentYear !== 'all'">
          <span class="font-bold text-indigo-500">{{
            showCurrentEventType?.length || 0
          }}</span>
          event{{ showCurrentEventType?.length === 1 ? '' : 's' }} in {{ currentYear }}
        </template>
        <template v-else-if="currentEventType !== 'all'">
          <span class="font-bold text-indigo-500">{{
            showCurrentEventType?.length || 0
          }}</span>
          {{ currentEventType }} event{{ showCurrentEventType?.length === 1 ? '' : 's' }}
        </template>
        <template v-else>
          <span class="font-bold text-indigo-500">{{
            showCurrentEventType?.length || 0
          }}</span>
          event{{ showCurrentEventType?.length === 1 ? '' : 's' }} I was involved in
        </template>
      </p>
    </template>
    <template v-else>
      <h2 class="text-3xl font-black pt-10 text-center">Events</h2>
      <p class="text-md text-gray-700 dark:text-gray-300 text-center mb-8 sm:mb-4">
        <span class="font-bold text-indigo-500">{{
          showCurrentEventType?.length || 0
        }}</span>
        event{{ showCurrentEventType?.length === 1 ? '' : 's' }} I was involved in
        <span :class="currentEventType">{{ presentAs }}</span>
      </p>
    </template>
    <!-- Sticky bottom filters - only show on full events page -->
    <div v-if="count === -1" class="mobile-filter-dock">
      <!-- Hand-drawn top border -->
      <svg class="filter-dock-border" viewBox="0 0 1500 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M1491.35 5.34422C1195.69 0.634599 895.038 3.23955 598.639 2.39158C402.645 1.82423 206.636 0.457678 10.7838 0.000136838C4.91182 -0.0120643 0.0825118 0.793184 0.000956842 1.80587C-0.0770522 2.81856 5.63159 1.4878 11.5 1.5C207.331 1.95754 402.312 5.48455 598.285 6.0519C894.152 6.89988 1194.24 4.28881 1489.36 8.99233C1495.21 9.08384 1500.39 8.3457 1500.96 7.33911C1501.49 6.33252 1497.16 5.44183 1491.35 5.34422Z"
          stroke="currentColor"
          stroke-width="1.5"
          fill="none"
        />
      </svg>
      <!-- Year filters -->
      <div class="mobile-filter-scroll">
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
      <!-- Event type filters -->
      <div class="mobile-filter-scroll">
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
    </div>

    <!-- {{ showCurrentEventType }} -->

    <div
      v-if="showCurrentEventType && showCurrentEventType.length > 0"
      class="event-wrapper"
    >
      <template
        v-for="(event, index) in count === -1 ? showCurrentEventType : showCurrentEventType.slice(0, count)"
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

/* Only add bottom padding when filters are visible */
.has-filter-dock .event-wrapper {
  padding-bottom: 120px;
}

@media (min-width: 640px) {
  .has-filter-dock .event-wrapper {
    padding-bottom: 100px;
  }
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

/* Filter dock styles */
.mobile-filter-dock {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.98) 85%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
  padding: 20px 0 24px 0;
  box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

:deep(.dark) .mobile-filter-dock,
.dark .mobile-filter-dock {
  background: linear-gradient(to top, rgba(30, 41, 59, 0.98) 85%, rgba(30, 41, 59, 0) 100%);
  box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.4);
}

.filter-dock-border {
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  width: 100%;
  height: 14px;
  color: #9ca3af;
  pointer-events: none;
  opacity: 0.8;
}

:deep(.dark) .filter-dock-border,
.dark .filter-dock-border {
  color: #6b7280;
  opacity: 0.9;
}

/* Desktop improvements - minimal and subtle */
@media (min-width: 640px) {
  .mobile-filter-dock {
    padding: 10px 0 14px 0;
    gap: 6px;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.75) 90%, rgba(255, 255, 255, 0) 100%);
    backdrop-filter: blur(4px);
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.02);
    transition: all 0.3s ease-out;
  }

  :deep(.dark) .mobile-filter-dock,
  .dark .mobile-filter-dock {
    background: linear-gradient(to top, rgba(30, 41, 59, 0.75) 90%, rgba(30, 41, 59, 0) 100%);
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
  }

  .mobile-filter-dock:hover {
    padding: 16px 0 20px 0;
    gap: 10px;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.95) 85%, rgba(255, 255, 255, 0) 100%);
    backdrop-filter: blur(10px);
    box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.06);
  }

  :deep(.dark) .mobile-filter-dock:hover,
  .dark .mobile-filter-dock:hover {
    background: linear-gradient(to top, rgba(30, 41, 59, 0.95) 85%, rgba(30, 41, 59, 0) 100%);
    box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.3);
  }

  .mobile-filter-scroll {
    justify-content: center;
    max-width: 1280px;
    margin: 0 auto;
    opacity: 0.5;
    transition: opacity 0.3s ease-out;
  }

  .mobile-filter-dock:hover .mobile-filter-scroll {
    opacity: 1;
  }

  .filter-dock-border {
    height: 16px;
    opacity: 0.3;
    transition: opacity 0.3s ease-out;
  }

  .mobile-filter-dock:hover .filter-dock-border {
    opacity: 0.7;
  }

  :deep(.dark) .filter-dock-border,
  .dark .filter-dock-border {
    opacity: 0.4;
  }

  :deep(.dark) .mobile-filter-dock:hover .filter-dock-border,
  .dark .mobile-filter-dock:hover .filter-dock-border {
    opacity: 0.8;
  }

  /* Make pill buttons smaller on desktop when not hovering */
  .pill-hand-drawn {
    transition: all 0.3s ease-out;
  }
}

.mobile-filter-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 4px 20px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.mobile-filter-scroll::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.mobile-filter-scroll .pill-hand-drawn {
  flex-shrink: 0;
  white-space: nowrap;
}

/* Desktop - allow wrapping when centered */
@media (min-width: 1024px) {
  .mobile-filter-scroll {
    flex-wrap: wrap;
    justify-content: center;
    padding: 4px 40px;
    gap: 12px;
  }
}

</style>
