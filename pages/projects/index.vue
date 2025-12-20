<template>
  <div class="contain pb-16 sm:pb-20">
    <h1 class="page-title mb-3 sm:mb-4">Projects</h1>
    <p class="page-subtitle mb-10 sm:mb-12">Some projects I help built</p>
    <div v-if="projects" class="projects-wrapper">
      <TransitionGroup name="fade">
        <template v-for="(project, index) in projects" :key="project.name">
          <div v-if="project.featured" class="project-card">
            <div class="project-content">
              <!-- SVG clip path definition for organic image shape -->
              <svg class="absolute w-0 h-0" aria-hidden="true">
                <defs>
                  <clipPath :id="`project-page-clip-${index}`" clipPathUnits="objectBoundingBox">
                    <path d="M0.02 0.04 Q0.01 0.02 0.03 0.01 L0.05 0.02 Q0.15 0 0.3 0.02 T0.6 0 Q0.8 0.02 0.95 0.01 Q0.98 0 0.99 0.03 Q1 0.06 0.99 0.12 L0.99 0.2 Q1 0.35 0.99 0.5 T1 0.75 Q0.99 0.88 0.99 0.94 Q1 0.98 0.97 0.99 Q0.94 1 0.88 0.99 L0.8 0.99 Q0.6 1 0.4 0.98 T0.12 1 Q0.05 0.99 0.03 0.99 Q0 0.98 0.01 0.94 Q0 0.88 0.01 0.75 L0.01 0.6 Q0 0.4 0.01 0.25 T0 0.1 Q0.01 0.06 0.02 0.04 Z" />
                  </clipPath>
                </defs>
              </svg>
              <div class="image-container" :style="`clip-path: url(#project-page-clip-${index})`">
                <img
                  :src="'/data/projects/' + project.thumbnail"
                  :alt="project.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                class="details-container text-center sm:text-left flex flex-col justify-center"
              >
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{{ project.name }}</h2>
                <p v-if="project.text" class="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-5">{{ project.text }}</p>
                <div class="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                  <div class="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">
                    <span v-for="role in project.role" :key="role">{{
                      role
                    }}</span>
                    @ {{ project.company }}
                  </div>
                  <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <span
                      v-for="tech in project.tech"
                      :key="tech"
                      class="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
                    >{{ tech }}</span>
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
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { projects } from "~/data/projects/index";

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

defineOgImageComponent("GenericTemplate");
</script>

<style scoped>
@reference "tailwindcss";

.projects-wrapper {
  display: grid;
  gap: 40px;
}

@media (min-width: 640px) {
  .projects-wrapper {
    gap: 50px;
  }
}

@media (min-width: 1024px) {
  .projects-wrapper {
    gap: 60px;
  }
}

.project-card {
  position: relative;
}

.view-button {
  position: relative;
  display: inline-block;
  padding: 12px 32px;
  transition: transform 0.3s ease-out;
}

.view-button:hover {
  transform: translateY(-2px);
}

.view-button-text {
  position: relative;
  z-index: 1;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  color: #166534;
}

@media (min-width: 640px) {
  .view-button-text {
    font-size: 1rem;
  }
}

:deep(.dark) .view-button-text,
.dark .view-button-text {
  color: #86efac;
}

.project-content {
  position: relative;
  z-index: 1;
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.3s ease-out;
}

.project-content:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

@media (min-width: 640px) {
  .project-content {
    padding: 32px;
  }
}

@media (min-width: 1024px) {
  .project-content {
    padding: 40px;
  }
}

:deep(.dark) .project-content,
.dark .project-content {
  background: #1f2937;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

:deep(.dark) .project-content:hover,
.dark .project-content:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.image-container {
  margin: 12px;
  margin-bottom: 0;
  background: #e5e7eb;
  transition: background 0.3s ease-out;
}

@media (min-width: 640px) {
  .image-container {
    margin: 16px;
    margin-bottom: 0;
  }
}

:deep(.dark) .image-container,
.dark .image-container {
  background: #374151;
}

@media (min-width: 640px) {
  .project-content {
    .details-container {
      padding: 0 20px;
    }
  }
}

@media (min-width: 1024px) {
  .project-content {
    display: grid;
    gap: 40px;
    grid-template-columns: 3fr 2fr;
    grid-template-areas: "left right";

    .image-container {
      grid-area: left;
    }

    .details-container {
      grid-area: right;
      padding: 0;
    }
  }

  .project-card:nth-child(odd) .project-content {
    grid-template-columns: 2fr 3fr;

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
