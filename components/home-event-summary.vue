<template>
  <div class="container event-page pb-10 grid gap-4">
    <EventsListing :count="3" />
    <div class="flex justify-center">
      <NuxtLink href="/events" class="view-button">
        <HandDrawnShape variant="pill" :hover-morph="true" color="#6366f1" />
        <span class="view-button-text">See all events</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventsListing from "./events-listing.vue";
</script>

<style scoped>
.event-page {
  --competition-color: var(--color-red-500);
  --speaking-color: var(--color-blue-500);
  --jury-color: var(--color-yellow-500);
  --attendee-color: var(--color-green-500);
  --organizer-color: var(--color-purple-500);
}

.view-button {
  position: relative;
  display: inline-block;
  padding: 12px 32px;
}

.view-button-text {
  position: relative;
  z-index: 1;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  color: #4338ca;
}

:deep(.dark) .view-button-text,
.dark .view-button-text {
  color: #a5b4fc;
}
</style>
