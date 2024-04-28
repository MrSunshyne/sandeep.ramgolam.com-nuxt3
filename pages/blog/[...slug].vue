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

// Table of Contents

const activeTocId = ref<string | null>(null);

// const nuxtContent = ref(null);

// const observer: Ref<IntersectionObserver | null | undefined> = ref(null);
// const router = useRouter();

// const observerOptions = reactive({
//   root: nuxtContent.value,
//   threshold: 0.5,
// });

// onMounted(() => {
//   observer.value = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       const id = entry.target.getAttribute("id");

//       if (entry.isIntersecting) {
//         activeTocId.value = id;

//         router.push({ hash: `#${id}` });
//       }
//     });
//   }, observerOptions);

//   document
//     .querySelectorAll("article h2[id], article h3[id]")
//     .forEach((section) => {
//       observer.value?.observe(section);
//     });
// });

// onUnmounted(() => {
//   observer.value?.disconnect();
// });
</script>

<template>
  <article v-if="post" class="">
    <!-- <OgImageStatic
      component="OgImageBlog"
      :description="dateFormat(new Date(post?.created_at || ''))"
      :customImage="post.feature_image"
    /> -->

    <!-- <pre>
            {JSON.stringify(post, null, 2)}
          </pre> -->
    <BlogHead :post="post" />

    <div class="mx-auto w-full">
      <img
        :src="coverImage"
        class="mx-auto pb-8"
        :alt="post.title"
        :style="transitionName(post.slug, 'blog-cover')"
      />
    </div>

    <ContentDoc v-slot="{ doc }">
      <div
        class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col lg:grid lg:grid-cols-10 lg:gap-8"
      >
        <article class="lg:col-span-8">
          <div
            class="mt-8 pb-24 dark:text-gray-300 dark:prose-pre:!bg-gray-800/60 prose prose-primary dark:prose-invert max-w-none dark:prose-invert mx-auto"
          >
            <ContentRenderer :value="doc">
              <ContentRendererMarkdown :value="doc" />
            </ContentRenderer>
          </div>
        </article>
        <div class="lg:col-span-2 order-first lg:order-last">
          <div class="sticky top-[128px] flex flex-col md:items-center">
            <ClientOnly>
              <BlogTableOfContent :active-toc-id="activeTocId" :slug="slug" />
            </ClientOnly>
          </div>
        </div>
      </div>
    </ContentDoc>
  </article>
</template>
