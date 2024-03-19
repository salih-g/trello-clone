export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-mongoose'],
  mongoose: {
    uri: process.env.NEXTAUTH_URL,
    modelsDir: 'models',
  },
});
