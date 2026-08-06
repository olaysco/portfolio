<template>
  <article v-if="article" class="post">
    <div class="shell">
      <header class="post__head">
        <nav class="post__crumbs" aria-label="Breadcrumb">
          <NuxtLink to="/#log">← log</NuxtLink>
          <span class="post__slash" aria-hidden="true">/</span>
          <span>{{ stamp(article.date) }}</span>
          <span class="post__level" :class="`post__level--${level(article)}`">
            {{ level(article).toUpperCase() }}
          </span>
        </nav>

        <h1 class="post__title">{{ article.title }}</h1>

        <p v-if="article.description" class="post__standfirst">
          {{ article.description }}
        </p>

        <div class="post__meta">
          <span class="post__author">Oláyíwolá Odunsi</span>
          <span>{{ readingTime }} min read</span>
          <span v-if="article.version">{{ article.version }}</span>
          <ul v-if="tags.length" class="post__tags">
            <li v-for="tag in tags" :key="tag">{{ tag }}</li>
          </ul>
        </div>
      </header>

      <div class="post__layout">
        <aside class="post__aside">
          <nav v-if="toc.length" class="post__toc" aria-label="Contents">
            <p class="post__aside-label">Contents</p>
            <a
              v-for="item in toc"
              :key="item.id"
              :href="`#${item.id}`"
              class="post__toc-link"
              :class="{ 'is-active': item.id === activeHeading }"
            >
              {{ item.text }}
            </a>
          </nav>

          <div class="post__share">
            <p class="post__aside-label">Share</p>
            <div class="post__share-links">
              <a :href="shareOnX" target="_blank" rel="noopener">X ↗</a>
              <a :href="shareOnLinkedIn" target="_blank" rel="noopener">LinkedIn ↗</a>
              <button type="button" @click="copyLink">
                {{ copied ? "Copied" : "Copy link" }}
              </button>
            </div>
          </div>
        </aside>

        <div class="post__body">
          <ContentRenderer :value="article" />
        </div>
      </div>

      <section v-if="related.length" class="post__related">
        <h2 class="eyebrow post__related-label">more from the log</h2>
        <div class="post__related-grid">
          <NuxtLink
            v-for="item in related"
            :key="item._path"
            :to="item._path"
            class="post__related-card"
          >
            <div class="post__related-meta">
              <span class="post__related-stamp">{{ stamp(item.date) }}</span>
              <span class="post__level" :class="`post__level--${level(item)}`">
                {{ level(item).toUpperCase() }}
              </span>
            </div>
            <div class="post__related-title">{{ item.title }}</div>
            <div class="post__related-note">{{ item.description }}</div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import siteMeta from "~/utils/meta";

const SITE = "https://olaysco.github.io";
const AUTHOR = "Oláyíwolá Odunsi";

let { path } = useRoute();
if (path.slice(-1) === "/") {
  path = path.slice(0, -1);
}

const { data } = await useAsyncData(`content-${path}`, () => {
  // Both queries are built before anything is awaited: queryContent() is a
  // composable, and after the first await the Nuxt instance is gone.
  const article = queryContent().where({ _path: path }).findOne();

  // Two most recent other posts, so the "more from the log" pair is always
  // full. findSurround leaves a null at either end of the archive.
  const related = queryContent()
    .where({ published: true, _path: { $ne: path } })
    .only(["_path", "title", "description", "date", "level"])
    .sort({ date: -1 })
    .limit(2)
    .find()
    .catch(() => []);

  return Promise.all([article, related]).then(([doc, others]) => ({
    article: doc,
    related: others,
  }));
});

const article = computed(() => data.value?.article);
const related = computed(() => data.value?.related ?? []);

const tags = computed<string[]>(() => article.value?.tags ?? []);
const toc = computed(() => article.value?.body?.toc?.links ?? []);

function stamp(date: string | Date) {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? String(date) : d.toISOString().slice(0, 10);
}

/** Posts opt into a severity via frontmatter; everything else is routine. */
function level(doc: any): string {
  const value = String(doc?.level ?? "info").toLowerCase();
  return ["info", "warn", "error"].includes(value) ? value : "info";
}

/** Walk the rendered AST for its text — body.length is an object, not prose. */
function textOf(node: any): string {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;
  if (Array.isArray(node.children)) return node.children.map(textOf).join(" ");
  return "";
}

const readingTime = computed(() => {
  const words = textOf(article.value?.body).trim().split(/\s+/).filter(Boolean);
  return Math.max(1, Math.round(words.length / 220));
});

/* ── Share ────────────────────────────────────────────────── */

const shareUrl = computed(() => `${SITE}${path}`);

const shareOnX = computed(
  () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      article.value?.title ?? ""
    )}&url=${encodeURIComponent(shareUrl.value)}`
);

const shareOnLinkedIn = computed(
  () =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl.value
    )}`
);

const copied = ref(false);
async function copyLink() {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1800);
  } catch {
    // Clipboard is unavailable (insecure context, denied permission) — the
    // address bar already holds the link, so there is nothing to recover.
  }
}

/* ── Contents highlighting ────────────────────────────────── */

const activeHeading = ref("");

onMounted(() => {
  const headings = toc.value
    .map((item: any) => document.getElementById(item.id))
    .filter(Boolean) as HTMLElement[];

  if (!headings.length || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      const onscreen = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (onscreen[0]) activeHeading.value = onscreen[0].target.id;
    },
    { rootMargin: "-90px 0px -68% 0px" }
  );

  headings.forEach((el) => io.observe(el));
  onBeforeUnmount(() => io.disconnect());
});

/* ── Head ─────────────────────────────────────────────────── */

if (article.value) {
  useHead({
    title: article.value.title,
    meta: siteMeta({
      type: "article",
      url: shareUrl.value,
      title: article.value.title,
      description: article.value.description,
      mainImage: `${SITE}/cover/cover-${article.value.cover}`,
    }),
  });
}
</script>

<style lang="scss" scoped>
.post__head {
  padding: 56px 0 0;
  max-width: 78ch;
}

.post__crumbs {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--ink-4);
  margin-bottom: 30px;

  a {
    color: var(--ink-4);
    text-decoration: none;

    &:hover {
      color: var(--accent);
    }
  }
}

.post__slash {
  color: var(--ink-5);
}

.post__level {
  letter-spacing: 0.1em;
}

.post__level--info {
  color: var(--ok--soft);
}

.post__level--warn {
  color: var(--accent);
}

.post__level--error {
  color: #ff8f7a;
}

.post__title {
  font-size: clamp(34px, 5.4vw, 62px);
  line-height: 1.02;
  letter-spacing: -0.035em;
  font-weight: 600;
  margin: 0;
  text-wrap: pretty;
}

.post__standfirst {
  font-size: clamp(18px, 2.4vw, 21px);
  line-height: 1.55;
  color: var(--ink-2);
  margin: 24px 0 0;
  max-width: 62ch;
  text-wrap: pretty;
}

.post__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 22px;
  margin: 34px 0 0;
  padding-top: 20px;
  border-top: 1px solid var(--line--rule);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-4);
  letter-spacing: 0.04em;
}

.post__author {
  color: var(--ink);
}

.post__tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  margin-left: auto;

  li {
    border: 1px solid rgba(245, 165, 36, 0.45);
    color: var(--accent--soft);
    padding: 5px 10px;
  }
}

.post__layout {
  display: grid;
  grid-template-columns: 208px minmax(0, 1fr);
  gap: 56px;
  padding: 52px 0 0;
  align-items: start;
}

.post__aside {
  position: sticky;
  top: calc(var(--nav-h) + 32px);
}

.post__aside-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-4);
  margin: 0 0 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line--rule);
}

.post__toc-link {
  display: block;
  font-size: 14px;
  line-height: 1.4;
  color: var(--ink-3);
  text-decoration: none;
  padding: 11px 0 11px 12px;
  border-left: 2px solid var(--line--rule);
  transition: color 140ms ease, border-color 140ms ease;

  &:hover,
  &.is-active {
    color: var(--accent);
    border-left-color: var(--accent);
  }
}

.post__share {
  margin-top: 26px;
  padding-top: 18px;
  border-top: 1px solid var(--line--rule);

  .post__aside-label {
    border-bottom: 0;
    padding-bottom: 0;
  }
}

.post__share-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
  font-family: var(--font-mono);
  font-size: 13px;

  a,
  button {
    color: var(--accent);
    background: none;
    border: 0;
    padding: 0;
    font: inherit;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: var(--accent--hi);
    }
  }
}

.post__body {
  max-width: 72ch;
}

.post__related {
  padding: 72px 0 0;
}

.post__related-label {
  border-top: 1px solid var(--line--rule);
  padding-top: 24px;
  margin-bottom: 20px;
}

.post__related-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.post__related-card {
  display: block;
  border: 1px solid var(--line--dashed);
  background: var(--panel);
  padding: 20px;
  color: var(--ink);
  text-decoration: none;
  transition: border-color 140ms ease, background-color 140ms ease;

  &:hover {
    border-color: rgba(245, 165, 36, 0.55);
    background: var(--panel--hover);
  }
}

.post__related-meta {
  display: flex;
  gap: 14px;
  font-family: var(--font-mono);
  font-size: 12px;
}

.post__related-stamp {
  color: var(--ink-4);
}

.post__related-title {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-top: 10px;
  line-height: 1.25;
}

.post__related-note {
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-3);
  margin-top: 8px;
}

@media screen and (max-width: 940px) {
  .post__layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
    padding-top: 36px;
  }

  .post__aside {
    position: static;
  }

  .post__body {
    max-width: none;
  }
}

@media screen and (max-width: 640px) {
  .post__head {
    padding-top: 36px;
  }

  .post__tags {
    margin-left: 0;
  }

  .post__related-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
