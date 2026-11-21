<script setup lang="ts">
import { projects } from "~/data/projects";

// The newest few, in the order the projects page lists them
const featured = projects.filter((p) => p.featured);
const latest = featured.slice(0, 4);
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
      </div>

      <div class="text-center mt-12 lg:hidden">
        <NuxtLink to="/projects" class="view-all inline-block">
          <HandDrawnShape variant="pill" :hover-morph="true" color="#22c55e" />
          <span class="view-all-text"
            >See all {{ featured.length }} projects</span
          >
        </NuxtLink>
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
</style>
