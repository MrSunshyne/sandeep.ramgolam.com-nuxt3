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
      <h1 class="font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">Sandeep Ramgolam</h1>
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
              class="text-lg sm:text-xl lg:text-2xl font-bold dark:text-white text-black"
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
                class="text-lg sm:text-xl lg:text-2xl font-bold dark:text-white text-black"
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
                class="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400"
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
                class="text-lg sm:text-xl lg:text-2xl font-bold dark:text-white text-black"
              >
                {{ item.title }}
              </div>
              <div
                class="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400"
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
      <p class="page-subtitle">Some projects I helped build</p>

      <div class="mt-6 sm:mt-8 space-y-8 sm:space-y-10">
        <div v-for="group in projectGroups" :key="group.label">
          <h3 class="uppercase text-xs font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
            {{ group.label }}
          </h3>
          <div class="space-y-3 sm:space-y-4">
          <div
            v-for="project in group.projects"
            :key="project.name"
            class="flex items-baseline gap-3 min-w-0"
          >
            <h4 class="shrink-0 text-base sm:text-lg font-bold">
              <span
                class="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
                :class="project.status === 'active' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
                :title="project.status === 'active' ? 'Actively maintained' : 'Archived'"
              ></span>
              <a
                :href="project.url"
                target="_blank"
                rel="noopener"
                class="hover:underline print:no-underline"
              >
                {{ project.name }}
                <Icon name="solar:link-bold" class="text-sm text-gray-400 print:hidden" />
              </a>
            </h4>
            <p class="truncate text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {{ project.text }}
            </p>
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

const projectGroups = [
  { label: "Actively maintained", projects: projects.filter(p => p.status === "active") },
  { label: "Archived", projects: projects.filter(p => p.status !== "active") },
].filter(group => group.projects.length > 0);

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

defineOgImage("GenericTemplate");
</script>

<style>
.page-break-before {
  page-break-before: left;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.375rem;
  line-height: 1.2;
}

@media (min-width: 640px) {
  .page-title {
    font-size: 1.875rem;
    margin-bottom: 0.5rem;
  }
}

@media (min-width: 1024px) {
  .page-title {
    font-size: 2.25rem;
  }
}

.page-subtitle {
  font-size: 1rem;
  font-weight: 400;
  color: #6b7280;
  margin-bottom: 0;
}

@media (min-width: 640px) {
  .page-subtitle {
    font-size: 1.125rem;
  }
}

html.dark .page-subtitle {
  color: #9ca3af;
}
</style>
