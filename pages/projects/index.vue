<template>
  <div class="contain">
    <!-- <OgImageStatic component="OgImageGeneric" /> -->

    <h1 class="page-title">Projects</h1>
    <p class="page-subtitle">Some projects I help built</p>
    <div v-if="projects" class="projects-wrapper">
      <TransitionGroup name="fade">
        <template v-for="project in projects" :key="project.name">
          <div v-if="project.featured" class="project">
            <div class="image-container">
              <img
                :src="'/data/projects/' + project.thumbnail"
                alt="Photo of project"
              />
            </div>
            <div
              class="details-container text-center sm:text-left flex flex-col justify-center"
            >
              <h2 class="text-2xl sm:text-3xl font-bold">{{ project.name }}</h2>
              <p v-if="project.text">{{ project.text }}</p>
              <div class="pt-2 pb-5">
                <div class="text-md sm:text-xl">
                  <span v-for="role in project.role" :key="role">{{
                    role
                  }}</span>
                  @ {{ project.company }}
                </div>
                <div class="uppercase text-xs py-2">
                  <span v-for="tech in project.tech" :key="tech"
                    >{{ tech }} / &nbsp;</span
                  >
                </div>
                <!-- <div>{{ project.year}}</div> -->
              </div>
              <!-- <p>{{project.role }}</p>
          <p>{{project.year }}</p>
          <p>{{project.company }}</p>-->
              <div>
                <a
                  :href="project.url"
                  target="_blank"
                  class="py-2 px-5 sm:py-3 sm:px-10 bg-green-300 text-green-800 hover:bg-green-400 hover:text-green-800 font-bold uppercase text-sm shadow rounded"
                  >View</a
                >
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
  /*@apply px-10;*/
}

@media (min-width: 640px) {
  .project {
    .details-container {
      padding: 0 15px;
    }
  }
}

@media (min-width: 1024px) {
  .project {
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

  .project:nth-child(odd) {
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
