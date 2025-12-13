<template>
  <div class="container event-page pb-10 grid gap-4">
    <EventsListing :count="3" />
    <div class="flex justify-center">
      <NuxtLink href="/events" class="button">See all events</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventsListing from "./events-listing.vue";
</script>

<style >
.event-page {
  --competition-color: var(--color-red-500);
  --speaking-color: var(--color-blue-500);
  --jury-color: var(--color-yellow-500);
  --attendee-color: var(--color-green-500);
  --organizer-color: var(--color-purple-500);
}
</style>
