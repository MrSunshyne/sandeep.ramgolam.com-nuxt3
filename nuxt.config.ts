// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 5,
  },

  content: {
    highlight: {
      preload: ['scss'],
    },
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
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "nuxt-og-image",
    'nuxt-mcp-dev'
  ],

  components: [
    {
      path: '~/components',
      global: false
    },
    {
      path: '~/components/global',
      global: true
    }
  ],



  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
      failOnError: false,
    }
  },

  compatibilityDate: "2025-12-09",

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

  // register a component
  css: ["~/assets/css/main.css", "~/styles/global.css"],

  ui: {
    fonts: false
  },


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
