<template>
  <div class="container event-page pb-10 grid gap-4">
    <EventsListing :count="3" />
    <div class="flex justify-center">
      <NuxtLink href="/events" class="button">See all events</NuxtLink>
    </div>
  </div>
</template>

<style lang="postcss">

.event-page {
  --competition-color: theme(colors.red.500);
  --speaking-color: theme(colors.blue.500);
  --jury-color: theme(colors.yellow.500);
  --attendee-color: theme(colors.green.500);
  --organizer-color: theme(colors.purple.500);
}
</style>



<script setup lang="ts">
import EventsListing from './events-listing.vue';
</script>
