<script setup lang="ts">
import HomeEventSummary from "~/components/home-event-summary.vue";
import SharedSunBust from "~/components/shared-sun-bust.vue";
import HomeBlogSummary from "~/components/home-blog-summary.vue";

useHead({
  title: "Sandeep Ramgolam | thoughts, experiments, experiences",
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        "Technologist, Mauritian, who loves front-end, UX design, Linux, & nature. This is where I share my thoughts, experiments and experiences.",
    },
    { hid: "og:type", property: "og:type", content: "page" },
    {
      hid: "og:title",
      property: "og:title",
      content: "Sandeep Ramgolam | thoughts, experiments, experiences",
    },
    {
      hid: "og:description",
      property: "og:description",
      content:
        "Technologist, Mauritian, who loves front-end, UX design, Linux, & nature. This is where I share my thoughts, experiments and experiences.",
    },
    {
      hid: "og:url",
      property: "og:url",
    },
  ],
});

defineOgImageComponent('IndexTemplate', {
  title: 'Welcome to Nuxt OG Image',
  description: 'You can modify the og:image by changing these props.',
});

</script>

<template>
  <section class="page-home flex flex-wrap content-center">
    <!-- <OgImageStatic component="OgImageIndex" /> -->
    <div class="w-full flex flex-col">
      <div class="container mx-auto intro-wrapper text-center sm:text-left flex flex-wrap items-center w-full">
        <HomeSelfIntro />

        <div class="splash-wrapper hidden md:flex content-center md:w-1/3">
          <!--          <img-->
          <!--            class="w-full picture object-bottom object-center object-contain"-->
          <!--            src="../assets/images/sun.svg"-->
          <!--            alt=""-->
          <!--          />-->
          <SharedSunBust class="dark:text-gray-500" />
        </div>
      </div>

      <HomeBlogSummary />

      <HomeEventSummary />

      <!-- <GalleryInsert />  -->

      <HomeProjectsFeatured />
    </div>
  </section>
</template>

<style>
main {
  margin: auto;
  padding: 1.5rem;
  max-width: 60ch;
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
}

.text-gradient {
  background-image: var(--accent-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 400%;
  background-position: 0%;
}

.instructions {
  line-height: 1.6;
  margin: 1rem 0;
  border: 1px solid rgba(var(--accent), 25%);
  background-color: white;
  padding: 1rem;
  border-radius: 0.4rem;
}

.instructions code {
  font-size: 0.875em;
  font-weight: bold;
  background: rgba(var(--accent), 12%);
  color: rgb(var(--accent));
  border-radius: 4px;
  padding: 0.3em 0.45em;
}

.instructions strong {
  color: rgb(var(--accent));
}

.link-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24ch, 1fr));
  gap: 1rem;
  padding: 0;
}
</style>
