<template>
  <article class="case" :class="{ 'case--divided': divider }">
    <div class="case__body">
      <div class="case__heading">
        <span class="case__index">{{ index }}</span>
        <h3 class="case__title">{{ title }}</h3>
      </div>

      <dl class="case__pdr">
        <div class="case__pdr-row">
          <dt>Problem</dt>
          <dd>{{ problem }}</dd>
        </div>
        <div class="case__pdr-row">
          <dt>Decision</dt>
          <dd>{{ decision }}</dd>
        </div>
        <div class="case__pdr-row case__pdr-row--result">
          <dt>Result</dt>
          <dd>{{ result }}</dd>
        </div>
      </dl>

      <div v-if="shownMetrics.length" class="case__metrics">
        <div v-for="metric in shownMetrics" :key="metric.label" class="case__metric">
          <div class="case__metric-value" :class="{ 'is-ok': metric.tone === 'ok' }">
            {{ metric.value }}
          </div>
          <div class="case__metric-label">{{ metric.label }}</div>
        </div>
      </div>

      <div class="case__footer">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="case__link"
          :class="{ 'case__link--muted': link.muted }"
          target="_blank"
          rel="noopener"
        >
          {{ link.label }} ↗
        </a>
        <span v-if="stack" class="case__stack">{{ stack }}</span>
      </div>
    </div>

    <div class="case__media">
      <slot name="media" />
    </div>
  </article>
</template>

<script setup lang="ts">
type Metric = { value: string; label: string; tone?: "accent" | "ok" };
type Link = { href: string; label: string; muted?: boolean };

const props = withDefaults(
  defineProps<{
    index: string;
    title: string;
    problem: string;
    decision: string;
    result: string;
    metrics?: Metric[];
    links?: Link[];
    stack?: string;
    divider?: boolean;
  }>(),
  { metrics: () => [], links: () => [], stack: "", divider: true }
);

// A metric with no value is one I haven't measured, so drop it rather than
// print a placeholder.
const shownMetrics = computed(() => props.metrics.filter((m) => m.value));
</script>

<style lang="scss" scoped>
.case {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: 56px;
  padding: 40px 0 44px;
}

.case--divided {
  border-bottom: 1px solid var(--line--rule);
}

.case__heading {
  display: flex;
  align-items: baseline;
  gap: 14px;
}

.case__index {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-5);
}

.case__title {
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 600;
  letter-spacing: -0.025em;
  margin: 0;
}

.case__pdr {
  margin: 20px 0 0;
  display: grid;
  gap: 14px;
}

.case__pdr-row {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 16px;

  dt {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-4);
    padding-top: 4px;
  }

  dd {
    font-size: 16px;
    line-height: 1.6;
    color: var(--ink-2);
    margin: 0;
  }
}

.case__pdr-row--result {
  dt {
    color: var(--accent);
  }

  dd {
    color: var(--ink);
  }
}

.case__metrics {
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  max-width: 100%;
  border: 1px solid var(--line);
  margin-top: 26px;
}

.case__metric {
  flex: 0 0 auto;
  min-width: 132px;
  padding: 16px 18px;
  border-left: 1px solid var(--line);

  &:first-child {
    border-left: 0;
  }
}

.case__metric-value {
  font-family: var(--font-mono);
  font-size: 22px;
  font-weight: 600;
  color: var(--accent);

  &.is-ok {
    color: var(--ok--soft);
  }
}

.case__metric-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-4);
  margin-top: 6px;
}

.case__footer {
  margin-top: 26px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 22px;
  font-family: var(--font-mono);
  font-size: 13px;
}

.case__link {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid rgba(245, 165, 36, 0.6);
  padding-bottom: 3px;

  &:hover {
    color: var(--accent--hi);
  }
}

.case__link--muted {
  color: var(--ink-3);
  border-bottom-color: rgba(169, 189, 222, 0.35);

  &:hover {
    color: var(--ink);
  }
}

.case__stack {
  color: var(--ink-4);
}

@media screen and (max-width: 900px) {
  .case {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
}

@media screen and (max-width: 520px) {
  .case__pdr-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;

    dt {
      padding-top: 0;
    }
  }
}
</style>
