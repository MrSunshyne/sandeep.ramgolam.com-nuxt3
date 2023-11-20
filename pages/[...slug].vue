<template>
  <main>
    <div class=" ">
      <nuxt-link :to="'/'">home</nuxt-link>
      <div class="prose dark:prose-invert mx-auto">
        <ContentDoc v-slot="{ doc }">
          <article>
            <h1>{{ doc.title }}</h1>
            <img :src="doc.feature_image" alt="">
            <ContentRenderer :value="doc" />
          </article>
        </ContentDoc>
      </div>
    </div>
  </main>
</template>
