<template>
  <div class="code-block">
    <div v-if="label" class="code-block__head">
      <span class="code-block__name">{{ label }}</span>
      <span v-if="filename && language" class="code-block__lang">{{ language }}</span>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
// Overrides Nuxt Content's ProseCode so a fenced block carries the design's
// titled header bar. Write ```yaml [deployment.yaml] in the markdown to set the
// title; without one the language stands in.
const props = defineProps({
  code: { type: String, default: "" },
  language: { type: String, default: null },
  filename: { type: String, default: null },
  highlights: { type: Array, default: () => [] },
  meta: { type: String, default: null },
});

const label = computed(() => props.filename || props.language || "");
</script>

<style lang="scss" scoped>
.code-block {
  border: 1px solid var(--line);
  background: var(--panel);
  margin: 30px 0;
}

.code-block__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 16px;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--ink-4);
}

.code-block__lang {
  text-transform: uppercase;
}

.code-block :deep(pre) {
  margin: 0;
  padding: 16px;
  background: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.75;
  color: var(--ink-2);
  overflow-x: auto;
}

.code-block :deep(pre code) {
  background: none;
  padding: 0;
  border: 0;
  box-shadow: none;
  color: inherit;
  font-size: inherit;
  display: block;
  width: 100%;
}

.code-block :deep(pre code .line) {
  display: block;
  min-height: 1rem;
}
</style>
