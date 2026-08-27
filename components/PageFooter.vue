<template>
  <footer class="site-footer" id="contact">
    <div class="shell site-footer__inner">
      <p class="site-footer__eyebrow">contact / open</p>

      <h2 class="site-footer__title">
        Available for senior Go / backend and platform roles.
      </h2>

      <div class="site-footer__actions">
        <a class="site-footer__mail" href="mailto:olayiwolaodunsi@gmail.com">
          olayiwolaodunsi@gmail.com
        </a>
        <a
          v-if="links.resume"
          class="site-footer__resume"
          :href="links.resume"
          download
        >
          Résumé (PDF) ↓
        </a>
        <span class="site-footer__reply">Usually a reply within a day.</span>
      </div>

      <div class="site-footer__meta">
        <a href="https://github.com/olaysco" target="_blank" rel="noopener">GitHub</a>
        <a
          v-if="links.linkedin"
          :href="links.linkedin"
          target="_blank"
          rel="noopener"
        >LinkedIn</a>
        <a href="https://twitter.com/olaysco" target="_blank" rel="noopener">X</a>
        <span class="site-footer__copy">olaysco.github.io © {{ year }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { links } from "~/utils/profile";

const year = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.site-footer {
  background: var(--accent);
  color: var(--bg);
  margin-top: 76px;
}

.site-footer__inner {
  padding-top: 84px;
  padding-bottom: 84px;
}

.site-footer__eyebrow {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin: 0 0 26px;
}

.site-footer__title {
  font-size: clamp(32px, 5vw, 54px);
  line-height: 1.02;
  letter-spacing: -0.035em;
  font-weight: 600;
  margin: 0;
  max-width: 22ch;
  text-wrap: pretty;
}

.site-footer__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 38px;
}

.site-footer__mail {
  background: var(--bg);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: clamp(13px, 2.6vw, 15px);
  font-weight: 500;
  padding: 16px 24px;
  text-decoration: none;
  word-break: break-word;
  transition: background-color 140ms ease;

  &:hover {
    background: #0b2352;
  }
}

.site-footer__resume {
  border: 1px solid var(--bg);
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: clamp(13px, 2.6vw, 15px);
  font-weight: 500;
  padding: 15px 24px;
  text-decoration: none;
  transition: background-color 140ms ease, color 140ms ease;

  &:hover {
    background: var(--bg);
    color: var(--accent);
  }
}

.site-footer__reply {
  font-family: var(--font-mono);
  font-size: 14px;
  color: rgba(8, 25, 61, 0.75);
}

.site-footer__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 26px;
  margin-top: 64px;
  padding-top: 24px;
  border-top: 1px solid rgba(8, 25, 61, 0.3);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  a {
    color: var(--bg);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.site-footer__copy {
  margin-left: auto;
  text-transform: none;
  letter-spacing: 0;
  color: rgba(8, 25, 61, 0.75);
}

@media screen and (max-width: 560px) {
  .site-footer__inner {
    padding-top: 56px;
    padding-bottom: 56px;
  }

  .site-footer__meta {
    margin-top: 44px;
  }

  .site-footer__copy {
    margin-left: 0;
    width: 100%;
  }
}
</style>
