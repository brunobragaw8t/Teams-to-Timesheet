// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  runtimeConfig: {
    clientSecret: '',
    public: {
      appUrl: '',
      tenant: '',
      clientId: '',
    },
  },
})
