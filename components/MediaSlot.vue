<template>
  <figure class="slot" :style="{ minHeight: `${minHeight}px` }">
    <a
      v-if="src && href"
      class="slot__link"
      :href="href"
      target="_blank"
      rel="noopener"
    >
      <img class="slot__img" :src="src" :alt="alt" loading="lazy" />
    </a>
    <img v-else-if="src" class="slot__img" :src="src" :alt="alt" loading="lazy" />
    <figcaption v-else class="slot__empty">
      <span class="slot__mark" aria-hidden="true">[ ]</span>
      <span class="slot__text">{{ caption }}</span>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    caption?: string;
    minHeight?: number;
    href?: string;
  }>(),
  { src: "", alt: "", caption: "", minHeight: 220, href: "" }
);
</script>

<style lang="scss" scoped>
.slot {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  height: 100%;
  border: 1px solid var(--line);
  overflow: hidden;
}

.slot__link {
  display: block;
  width: 100%;
  height: 100%;
}

.slot__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition: filter 200ms ease;

  &:hover {
    filter: grayscale(0);
  }
}

.slot__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 28px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--ink-4);
}

.slot__mark {
  color: var(--ink-5);
  letter-spacing: 0.2em;
}

.slot__text {
  max-width: 34ch;
}
</style>
