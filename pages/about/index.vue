<template>
  <div class="container work-page pb-16 sm:pb-20">
    <div class="flex items-center gap-3 print:hidden mb-6 sm:mb-8">
      <button
        class="border-2 px-4 py-2 bg-green-500 text-white uppercase text-xs sm:text-sm font-bold rounded hover:bg-green-600 transition-colors"
        @click="print"
      >
        Print
      </button>
      <p class="uppercase text-xs text-gray-600 dark:text-gray-400">This page is also my printable CV</p>
    </div>
    <div class="print:block">
      <h1 class="font-bold text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">Sandeep Ramgolam</h1>
      <p class="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8 sm:mb-12">
        Technologist, Mauritian, who loves programming, UX design, Linux, &amp;
        nature.
      </p>
      <div class="grid lg:grid-cols-[2fr,1fr] gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16">
        <div class="space-y-4 sm:space-y-5 text-base sm:text-lg leading-relaxed">
          <p class="font-bold text-lg sm:text-xl">
            Passionate front-end developer based in Mauritius.
          </p>
          <p>
            <a class="underline print:no-underline hover:opacity-80 font-bold" target="_blank" href="https://developers.google.com/profile/u/sandeepramgolam">Google Developer Expert in Web Technologies.</a> <a class="underline print:no-underline hover:opacity-80 print:hidden" href="https://developers.google.com/community/experts" target="_blank"><span>What is a GDE?</span></a>
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

        <div class="text-sm sm:text-base space-y-2 sm:space-y-3 pt-2">
          <div>
            <span class="uppercase text-xs text-gray-500 dark:text-gray-400">email: </span
            ><span class="break-all">sandeep@ramgolam.com</span>
          </div>
          <div>
            <span class="uppercase text-xs text-gray-500 dark:text-gray-400">website: </span
            ><span class="break-all">https://sandeep.ramgolam.com</span>
          </div>
          <div>
            <span class="uppercase text-xs text-gray-500 dark:text-gray-400">github: </span
            ><span class="break-all">https://github.com/MrSunshyne</span>
          </div>
          <div><span class="uppercase text-xs text-gray-500 dark:text-gray-400">mob: </span>57083334</div>
          <div class="pt-2 text-gray-600 dark:text-gray-400">Driver, Blogger & Gamer</div>
        </div>
      </div>
    </div>
    <section class="mb-12 sm:mb-16">
      <h2 class="page-title">My tech stack</h2>
      <p class="page-subtitle">This is what I've been using lately</p>

      <div class="mt-6 sm:mt-8">
        <div class="space-y-5 sm:space-y-6">
          <div
            v-for="item in stack"
            :key="item.title"
            class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0"
          >
            <div class="font-bold tracking-wide text-sm sm:text-base text-gray-600 dark:text-gray-400 sm:pr-6 sm:w-44">
              {{ item.title }}
            </div>
            <div
              class="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white text-black"
            >
              {{ item.tech }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-12 sm:mb-16">
      <h2 class="page-title">Career</h2>
      <p class="page-subtitle">The places I had the opportunity to contribute</p>

      <div class="mt-6 sm:mt-8">
        <div class="space-y-6 sm:space-y-7">
          <div
            v-for="(job, index) in employment"
            :key="job.job_title + index"
            class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0"
          >
            <div class="font-bold tracking-wide text-sm sm:text-base text-gray-600 dark:text-gray-400 sm:pr-6 sm:w-64 flex-shrink-0">
              {{ job.date_start }} - {{ job.date_end }}
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <component
                :is="job.company_website ? 'a' : 'div'"
                :href="job.company_website ? job.company_website : ''"
                class="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white text-black"
                :class="job.company_website ? 'hover:underline' : ''"
              >
                {{ job.company }}
                <Icon
                  v-if="job.company_website"
                  name="solar:link-bold"
                  class="ml-1 text-base sm:text-lg"
                />
              </component>
              <div
                class="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400"
              >
                // {{ job.job_title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-12 sm:mb-16">
      <h2 class="page-title">Education</h2>

      <div class="mt-6 sm:mt-8">
        <div class="space-y-6 sm:space-y-7">
          <div
            v-for="item in education"
            :key="item.title"
            class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0"
          >
            <div class="font-bold tracking-wide text-sm sm:text-base text-gray-600 dark:text-gray-400 sm:pr-6 sm:w-24 flex-shrink-0">{{ item.year }}</div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div
                class="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white text-black"
              >
                {{ item.title }}
              </div>
              <div
                class="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400"
              >
                // {{ item.institution }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-12 sm:mb-16">
      <h2 class="page-title page-break-before">Projects</h2>
      <p class="page-subtitle">Some projects I help built</p>

      <div class="mt-6 sm:mt-8">
        <div class="space-y-8 sm:space-y-10">
          <div v-for="project in projects" :key="project.name">
            <div class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold">
                {{ project.name }}
              </h3>
              <a
                class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 uppercase tracking-wider text-xs sm:text-sm font-bold print:hidden transition-colors"
                :href="project.url"
                target="_blank"
                >View Project →</a
              >
            </div>

            <p class="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed">{{ project.text }}</p>
            <div class="flex flex-wrap gap-2 items-center">
              <div class="hidden print:inline uppercase text-xs text-gray-500 dark:text-gray-400 mr-1">
                Tech Stack:
              </div>
              <div
                v-for="(tech, index) in project.tech"
                :key="index"
                class="bg-blue-100 dark:bg-gray-800 px-3 py-1.5 text-xs sm:text-sm rounded-full dark:text-gray-300 font-medium"
              >
                {{ tech }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="flex items-center gap-3 print:hidden mt-8 sm:mt-12">
      <button
        class="border-2 px-4 py-2 bg-green-500 text-white uppercase text-xs sm:text-sm font-bold rounded hover:bg-green-600 transition-colors"
        @click="print"
      >
        Print
      </button>
      <p class="uppercase text-xs text-gray-600 dark:text-gray-400">This page is also my printable CV</p>
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

<style>
.page-break-before {
  page-break-before: left;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

@media (min-width: 640px) {
  .page-title {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }
}

@media (min-width: 1024px) {
  .page-title {
    font-size: 3rem;
  }
}

.page-subtitle {
  font-size: 1.125rem;
  font-weight: 400;
  color: #6b7280;
  margin-bottom: 0;
}

@media (min-width: 640px) {
  .page-subtitle {
    font-size: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .page-subtitle {
    font-size: 1.5rem;
  }
}

html.dark .page-subtitle {
  color: #9ca3af;
}
</style>
