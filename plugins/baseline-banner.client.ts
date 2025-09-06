import BaselineBannerVue from '@baseline-banner/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(BaselineBannerVue)
})
