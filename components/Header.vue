<template>
  <header class="site-nav">
    <div class="shell site-nav__inner">
      <NuxtLink to="/" class="site-nav__brand" aria-label="Olayiwola Odunsi, home">
        Oláyíwolá<span> Odunsi</span>
      </NuxtLink>

      <nav class="site-nav__nav" aria-label="Sections">
        <a
          v-for="item in items"
          :key="item.hash"
          :href="`/${item.hash}`"
          :class="{ 'is-current': item.hash === '#log' && onPost }"
          :aria-current="item.hash === '#log' && onPost ? 'page' : undefined"
        >
          {{ item.label }}
        </a>
        <span class="site-nav__status">
          <span class="site-nav__dot" aria-hidden="true"></span>Open to work
        </span>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const items = [
  { label: "Trace", hash: "#trace" },
  { label: "Projects", hash: "#projects" },
  { label: "Log", hash: "#log" },
  { label: "About", hash: "#about" },
];

// Every route that isn't the home page or /about is an article, so the Log
// entry is the one the reader is currently inside.
const route = useRoute();
const onPost = computed(() => !["/", "/about"].includes(route.path.replace(/\/$/, "") || "/"));
</script>

<style lang="scss" scoped>
.site-nav {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(0, 4, 12, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line--rule);
}

.site-nav__inner {
  min-height: var(--nav-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.site-nav__brand {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--ink);
  text-decoration: none;
  white-space: nowrap;

  span {
    color: var(--ink-4);
  }

  &:hover {
    color: var(--accent);
  }
}

.site-nav__nav {
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  justify-content: flex-end;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  a {
    color: var(--ink-3);
    text-decoration: none;
    transition: color 140ms ease;

    &:hover,
    &.is-current {
      color: var(--accent);
    }
  }
}

.site-nav__status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(61, 214, 140, 0.5);
  background: rgba(61, 214, 140, 0.1);
  color: var(--ok--soft);
  padding: 6px 11px;
  font-size: 11px;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.site-nav__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ok);
  display: block;
}

@media screen and (max-width: 860px) {
  .site-nav__inner {
    gap: 16px;
  }

  .site-nav__nav {
    gap: 18px;
  }

  .site-nav__status {
    display: none;
  }
}

@media screen and (max-width: 560px) {
  .site-nav__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .site-nav__nav {
    justify-content: flex-start;
    gap: 16px;
  }
}
</style>
