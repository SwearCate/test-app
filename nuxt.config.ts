// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  css: [
    '@/css/main.css',
  ],
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  modules: ['@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  devtools: { enabled: true },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  }

})