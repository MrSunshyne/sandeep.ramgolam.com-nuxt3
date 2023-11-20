import tailwindTypography from '@tailwindcss/typography'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss','@nuxthq/studio', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },
  tailwindcss: {
    config: {
        darkMode: 'class',
        plugins: [tailwindTypography],
    }
},
})
