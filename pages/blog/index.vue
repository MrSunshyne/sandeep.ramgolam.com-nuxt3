<script setup lang="ts">
import type { BlogPost } from "@/types";

const { data: posts } = await useAsyncData("blogs", () =>
  queryCollection<BlogPost>("blog")
    .where("visibility", "=", "public")
    .where("status", "=", "published")
    .order("date", "DESC")
    .all(),
);

const postsByYear = computed(() => {
  const groups: { year: number; posts: NonNullable<typeof posts.value> }[] = [];
  for (const post of posts.value ?? []) {
    const year = new Date(post.date).getFullYear();
    const last = groups[groups.length - 1];
    if (last?.year === year) last.posts.push(post);
    else groups.push({ year, posts: [post] });
  }
  return groups;
});

useHead({
  title: "Articles by Sandeep Ramgolam",
  meta: [
    {
      name: "description",
      content: "Blog articles by Sandeep Ramgolam",
    },
    { property: "og:type", content: "page" },
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

defineOgImage("GenericTemplate");
</script>

<template>
  <div class="contain pb-16 sm:pb-20">
    <div class="max-w-3xl mx-auto">
      <h1 class="font-bold tracking-tight text-3xl sm:text-4xl mb-2">Sandeep Ramgolam's Blog</h1>
      <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-12">
        Writings and thoughts
      </p>

      <div class="space-y-10 sm:space-y-12">
        <section v-for="group in postsByYear" :key="group.year">
          <h2 class="text-xl sm:text-2xl font-bold tracking-tight mb-3 sm:mb-4">
            {{ group.year }}
          </h2>
          <ul class="flex flex-col gap-1">
            <li
              v-for="(post, index) in group.posts"
              :key="post.slug"
              class="blog-row"
              :style="'--delay:' + index + 's'"
            >
              <NuxtLink
                :href="`/blog/${post.slug}`"
                class="rounded-lg px-3 -mx-3 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-white/5 flex items-baseline gap-3 min-w-0 group"
              >
                <div class="shrink-0 w-12 sm:w-16 text-xs sm:text-sm font-bold tracking-wide text-gray-500 dark:text-gray-400 uppercase">
                  {{ new Date(post.date).toLocaleDateString("en", { month: "short", day: "2-digit" }) }}
                </div>
                <h3
                  class="min-w-0 text-base sm:text-lg font-bold transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400 truncate"
                  :title="post.title"
                >
                  <span :style="transitionName(post.slug, 'blog-title')">{{ post.title }}</span>
                </h3>
              </NuxtLink>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-row {
  opacity: 0;
  transform: translateY(10px);

  animation: reveal 0.5s ease-out 1 forwards;
  --multiplier: 0.05;
  animation-delay: calc(var(--delay) * var(--multiplier));
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-row {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
