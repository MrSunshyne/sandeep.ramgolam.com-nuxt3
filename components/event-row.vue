<template>
  <div
    class="event-row rounded-lg px-3 -mx-3 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
  >
    <div class="flex items-baseline gap-3 min-w-0">
      <span
        class="self-center shrink-0 w-2 h-2 rounded-full"
        :style="{ background: categoryColor }"
        :title="event.event_type?.join(', ')"
      ></span>
      <div class="shrink-0 w-24 sm:w-28 whitespace-nowrap text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400 uppercase">
        {{ shortDate }}
      </div>
      <h2
        class="min-w-0 text-base sm:text-lg font-bold"
        :title="event.description || event.topic"
      >
        <!-- single link: the title is the link; multiple: drawer below -->
        <a
          v-if="event.links?.length === 1"
          :href="event.links[0].url"
          target="_blank"
          rel="noopener"
          class="title-link flex items-center gap-1 min-w-0 transition-colors hover:text-blue-500 dark:hover:text-blue-400"
        >
          <span class="truncate">{{ event.topic ?? event.event_name }}</span>
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
        <span v-else class="block truncate">{{ event.topic ?? event.event_name }}</span>
      </h2>
      <div class="min-w-0 truncate text-sm sm:text-base text-gray-600 dark:text-gray-400 hidden sm:block">
        {{ event.event_name }}<span v-if="event.location"> · {{ event.location }}</span>
      </div>
    </div>

    <!-- Links drawer: expands under the row on hover / keyboard focus -->
    <div v-if="event.links?.length > 1" class="links-reveal hidden sm:grid">
      <div class="links-clip">
        <div class="links-row flex flex-wrap gap-x-4 gap-y-1 sm:pl-36 pt-1 pb-0.5">
          <a
            v-for="link in event.links"
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
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

// Same category palette as event-card.vue
const categoryColors: Record<string, string> = {
  speaking: '#3b82f6',
  jury: '#eab308',
  competition: '#ef4444',
  attendee: '#22c55e',
  organizer: '#a855f7',
};

const categoryColor = computed(() => {
  const type = props.event.event_type?.[0];
  return categoryColors[type] || '#9ca3af';
});

const shortDate = computed(() =>
  new Date(props.event.event_date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
);
</script>

<style scoped>
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

.event-row:hover .links-reveal,
.event-row:focus-within .links-reveal {
  grid-template-rows: 1fr;
}

.event-row:hover .links-row,
.event-row:focus-within .links-row {
  opacity: 1;
  transition-delay: 0.08s;
}

.title-link:hover .external-icon {
  color: currentColor;
}

@media (prefers-reduced-motion: reduce) {
  .links-reveal,
  .links-row {
    transition: none;
  }
}
</style>
