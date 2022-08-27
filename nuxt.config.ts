import { defineNuxtConfig } from "nuxt";
import { Theme } from "shiki-es";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "bootstrap-vue-3/nuxt"],
  content: {
    sources: ["posts"],
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: "monokai",
      preload: ["c", "bash", "java", "go", "php", "js", "ts", "sql", "vue"],
    },
  },
  css: [
    "bootstrap/dist/css/bootstrap.css",
    "~/assets/style.css",
    "~/assets/scss/default.scss",
    "@fortawesome/fontawesome-free/css/all.css",
  ],
  markdown: {
    toc: {
      depth: 5,
      searchDepth: 5,
    },
  },
  target: "static",

  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "en",
    },
    title: "Olayiwola Odunsi - Software Engineer",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Olayiwola Odunsi is a software engineer.",
      },
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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
});
