<script setup lang="ts">
// The blogger illustration, split into one SVG per doodle so each item can be
// animated individually (idle motion + scroll-driven parallax).
// Geometry is % of the original 1326.23x800 canvas; drift is the parallax
// distance in px (small = "heavy"/far, large = "light"/near).
const DOODLES = [
  { name: "paper", left: 23.68, top: 67.5, width: 15.46, height: 32.88, drift: 30 },
  { name: "sdcard", left: 40.26, top: 66.13, width: 5.88, height: 9, drift: 50 },
  { name: "notebook", left: 54.14, top: 42.38, width: 18.4, height: 27.88, drift: 25 },
  { name: "coffee", left: 61.38, top: 71.38, width: 8.67, height: 11.13, drift: 42 },
  { name: "phone", left: 75.93, top: 59.88, width: 7.92, height: 19, drift: 38 },
  { name: "plant", left: -0.6, top: 66.88, width: 19.08, height: 31.5, drift: 20 },
  { name: "pencils", left: 53.54, top: 30, width: 14.02, height: 12, drift: 45 },
  { name: "laptop", left: 22.24, top: 11.38, width: 31.14, height: 49.5, drift: 12 },
  { name: "pencil", left: 39.66, top: 77.5, width: 2.87, height: 14.25, drift: 52 },
  { name: "pen", left: 73.89, top: 51.63, width: 2.71, height: 15.5, drift: 55 },
  { name: "camera", left: 45.84, top: 68, width: 13.87, height: 20.13, drift: 32 },
  { name: "glasses", left: 69.29, top: 79.25, width: 11.31, height: 10.63, drift: 48 },
  { name: "watch", left: 82.11, top: 57.25, width: 9.43, height: 27.63, drift: 40 },
  { name: "headphones", left: 15.76, top: 42.25, width: 26.47, height: 38, drift: 22 },
  { name: "notepad", left: 4.22, top: -0.5, width: 18.1, height: 31.37, drift: 28 },
  { name: "tablet", left: 75.85, top: 31.5, width: 16.89, height: 29.88, drift: 26 },
];

// Homepage: Only fetch the 5 posts we display with minimal fields
const { data: postsData } = await useAsyncData("home-blogs", async () => {
  const [posts, countResult] = await Promise.all([
    // Only select fields needed for display
    queryCollection("blog")
      .where("visibility", "=", "public")
      .select("slug", "title", "date")
      .order("date", "DESC")
      .limit(5)
      .all(),
    // Only fetch slug for count
    queryCollection("blog")
      .where("visibility", "=", "public")
      .select("slug")
      .all()
  ]);
  return { posts, totalCount: countResult.length };
});

const posts = computed(() => postsData.value?.posts);
const totalCount = computed(() => postsData.value?.totalCount ?? 0);

// Easter egg: clicking a doodle squishes it and shifts its colors.
// 72° per click — five clicks come full circle.
const hues = reactive<Record<string, number>>({});
const spin = (name: string) => {
  hues[name] = (hues[name] ?? 0) + 72;
};
</script>

<template>
  <div
    class="blog-summary"
    style="clip-path: polygon(0% 0, 100% 50px, 100% 100%, 0% calc(100% - 50px))"
  >
    <div class="container mx-auto py-16 md:py-24 block md:flex text-center md:text-left">
      <div class="md:w-1/2 bg-container relative hidden md:block" aria-hidden="true">
        <div class="doodle-canvas">
          <div
            v-for="d in DOODLES"
            :key="d.name"
            class="doodle"
            :class="`doodle--${d.name}`"
            :style="{ left: d.left + '%', top: d.top + '%', width: d.width + '%', height: d.height + '%', '--drift': d.drift, '--hue': (hues[d.name] ?? 0) + 'deg' }"
            @click="spin(d.name)"
          >
            <img :src="`/data/blog-summary/items/${d.name}.svg`" alt="" loading="lazy" draggable="false" />
          </div>
        </div>
      </div>
      <div class="md:w-1/2 flex flex-col items-center md:items-start gap-3">
        <h2 class="text-3xl md:text-4xl font-black tracking-tight">
          Blog posts
        </h2>
        <p class="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          When i'm not writing code, <br class="block md:hidden" />
          I like to write about tech.
        </p>
        <ul class="w-full min-w-0 py-6 flex flex-col items-center md:items-start gap-3 md:gap-4">
          <li
            v-for="post in posts"
            :key="post.slug"
            class="w-full max-w-full text-base md:text-lg lg:text-xl flex items-baseline justify-center md:justify-start gap-2"
          >
            <nuxt-link
              :to="'/blog/' + post.slug"
              :title="post.title"
              class="truncate font-medium hand-drawn-underline-hover hover:text-green-600 dark:hover:text-green-400"
            >
              {{ post.title }}
            </nuxt-link>
            <span class="shrink-0 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {{ dateFormat(new Date(post.date), "monthAndYear") }}
            </span>
          </li>
        </ul>
        <nuxt-link :to="'/blog'" class="view-button">
          <HandDrawnShape variant="pill" :hover-morph="true" color="#3b82f6" />
          <span class="view-button-text">See all {{ totalCount }} posts</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.blog-summary {
  background: #ebfff585;
}

:deep(html.dark) .blog-summary,
.dark .blog-summary {
  @apply bg-gray-900;
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
  color: #1d4ed8;
}

:deep(.dark) .view-button-text,
.dark .view-button-text {
  color: #93c5fd;
}

/* --- doodle collage ------------------------------------------------------ */
/* Emulates the old `background: right center / contain` box: full width of
   the half-column, original canvas aspect ratio, vertically centered. */
.doodle-canvas {
  position: absolute;
  right: 0;
  top: 50%;
  translate: 0 -50%;
  width: 100%;
  aspect-ratio: 1326.23 / 800;
}

.doodle {
  position: absolute;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  /* `scale` is a standalone property, so the press squish composes with the
     scroll-driven `transform` animation instead of overriding it */
  transition: scale 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.doodle:active {
  scale: 0.85;
  transition-duration: 0.1s;
}

.doodle img {
  display: block;
  width: 100%;
  height: 100%;
  filter: hue-rotate(var(--hue, 0deg));
  transition: filter 0.45s ease;
}

/* Idle motion (time-based, runs everywhere) — on the <img> so it composes
   with the scroll-driven transform on the wrapper. */
@keyframes doodle-float {
  from { transform: translateY(0); }
  to { transform: translateY(-12px); }
}
@keyframes doodle-sway {
  from { transform: rotate(-3deg); }
  to { transform: rotate(3deg); }
}
@keyframes doodle-breathe {
  from { transform: scale(1); }
  to { transform: scale(1.06); }
}
@keyframes doodle-buzz {
  0%, 92%, 97%, 100% { transform: translateX(0); }
  93%, 95% { transform: translateX(-3px); }
  94%, 96% { transform: translateX(3px); }
}

.doodle--paper img { animation: doodle-float 5s ease-in-out -1s infinite alternate; }
.doodle--sdcard img { animation: doodle-float 4s ease-in-out -2s infinite alternate; }
.doodle--notebook img { animation: doodle-float 6s ease-in-out -0.5s infinite alternate; }
.doodle--coffee img { animation: doodle-sway 3.5s ease-in-out -0.25s infinite alternate; }
.doodle--phone img { animation: doodle-buzz 8s linear infinite; }
.doodle--plant img { animation: doodle-breathe 4.5s ease-in-out -1.5s infinite alternate; }
.doodle--pencils img { animation: doodle-sway 4.5s ease-in-out -2.5s infinite alternate; }
.doodle--laptop img { animation: doodle-float 8s ease-in-out -3s infinite alternate; }
.doodle--pencil img { animation: doodle-sway 4s ease-in-out -1.25s infinite alternate; }
.doodle--pen img { animation: doodle-sway 4s ease-in-out -0.75s infinite alternate; }
.doodle--camera img { animation: doodle-float 5s ease-in-out -2.25s infinite alternate; }
.doodle--glasses img { animation: doodle-sway 4s ease-in-out -1.75s infinite alternate; }
.doodle--watch img { animation: doodle-float 4.5s ease-in-out -2.75s infinite alternate; }
.doodle--headphones img { animation: doodle-sway 6.5s ease-in-out -3.5s infinite alternate; }
.doodle--notepad img { animation: doodle-float 5.5s ease-in-out -1.5s infinite alternate; }
.doodle--tablet img { animation: doodle-float 6s ease-in-out -1s infinite alternate; }

/* Scroll-driven parallax: as the section crosses the viewport each item
   drifts by its own --drift distance, creating depth. Progressive
   enhancement — browsers without scroll timelines just skip it. */
@supports (animation-timeline: view()) {
  @keyframes doodle-parallax {
    from { transform: translateY(calc(var(--drift) * 1px)); }
    to { transform: translateY(calc(var(--drift) * -1px)); }
  }
  .doodle {
    animation: doodle-parallax linear both;
    animation-timeline: view();
    animation-range: cover 0% cover 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .doodle,
  .doodle img {
    animation: none;
  }
}
</style>
