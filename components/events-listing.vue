<script setup lang="ts">
import EventCard from "~/components/event-card.vue";

const { data: events } = await useAsyncData("events", () =>
  queryContent("events").sort({ event_date: -1 }).find(),
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
      event.event_type.includes(currentEventType.value)
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
    <div class="flex flex-wrap justify-center sm:justify-start my-4">
      <div
        :class="currentYear === 'all' ? 'active-year' : ''"
        class="year-pills"
        @click="setCurrentYear('all')"
      >
        All Years
      </div>
      <div
        v-for="year in availableYears"
        :key="year"
        :class="currentYear === year ? 'active-year' : ''"
        class="year-pills"
        @click="setCurrentYear(year)"
      >
        {{ year }}
      </div>
    </div>
    <div class="flex flex-wrap justify-center sm:justify-start my-4">
      <div
        :class="currentEventType === 'all' ? 'active' : ''"
        class="pills"
        @click="setCurrentEventType('all')"
      >
        Show All
      </div>
      <div
        :class="currentEventType === 'speaking' ? 'active' : ''"
        class="pills speaking"
        @click="setCurrentEventType('speaking')"
      >
        Speaking
      </div>

      <div
        :class="currentEventType === 'attendee' ? 'active' : ''"
        class="pills attendee"
        @click="setCurrentEventType('attendee')"
      >
        Attendee
      </div>


      <div
        :class="currentEventType === 'organizer' ? 'active' : ''"
        class="pills organizer"
        @click="setCurrentEventType('organizer')"
      >
        Organizer
      </div>
      
      <div
        :class="currentEventType === 'competition' ? 'active' : ''"
        class="pills competition"
        @click="setCurrentEventType('competition')"
      >
        Competition
      </div>
      <div
        :class="currentEventType === 'jury' ? 'active' : ''"
        class="pills jury"
        @click="setCurrentEventType('jury')"
      >
        Jury
      </div>


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
          :class="event.event_type[0]"
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

<style scoped lang="postcss">
.event-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 40px;
  /* background: #16181e; */
}

.event-page {
  --competition-color: theme(colors.red.500);
  --speaking-color: theme(colors.blue.500);
  --jury-color: theme(colors.yellow.500);
  --attendee-color: theme(colors.green.500);
  --organizer-color: theme(colors.purple.500);
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

@screen sm {
  .event-wrapper {
    grid-gap: 40px;
  }
}

.pills {
  @apply p-2 mr-4 border-4 rounded-full cursor-pointer;
  transition: all 0.2s linear;
  border-color: transparent;

  /* background: rgba(0, 0, 0, 0.1); */
  &.active {
    transition: all 0.2s linear;

    /* @apply border-4 font-bold; */
    &.speaking {
      color: var(--speaking-color);
      border-color: var(--speaking-color);
    }

    &.jury {
      color: var(--jury-color);
      border-color: var(--jury-color);
    }

    &.competition {
      color: var(--competition-color);
      border-color: var(--competition-color);
    }

    &.attendee {
      color: var(--attendee-color);
      border-color: var(--attendee-color);
    }

    &.organizer {
      color: var(--organizer-color);
      border-color: var(--organizer-color);
    }
  }

  &.speaking {
    color: var(--speaking-color);
  }

  &.jury {
    color: var(--jury-color);
  }

  &.competition {
    color: var(--competition-color);
  }

  &.attendee {
    color: var(--attendee-color);
  }

  &.organizer {
    color: var(--organizer-color);
  }
}

.event-wrapper {
  .speaking {
    border-color: var(--speaking-color);
  }

  .jury {
    border-color: var(--jury-color);
  }

  .competition {
    border-color: var(--competition-color);
  }

  .attendee {
    border-color: var(--attendee-color);
  }

  .organizer {
    border-color: var(--organizer-color);
  }

}

.year-pills {
  @apply p-2 mr-4 border-4 rounded-full cursor-pointer;
  transition: all 0.2s linear;
  border-color: transparent;

  &.active-year {
    @apply border-indigo-500 text-indigo-500 dark:border-indigo-400 dark:text-indigo-400;
  }
}
</style>
