import tailwindTypography from "@tailwindcss/typography";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

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
    "@nuxt/ui", 
    "@nuxt/content", 
    "@nuxthq/studio",
    "@nuxt/image",
    "nuxt-og-image", 
    'nuxt-mcp'
  ],


  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
      failOnError: false,
    }
  },

  // Configure image optimization
  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpg', 'png'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 150,
          height: 150,
          quality: 80
        }
      },
      cover: {
        modifiers: {
          format: 'webp',
          width: 800,
          quality: 80
        }
      }
    }
  },

  colorMode: {
    classSuffix: "",
  },

  // register a component
  css: ["@/styles/global.css"],

  ui: {
    global: true
  },

  tailwindcss: {
    configPath: "./tailwind.config.js",
  },

  compatibilityDate: "2024-09-22",
  devServer: {
    port: 4242,
  },

  vite: {
    esbuild: {
      target: 'esnext'
    }
  },

  build: {
    transpile: []
  },
});