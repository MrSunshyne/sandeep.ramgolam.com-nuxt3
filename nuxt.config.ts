import tailwindTypography from "@tailwindcss/typography";

// Detect build environment
const isCloudflare = process.env.CF_PAGES === '1' || process.env.CLOUDFLARE_BUILD === '1';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // site: {
  //   url: 'https://sandeep.ramgolam.com',
  //   indexable: false
  // },
  extends: ['@nuxt/ui-pro'],

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
    },
    // Optimize build size by excluding large assets from server bundle
    publicAssets: [
      {
        baseURL: '/content/images',
        dir: 'public/content/images',
        maxAge: 60 * 60 * 24 * 365 // 1 year cache
      }
    ],
    // Cloudflare-specific nitro configuration
    ...(isCloudflare ? {
      preset: 'cloudflare-pages',
      experimental: {
        wasm: false
      },
      minify: false,
      sourceMap: false
    } : {})
  },
  
  // Enable static site generation for Cloudflare and GitHub Pages
  ssr: !isCloudflare && !isGitHubPages,
  
  // Configure OG Image for static builds
  ogImage: {
    enabled: !isGitHubPages // Disable OG Image for GitHub Pages builds
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
    // Don't preload all images, only load on demand
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
    // Platform-specific configuration
    ...(isCloudflare || isGitHubPages ? {
      define: {
        'process.env.CLOUDFLARE': isCloudflare ? 'true' : 'false',
        'process.env.GITHUB_PAGES': isGitHubPages ? 'true' : 'false'
      },
      esbuild: {
        target: 'es2022',
        platform: 'neutral'
      },
      optimizeDeps: {
        exclude: ['oxc-parser', '@oxc-parser/binding-linux-x64-gnu', '@oxc-parser/binding-darwin-arm64', '@oxc-parser/binding-darwin-x64'],
        include: []
      },
      ssr: {
        noExternal: ['oxc-parser']
      }
    } : {
      // Standard configuration for other platforms (Vercel, local, etc.)
      esbuild: {
        target: 'esnext'
      },
      optimizeDeps: {
        exclude: ['oxc-parser', '@oxc-parser/binding-linux-x64-gnu', '@oxc-parser/binding-darwin-arm64', '@oxc-parser/binding-darwin-x64']
      }
    })
  },

  build: {
    transpile: []
  },
});