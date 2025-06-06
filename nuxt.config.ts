// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // App configuration
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg', href: '/logo.svg' }],
    },
  },

  // Modules configuration
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-auth-utils',
    '@nuxt/content',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    // 'nuxt-og-image',
  ],
  extends: ['nuxt-umami'],

  // Runtime configuration
  runtimeConfig: {
    public: {
      siteUrl: '',
      umamiHost: '',
      umamiId: '',
    },
    browserlessApiKey: '',
    github: {
      clientId: '',
      clientSecret: '',
    },
    session: {
      name: 'nuxt-session',
      password: '',
    },
  },

  // Module-specific configurations
  shadcn: {
    prefix: 'Ui',
  },
  
  tailwindcss: {
    viewer: false,
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700, 800],
    },
  },

  // Site metadata
  site: {
    name: 'vue0',
    description: 'Generate Component with simple text prompts.',
    defaultLocale: 'en',
  },

  // Development tools
  devtools: { enabled: false },

  // App config for utilities
  appConfig: {
    umami: {
      version: 2,
      ignoreLocalhost: true,
    },
  },

  // Build and deployment configuration
  nitro: {
    vercel: {
      functions: {
        maxDuration: 300, // 5mins maximum possible for Vercel Pro
      },
    },
  },

  // Hooks
  hooks: {
    'vite:extendConfig': (config, { isClient }) => {
      if (isClient) {
        // @ts-expect-error it has alias of vue
        config.resolve.alias.vue = 'vue/dist/vue.esm-bundler.js'
      }
    },
  },

  // OG Image configuration (commented out as module is not active)
  // ogImage: {
  //   debug: true,
  //   compatibility: {
  //     prerender: {
  //       chromium: false,
  //     },
  //   },
  // },
})