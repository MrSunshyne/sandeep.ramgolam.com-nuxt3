import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        date: z.string(),
        visibility: z.string().optional(),
        status: z.string().optional(),
        custom_excerpt: z.string().optional(),
        feature_image: z.string().optional(),
        featured: z.number().optional(),
      }),
    }),
    events: defineCollection({
      type: 'data',
      source: 'events/**/*.json',
      schema: z.object({
        event_date: z.string(),
        event_name: z.string(),
        location: z.string().optional(),
        event_type: z.array(z.string()),
        published: z.boolean().optional(),
        topic: z.string().optional(),
        talk_title: z.string().optional(),
        description: z.string().optional(),
        links: z.array(z.object({ title: z.string(), url: z.string() })).optional(),
      }),
    }),
  }
})
