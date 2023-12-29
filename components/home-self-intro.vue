<script setup lang="ts">
import SocialMedia from './shared-social-media.vue';


</script>

<template>
  <div class="md:w-2/3">
    <h1 class="text-2xl md:text-5xl font-black w-full">Sandeep Ramgolam</h1>
    <!-- <a class="block w-full text-center sm:text-left" :to="{path: '/page/mrsunshyne'}">
        aka
        <Logo class="inline-block w-24 relative pl-1" style="top:5px" />
      </a>-->
    <div class="mb-4">
      <div
           title="Yes, you can run that in your terminal"
           class="dark:bg-gray-900 bg-gray-200 py-1 px-2 mt-2 rounded cursor-help inline-block">
        $ npx sandeepramgolam
      </div>
      <!-- <a
          href="https://form.questionscout.com/5e54fa66e6449f866558aa6d"
          title="Want to work with me?"
          class="dark:bg-gray-900 bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-2 mt-2 uppercase font-bold rounded cursor-pointer inline-block"
        >
          Hire me?
        </a>-->
    </div>

    <p class="inline sm:w-full md:text-2xl pt-5">
      Technologist, Mauritian, who loves front-end, UX design, Linux, & nature.
      <br />This is where I share my
      <a class="underline hover:text-green-500" href="/blog">thoughts</a>,
      <a class="underline hover:text-green-500 pr-1" target="_blank" href="https://github.com/MrSunshyne?tab=repositories&q=&type=&language=&sort=stargazers">experiments
      </a>and
      <a class="underline hover:text-green-500" href="events">experiences</a>.
    </p>

    <SocialMedia />
  </div>

</template>