<template>
  <div class="event-card relative">
    <HandDrawnShape
      variant="rectangle"
      :color="categoryColor"
      :hover-morph="true"
    />
    
    <div class="card-content flex flex-col">
      <!-- Date -->
      <div class="event-date flex items-center gap-2 text-gray-500 dark:text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span class="text-xs font-medium uppercase tracking-widest">
          {{ dateFormat(new Date(event.event_date)) }}
        </span>
      </div>

      <!-- Title -->
      <h2 class="event-title text-xl lg:text-2xl font-black leading-tight mt-3 mb-2">
        {{ event.topic }}
      </h2>

      <!-- Description -->
      <p class="event-description text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        {{ event.description }}
      </p>

      <!-- Links -->
      <div class="event-links space-y-1">
        <a
          v-for="link in event.links"
          :key="link.id"
          :href="link.url"
          rel="noopener"
          class="inline-flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          target="_blank"
        >
          {{ link.title }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </a>
      </div>
      <div v-if="event.video">{{ event.video }}</div>

      <!-- Footer -->
      <div class="event-footer flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
        <span class="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {{ event.event_name }}
        </span>
        <span class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {{ event.location }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { dateFormat } from "~/utils/date-utils";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

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
</script>

<style scoped>
.event-card {
  padding: 6px;
}

.card-content {
  position: relative;
  z-index: 1;
  background: white;
  padding: 20px 24px;
  border-radius: 6px;
  min-height: 200px;
}

:deep(.dark) .card-content,
.dark .card-content {
  background: #1f2937;
}

/* Category indicator dot */
.event-date::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: v-bind(categoryColor);
}
</style>
