<script setup lang="ts">

useHead({
  title: "Sandeep Ramgolam | thoughts, experiments, experiences",
  meta: [
    {
      name: "description",
      content:
        "Technologist, Mauritian, who loves front-end, UX design, Linux, & nature. This is where I share my thoughts, experiments and experiences.",
    },
    {
      property: "og:title",
      content: "Sandeep Ramgolam | thoughts, experiments, experiences",
    },
    {
      property: "og:description",
      content:
        "Technologist, Mauritian, who loves front-end, UX design, Linux, & nature. This is where I share my thoughts, experiments and experiences.",
    },
  ],
});

const colorMode = useColorMode();

defineOgImageComponent("IndexTemplate", {});
</script>

<template>
  <section class="page-home flex flex-wrap content-center py-16 md:py-0">
    <!-- <OgImageStatic component="OgImageIndex" /> -->
    <div class="w-full flex flex-col">
      <HomeHero />

      <HomeBlogSummary />

      <HomeEventSummary />

      <!-- <GalleryInsert /> -->

      <HomeProjectsFeatured />
    </div>
  </section>
</template>

<style>
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
