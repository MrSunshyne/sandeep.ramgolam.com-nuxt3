<script setup lang="ts">
import type { BlogPost } from "~/types/types";

const route = useRoute();
const slug = route.params.slug[0];

const { data: post } = await useAsyncData(
  'blogpost' + slug, 
  () => queryContent<BlogPost>('blog')
    .where({ slug: { $eq: slug } })
    .findOne()
  )


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
        hid: "twitter:label1",
        name: "twitter:label1",
        content: "Written by",
      },
    ],
  });
}

</script>

<template>
  <article class="" v-if="post">
    <!-- <OgImageStatic
      component="OgImageBlog"
      :description="dateFormat(new Date(post?.created_at || ''))"
      :customImage="post.feature_image"
    /> -->

    <!-- <pre>
            {JSON.stringify(post, null, 2)}
          </pre> -->
    <BlogHead :post="post" />

    <ContentDoc v-slot="{ doc }">
      <article>
        <div class="prose dark:prose-invert mx-auto">
          <ContentRenderer :value="doc" >
            <h1>{{ doc.title }}</h1>
            <img :src="doc.feature_image" alt="">
            <ContentRendererMarkdown :value="doc"  />
          </ContentRenderer>
        </div>
      </article>
    </ContentDoc>
  </article>
</template>
