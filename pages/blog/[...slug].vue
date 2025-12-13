<script setup lang="ts">
import type { BlogPost } from "@/types";

const route = useRoute();
const slug = route.params.slug[0];

const { data: post } = await useAsyncData("blogpost" + slug, () =>
  queryCollection<BlogPost>("blog")
    .where("slug", "=", slug)
    .first(),
);

if (post.value) {
  useHead({
    title: post.value?.title ?? "",
    meta: [
      {
        name: "description",
        content: post.value?.custom_excerpt,
      },
      { property: "og:type", content: "article" },
      {
        property: "og:title",
        content: post.value?.title,
      },
      {
        property: "og:description",
        content: post.value?.custom_excerpt,
      },
      {
        property: "og:image",
      },
      {
        property: "og:url",
      },
      {
        name: "twitter:title",
        content: post.value?.title,
      },
      {
        name: "twitter:description",
        content: post.value?.custom_excerpt,
      },
      {
        name: "twitter:image",
      },
      {
        name: "twitter:url",
      },
      {
        name: "twitter:label1",
        content: "Written by",
      },
    ],
  });
}

// OG Images
defineOgImageComponent("BlogTemplate", {
  title: post.value?.title,
  description: dateFormat(new Date(post.value?.date || "")),
  customImage: post.value?.feature_image,
});

// Cover Image
const coverImage = computed(() => {
  if (post.value?.feature_image) {
    return post.value?.feature_image;
  }

  return `/__og-image__/static/blog/${slug}/og.png`;
});
</script>

<template>
  <article v-if="post" class="">
    <BlogHead :post="post" />

    <div class="mx-auto w-full aspect-[2/1] max-w-4xl mb-8">
      <img
        :src="coverImage"
        class="w-full h-full object-cover shadow-xl rounded-xl"
        :alt="post.title"
        :style="transitionName(post.slug, 'blog-cover')"
        sizes="100vw sm:100vw md:100vw lg:1024px xl:1024px"
      />
    </div>

    <div
      class="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl flex flex-col lg:gap-8"
    >
      <article class="">
        <div
          class="mt-8 pb-24 dark:text-gray-300 dark:prose-pre:!bg-gray-800/60 prose prose-primary dark:prose-invert max-w-none mx-auto"
        >
          <ContentRenderer :value="post" />
        </div>
      </article>
    </div>
  </article>
</template>
