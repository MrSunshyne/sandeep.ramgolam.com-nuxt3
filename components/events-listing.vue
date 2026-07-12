<script setup lang="ts">
import EventCard from "~/components/event-card.vue";
import EventRow from "~/components/event-row.vue";

const props = defineProps({
  count: {
    type: Number,
    default: -1,
  },
});

// Use different cache keys and queries based on context
// Homepage (count > 0): lightweight query with limit
// Events page (count === -1): full query for filtering
const isHomepage = props.count > 0;

const { data: events } = await useAsyncData(
  isHomepage ? "home-events" : "events",
  () => {
    const query = queryCollection("events").order("event_date", "DESC");

    if (isHomepage) {
      // Homepage: only fetch published events, limited count
      return query
        .where("published", "=", true)
        .limit(props.count)
        .all();
    }

    // Events page: fetch all for filtering
    return query.all();
  }
);

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

  if (!isHomepage) {
    filtered = filtered?.filter((event) => event?.published);
  }

  if (currentEventType.value !== "all") {
    filtered = filtered?.filter((event) =>
      event.event_type?.includes(currentEventType.value)
    );
  }

  return filtered;
});

// Events page: group the (sorted, filtered) events by year, newest first
const eventsByYear = computed(() => {
  const groups: { year: number; events: NonNullable<typeof showCurrentEventType.value> }[] = [];
  for (const event of showCurrentEventType.value ?? []) {
    const year = new Date(event.event_date).getFullYear();
    const last = groups[groups.length - 1];
    if (last?.year === year) last.events.push(event);
    else groups.push({ year, events: [event] });
  }
  return groups;
});

const presentAs = computed(() => {
  return presentAsList[currentEventType.value];
});

const filterOptions: { type: EventType; label: string; color?: string; textClass?: string }[] = [
  { type: "all", label: "Show All" },
  { type: "speaking", label: "Speaking", color: "#3b82f6", textClass: "text-blue-500" },
  { type: "attendee", label: "Attendee", color: "#22c55e", textClass: "text-green-500" },
  { type: "organizer", label: "Organizer", color: "#a855f7", textClass: "text-purple-500" },
  { type: "competition", label: "Competition", color: "#ef4444", textClass: "text-red-500" },
  { type: "jury", label: "Jury", color: "#eab308", textClass: "text-yellow-500" },
];

function setCurrentEventType(eventType: EventType) {
  const newType = currentEventType.value === eventType ? "all" : eventType;
  currentEventType.value = newType;
  router.push({
    query: {
      ...route.query,
      type: currentEventType.value === "all" ? undefined : currentEventType.value,
    },
  });
}
</script>

<template>
  <div :class="count === -1 ? 'max-w-3xl mx-auto' : ''">
    <template v-if="count === -1">
      <h1 class="font-bold tracking-tight text-3xl sm:text-4xl mb-2">Events</h1>
      <p class="page-subtitle mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
        <span class="font-bold text-indigo-500 dark:text-indigo-400">{{
          showCurrentEventType?.length || 0
        }}</span>
        <template v-if="currentEventType !== 'all'">
          {{ currentEventType }} event{{ showCurrentEventType?.length === 1 ? '' : 's' }}
        </template>
        <template v-else>
          event{{ showCurrentEventType?.length === 1 ? '' : 's' }} I was involved in
        </template>
      </p>

      <!-- Event type filters -->
      <div class="flex flex-wrap gap-x-1.5 gap-y-2 sm:gap-2 mt-6 sm:mt-8 mb-10 sm:mb-12">
        <button
          v-for="option in filterOptions"
          :key="option.type"
          class="pill-hand-drawn"
          @click="setCurrentEventType(option.type)"
        >
          <HandDrawnShape
            variant="pill"
            :hover-morph="true"
            :selected="currentEventType === option.type"
            :color="currentEventType === option.type ? option.color : '#d1d5db'"
            :stroke-width="currentEventType === option.type ? 2.5 : 1.5"
          />
          <span
            class="pill-text"
            :class="currentEventType === option.type && option.textClass ? option.textClass : ''"
          >{{ option.label }}</span>
        </button>
      </div>
    </template>
    <template v-else>
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold pt-8 sm:pt-10 text-center mb-3 sm:mb-4">Events</h2>
      <p class="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center mb-8 sm:mb-12 leading-relaxed">
        <span class="font-bold text-indigo-500 dark:text-indigo-400">{{
          showCurrentEventType?.length || 0
        }}</span>
        event{{ showCurrentEventType?.length === 1 ? '' : 's' }} I was involved in
        <span :class="currentEventType">{{ presentAs }}</span>
      </p>
    </template>

    <!-- Homepage: card grid -->
    <div
      v-if="isHomepage && showCurrentEventType && showCurrentEventType.length > 0"
      class="event-wrapper--grid"
    >
      <EventCard
        v-for="(event, index) in showCurrentEventType"
        :key="event.topic + event.event_date"
        :event="event"
        :class="event.event_type?.[0]"
        class="event-box"
        :style="'--delay:' + index + 's'"
      />
    </div>

    <!-- Events page: rows grouped by year -->
    <div
      v-else-if="!isHomepage && eventsByYear.length > 0"
      class="space-y-10 sm:space-y-12"
    >
      <section v-for="group in eventsByYear" :key="group.year">
        <h2 class="text-xl sm:text-2xl font-bold tracking-tight mb-3 sm:mb-4">
          {{ group.year }}
        </h2>
        <div class="flex flex-col gap-1">
          <EventRow
            v-for="(event, index) in group.events"
            :key="event.topic + event.event_date"
            :event="event"
            :class="event.event_type?.[0]"
            class="event-box"
            :style="'--delay:' + index + 's'"
          />
        </div>
      </section>
    </div>

    <div v-else class="pt-10 sm:pt-16 text-center">
      <p class="text-xl sm:text-2xl text-gray-500 dark:text-gray-400">
        No events in the {{ currentEventType }} category
      </p>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.event-wrapper--grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

@media (min-width: 640px) {
  .event-wrapper--grid {
    gap: 32px;
  }
}

@media (min-width: 1024px) {
  .event-wrapper--grid {
    gap: 40px;
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

/* Hand-drawn pill styles — compact on mobile, roomier from sm up */
.pill-hand-drawn {
  position: relative;
  padding: 6px 12px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.pill-text {
  position: relative;
  z-index: 1;
  font-size: 0.75rem;
  font-weight: 500;
  transition: color 0.3s ease-out;
  color: #6b7280;
}

@media (min-width: 640px) {
  .pill-hand-drawn {
    padding: 8px 16px;
    min-width: 80px;
  }

  .pill-text {
    font-size: 0.875rem;
  }
}

:deep(.dark) .pill-text,
.dark .pill-text {
  color: #9ca3af;
}
</style>
