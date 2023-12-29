<script setup lang="ts">
import { PostOrPage } from "@tryghost/content-api";
const { data: posts } = await useAsyncData<PostOrPage[]>("posts", () =>
  $fetch("/api/posts")
);

// computed of last five posts with null check
const lastFivePosts = computed(() => posts.value?.slice(0, 5));
</script>

<template>
  <div
    class="blog-summary py-10 px-10 md:px-0"
    style="clip-path: polygon(0% 0, 100% 50px, 100% 100%, 0% calc(100% - 50px))"
  >
    <div class="block md:flex text-center md:text-left">
      <div class="md:w-1/2 bg-container">
        <!-- <img src="/data/blog-summary/blogger.svg" alt="" /> -->
      </div>
      <div class="md:w-1/2 py-10">
        <h2 class="text-3xl font-black pt-10">
          Blog posts
          <span class="text-black/10" v-if="posts && lastFivePosts">
            // {{ posts.length }}</span
          >
        </h2>
        <p class="text-md text-gray-700 dark:text-gray-300">
          When i'm not writing code, <br class="block md:hidden" />
          I like to write about code.
        </p>
        <div class="py-5">
          <div v-for="post in lastFivePosts" class="text-sm lg:text-xl flex gap-2 my-3">
            <nuxt-link :to="'/blog/' + post.slug" class="hover:text-green-500">
              {{ post.title }}
            </nuxt-link>
            <div>
              <!-- <span
                class="bg-blue-200 inline text-xs p-1 uppercase rounded dark:text-black"
                v-if="post.tags"
              >
                {{ post.tags[0].name }}
              </span> -->
            </div>
          </div>
        </div>
        <!-- <div v-else>no posts</div> -->
        <nuxt-link :to="'/blog'" class="button">See all</nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.blog-summary {
  background: #ebfff585;
}

html.mode-dark {
  .blog-summary {
    background: #111;
  }
}

@screen md {
  .blog-summary {
    padding: 0 0 10vh 0;

    .bg-container {
      background: no-repeat url("/data/blog-summary/blogger.svg") right center / contain;
    }
  }
}
</style>
