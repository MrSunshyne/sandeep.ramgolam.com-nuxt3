<script setup lang="ts">
type Project = {
  name: string;
  url: string;
  role: string[];
  company: string;
  text?: string;
  tech?: string[];
  thumbnail: string;
  started?: string;
  status?: string;
};

const props = withDefaults(
  defineProps<{ project: Project; compact?: boolean }>(),
  { compact: false },
);

// SSR-stable id: each row needs its own clipPath element
const clipId = `project-clip-${useId()}`;

const meta = computed(() =>
  [
    `${props.project.role.join(", ").trim()} @ ${props.project.company}`,
    props.project.started?.slice(0, 4),
    props.project.status === "archived" ? "archived" : undefined,
  ]
    .filter(Boolean)
    .join(" · "),
);
</script>

<template>
  <article class="feed-item">
    <a
      :href="project.url"
      target="_blank"
      rel="noopener"
      class="feed-link group"
    >
      <div class="feed-info">
        <p
          class="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400"
        >
          {{ meta }}
        </p>
        <h2
          class="font-black tracking-tight leading-none transition-colors group-hover:text-green-600 dark:group-hover:text-green-400"
          :class="
            compact
              ? 'text-3xl sm:text-4xl'
              : 'text-3xl sm:text-4xl lg:text-5xl'
          "
        >
          {{ project.name }}
        </h2>
        <p
          v-if="project.text"
          class="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
        >
          {{ project.text }}
        </p>
        <ul
          v-if="project.tech?.length && !compact"
          class="feed-tech mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500"
        >
          <li v-for="tech in project.tech" :key="tech">{{ tech }}</li>
        </ul>
      </div>

      <div>
        <!-- organic, hand-drawn edge for the screenshot -->
        <svg class="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <clipPath :id="clipId" clipPathUnits="objectBoundingBox">
              <path
                d="M0.02 0.04 Q0.01 0.02 0.03 0.01 L0.05 0.02 Q0.15 0 0.3 0.02 T0.6 0 Q0.8 0.02 0.95 0.01 Q0.98 0 0.99 0.03 Q1 0.06 0.99 0.12 L0.99 0.2 Q1 0.35 0.99 0.5 T1 0.75 Q0.99 0.88 0.99 0.94 Q1 0.98 0.97 0.99 Q0.94 1 0.88 0.99 L0.8 0.99 Q0.6 1 0.4 0.98 T0.12 1 Q0.05 0.99 0.03 0.99 Q0 0.98 0.01 0.94 Q0 0.88 0.01 0.75 L0.01 0.6 Q0 0.4 0.01 0.25 T0 0.1 Q0.01 0.06 0.02 0.04 Z"
              />
            </clipPath>
          </defs>
        </svg>
        <div
          class="aspect-[1024/620] bg-gray-200 dark:bg-gray-700"
          :style="{ clipPath: `url(#${clipId})` }"
        >
          <NuxtImg
            :src="'/data/projects/' + project.thumbnail"
            :alt="`Screenshot of ${project.name}`"
            loading="lazy"
            width="1024"
            height="620"
            sizes="100vw lg:640px"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </a>
  </article>
</template>

<style scoped>
.feed-link {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.feed-info {
  display: flex;
  flex-direction: column;
}

/* Desktop: text on the left, right-aligned against the screenshot */
@media (min-width: 1024px) {
  .feed-link {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
    align-items: center;
    gap: 2.5rem;
  }

  .feed-info {
    align-items: flex-end;
    text-align: right;
  }

  .feed-tech {
    justify-content: flex-end;
  }
}

/* The row nearest the middle of the screen is in focus; the others recede.
   Desktop only, and only where scroll-driven animations exist. */
@media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .feed-item {
      animation: feed-focus linear both;
      animation-timeline: view();
      animation-range: cover 0% cover 100%;
      transform-origin: right center;
    }
  }
}

@keyframes feed-focus {
  0% {
    opacity: 0.25;
    transform: scale(0.9);
  }
  40%,
  60% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.25;
    transform: scale(0.9);
  }
}
</style>
