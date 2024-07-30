export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxt/image", "@nuxt/content"],

  css: ["@/assets/css/global.css"],

  pinia: {
    storesDirs: ["./stores/**"],
  },

  imports: {
    dirs: ["./types/**", "./validations/**"],
  },

  plugins: ["~/plugins/vue-mansory-wall", "~/plugins/vue-maska.ts"],

  runtimeConfig: {
    public: {
      unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
      geminiAiAccessKey: process.env.GEMNI_ACCESS_KEY,
      supabaseAccessKey: process.env.SUPABASE_ACCESS_KEY,
      jwtSecret: process.env.JWT_SECRET,
      unsplashURL: "https://api.unsplash.com",
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000",
    },
  },
});
