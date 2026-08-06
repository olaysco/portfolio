<template>
  <section id="trace" class="sect trace">
    <div class="sect__head">
      <h2 class="eyebrow">trace / career</h2>
      <span class="sect__note">click a span to inspect</span>
    </div>
    <p class="sect__lede trace__lede">
      Roles as parent spans, shipped work nested underneath. The same view a
      trace gives you of a request, applied to seven years.
    </p>

    <div class="trace__ruler" aria-hidden="true">
      <div class="trace__ruler-label">SPAN</div>
      <div class="trace__years">
        <span v-for="year in years" :key="year">{{ year }}</span>
      </div>
    </div>

    <div class="trace__rows">
      <button
        v-for="span in spans"
        :key="span.key"
        type="button"
        class="trace__row"
        :class="[
          `trace__row--${span.kind}`,
          { 'trace__row--current': span.tone === 'amber', 'is-active': span.key === selected },
        ]"
        :aria-pressed="span.key === selected"
        @click="selected = span.key"
      >
        <span class="trace__label">
          <span v-if="span.kind === 'child'" class="trace__branch" aria-hidden="true">└</span>
          {{ span.label }}
        </span>
        <span class="trace__track">
          <span
            class="trace__bar"
            :class="`trace__bar--${span.tone}`"
            :style="{ left: span.left + '%', width: span.width + '%' }"
          ></span>
        </span>
      </button>
    </div>

    <div class="trace__detail">
      <p class="trace__detail-label">SPAN DETAIL</p>
      <div class="trace__detail-body" aria-live="polite">
        <div class="trace__detail-head">
          <h3>{{ active.title }}</h3>
          <span class="trace__detail-range">{{ active.range }}</span>
        </div>
        <p class="trace__detail-text">{{ active.body }}</p>
        <p class="trace__detail-stack">{{ active.stack }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

// The axis runs Jan 2019 → Jan 2027: eight year columns, 12.5% each.
const AXIS_MONTHS = years.length * 12;

/** Months since Jan 2019. `at(2023, 10)` is October 2023. */
function at(year: number, month = 1) {
  return (year - years[0]) * 12 + (month - 1);
}

/** Bar geometry for a span running between two points on the axis. */
function bar(from: number, to: number) {
  return { left: (from / AXIS_MONTHS) * 100, width: ((to - from) / AXIS_MONTHS) * 100 };
}

const NOW = at(2026, 8);

const spans = [
  {
    key: "penciledge",
    kind: "role",
    tone: "slate",
    ...bar(at(2019, 8), at(2020, 6)),
    label: "Software Engineer · PencilEdge",
    title: "Software Engineer · PencilEdge",
    range: "Aug 2019 → Jun 2020 · Lagos",
    body: "A cloud-based learning management system for an aviation company, on AWS S3 and SQS. Led the migration to AWS that cut infrastructure overhead by 40%, and acted as de facto Scrum Master across five concurrent client projects.",
    stack: "PHP · Laravel · Vue · AWS S3 · SQS",
  },
  {
    key: "timetable",
    kind: "child",
    tone: "slate-light",
    ...bar(at(2019, 1), at(2019, 12)),
    label: "Timetable Generator",
    title: "Timetable Generator",
    range: "2019",
    body: "A Laravel app that generates conflict-free college timetables with a genetic algorithm, running the heavy computation on background job queues. Still the most-starred repo on my GitHub.",
    stack: "Laravel · PHP · genetic algorithms",
  },
  {
    key: "reliancehealth",
    kind: "role",
    tone: "slate",
    ...bar(at(2020, 6), at(2021, 6)),
    label: "Software Engineer · RelianceHealth",
    title: "Software Engineer · RelianceHealth",
    range: "Jun 2020 → Jun 2021 · Lagos",
    body: "Backend systems for a health-insurance platform, owning the growth and marketing-engineering stack. The affiliate and referral engine I shipped cut customer acquisition cost by 60%.",
    stack: "PHP · MySQL · MS Teams bots · marketing automation",
  },
  {
    key: "compuco",
    kind: "role",
    tone: "slate",
    ...bar(at(2021, 6), at(2023, 10)),
    label: "Senior Software Engineer · Compuco",
    title: "Senior Software Engineer · Compuco",
    range: "Jun 2021 → Sep 2023 · London, remote",
    body: "PHP platforms for the NGO sector on the open-source CiviCRM ecosystem: CRM, payments, membership and authentication. Multi-currency Stripe integration across the EU, US and UK, and a SQL refactor with CTEs that took CRM API latency from four minutes to two seconds.",
    stack: "PHP · CiviCRM · Stripe · AWS Cognito · OpenID Connect",
  },
  {
    key: "verifiland",
    kind: "child",
    tone: "slate-light",
    ...bar(at(2022, 1), at(2022, 12)),
    label: "Verifiland",
    title: "Verifiland",
    range: "2022",
    body: "Blockchain-based land registration, with smart contracts holding tamper-proof ownership records.",
    stack: "Solidity · NestJS · Vue",
  },
  {
    key: "openprovider",
    kind: "role",
    tone: "amber",
    ...bar(at(2023, 10), NOW),
    label: "Senior Software Engineer · Openprovider",
    title: "Senior Software Engineer · Openprovider",
    range: "Oct 2023 → now · Rotterdam, remote",
    body: "Core domain infrastructure as Go services on Kubernetes: pricing, availability, DNS, RDAP and authentication, holding a 99.99% uptime SLA across 4M+ domains. Rebuilt the domain-check service from 700ms–2s down to ~10ms, scaled the gRPC auth service to 100k+ concurrent sessions, and wrote the OpenTelemetry tracing library the Go and PHP services now share.",
    stack: "Go · Kubernetes · MongoDB · Redis · MySQL · gRPC · OpenTelemetry",
  },
  {
    key: "homeos",
    kind: "child",
    tone: "amber-light",
    ...bar(at(2024, 1), NOW),
    label: "HomeOS",
    title: "HomeOS",
    range: "2024 → now",
    body: "Booking and payments backend for a Nigerian chef-hiring marketplace. Idempotent writes and queued payouts against an unreliable provider.",
    stack: "Go · Postgres · Beanstalkd · Kubernetes",
  },
  {
    key: "khanzuo",
    kind: "child",
    tone: "amber-light",
    ...bar(at(2025, 1), NOW),
    label: "Khanzuo",
    title: "Khanzuo",
    range: "2025 → now",
    body: "An agent that reproduces user-reported issues by driving the app like a real user, then turns what breaks into fix-ready developer context.",
    stack: "LLM agent · Vue",
  },
  {
    key: "itan",
    kind: "child",
    tone: "amber-dim",
    ...bar(at(2026, 1), NOW),
    label: "Ìtàn",
    title: "Ìtàn",
    range: "2026 → now",
    body: "An agentic AI video editor built from scratch in Go, with ffmpeg, headless Chromium and LLM APIs behind a CLI, a browser UI and voice control. Drives media tools over a replayable edit ledger, hot-swaps models mid-session, and renders LLM-authored motion graphics frame-accurate.",
    stack: "Go · ffmpeg · headless Chromium · LLM APIs",
  },
];

const selected = ref("openprovider");
const active = computed(
  () => spans.find((s) => s.key === selected.value) ?? spans[5]
);
</script>

<style lang="scss" scoped>
$grid: 300px minmax(0, 1fr);
$gap: 20px;

.trace {
  padding-top: 24px;
}

.trace__lede {
  margin-bottom: 30px;
}

.trace__ruler {
  display: grid;
  grid-template-columns: $grid;
  gap: $gap;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--ink-4);
  padding-bottom: 10px;
}

.trace__years {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.trace__rows {
  border-top: 1px solid var(--line--rule);
}

.trace__row {
  display: grid;
  grid-template-columns: $grid;
  gap: $gap;
  align-items: center;
  width: 100%;
  text-align: left;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--line--soft);
  color: inherit;
  padding: 11px 0;
  cursor: pointer;
  transition: background-color 140ms ease;

  &:hover,
  &.is-active {
    background: rgba(245, 165, 36, 0.07);
  }

  &:last-child {
    border-bottom-color: var(--line--rule);
  }
}

.trace__row--role {
  padding: 13px 0;

  .trace__label {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  .trace__track {
    height: 22px;
  }
}

.trace__row--child {
  .trace__label {
    font-size: 13px;
    color: var(--ink-3);
    padding-left: 22px;
  }

  .trace__track {
    height: 16px;
  }
}

.trace__row--current .trace__label {
  color: var(--accent);
}

.trace__branch {
  color: var(--ink-5);
  margin-right: 4px;
}

.trace__track {
  position: relative;
  display: block;
  background: repeating-linear-gradient(
    90deg,
    rgba(238, 242, 249, 0.07) 0 1px,
    transparent 1px 12.5%
  );
}

.trace__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  display: block;
}

.trace__bar--slate {
  background: rgba(169, 189, 222, 0.28);
  border-left: 2px solid var(--ink-3);
}

.trace__bar--slate-light {
  background: rgba(169, 189, 222, 0.5);
}

.trace__bar--amber {
  background: rgba(245, 165, 36, 0.3);
  border-left: 2px solid var(--accent);
}

.trace__bar--amber-light {
  background: rgba(245, 165, 36, 0.55);
}

.trace__bar--amber-dim {
  background: rgba(245, 165, 36, 0.4);
}

.trace__detail {
  display: grid;
  grid-template-columns: $grid;
  gap: $gap;
  padding: 26px 0 8px;
}

.trace__detail-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--ink-4);
  margin: 0;
}

.trace__detail-body {
  border-left: 2px solid var(--accent);
  padding-left: 22px;
}

.trace__detail-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;

  h3 {
    font-size: clamp(21px, 3vw, 26px);
    font-weight: 600;
    letter-spacing: -0.02em;
    margin: 0;
  }
}

.trace__detail-range {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.06em;
}

.trace__detail-text {
  font-size: 17px;
  line-height: 1.6;
  color: var(--ink-3);
  margin: 12px 0 0;
  max-width: 68ch;
  text-wrap: pretty;
}

.trace__detail-stack {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-4);
  margin: 14px 0 0;
  letter-spacing: 0.04em;
}

@media screen and (max-width: 820px) {
  .trace__ruler,
  .trace__row,
  .trace__detail {
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
  }

  .trace__ruler-label {
    display: none;
  }

  .trace__years {
    font-size: 10px;
  }

  .trace__row--child .trace__label {
    padding-left: 14px;
  }

  .trace__detail {
    gap: 14px;
  }
}
</style>
