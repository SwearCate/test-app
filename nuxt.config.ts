// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  buildModules: [
    '@pinia-plugin-persistedstate/nuxt',
  ],

  modules: [
    '@pinia/nuxt',
  ],
  devtools: { enabled: true }
})
