
<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { BlogPost } from '~/types';

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const slug = route.params.slug[0];
const { toc, seo } = useAppConfig()

const { data: page } = await useAsyncData(route.path, () => {
  return queryContent("blog")
    .where({ slug: { $eq: slug } })
    .findOne();
});

if (!page?.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}


const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryContent()
    .where({ _extension: "md", navigation: { $ne: false } })
    .only(["title", "description", "_path"])
    .findSurround(withoutTrailingSlash(route.path)),
);

useSeoMeta({
  title: page?.value.title,
  ogTitle: `${page?.value.title} - ${seo?.siteName}`,
  description: page?.value.description,
  ogDescription: page?.value.description
})

defineOgImageComponent("BlogTemplate", {
  title: page.value?.title,
  description: dateFormat(new Date(page.value?.date || "")),
  customImage: page.value?.feature_image,
});

// Cover Image
const coverImage = computed(() => {
  if (page.value?.feature_image) {
    return page.value?.feature_image;
  }

  return `/__og-image__/static/blog/${slug}/og.png`;
});

const headline = computed(() => page.value ? findPageHeadline(page.value) : null)

const links = computed(() => [toc?.bottom?.edit && {
  icon: 'i-heroicons-pencil-square',
  label: 'Edit this page',
  to: `${toc.bottom.edit}/${page?.value?._file}`,
  target: '_blank'
}, ...(toc?.bottom?.links || [])].filter(Boolean))
</script>

<template>


  <div class="max-w-6xl mx-auto gap-8 flex">
    <div>
    <UPageHeader
        :title="page?.title"
        :description="page?.description"
        :links="page?.links"
        :headline="headline || page?.headline"
        />
        <!-- class="mx-auto max-w-6xl" -->

      <div class="mx-auto w-full">
        <img
        :src="coverImage"
        class="mx-auto mb-8 shadow-xl rounded-xl"
        :alt="page?.title"
        :style="transitionName(page?.slug, 'blog-cover')"
        />
      </div>
    <UPageBody prose>

      
      <ContentRenderer
        v-if="page?.body"
        :value="page"
      />

      <hr v-if="surround?.length">

      <UContentSurround v-if="surround" :surround="surround" />
    </UPageBody>
  </div>

    <div
      v-if="page?.toc !== false"
    >
      <UContentToc
      class="lg:mx-0"
        :title="toc?.title"
        :links="page?.body?.toc?.links"
      >
        <template
          v-if="toc?.bottom"
          #bottom
        >
          <div
            class="hidden lg:block space-y-6"
            :class="{ '!mt-6': page?.body?.toc?.links?.length }"
          >
            <UDivider
              v-if="page?.body?.toc?.links?.length"
              type="dashed"
            />

            <UPageLinks
              :title="toc.bottom.title"
              :links="links"
            />
          </div>
        </template>
      </UContentToc>
    </div>
  </div>
</template>