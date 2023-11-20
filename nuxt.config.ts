import tailwindTypography from '@tailwindcss/typography'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss','@nuxthq/studio'],
  tailwindcss: {
    config: {
        plugins: [tailwindTypography],
    }
},
})
