<template>
  <div class="mx-auto max-w-[1440px] pb-16 sm:pb-20 lg:pb-0">
    <div class="lg:grid lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
      <!-- Left: stays put while the projects scroll past on the right -->
      <aside
        class="relative px-5 sm:px-8 lg:px-12 pb-12 lg:py-0 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center"
      >
        <p
          class="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-6"
        >
          Sandeep Ramgolam
          <span class="text-gray-500 dark:text-gray-400"
            >/ Things I've built</span
          >
        </p>
        <h1
          class="font-black tracking-tight leading-[0.95] text-5xl sm:text-6xl mb-6"
        >
          Projects
        </h1>
        <p
          class="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6"
        >
          Some projects I helped build: open data about Mauritius, community
          websites, client work and experiments in the browser.
        </p>
        <p
          class="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-8"
        >
          {{ shown.length }} projects · {{ activeCount }} still running · since
          {{ firstYear }}
        </p>
        <div class="flex flex-wrap gap-3">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener"
            class="sidebar-link"
          >
            <HandDrawnShape
              variant="pill"
              :hover-morph="true"
              color="#22c55e"
            />
            <span class="sidebar-link-text">{{ link.label }}</span>
          </a>
        </div>

        <!-- hand-drawn divider between the columns -->
        <svg
          class="divider hidden lg:block"
          viewBox="0 0 10 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M5 0 Q2 8 5 16 T5 33 Q8 41 5 50 T5 66 Q2 75 5 83 T5 100"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </aside>

      <!-- Right: the page itself scrolls; the row in the middle is in focus -->
      <div
        class="px-5 sm:px-8 lg:pl-16 lg:pr-12 lg:py-[40vh] flex flex-col gap-16 lg:gap-28"
      >
        <ProjectFeedItem
          v-for="project in shown"
          :key="project.name"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { projects } from "~/data/projects/index";

const shown = projects.filter((project) => project.featured);
const activeCount = shown.filter((p) => p.status === "active").length;
const firstYear = Math.min(...shown.map((p) => Number(p.started.slice(0, 4))));

const links = [
  { label: "GitHub", href: "https://github.com/MrSunshyne" },
  { label: "Data projects", href: "https://data.ramgolam.com/" },
];

useHead({
  title: "Work & Projects",
  meta: [
    {
      hid: "text",
      name: "text",
      content: "A summary my professional contribution to the tech world",
    },
    { hid: "og:type", property: "og:type", content: "page" },
    {
      hid: "og:title",
      property: "og:title",
      content: "Work & Projects | Sandeep Ramgolam",
    },
    {
      hid: "og:text",
      property: "og:text",
      content: "A summary my professional contribution to the tech world",
    },
    {
      hid: "og:description",
      property: "og:description",
      content: "A summary my professional contribution to the tech world",
    },
    {
      hid: "og:url",
      property: "og:url",
    },
  ],
});

defineOgImage("GenericTemplate");
</script>

<style scoped>
.divider {
  position: absolute;
  top: 10vh;
  right: 0;
  width: 10px;
  height: 80vh;
  color: #d1d5db;
  overflow: visible;
}

.dark .divider {
  color: #475569;
}

.sidebar-link {
  position: relative;
  display: inline-block;
  padding: 10px 24px;
  transition: transform 0.3s ease-out;
}

.sidebar-link:hover {
  transform: translateY(-2px);
}

.sidebar-link-text {
  position: relative;
  z-index: 1;
  font-weight: 700;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #166534;
}

.dark .sidebar-link-text {
  color: #86efac;
}
</style>
