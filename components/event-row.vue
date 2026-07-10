<template>
  <div
    class="event-row flex items-baseline gap-3 min-w-0 rounded-lg px-3 -mx-3 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
  >
    <span
      class="self-center shrink-0 w-2 h-2 rounded-full"
      :style="{ background: categoryColor }"
      :title="event.event_type?.join(', ')"
    ></span>
    <div class="shrink-0 w-24 sm:w-28 whitespace-nowrap text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400 uppercase">
      {{ shortDate }}
    </div>
    <h2
      class="min-w-0 truncate text-base sm:text-lg font-bold"
      :title="event.description || event.topic"
    >
      {{ event.topic ?? event.event_name }}
    </h2>
    <div class="min-w-0 truncate text-sm sm:text-base text-gray-600 dark:text-gray-400 hidden sm:block">
      {{ event.event_name }}<span v-if="event.location"> · {{ event.location }}</span>
    </div>
    <div v-if="event.links?.length" class="ml-auto shrink-0 hidden sm:flex items-baseline gap-3">
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
