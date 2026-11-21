<script setup lang="ts">
import { projects } from "~/data/projects";

// The newest few, in the order the projects page lists them
const featured = projects.filter((p) => p.featured);
const latest = featured.slice(0, 4);

// The row after them points at the rest: a peek at what comes next, with the
// very next project on top of the pile (painted last)
const upNext = featured.slice(4, 7).reverse();
const firstYear = Math.min(
  ...featured.map((p) => Number(p.started.slice(0, 4))),
);

// SSR-stable id for the shared clipPath of the peek thumbnails
const clipId = `projects-cta-clip-${useId()}`;
</script>

<template>
  <section class="contain py-16 sm:py-24">
    <div
      class="lg:grid lg:grid-cols-[minmax(260px,340px)_minmax(0,1fr)] lg:gap-16"
    >
      <!-- stays beside the rows while they scroll past -->
      <div
        class="lg:sticky lg:top-[30vh] lg:self-start text-center lg:text-left mb-10 lg:mb-0"
      >
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none mb-4"
        >
          Projects
        </h2>
        <p
          class="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
        >
          Things I've built over the years, for work, for the community and for
          fun.
        </p>
        <NuxtLink to="/projects" class="view-all hidden lg:inline-block">
          <HandDrawnShape variant="pill" :hover-morph="true" color="#22c55e" />
          <span class="view-all-text"
            >See all {{ featured.length }} projects</span
          >
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-16 lg:gap-24 lg:py-[10vh]">
        <ProjectFeedItem
          v-for="project in latest"
          :key="project.name"
          :project="project"
          compact
        />

        <!-- Not a project: the way to the rest of them -->
        <article class="cta-item">
          <NuxtLink to="/projects" class="cta-link group">
            <div class="cta-info">
              <p
                class="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400"
              >
                {{ featured.length - latest.length }} more since {{ firstYear }}
              </p>
              <h2
                class="text-3xl sm:text-4xl font-black tracking-tight leading-none transition-colors group-hover:text-green-600 dark:group-hover:text-green-400"
              >
                See all {{ featured.length }}
                <span class="whitespace-nowrap"
                  >projects
                  <Icon
                    name="solar:arrow-right-linear"
                    class="inline-block align-middle transition-transform group-hover:translate-x-1"
                /></span>
              </h2>
              <p
                class="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                Work, community and fun, newest first.
              </p>
            </div>

            <div class="cta-peek" aria-hidden="true">
              <svg class="absolute w-0 h-0">
                <defs>
                  <clipPath :id="clipId" clipPathUnits="objectBoundingBox">
                    <path
                      d="M0.02 0.04 Q0.01 0.02 0.03 0.01 L0.05 0.02 Q0.15 0 0.3 0.02 T0.6 0 Q0.8 0.02 0.95 0.01 Q0.98 0 0.99 0.03 Q1 0.06 0.99 0.12 L0.99 0.2 Q1 0.35 0.99 0.5 T1 0.75 Q0.99 0.88 0.99 0.94 Q1 0.98 0.97 0.99 Q0.94 1 0.88 0.99 L0.8 0.99 Q0.6 1 0.4 0.98 T0.12 1 Q0.05 0.99 0.03 0.99 Q0 0.98 0.01 0.94 Q0 0.88 0.01 0.75 L0.01 0.6 Q0 0.4 0.01 0.25 T0 0.1 Q0.01 0.06 0.02 0.04 Z"
                    />
                  </clipPath>
                </defs>
              </svg>
              <div
                v-for="project in upNext"
                :key="project.name"
                class="cta-card bg-gray-200 dark:bg-gray-700"
                :style="{ clipPath: `url(#${clipId})` }"
              >
                <NuxtImg
                  :src="'/data/projects/' + project.thumbnail"
                  alt=""
                  loading="lazy"
                  width="1024"
                  height="620"
                  sizes="60vw lg:400px"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.view-all {
  position: relative;
  padding: 12px 32px;
  transition: transform 0.3s ease-out;
}

.view-all:hover {
  transform: translateY(-2px);
}

.view-all-text {
  position: relative;
  z-index: 1;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  color: #166534;
}

.dark .view-all-text {
  color: #86efac;
}

/* Laid out like a ProjectFeedItem row so it reads as the last one */
.cta-link {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.cta-info {
  display: flex;
  flex-direction: column;
}

/* Three of the next projects, fanned like a hand of cards */
.cta-peek {
  position: relative;
  aspect-ratio: 1024 / 620;
}

.cta-card {
  position: absolute;
  inset: 12% 18%;
  transition: transform 0.4s ease-out;
}

.cta-card:nth-of-type(1) {
  transform: translateX(-18%) rotate(-6deg);
}

.cta-card:nth-of-type(2) {
  transform: translateX(18%) rotate(5deg);
}

.cta-card:nth-of-type(3) {
  transform: translateY(-4%) rotate(-1deg);
}

.cta-link:hover .cta-card:nth-of-type(1),
.cta-link:focus-visible .cta-card:nth-of-type(1) {
  transform: translateX(-24%) rotate(-8deg);
}

.cta-link:hover .cta-card:nth-of-type(2),
.cta-link:focus-visible .cta-card:nth-of-type(2) {
  transform: translateX(24%) rotate(7deg);
}

.cta-link:hover .cta-card:nth-of-type(3),
.cta-link:focus-visible .cta-card:nth-of-type(3) {
  transform: translateY(-8%) scale(1.04);
}

@media (min-width: 1024px) {
  .cta-link {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
    align-items: center;
    gap: 2.5rem;
  }

  .cta-info {
    align-items: flex-end;
    text-align: right;
  }
}

/* Same scroll focus as the project rows above it */
@media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .cta-item {
      animation: cta-focus linear both;
      animation-timeline: view();
      animation-range: cover 0% cover 100%;
      transform-origin: right center;
    }
  }
}

@keyframes cta-focus {
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
