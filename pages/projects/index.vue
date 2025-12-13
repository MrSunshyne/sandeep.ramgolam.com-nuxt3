<template>
  <div class="contain">
    <h1 class="page-title">Projects</h1>
    <p class="page-subtitle">Some projects I help built</p>
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
                <h2 class="text-2xl sm:text-3xl font-black">{{ project.name }}</h2>
                <p v-if="project.text" class="text-gray-600 dark:text-gray-300 mt-2">{{ project.text }}</p>
                <div class="pt-2 pb-5">
                  <div class="text-md sm:text-xl font-medium">
                    <span v-for="role in project.role" :key="role">{{
                      role
                    }}</span>
                    @ {{ project.company }}
                  </div>
                  <div class="uppercase text-xs py-2 text-gray-500 dark:text-gray-400">
                    <span v-for="tech in project.tech" :key="tech"
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
  grid-gap: 50px;
}

.project-card {
  position: relative;
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

@media (min-width: 640px) {
  .project-content {
    .details-container {
      padding: 0 15px;
    }
  }
}

@media (min-width: 1024px) {
  .project-content {
    display: grid;
    grid-gap: 30px;
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
