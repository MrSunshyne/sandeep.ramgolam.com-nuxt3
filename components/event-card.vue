<template>
  <div class="event-card relative">
    <!-- Hand-drawn border SVG -->
    <svg
      class="hand-drawn-border"
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        class="border-path"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10 5 Q5 4 3 7 Q1 10 2 15
           L3 25 Q1 60 4 100 T2 160 Q4 200 3 240 T4 280 Q2 290 5 294
           Q8 297 14 296
           L25 295 Q80 297 140 295 T260 297 Q320 295 370 297 T392 295
           Q396 295 398 291 Q400 287 398 280
           L398 270 Q400 220 397 170 T400 110 Q397 70 398 35 T396 12
           Q397 6 393 4 Q389 2 383 4
           L365 5 Q300 3 240 5 T120 3 Q60 5 20 4 Z"
      />
    </svg>
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

defineProps({
  event: {
    type: Object,
    required: true,
  },
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

.hand-drawn-border {
  position: absolute;
  inset: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  z-index: 0;
  pointer-events: none;
}

.border-path {
  color: #9ca3af;
  transition: color 0.4s ease-out, d 0.4s ease-out;
}

:deep(.dark) .border-path,
.dark .border-path {
  color: #6b7280;
}

.event-card:hover .border-path {
  d: path("M8 2 Q3 1 1 5 Q-2 10 1 18 L2 30 Q-1 70 3 115 T-1 175 Q4 220 1 260 T5 290 Q2 296 6 298 Q10 300 18 298 L30 297 Q90 300 160 296 T280 300 Q340 296 385 299 T395 297 Q400 296 401 291 Q403 285 400 275 L401 260 Q403 210 398 155 T403 95 Q398 55 400 25 T397 8 Q398 3 392 1 Q386 -1 378 2 L355 3 Q280 6 210 2 T90 6 Q40 2 15 3 Z");
}

/* Event type colors - default state */
.event-card.speaking .border-path {
  color: var(--speaking-color, #3b82f6);
}

.event-card.jury .border-path {
  color: var(--jury-color, #eab308);
}

.event-card.competition .border-path {
  color: var(--competition-color, #ef4444);
}

.event-card.attendee .border-path {
  color: var(--attendee-color, #22c55e);
}

.event-card.organizer .border-path {
  color: var(--organizer-color, #a855f7);
}

/* Category indicator dot */
.event-card.speaking .event-date::before,
.event-card.jury .event-date::before,
.event-card.competition .event-date::before,
.event-card.attendee .event-date::before,
.event-card.organizer .event-date::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.event-card.speaking .event-date::before {
  background: var(--speaking-color, #3b82f6);
}

.event-card.jury .event-date::before {
  background: var(--jury-color, #eab308);
}

.event-card.competition .event-date::before {
  background: var(--competition-color, #ef4444);
}

.event-card.attendee .event-date::before {
  background: var(--attendee-color, #22c55e);
}

.event-card.organizer .event-date::before {
  background: var(--organizer-color, #a855f7);
}
</style>
