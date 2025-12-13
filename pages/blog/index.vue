<script setup lang="ts">
import type { BlogPost } from "@/types";

const { data: posts } = await useAsyncData("blogs", () =>
  queryCollection<BlogPost>("blog")
    .where("visibility", "=", "public")
    .where("status", "=", "published")
    .order("date", "DESC")
    .all(),
);

useHead({
  title: "Articles by Sandeep Ramgolam",
  meta: [
    {
     
      name: "description",
      content: "Blog articles by Sandeep Ramgolam",
    },
    {  property: "og:type", content: "page" },
    {
      property: "og:title",
      content: "Articles | Sandeep Ramgolam",
    },
    {
      property: "og:description",
      content: "Articles written by Sandeep Ramgolam",
    },
    {
      property: "og:url",
    },
  ],
});

defineOgImageComponent("GenericTemplate");
</script>

<template>
  <div class="contain">
    <h1 class="page-title">Sandeep Ramgolam's Blog</h1>
    <p class="page-subtitle">Writings and thoughts</p>

    <div class="blog-posts pt-12">
      <template v-for="post in posts" :key="post.slug">
        <BlogCard :post="post" />
      </template>
    </div>
  </div>
</template>

<style scoped >
.blog-posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-gap: 30px;
  /* max-width: 80%; */
  margin: 0 auto;

  /* justify-content: center; */
  .blog-box {
    opacity: 0;
    transform: translateY(10px);

    animation: reveal 0.5s ease-out 1 forwards;
    --multiplier: 0.05;
    animation-delay: calc(var(--delay) * var(--multiplier));
  }
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
