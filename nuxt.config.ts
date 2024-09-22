import tailwindTypography from "@tailwindcss/typography";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // site: {
  //   url: 'https://sandeep.ramgolam.com',
  //   indexable: false
  // },
  site: {
    // production URL
    url: "https://sandeep.ramgolam.com",
    name: "Sandeep Ramgolam",
    description: "thoughts, experiments, experiences",
    defaultLocale: "en", // not needed if you have @nuxtjs/i18n installed
  },

  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
      ],
    },
  },

  experimental: {
    viewTransition: true,
  },

  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxthq/studio",
    "@nuxtjs/color-mode",
    "nuxt-og-image",
    "nuxt-icon",
  ],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },

  colorMode: {
    classSuffix: "",
  },

  // register a component
  css: ["@/styles/global.css"],

  tailwindcss: {
    config: {
      darkMode: "class",
      plugins: [tailwindTypography],
      theme: {
        extend: {
          gridTemplateRows: {
            "[auto,auto,1fr]": "auto auto 1fr",
          },
          container: {
            center: true,
            padding: "2rem",
            screens: {
              sm: "640px",
              md: "768px",
              lg: "1024px",
              xl: "1280px",
            },
          },
          boxShadow: {
            neumorphismdark:
              "inset 1px 1px 3px #1f2327,9px 9px 20px rgb(11, 11, 11, 0.8),-0px -0px 20px #1f2327",
            neumorphismlight:
              "inset 1px 1px 5px #fff, 9px 9px 20px rgba(222, 222, 222, 0.8),-0px -0px 20px #ffffff",
          },
        },
      },
    },
  },

  compatibilityDate: "2024-09-22",
});