<template>
  <div class="dark:darkest-bg py-16">
    <div class="project-container mx-auto px-4">
      <h2 class="text-3xl font-black pt-10 text-center">Projects</h2>
      <p class="text-md text-gray-700 dark:text-gray-300 text-center">
        Some projects I helped build
      </p>
      <div v-if="featuredProjects" class="projects-wrapper">
        <template v-for="(project, index) in featuredProjects" :key="project.name">
          <div class="project-card">
            <div class="project-content">
              <!-- SVG clip path definition for organic image shape -->
              <svg class="absolute w-0 h-0" aria-hidden="true">
                <defs>
                  <clipPath :id="`home-project-clip-${index}`" clipPathUnits="objectBoundingBox">
                    <path d="M0.02 0.04 Q0.01 0.02 0.03 0.01 L0.05 0.02 Q0.15 0 0.3 0.02 T0.6 0 Q0.8 0.02 0.95 0.01 Q0.98 0 0.99 0.03 Q1 0.06 0.99 0.12 L0.99 0.2 Q1 0.35 0.99 0.5 T1 0.75 Q0.99 0.88 0.99 0.94 Q1 0.98 0.97 0.99 Q0.94 1 0.88 0.99 L0.8 0.99 Q0.6 1 0.4 0.98 T0.12 1 Q0.05 0.99 0.03 0.99 Q0 0.98 0.01 0.94 Q0 0.88 0.01 0.75 L0.01 0.6 Q0 0.4 0.01 0.25 T0 0.1 Q0.01 0.06 0.02 0.04 Z" />
                  </clipPath>
                </defs>
              </svg>
              <div class="image-container" :style="`clip-path: url(#home-project-clip-${index})`">
                <img
                  :src="'/data/projects/' + project.thumbnail"
                  loading="lazy"
                  :alt="project.name"
                  :title="project.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                class="details-container text-center sm:text-left flex flex-col justify-center"
              >
                <h2 class="text-2xl sm:text-3xl font-black">{{ project.name }}</h2>
                <p v-if="project.text" class="text-gray-600 dark:text-gray-300 mt-2">{{ project.text }}</p>
                <div class="pt-2 pb-5">
                  <div class="text-md font-medium">
                    <span v-for="role in project.role" :key="'role' + role">{{
                      role
                    }}</span>
                    | {{ project.company }}
                  </div>
                  <div
                    class="uppercase text-xs py-2 text-gray-500 dark:text-gray-400"
                  >
                    <span v-for="tech in project.tech" :key="'tech' + tech"
                      >{{ tech }} / &nbsp;</span
                    >
                  </div>
                </div>
                <div>
                  <a
                    :href="project.url"
                    target="_blank"
                    rel="noopener"
                    class="view-button"
                  >
                    <HandDrawnShape variant="pill" :hover-morph="true" color="#22c55e" />
                    <span class="view-button-text">View</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="text-center">
          <nuxt-link
            to="/projects"
            class="view-button inline-block"
          >
            <HandDrawnShape variant="pill" :hover-morph="true" color="#22c55e" />
            <span class="view-button-text">View all projects</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { projects } from "~/data/projects";

const featuredProjects = computed(() => projects.filter(p => p.featured));
</script>

<style scoped>
@reference "tailwindcss";

.darkest-bg {
  background: #111;
}

.project-container {
  max-width: 1000px;
}

.projects-wrapper {
  display: grid;
  grid-gap: 50px;
  @apply my-10;
}

.project-card {
  position: relative;
}

.project-content {
  position: relative;
  z-index: 1;
  background: white;
  padding: 20px;
  border-radius: 6px;
}

:deep(.dark) .project-content,
.dark .project-content {
  background: #1f2937;
}

.image-container {
  margin: 8px;
  margin-bottom: 0;
  background: #e5e7eb;
}

:deep(.dark) .image-container,
.dark .image-container {
  background: #374151;
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
  color: #166534;
}

:deep(.dark) .view-button-text,
.dark .view-button-text {
  color: #86efac;
}

@media (min-width: 640px) {
  .project-content {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "left right";

    .image-container {
      grid-area: left;
    }

    .details-container {
      grid-area: right;
    }
  }

  .project-card:nth-child(odd) .project-content {
    grid-template-columns: 1fr 1fr;

    .image-container {
      grid-area: right;
    }

    .details-container {
      grid-area: left;
      text-align: right;
    }
  }
}
</style>
