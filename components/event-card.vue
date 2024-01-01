<template>
  <div
    class="flex flex-col border-b-4 pb-2 mb-4 event-card shadow-neumorphismlight dark:shadow-neumorphismdark relative"
  >
    <div class="text text-sm flex align-center gap-1 uppercase tracking-wider">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>

      <div>
        {{ dateFormat(new Date(event.event_date)) }}
      </div>
    </div>
    <h2 class="text-xl lg:text-2xl font-bold pb-4 tracking-tight">
      {{ event.topic }}
    </h2>

    <div class="rounded my-4">
      <p>{{ event.description }}</p>
    </div>

    <div>
      <a
        v-for="link in event.links"
        :key="link.id"
        :href="link.url"
        rel="noopener"
        class="text-sm underline flex hover:text-green-500 text-gray-700 dark:text-gray-400"
        target="_blank"
      >
        {{ link.title }}
        <div class="mt-1 border dark:border-gray-800 ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </div>
      </a>
    </div>
    <div v-if="event.video">{{ event.video }}</div>
    <!-- {{ event }} -->

    <div class="flex text-sm justify-between font-medium mt-auto pt-4">
      <div class="flex">
        <!-- <div class="mr-2 relative" style="top:6px;">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>
            </div> -->
        {{ event.event_name }}
      </div>
      <div class="">{{ event.location }}</div>
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
.event-card:hover .descriptionReveal {
  opacity: 1;
}

.event-card {
  --shadowSize: 9px;
  padding: 15px 20px;
  border-radius: 9px;
  /* border: 1px solid rgb(31, 31, 31); */
  /* background: #16181e; */
  background: rgb(250, 250, 250);
}

.mode-dark .event-card {
  background: transparent;
}
</style>
