<template>
  <div
    class="event-row rounded-lg px-3 -mx-3 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
  >
    <!-- text on the left, photos beside it from sm up (below it on mobile) -->
    <div class="flex flex-col sm:flex-row sm:items-start gap-x-4 gap-y-2">
    <div class="min-w-0 flex-1">
    <!-- meta line: event name + a label per role, each in its category color -->
    <div class="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 min-w-0">
      <div class="min-w-0 truncate text-xs font-medium tracking-wide text-gray-400 dark:text-gray-500 uppercase">
        {{ event.event_name }}
      </div>
      <span
        v-for="type in event.event_type"
        :key="type"
        class="text-[11px] font-medium uppercase tracking-wide"
        :style="{ color: categoryColors[type] ?? '#9ca3af' }"
      >
        {{ type }}
      </span>
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
          class="title-link sm:flex sm:items-center sm:gap-1 min-w-0 transition-colors hover:text-blue-500 dark:hover:text-blue-400"
        >
          <span class="sm:truncate">{{ event.topic ?? event.event_name }}</span>
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
            class="external-icon inline-block ml-1 sm:ml-0 sm:shrink-0 text-gray-400 dark:text-gray-500 transition-colors"
            aria-hidden="true"
          >
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </a>
        <span v-else class="block sm:truncate">{{ event.topic ?? event.event_name }}</span>
      </h2>
      <!-- logistics line: date + location, as subtle as the meta line -->
      <div class="min-w-0 sm:truncate text-sm text-gray-400 dark:text-gray-500">
        {{ shortDate }}<span v-if="event.location"> · {{ event.location }}</span>
      </div>
    </div>

    <!-- photos: small thumbnails that open a larger copy, credit linked to where each was found -->
    <figure v-if="event.photos?.length" class="shrink-0">
      <div class="flex gap-2">
        <a
          v-for="photo in event.photos"
          :key="photo.src"
          :href="largePhoto(photo.src)"
          target="_blank"
          rel="noopener"
          :title="photo.alt"
          class="photo-thumb block overflow-hidden rounded-md bg-gray-100 dark:bg-white/5"
        >
          <NuxtImg
            :src="photo.src"
            :alt="photo.alt"
            width="96"
            height="64"
            fit="cover"
            format="webp"
            densities="x1 x2"
            loading="lazy"
            class="h-16 w-24 object-cover"
          />
        </a>
      </div>
      <figcaption
        v-if="photoCredits.length"
        class="mt-1 max-w-[12.5rem] truncate text-[11px] text-gray-400 dark:text-gray-500"
      >
        {{ event.photos.filter((p) => p.credit).length === 1 ? 'Photo' : 'Photos' }}:
        <template v-for="(c, i) in photoCredits" :key="c.credit">
          <span v-if="i">, </span>
          <a
            v-if="c.source"
            :href="c.source"
            target="_blank"
            rel="noopener"
            class="underline decoration-dotted underline-offset-2 hover:text-blue-500 dark:hover:text-blue-400"
          >{{ c.credit }}</a>
          <span v-else>{{ c.credit }}</span>
        </template>
      </figcaption>
    </figure>
    </div>

    <!-- Links drawer: expands under the row on hover / keyboard focus -->
    <div v-if="event.links?.length > 1" class="links-reveal hidden sm:grid">
      <div class="links-clip">
        <div class="links-row flex flex-wrap gap-x-4 gap-y-1 pt-1 pb-0.5">
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

// some photos are multi-MB originals from blog posts, so even the "large" copy goes through the image provider
const img = useImage();
const largePhoto = (src: string) => img(src, { width: 1600, format: "webp" });

// one credit per photographer/organiser, linked to the first photo's source
const photoCredits = computed(() => {
  const credits = new Map<string, { credit: string; source?: string }>();
  for (const photo of props.event.photos ?? []) {
    if (photo.credit && !credits.has(photo.credit)) credits.set(photo.credit, photo);
  }
  return [...credits.values()];
});

// no year — the list is already grouped under year headings
const shortDate = computed(() =>
  new Date(props.event.event_date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
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

.photo-thumb img {
  transition: transform 0.25s ease;
}

.photo-thumb:hover img,
.photo-thumb:focus-visible img {
  transform: scale(1.06);
}

@media (prefers-reduced-motion: reduce) {
  .links-reveal,
  .links-row,
  .photo-thumb img {
    transition: none;
  }
}
</style>
