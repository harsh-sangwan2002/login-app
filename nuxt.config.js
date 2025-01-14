export default defineNuxtConfig({
  css: [
    '~/assets/css/main.css', // Path to your Tailwind CSS file
  ],
  devtools: { enabled: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
