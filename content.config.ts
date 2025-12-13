import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
    }),
    events: defineCollection({
      type: 'data',
      source: 'events/**/*.json',
    }),
  }
})
