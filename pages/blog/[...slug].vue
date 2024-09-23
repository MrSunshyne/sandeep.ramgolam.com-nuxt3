<script setup lang="ts">
import type { BlogPost } from "@/types";

const route = useRoute();
const slug = route.params.slug[0];

const { data: post } = await useAsyncData("blogpost" + slug, () =>
  queryContent<BlogPost>("blog")
    .where({ slug: { $eq: slug } })
    .findOne(),
);

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

  return `/__og-image__/image/blog/${slug}/og.png`;
});
</script>

<template>
  <article v-if="post" class="">
    <BlogHead :post="post" />

    <div class="mx-auto w-full">
      <img
        :src="coverImage"
        class="mx-auto mb-8 shadow-xl rounded-xl"
        :alt="post.title"
        :style="transitionName(post.slug, 'blog-cover')"
      />
    </div>

    <ContentDoc v-slot="{ doc }">
      <div
        class="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl flex flex-col lg:gap-8"
      >
        <article class="">
          <div
            class="mt-8 pb-24 dark:text-gray-300 dark:prose-pre:!bg-gray-800/60 prose prose-primary dark:prose-invert max-w-none dark:prose-invert mx-auto"
          >
            <ContentRenderer :value="doc">
              <ContentRendererMarkdown :value="doc" />
            </ContentRenderer>
          </div>
        </article>
      </div>
    </ContentDoc>
  </article>
</template>
