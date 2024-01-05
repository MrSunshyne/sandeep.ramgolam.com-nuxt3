<template>
  <div class="container work-page pb-10">
    <div class="flex items-center print:hidden">
      <button
        class="border-2 p-2 bg-green-500 text-white uppercase text-sm font-bold"
        @click="print"
      >
        Print
      </button>
      <p class="uppercase text-xs pl-2">This page is also my printable CV</p>
    </div>
    <div class="mt-4 print:block">
      <div class="font-bold text-4xl">Sandeep Ramgolam</div>
      <div>
        Technologist, Mauritian, who loves programming, UX design, Linux, &amp;
        nature.
      </div>
      <div class="py-10 text-lg lg:flex space-x-10 leading-loose">
        <div>
          <p class="font-bold">
            Passionate front-end developer based in Mauritius.
          </p>
          <p>
            In my free time I teach, contribute to open source and write on my
            blog.
          </p>
          <p>
            I keep up with the industry trends and help to level up my team
            whenever necesary.
          </p>
          <p>
            Working in the web development sphere for a decade and counting.
          </p>
        </div>

        <div class="text-sm">
          <div>
            <span class="uppercase text-xs">email: &nbsp;</span
            >sandeep@ramgolam.com
          </div>
          <div>
            <span class="uppercase text-xs">website:&nbsp;</span
            >https://sandeep.ramgolam.com
          </div>
          <div>
            <span class="uppercase text-xs">github:&nbsp;</span
            >https://github.com/MrSunshyne
          </div>
          <div><span class="uppercase text-xs">mob:&nbsp;</span>57083334</div>
          <div>Driver, Blogger & Gamer</div>
        </div>
      </div>
    </div>
    <h2 class="page-title">Tech Stack</h2>
    <p class="page-subtitle">This is what I've been using lately</p>

    <div
      class="block md:flex flex-col flex-wrap justify-center sm:justify-start my-4"
    >
      <div class="dark:text-gray-500">
        <div
          v-for="item in stack"
          :key="item.title"
          class="pt-5 block print:flex md:flex items-center"
        >
          <div class="font-bold tracking-widest pr-4 w-40">
            {{ item.title }}
          </div>
          <div
            class="employer text-lg md:text-2xl font-black print:font-bold print:text-lg dark:text-white text-black"
          >
            {{ item.tech }}
          </div>
          <!-- <div
                class="job-title text-lg md:text-2xl print:font-normal print:text-lg md:pl-2"
              >
                // {{ item.tech }}
          </div>-->
        </div>
      </div>
    </div>

    <h2 class="page-title">Where I've Worked</h2>
    <p class="page-subtitle">The places I had the opportunity to contribute</p>
    <div
      class="block md:flex flex-col flex-wrap justify-center sm:justify-start my-4"
    >
      <div class="dark:text-gray-500">
        <div
          v-for="(job, index) in employment"
          :key="job.job_title + index"
          class="pt-5 block print:flex md:flex items-center"
        >
          <div class="font-bold tracking-widest pr-4 w-56">
            {{ job.date_start }} - {{ job.date_end }}
          </div>
          <component
            :is="job.company_website ? 'a' : 'div'"
            :href="job.company_website ? job.company_website : ''"
            class="employer text-lg md:text-2xl font-black print:font-bold print:text-lg dark:text-white text-black"
            :class="job.company_website ? 'hover:underline' : ''"
          >
            {{ job.company }}
            <Icon
              v-if="job.company_website"
              name="solar:link-bold"
              class="ml-1 text-base"
            />
          </component>
          <div
            class="job-title text-lg md:text-2xl print:font-normal print:text-lg md:pl-2"
          >
            // {{ job.job_title }}
          </div>
        </div>
      </div>
    </div>

    <h2 class="page-title">Education</h2>
    <div
      class="block md:flex flex-col flex-wrap justify-center sm:justify-start my-4"
    >
      <div class="dark:text-gray-500">
        <div
          v-for="item in education"
          :key="item.title"
          class="pt-5 block print:flex md:flex items-center"
        >
          <div class="font-bold tracking-widest pr-4 w-20">{{ item.year }}</div>
          <div
            class="employer text-lg md:text-2xl font-black print:font-bold print:text-lg dark:text-white text-black"
          >
            {{ item.title }}
          </div>
          <div
            class="job-title text-lg md:text-2xl print:font-normal print:text-lg md:pl-2"
          >
            // {{ item.institution }}
          </div>
        </div>
      </div>
    </div>

    <h2 class="page-title page-break-before">Projects</h2>
    <p class="page-subtitle">Some projects I help built</p>
    <div class="flex flex-col flex-wrap justify-center sm:justify-start my-4">
      <div v-for="project in projects" :key="project.name" class="pb-5">
        <div class="text-lg md:text-2xl font-bold">
          {{ project.name }}
          <a
            class="text-blue-500 uppercase tracking-wider text-sm print:hidden"
            :href="project.url"
            target="_blank"
            >View</a
          >
        </div>

        <div class="text-sm md:text-xl pr-2">{{ project.text }}</div>
        <div class="hidden print:flex sm:flex items-center text-gray-800">
          <div class="hidden print:inline uppercase text-xs pr-2">
            Tech Stack :
          </div>
          <div
            v-for="(tech, index) in project.tech"
            :key="index"
            class="pr-2 mr-2 bg-blue-200 dark:bg-gray-900 px-2 py-1 text-xs rounded dark:text-gray-300"
          >
            {{ tech }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center print:hidden">
      <button
        class="border-2 p-2 bg-green-500 text-white uppercase text-sm font-bold"
        @click="print"
      >
        Print
      </button>
      <p class="uppercase text-xs pl-2">This page is also my printable CV</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { employment, education, stack } from "@/data/experience";
import { projects } from "@/data/projects/";

function print() {
  window.print();
}

useHead({
  title: "Sandeep Ramgolam",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "A summary my professional contribution to the tech world",
    },
    { hid: "og:type", property: "og:type", content: "page" },
    {
      hid: "og:title",
      property: "og:title",
      content: "Work & Projects | Sandeep Ramgolam",
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
.page-break-before {
  page-break-before: left;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-top: 2em;
}

.page-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
}
</style>
