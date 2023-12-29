<script setup lang="ts">
import { PostOrPage } from "@tryghost/content-api";
import BlogTags from "~/components/blog-tags.vue";

const route = useRoute();
const slug = route.params.slug[0] as string;

const { data: post } = await useFetch<PostOrPage>(`/api/article/${slug}`);

if (post.value) {
  useHead({
    title: post.value?.title ?? "",
    meta: [
      {
        hid: "description",
        name: "description",
        content: post.value?.custom_excerpt,
      },
      { hid: "og:type", property: "og:type", content: "article" },
      {
        hid: "og:title",
        property: "og:title",
        content: post.value?.title,
      },
      {
        hid: "og:description",
        property: "og:description",
        content: post.value?.custom_excerpt,
      },
      {
        hid: "og:image",
        property: "og:image",
      },
      {
        hid: "og:url",
        property: "og:url",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: post.value?.title,
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: post.value?.custom_excerpt,
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
      },
      {
        hid: "twitter:url",
        name: "twitter:url",
      },
      {
        hid: "twitter:creator",
        name: "twitter:creator",
        content: post.value?.primary_author?.twitter ?? "",
      },
      {
        hid: "twitter:label1",
        name: "twitter:label1",
        content: "Written by",
      },
      {
        hid: "twitter:data1",
        name: "twitter:data1",
        content: post.value?.primary_author?.name ?? "",
      },
    ],
  });
}
</script>

<template>
  <article class="" v-if="post">
    <OgImageStatic
      component="OgImageBlog"
      :description="dateFormat(new Date(post?.created_at || ''))"
      :customImage="post.feature_image"
    />

    <!-- <pre>
            {JSON.stringify(post, null, 2)}
          </pre> -->
    <BlogHead :post="post" />

    <figure class="post-full-image">
      <img
        v-if="post?.feature_image"
        :src="unGhostUrl(post?.feature_image)"
        :alt="post.title"
        loading="lazy"
      />
    </figure>
    <div class="prose-responsive">
      <BlogTags :post="post" />

      <div class="content-container" v-html="post.html" />

      <BlogTags :post="post" />
    </div>
  </article>
</template>
