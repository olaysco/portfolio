<template>
  <div class="container mt-4 position-relative">
    <!-- Hero -->
    <header class="hero">
      <p class="hero-eyebrow">Hi, I'm</p>
      <h1 class="hero-name">Oláyíwolá Odunsi</h1>
      <p class="hero-role">Backend &amp; Cloud Engineer</p>
      <p class="hero-intro">
        I build solutions that scale and give users a seamless experience —
        mostly in <span>Go</span>, on <span>Kubernetes</span>, across the
        <span>cloud</span>. I care about distributed systems, clean APIs and
        shipping things that work.
      </p>

      <div class="hero-actions">
        <a href="#work" class="btn-cta primary-btn"><span>View my work</span></a>
        <a
          href="https://github.com/olaysco"
          target="_blank"
          rel="noopener"
          class="btn-ghost"
          >GitHub</a
        >
      </div>

      <div class="hero-socials">
        <a href="https://github.com/olaysco" target="_blank" rel="noopener" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://twitter.com/olaysco" target="_blank" rel="noopener" aria-label="Twitter">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="mailto:olayiwolaodunsi@gmail.com" aria-label="Email">
          <i class="fas fa-envelope"></i>
        </a>
      </div>
    </header>

    <!-- Skills -->
    <Skills />

    <!-- Selected Work -->
    <SelectedWork />

    <!-- Writing -->
    <section class="writing" id="writing">
      <div class="section-head d-flex flex-wrap align-items-center justify-content-between">
        <div>
          <h4 class="section-title">Writing</h4>
          <p class="section-sub">
            Notes on Go, distributed systems and the tools I build with.
          </p>
        </div>
        <search-box @filter="filterPost"></search-box>
      </div>

      <div class="row">
        <div
          class="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 mb-4"
          v-for="article in articles"
          :key="article._path"
        >
          <nuxt-link
            :to="article._path"
            class="post-thumb-link"
            :aria-label="article.title"
          >
            <article class="row">
              <div
                class="post-thumb d-none d-md-flex justify-content-center align-items-center col-2"
              >
                <img :src="`/cover/cover-${article.cover}`" class="img-fluid" alt />
              </div>
              <div class="post-text col-12 col-md-10">
                <div class="post-header">
                  <h2 class="post-title">
                    {{ article.title }}
                  </h2>
                  <div class="post-meta">
                    <span class="post-meta-date">
                      <a href="#">{{ getDate(article) }}</a>
                    </span>
                  </div>
                </div>
                <div class="post-excerpt">
                  <p>{{ article.description }}</p>
                </div>
              </div>
            </article>
          </nuxt-link>
        </div>
        <template v-if="!articles || articles.length < 1">
          <p>No articles found.</p>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ParsedContent } from "@nuxt/content/dist/runtime/types";
import { Ref } from "vue";

useHead({
  title: "Olayiwola Odunsi - Backend & Cloud Engineer",
});

let articles: Ref<ParsedContent[]> = ref();
let articlesCache: Ref<ParsedContent[]> = ref();

const { data } = await useAsyncData(`content-index`, async () => {
  let articles = await queryContent()
    .where({ published: true })
    .sort({ date: -1 })
    .find();

  return { articles };
});

articles.value = data.value.articles;
articlesCache.value = data.value.articles;

function getDate(article: any) {
  return new Date(article.date).toLocaleString("en-NG", {
    month: "long",
    year: "numeric",
  });
}

function filterPost(text) {
  if (text.length < 2) {
    articles.value = articlesCache.value;
    return;
  }
  articles.value = articlesCache.value.filter((post) => {
    let t = post.title + " " + post.description;
    return t.toLowerCase().search(text.toLowerCase()) > -1;
  });
}
</script>
<style lang="scss" scoped>
/* ---------- Hero ---------- */
.hero {
  padding: 3rem 0 4rem;
  max-width: 760px;
}
.hero-eyebrow {
  color: #9ccdc6;
  font-family: "Inconsolata", monospace;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}
.hero-name {
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 700;
  line-height: 1.05;
  margin-bottom: 0.5rem;
}
.hero-role {
  font-size: clamp(1.25rem, 3.5vw, 1.9rem);
  color: var(--color__white--muted);
  font-weight: 500;
  margin-bottom: 1.5rem;
}
.hero-intro {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color__white--muted);
  max-width: 60ch;
  span {
    color: #9ccdc6;
    font-weight: 600;
  }
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
  align-items: center;
}
.btn-cta {
  display: inline-flex;
  align-items: center;
  height: 48px;
  padding: 0 1.75rem;
  text-decoration: none;
  font-size: 0.95rem;
}
.btn-ghost {
  display: inline-flex;
  align-items: center;
  height: 48px;
  padding: 0 1.5rem;
  border-radius: 5px;
  border: 1px solid rgba(156, 205, 198, 0.35);
  color: var(--color__white);
  text-decoration: none;
  transition: border-color 140ms ease, color 140ms ease;
  &:hover {
    border-color: #9ccdc6;
    color: #9ccdc6;
  }
}
.hero-socials {
  display: flex;
  gap: 1.4rem;
  margin-top: 2rem;
  font-size: 1.4rem;
  a {
    color: var(--color__white--muted);
    transition: color 140ms ease, transform 140ms ease;
    &:hover {
      color: #9ccdc6;
      transform: translateY(-3px);
    }
  }
}

/* ---------- Section heads ---------- */
.section-head {
  margin-bottom: 2.5rem;
  gap: 1rem;
}
.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color__white);
  margin-bottom: 0.5rem;
}
.section-sub {
  color: var(--color__white--muted);
  max-width: 46ch;
  margin-bottom: 0;
}
.writing {
  padding: 2rem 0 3rem;
}

/* ---------- Post list ---------- */
a {
  color: var(--color__white);
  text-decoration: none;
  &:hover {
    text-decoration: none;
    & > article {
      transform: translateY(-10px);
      transition: all 100ms ease-in;
    }
  }
}
.post-thumb {
  position: relative;
  overflow: hidden;
  border-top-left-radius: 0.875rem;
  border-bottom-left-radius: 0.875rem;
  padding: 0.375rem;
}
.post-thumb img {
  vertical-align: bottom;
  transition: all 0.3s;
  border-radius: 0.875rem 0rem 0rem 0.875rem;
  height: 100%;
  object-fit: cover;
}
.post-text {
  padding: 2rem 1.5rem;
}
.post-title {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.231;
  margin-top: 0;
  margin-bottom: 0.8rem;
  a {
    color: var(--color__white);
  }
}
.post-meta {
  font-weight: 400;
  font-size: 11.5px;
  line-height: 2rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 1.2rem;
  a {
    color: var(--color__white);
  }
}

.post-excerpt p {
  line-height: 1.882;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden !important;
  -webkit-box-orient: vertical;
}
article {
  border-radius: 0.875rem;
  box-shadow: 12px 12px 40px rgb(5, 16, 40);
  background-color: #091b40;
}
.post-thumb-link::before {
  content: "";
  display: block;
  background: rgba(21, 21, 21, 0.6);
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  z-index: 1;
}
.post-thumb:hover .post-thumb-link::before {
  opacity: 1;
  visibility: visible;
}
.post-thumb:hover .post-thumb-link::after {
  opacity: 1;
  visibility: visible;
  -webkit-transform: scale(1);
  transform: scale(1);
}
.post-thumb-link::after {
  content: "...";
  font-family: georgia, serif;
  font-size: 2.4rem;
  z-index: 1;
  display: block;
  height: 88px;
  width: 88px;
  letter-spacing: -1px;
  line-height: 88px;
  margin-left: -44px;
  margin-top: -44px;
  position: absolute;
  left: 50%;
  top: 50%;
  text-align: center;
  color: #ffffff;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}

@media screen and (max-width: 600px) {
  .container {
    padding-right: 45px;
    padding-left: 45px;
  }
}
</style>
