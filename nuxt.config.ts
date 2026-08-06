import { defineNuxtConfig } from "nuxt/config";
import { resolve } from "path";
import siteMeta from "./utils/meta";

const meta = siteMeta({});

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@bootstrap-vue-next/nuxt"],
  content: {
    sources: {
      content: {
        driver: "fs",
        base: resolve(__dirname, "posts"),
      },
    },
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: "monokai",
      preload: ["c", "bash", "java", "go", "php", "js", "ts", "sql", "vue"],
    },
  },
  css: [
    "~/assets/style.css",
    "~/assets/scss/default.scss",
    "@fortawesome/fontawesome-free/css/all.css",
  ],
  // router: {
  //   trailingSlash: false,
  // },
  /*
   ** Headers of the page
   */
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Olayiwola Odunsi - Backend & Cloud Engineer",
      meta: [
        ...meta,
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "theme-color",
          content: "#08193d",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        {
          name: "msapplication-navbutton-color",
          content: "#08193d",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
        },
      ],
    },
  },
  nitro: {
    prerender: {
      failOnError: false,
    },
  },
});
