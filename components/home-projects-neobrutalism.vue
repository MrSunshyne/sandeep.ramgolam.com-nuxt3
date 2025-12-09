<template>
  <div class="py-24 bg-[#fffdf5] dark:bg-black relative border-t-4 border-black dark:border-white overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="mb-20 text-center">
        <h2 class="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight inline-block relative">
            Featured Projects
            <div class="absolute -bottom-2 left-0 w-full h-4 bg-primary-400 -z-10 transform -rotate-1"></div>
        </h2>
        <p class="text-xl font-bold mt-4 font-mono dark:text-white">
            // A selection of my open source work
        </p>
      </div>

      <div class="space-y-24">
        <div 
          v-for="(project, index) in featuredProjects" 
          :key="project.name"
          class="group relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
            <!-- Image Card -->
            <div 
                class="relative z-10"
                :class="{ 'md:order-last': index % 2 === 1 }"
            >
                <a :href="project.url" target="_blank" class="block group-hover:-translate-y-1 transition-transform duration-300">
                    <div class="aspect-video overflow-hidden transition-all duration-300 relative">
                         <NuxtImg
                            :src="'/data/projects/' + project.thumbnail"
                            :alt="project.name"
                            class="w-full h-full object-cover"
                            loading="lazy"
                            width="800"
                        />
                    </div>
                </a>
            </div>

            <!-- Content Card -->
            <div class="bg-white dark:bg-gray-900 border-4 border-black dark:border-white p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative transition-transform hover:-translate-y-1">
                <!-- Tag -->
                <div class="absolute -top-5 -left-2 bg-primary-400 border-4 border-black dark:border-white px-4 py-1 text-black font-black uppercase text-sm transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {{ project.company }}
                </div>

                <div class="absolute -top-5 -right-2 bg-white dark:bg-gray-800 border-4 border-black dark:border-white px-2 py-1 text-black dark:text-white font-bold font-mono text-xs transform rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                    {{ project.year }}
                </div>

                <h3 class="text-2xl md:text-3xl font-black mb-4 uppercase mt-2 dark:text-white">
                    <a :href="project.url" target="_blank" class="hover:underline decoration-4 decoration-primary-500 underline-offset-4">{{ project.name }}</a>
                </h3>
                
                <div class="mb-6 font-mono text-xs md:text-sm border-y-2 border-black dark:border-white py-3 flex flex-wrap gap-2 bg-gray-50 dark:bg-gray-800">
                     <span v-for="t in project.tech" :key="t" class="bg-white dark:bg-black px-2 py-1 font-bold border border-black dark:border-white dark:text-white shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff]">
                        {{ t }}
                     </span>
                </div>

                <p class="text-lg font-bold mb-8 leading-tight dark:text-gray-200">
                    {{ project.text }}
                </p>

                <a 
                    :href="project.url" 
                    target="_blank"
                    class="inline-block w-full text-center bg-black dark:bg-white text-white dark:text-black font-black uppercase px-6 py-3 border-4 border-transparent hover:bg-primary-500 hover:text-black hover:border-black transition-all shadow-[4px_4px_0px_0px_#888] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
                >
                    View Project
                </a>
            </div>
        </div>
      </div>
      
       <div class="mt-24 text-center">
        <NuxtLink 
            to="/projects" 
            class="inline-block bg-white dark:bg-gray-800 text-black dark:text-white font-black text-xl px-12 py-4 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 transition-all hover:bg-primary-400 dark:hover:text-black"
        >
            View All Projects
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { projects } from "~/data/projects";

const featuredProjects = computed(() => projects.filter(p => p.featured));
</script>
