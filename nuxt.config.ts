// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss"],
    runtimeConfig: {
        public: {
            grokApiUrl: process.env.GROK_API_URL,
            grokApiKey: process.env.GROK_API_KEY,
        },
    },
});
