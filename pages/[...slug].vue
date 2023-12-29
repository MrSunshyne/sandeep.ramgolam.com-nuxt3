<template>
  <main>
    <div class=" ">
      <nuxt-link :to="'/'">home</nuxt-link>
      <div class="prose dark:prose-invert mx-auto">
        <ContentDoc v-slot="{ doc }">
          <article>
            <ContentRenderer :value="doc" >
              <h1>{{ doc.title }}</h1>
              <img :src="doc.feature_image" alt="">
              <ContentRendererMarkdown :value="doc"  />
            </ContentRenderer>
          </article>
        </ContentDoc>
      </div>
    </div>
  </main>
</template>
