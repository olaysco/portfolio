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
  app: {
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
          content:
            "Olayiwola Odunsi is a software engineer with love for web❤️ and distributed systems.",
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
        { hid: "og:url", property: "og:url", content: "https://www.olays.co/" },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:title",
          property: "og:title",
          content: "Olayiwola Odunsi - Software Engineer",
        },
        { hid: "og:image", property: "og:image", content: "/olayiwola.jpg" },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Olayiwola Odunsi is a software engineer with love for web❤️ and distributed systems.",
        },

        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:domain",
          property: "twitter:domain",
          content: "olays.co",
        },
        {
          hid: "twitter:url",
          property: "twitter:url",
          content: "https://www.olays.co/",
        },
        {
          hid: "twitter:title",
          property: "twitter:title",
          content: "Olayiwola Odunsi - Software Engineer",
        },
        {
          hid: "twitter:description",
          property: "twitter:description",
          content:
            "Olayiwola Odunsi is a software engineer with love for web❤️ and distributed systems.",
        },
        {
          hid: "twitter:image",
          property: "twitter:image",
          content: "/olayiwola.jpg",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
