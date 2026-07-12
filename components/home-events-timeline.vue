<script setup lang="ts">
import EventRow from "~/components/event-row.vue";

type TimelineEvent = {
  event_date: string;
  event_name: string;
  event_type?: string[];
  topic?: string;
  published?: boolean;
  stem?: string;
};

// Same key and query as the events page so the payload is shared
const { data: events } = await useAsyncData("events", () =>
  queryCollection("events").order("event_date", "DESC").all(),
);

const published = computed<TimelineEvent[]>(() =>
  ((events.value ?? []) as TimelineEvent[])
    .filter((e) => e.published)
    .sort(
      (a, b) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime(),
    ),
);

const stats = computed(() => {
  const list = published.value;
  const roles = (role: string) =>
    list.filter((e) => e.event_type?.includes(role)).length;
  return {
    total: list.length,
    talks: roles("speaking"),
    organized: roles("organizer"),
    communities: new Set(list.map((e) => e.event_name)).size,
    firstYear: list.length
      ? new Date(list[0].event_date).getFullYear()
      : undefined,
  };
});

// ---- dot layout ----------------------------------------------------------
// Fixed viewBox so positions are computed once from the data and are
// identical on server and client (no viewport reads, no Date.now()).
const W = 1000;
const H = 150;
const PAD_X = 14;
const BASELINE = 118;
const DOT_R = 6;
const DOT_GAP = 15; // min x distance before a dot moves up a lane
const LANE_H = 15;

// deterministic wobble so the hand-drawn jitter never changes between
// renders (Math.random would break hydration)
function wobble(seed: string, spread = 3) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 997;
  return (h / 997 - 0.5) * spread;
}

const scale = computed(() => {
  const list = published.value;
  if (!list.length) return null;
  const min = new Date(list[0].event_date).getFullYear();
  const max = new Date(list[list.length - 1].event_date).getFullYear();
  const start = new Date(`${min}-01-01`).getTime();
  const end = new Date(`${max + 1}-01-01`).getTime();
  return {
    minYear: min,
    maxYear: max,
    x: (date: string) =>
      PAD_X + ((new Date(date).getTime() - start) / (end - start)) * (W - PAD_X * 2),
  };
});

const dots = computed(() => {
  const s = scale.value;
  if (!s) return [];
  const laneEnds: number[] = [];
  return published.value.map((e, i) => {
    const x = s.x(e.event_date);
    let lane = 0;
    while (laneEnds[lane] !== undefined && x - laneEnds[lane] < DOT_GAP) lane++;
    laneEnds[lane] = x;
    const type = e.event_type?.[0] ?? "attendee";
    const date = new Date(e.event_date);
    return {
      x: x + wobble(e.event_name + i, 2),
      y: BASELINE - lane * LANE_H + wobble(e.event_date + i, 4),
      type,
      title: e.topic ?? e.event_name,
      label: `${e.topic ?? e.event_name} — ${e.event_name}, ${date.toLocaleDateString("en-GB", { month: "short", year: "numeric" })} (${(e.event_type ?? []).join(", ")})`,
      date,
      key: (e.stem ?? e.event_name) + e.event_date,
    };
  });
});

const yearTicks = computed(() => {
  const s = scale.value;
  if (!s) return [];
  const ticks = [];
  for (let y = s.minYear; y <= s.maxYear; y++) {
    ticks.push({ year: y, short: "’" + String(y).slice(2), x: s.x(`${y}-01-01`) });
  }
  return ticks;
});

// gently waving baseline instead of a ruler-straight axis
const baselinePath = computed(() => {
  let d = `M ${PAD_X} ${BASELINE + DOT_R + 4}`;
  const steps = 10;
  const w = (W - PAD_X * 2) / steps;
  for (let i = 0; i < steps; i++) {
    const dip = wobble(`baseline-${i}`, 5);
    d += ` q ${w / 2} ${dip} ${w} 0`;
  }
  return d;
});

const recentEvents = computed(() => published.value.slice(-4).reverse());

const roleOrder = [
  { type: "speaking", label: "Speaking" },
  { type: "organizer", label: "Organizer" },
  { type: "attendee", label: "Attendee" },
  { type: "competition", label: "Competition" },
  { type: "jury", label: "Jury" },
];

// ---- tooltip -------------------------------------------------------------
const wrapper = ref<HTMLElement>();
const tooltip = ref<{ text: string; x: number; y: number; below: boolean } | null>(null);

function showTooltip(evt: Event, dot: { label: string }) {
  const el = evt.target as SVGGraphicsElement;
  const box = el.getBoundingClientRect();
  const host = wrapper.value?.getBoundingClientRect();
  if (!host) return;
  // the wrapper clips vertically (overflow-x: auto), so flip the tooltip
  // under the dot when a tall stack leaves no headroom above it
  const below = box.y - host.y < 60;
  tooltip.value = {
    text: dot.label,
    x: Math.min(Math.max(box.x + box.width / 2 - host.x, 110), host.width - 110),
    y: (below ? box.bottom : box.y) - host.y,
    below,
  };
}

const router = useRouter();
function openEvents(type: string) {
  router.push({ path: "/events", query: { type } });
}
</script>

<template>
  <!-- min-w-0 lets this grid item shrink below the svg's min-width so the
       ribbon scrolls inside its own wrapper instead of the whole page -->
  <div class="events-timeline min-w-0">
    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold pt-8 sm:pt-10 text-center mb-3 sm:mb-4">
      Events
    </h2>
    <p class="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center mb-6 sm:mb-8 leading-relaxed">
      <span class="font-bold text-indigo-500 dark:text-indigo-400">{{ stats.total }}</span>
      events across
      <span class="font-bold text-indigo-500 dark:text-indigo-400">{{ stats.communities }}</span>
      communities since {{ stats.firstYear }} —
      {{ stats.talks }} talks given, {{ stats.organized }} organized
    </p>

    <div ref="wrapper" class="relative overflow-x-auto">
      <svg
        class="timeline-svg"
        :viewBox="`0 0 ${W} ${H}`"
        role="img"
        :aria-label="`Timeline of ${stats.total} events since ${stats.firstYear}, colored by role`"
      >
        <path
          :d="baselinePath"
          class="baseline"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <text
          v-for="tick in yearTicks"
          :key="tick.year"
          :x="tick.x"
          :y="H - 8"
          class="year-label"
          text-anchor="middle"
        >
          {{ tick.short }}
        </text>
        <circle
          v-for="dot in dots"
          :key="dot.key"
          :cx="dot.x"
          :cy="dot.y"
          :r="DOT_R"
          :class="['dot', `dot--${dot.type}`]"
          role="link"
          tabindex="0"
          :aria-label="dot.label"
          @mouseenter="showTooltip($event, dot)"
          @mouseleave="tooltip = null"
          @focus="showTooltip($event, dot)"
          @blur="tooltip = null"
          @click="openEvents(dot.type)"
          @keydown.enter="openEvents(dot.type)"
        />
      </svg>

      <div
        v-if="tooltip"
        class="tooltip"
        :class="{ 'tooltip--below': tooltip.below }"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      >
        {{ tooltip.text }}
      </div>
    </div>

    <ul class="legend flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 sm:mt-4">
      <li
        v-for="role in roleOrder"
        :key="role.type"
        class="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
      >
        <span class="legend-dot" :class="`dot--${role.type}`" aria-hidden="true" />
        {{ role.label }}
      </li>
    </ul>

    <!-- px absorbs EventRow's -mx-3 hover bleed so rows never poke past the viewport -->
    <div class="max-w-3xl mx-auto mt-8 sm:mt-10 px-4 sm:px-6">
      <h3 class="text-xs sm:text-sm font-medium tracking-wide uppercase text-gray-400 dark:text-gray-500 mb-2">
        Latest
      </h3>
      <div class="flex flex-col gap-1">
        <EventRow
          v-for="event in recentEvents"
          :key="event.event_name + event.event_date"
          :event="event"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.events-timeline {
  /* role palette, snapped to steps that pass CVD + contrast checks on white */
  --c-speaking: #2563eb;
  --c-organizer: #7e22ce;
  --c-attendee: #15803d;
  --c-competition: #e11d48;
  --c-jury: #a16207;
  --dot-ring: #ffffff;
}

/* dark surface gets its own validated steps, not an automatic flip */
:global(.dark .events-timeline) {
  --c-speaking: #3b82f6;
  --c-organizer: #9333ea;
  --c-attendee: #15803d;
  --c-competition: #f43f5e;
  --c-jury: #d97706;
  --dot-ring: #1e293b;
}

.timeline-svg {
  display: block;
  width: 100%;
  min-width: 640px;
  height: auto;
}

.baseline {
  opacity: 0.25;
}

.year-label {
  font-size: 11px;
  fill: currentColor;
  opacity: 0.45;
}

.dot {
  stroke: var(--dot-ring);
  stroke-width: 2;
  cursor: pointer;
  transition: r 0.15s ease-out;
}

.dot:hover,
.dot:focus-visible {
  r: 9;
}

.dot--speaking { fill: var(--c-speaking); }
.dot--organizer { fill: var(--c-organizer); }
.dot--attendee { fill: var(--c-attendee); }
.dot--competition { fill: var(--c-competition); }
.dot--jury { fill: var(--c-jury); }

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  display: inline-block;
  background: currentColor;
}

.legend-dot.dot--speaking { background: var(--c-speaking); color: var(--c-speaking); }
.legend-dot.dot--organizer { background: var(--c-organizer); color: var(--c-organizer); }
.legend-dot.dot--attendee { background: var(--c-attendee); color: var(--c-attendee); }
.legend-dot.dot--competition { background: var(--c-competition); color: var(--c-competition); }
.legend-dot.dot--jury { background: var(--c-jury); color: var(--c-jury); }

.tooltip {
  position: absolute;
  transform: translate(-50%, -115%);
}

.tooltip--below {
  transform: translate(-50%, 15%);
}

.tooltip,
.tooltip--below {
  max-width: 220px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.75rem;
  line-height: 1.3;
  text-align: center;
  pointer-events: none;
  background: #1f2937;
  color: #f9fafb;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.25);
  z-index: 10;
}

:global(.dark .events-timeline .tooltip) {
  background: #f9fafb;
  color: #111827;
}
</style>
