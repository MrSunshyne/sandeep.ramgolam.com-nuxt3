<template>
  <div class="dark:darkest-bg">
    <div class="project-container mx-auto">
      <h2 class="text-3xl font-black pt-10 text-center">Projects</h2>
      <p class="text-md text-gray-700 dark:text-gray-300 text-center">
        Some projects I helped build
      </p>
      <div v-if="projects" class="projects-wrapper">
        <template v-for="(project, index) in projects">
          <div class="project" v-if="project.featured" data-aos="fade-left">
            <div class="image-container">
              <img
                :src="'/data/projects/' + project.thumbnail"
                loading="lazy"
                :alt="project.name"
                :title="project.name"
                width="500"
                height="250"
              />
            </div>
            <div
              class="details-container text-center sm:text-left flex flex-col justify-center"
            >
              <h2 class="text-2xl sm:text-3xl font-bold">{{ project.name }}</h2>
              <p v-if="project.text">{{ project.text }}</p>
              <div class="pt-2 pb-5">
                <div class="text-md">
                  <span v-for="role in project.role">{{ role }}</span>
                  | {{ project.company }}
                </div>
                <div class="uppercase text-xs py-2 text-gray-800 dark:text-gray-500">
                  <span v-for="tech in project.tech">{{ tech }} / &nbsp;</span>
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
                  rel="noopener"
                  class="py-2 px-5 sm:py-3 sm:px-10 bg-green-300 text-green-800 hover:bg-green-400 hover:text-green-800 font-bold uppercase text-sm shadow rounded"
                  >View</a
                >
              </div>
            </div>
          </div>
        </template>
        <nuxt-link
          :to="'/projects'"
          class="text-center mx-auto py-2 px-5 sm:py-3 sm:px-10 bg-green-300 text-green-800 hover:bg-green-400 hover:text-green-800 font-bold uppercase text-sm shadow rounded"
        >
          View all projects
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
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

@screen sm {
  .project {
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

  .project:nth-child(odd) {
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

<script>
import { projects } from "../data/projects";
export default {
  data() {
    return {
      projects: projects.filter((project) => project.featured == true),
    };
  },
};
</script>
