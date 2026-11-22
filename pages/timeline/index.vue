<script setup lang="ts">
import type { BlogPost } from "@/types";
import wallpapers from "@/assets/data/wallpapers.json";
import { employment, education } from "@/data/experience";
import { projects } from "@/data/projects";
import {
  buildTimeline,
  formatTimelineDate,
  groupTimelineByYear,
  type TimelineKind,
} from "~/utils/timeline";

// Same keys and queries as /blog and /events so the payloads are shared
const { data: posts } = await useAsyncData("blogs", () =>
  queryCollection<BlogPost>("blog")
    .where("visibility", "=", "public")
    .where("status", "=", "published")
    .order("date", "DESC")
    .all(),
);
const { data: events } = await useAsyncData("events", () =>
  queryCollection("events").order("event_date", "DESC").all(),
);

const allItems = computed(() =>
  buildTimeline({
    // the blog collection stores the date as an ISO string
    posts: (posts.value ?? []).map((post) => ({
      slug: post.slug,
      title: post.title,
      date: String(post.date),
      feature_image: post.feature_image,
    })),
    events: events.value ?? [],
    projects,
    jobs: employment,
    education,
    wallpapers,
  }),
);

const kinds: { kind: TimelineKind; label: string; color: string }[] = [
  { kind: "post", label: "Posts", color: "#3b82f6" },
  { kind: "event", label: "Events", color: "#6366f1" },
  { kind: "project", label: "Projects", color: "#10b981" },
  { kind: "career", label: "Career", color: "#f59e0b" },
  { kind: "education", label: "Education", color: "#f43f5e" },
  { kind: "wallpapers", label: "Wallpapers", color: "#06b6d4" },
];
const kindByName = Object.fromEntries(kinds.map((k) => [k.kind, k]));
const NuxtLink = resolveComponent("NuxtLink");

// event roles keep the colors they have on /events
const roleColors: Record<string, string> = {
  speaking: "#3b82f6",
  jury: "#eab308",
  competition: "#ef4444",
  attendee: "#22c55e",
  organizer: "#a855f7",
};

const singular: Record<TimelineKind, string> = {
  post: "post",
  event: "event",
  project: "project",
  career: "role",
  education: "qualification",
  wallpapers: "wallpaper drop",
};

// The URL is the source of truth so filtered views can be linked to
const route = useRoute();
const router = useRouter();
const currentKind = computed<TimelineKind | "all">(() => {
  const type = route.query.type;
  return typeof type === "string" && type in kindByName
    ? (type as TimelineKind)
    : "all";
});

function setKind(kind: TimelineKind | "all") {
  const next = currentKind.value === kind ? "all" : kind;
  // Keep the current path: re-resolving it drops the trailing slash the
  // static host serves and starts a view transition (see events-listing)
  router.push({
    path: route.path,
    query: { ...route.query, type: next === "all" ? undefined : next },
  });
}

const counts = computed(() => {
  const result: Partial<Record<TimelineKind, number>> = {};
  for (const item of allItems.value)
    result[item.kind] = (result[item.kind] ?? 0) + 1;
  return result;
});

const visibleItems = computed(() =>
  currentKind.value === "all"
    ? allItems.value
    : allItems.value.filter((item) => item.kind === currentKind.value),
);
const years = computed(() => groupTimelineByYear(visibleItems.value));
const firstYear = computed(() => allItems.value.at(-1)?.date.year);

const summary = computed(() => {
  const count = visibleItems.value.length;
  if (currentKind.value === "all")
    return `${count} moments since ${firstYear.value}`;
  const noun = singular[currentKind.value];
  return `${count} ${count === 1 ? noun : `${noun}s`}`;
});

// Deterministic wobble so the hand-drawn rail is identical on server and
// client (Math.random would break hydration)
function wobble(seed: string, spread: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 997;
  return (h / 997 - 0.5) * spread;
}

function railPath(year: number) {
  let d = "M 5 0";
  const steps = 8;
  for (let i = 0; i < steps; i++) {
    d += ` q ${wobble(`${year}-${i}`, 6)} ${50 / steps} 0 ${100 / steps}`;
  }
  return d;
}

useHead({
  title: "Timeline | Sandeep Ramgolam",
  meta: [
    {
      name: "description",
      content:
        "Everything in one place, in the order it happened: blog posts, talks and events, projects, career moves and more.",
    },
    { property: "og:title", content: "Timeline | Sandeep Ramgolam" },
    {
      property: "og:description",
      content:
        "Blog posts, talks and events, projects and career moves, in the order they happened.",
    },
  ],
});

defineOgImage("GenericTemplate");
</script>

<template>
  <div class="contain pb-16 sm:pb-20">
    <div class="max-w-4xl mx-auto">
      <h1 class="font-bold tracking-tight text-3xl sm:text-4xl mb-2">
        Timeline
      </h1>
      <p
        class="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
      >
        {{ summary }}
      </p>

      <div
        class="flex flex-wrap gap-x-1.5 gap-y-2 sm:gap-2 mt-6 sm:mt-8 mb-10 sm:mb-12"
      >
        <button class="pill-hand-drawn" @click="setKind('all')">
          <HandDrawnShape
            variant="pill"
            :hover-morph="true"
            :selected="currentKind === 'all'"
            :color="currentKind === 'all' ? '#6b7280' : '#d1d5db'"
            :stroke-width="currentKind === 'all' ? 2.5 : 1.5"
          />
          <span class="pill-text">Show All</span>
        </button>
        <button
          v-for="option in kinds"
          :key="option.kind"
          class="pill-hand-drawn"
          :aria-pressed="currentKind === option.kind"
          @click="setKind(option.kind)"
        >
          <HandDrawnShape
            variant="pill"
            :hover-morph="true"
            :selected="currentKind === option.kind"
            :color="currentKind === option.kind ? option.color : '#d1d5db'"
            :stroke-width="currentKind === option.kind ? 2.5 : 1.5"
          />
          <span
            class="pill-text"
            :style="currentKind === option.kind ? { color: option.color } : {}"
            >{{ option.label }}
            <span class="pill-count">{{ counts[option.kind] ?? 0 }}</span>
          </span>
        </button>
      </div>

      <!-- one organic, hand-drawn edge shared by every thumbnail -->
      <svg class="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="timeline-thumb-clip" clipPathUnits="objectBoundingBox">
            <path
              d="M0.03 0.05 Q0.01 0.02 0.05 0.02 L0.3 0.03 Q0.6 0 0.95 0.02 Q0.99 0.03 0.98 0.08 L0.99 0.4 Q1 0.7 0.98 0.94 Q0.98 0.99 0.93 0.98 L0.6 0.99 Q0.3 1 0.06 0.98 Q0.01 0.98 0.02 0.92 L0.01 0.6 Q0 0.3 0.03 0.05 Z"
            />
          </clipPath>
        </defs>
      </svg>

      <div class="timeline-years space-y-10 sm:space-y-12">
        <section v-for="group in years" :key="group.year">
          <h2 class="text-xl sm:text-2xl font-bold tracking-tight mb-3 sm:mb-4">
            {{ group.year }}
          </h2>

          <div class="relative">
            <!-- hand-drawn rail behind the dots -->
            <svg
              class="rail"
              viewBox="0 0 10 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                :d="railPath(group.year)"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                vector-effect="non-scaling-stroke"
              />
            </svg>

            <ol class="flex flex-col gap-2 sm:gap-3">
              <li
                v-for="(item, index) in group.items"
                :key="item.key"
                class="timeline-row relative pl-7 sm:pl-8"
                :data-kind="item.kind"
                :style="'--delay:' + index + 's'"
              >
                <span
                  class="dot"
                  :style="{ background: kindByName[item.kind].color }"
                  aria-hidden="true"
                />
                <component
                  :is="item.href ? NuxtLink : 'div'"
                  :to="item.href"
                  :target="item.external ? '_blank' : undefined"
                  :rel="item.external ? 'noopener' : undefined"
                  class="row-body rounded-xl px-3 -mx-3 py-3 sm:py-4 flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-5 min-w-0 group"
                  :class="
                    item.href
                      ? 'transition-colors hover:bg-gray-100 dark:hover:bg-white/5'
                      : ''
                  "
                >
                  <div
                    class="hidden sm:block shrink-0 w-16 whitespace-nowrap text-sm font-medium tracking-wide text-gray-400 dark:text-gray-500 uppercase"
                  >
                    {{ formatTimelineDate(item.date) || "·" }}
                  </div>
                  <!-- phones: the date joins the label line and the picture
                       drops below, so the title gets the full width -->
                  <div class="min-w-0 basis-full sm:basis-auto sm:flex-1">
                    <div
                      class="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 min-w-0"
                    >
                      <span
                        v-if="formatTimelineDate(item.date)"
                        class="sm:hidden text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500"
                      >
                        {{ formatTimelineDate(item.date) }}
                      </span>
                      <span
                        class="text-[11px] font-semibold uppercase tracking-wide"
                        :style="{ color: kindByName[item.kind].color }"
                      >
                        {{ singular[item.kind] }}
                      </span>
                      <span
                        v-if="item.meta"
                        class="min-w-0 truncate text-xs font-medium tracking-wide text-gray-400 dark:text-gray-500 uppercase"
                      >
                        {{ item.meta }}
                      </span>
                      <span
                        v-for="tag in item.tags"
                        :key="tag"
                        class="text-[11px] font-medium uppercase tracking-wide"
                        :style="{ color: roleColors[tag] ?? '#9ca3af' }"
                      >
                        {{ tag }}
                      </span>
                    </div>
                    <h3
                      class="mt-0.5 text-lg sm:text-xl font-bold leading-snug [overflow-wrap:anywhere]"
                      :class="
                        item.href
                          ? 'transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400'
                          : ''
                      "
                    >
                      {{ item.title }}
                    </h3>
                    <p
                      v-if="item.text"
                      class="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-2"
                    >
                      {{ item.text }}
                    </p>
                  </div>
                  <div
                    v-if="item.image"
                    class="thumb shrink-0 w-full max-w-sm sm:w-56 lg:w-72 aspect-[16/10] bg-gray-200 dark:bg-gray-700"
                  >
                    <NuxtImg
                      :src="item.image"
                      alt=""
                      loading="lazy"
                      width="288"
                      height="180"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </component>
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rail {
  position: absolute;
  left: 2px;
  top: 0.75rem;
  bottom: 0.75rem;
  width: 10px;
  height: calc(100% - 1.5rem);
  color: #d1d5db;
  overflow: visible;
}

.dark .rail {
  color: #374151;
}

.dot {
  position: absolute;
  left: 3px;
  /* centred on the row; `translate` leaves `transform` free for the scroll
     animation below */
  top: 50%;
  translate: 0 -50%;
  width: 9px;
  height: 9px;
  border-radius: 9999px;
  box-shadow: 0 0 0 3px #fff;
}

.dark .dot {
  box-shadow: 0 0 0 3px var(--color-slate-800);
}

/* phones: rows stack, so the dot lines up with the label line at the top */
@media (max-width: 639px) {
  .dot {
    top: 1.2rem;
    translate: 0;
  }
}

.timeline-row {
  opacity: 0;
  transform: translateY(10px);
  animation: reveal 0.5s ease-out 1 forwards;
  --multiplier: 0.03;
  animation-delay: calc(var(--delay) * var(--multiplier));
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .timeline-row {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

/* Desktop: like /projects, the rows near the middle of the screen are in
   focus and the rest recede as they scroll past. Only where scroll-driven
   animations exist, and not with reduced motion. */
@media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    /* the on-load reveal gives way to the scroll focus below */
    .timeline-row {
      opacity: 1;
      transform: none;
      animation: none;
    }

    .row-body {
      animation: timeline-focus linear both;
      animation-timeline: view();
      animation-range: cover 0% cover 100%;
      transform-origin: left center;
    }

    /* the dot stays on the rail and swells as its row comes into focus */
    .dot {
      animation: timeline-dot linear both;
      animation-timeline: view();
      animation-range: cover 0% cover 100%;
    }

    /* room for the last rows to reach the middle of the screen */
    .timeline-years {
      padding-bottom: 40vh;
    }
  }
}

/* The same curve as /projects: rows near the middle are full size, the rest
   are slightly smaller and dimmer. */
@keyframes timeline-focus {
  0%,
  100% {
    opacity: 0.25;
    transform: scale(0.9);
  }
  40%,
  60% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes timeline-dot {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.7);
  }
  40%,
  60% {
    opacity: 1;
    transform: scale(1.3);
  }
}

/* Hand-drawn pill styles, as on /events */
.pill-hand-drawn {
  position: relative;
  padding: 6px 12px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.pill-text {
  position: relative;
  z-index: 1;
  font-size: 0.75rem;
  font-weight: 500;
  transition: color 0.3s ease-out;
  color: #6b7280;
}

.pill-count {
  margin-left: 0.25rem;
  opacity: 0.6;
  font-variant-numeric: tabular-nums;
}

@media (min-width: 640px) {
  .pill-hand-drawn {
    padding: 8px 16px;
    min-width: 80px;
  }

  .pill-text {
    font-size: 0.875rem;
  }
}

.dark .pill-text {
  color: #9ca3af;
}
</style>
