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
    // production URL - GitHub Pages gets different URL
    url: isGitHubPages ? "https://mrsunshyne.github.io/sandeep.ramgolam.com-nuxt3" : "https://sandeep.ramgolam.com",
    name: "Sandeep Ramgolam",
    description: "thoughts, experiments, experiences",
    defaultLocale: "en", // not needed if you have @nuxtjs/i18n installed
  },

  app: {
    // Configure base URL for GitHub Pages subdirectory serving
    baseURL: isGitHubPages ? "/sandeep.ramgolam.com-nuxt3/" : "/",
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
    // GitHub Pages optimization - exclude large image directory from build
    ...(isGitHubPages ? {
      // Configure base URL for GitHub Pages subdirectory serving
      baseURL: "/sandeep.ramgolam.com-nuxt3/",
      // Don't copy large image assets to build output
      // GitHub Pages will serve them directly from public folder
      publicAssets: []
    } : {
      // For other platforms, optimize build size by excluding large assets from server bundle  
      publicAssets: [
        {
          baseURL: '/content/images',
          dir: 'public/content/images',
          maxAge: 60 * 60 * 24 * 365 // 1 year cache
        }
      ]
    }),
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
    // GitHub Pages optimization - serve images from GitHub raw URLs
    ...(isGitHubPages ? {
      domains: ['raw.githubusercontent.com'],
      alias: {
        github: 'raw.githubusercontent.com'
      }
    } : {}),
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

  // Runtime config for GitHub Pages optimization
  runtimeConfig: {
    public: {
      // GitHub Pages environment variables for image serving
      githubRepo: process.env.GITHUB_REPOSITORY || '',
      githubBranch: process.env.GITHUB_BRANCH || 'main',
      isGithubPages: isGitHubPages,
      // Base URL for GitHub raw content
      githubRawBaseUrl: process.env.GITHUB_REPOSITORY 
        ? `https://raw.githubusercontent.com/${process.env.GITHUB_REPOSITORY}/main/public`
        : ''
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