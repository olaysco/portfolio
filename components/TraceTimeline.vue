<template>
  <section id="trace" class="sect trace">
    <div class="sect__head">
      <h2 class="eyebrow">trace / career</h2>
      <span class="sect__note">click a span to inspect</span>
    </div>
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
    body: "Cloud and web work for an aviation client, plus mentoring interns and acting as de facto Scrum Master across five concurrent client projects.",
    stack: "PHP · Laravel · Vue · AWS S3 · SQS",
  },
  {
    key: "pe-lms",
    kind: "child",
    tone: "slate-light",
    ...bar(at(2019, 8), at(2020, 6)),
    label: "Aviation LMS on AWS",
    title: "Aviation LMS on AWS",
    range: "PencilEdge",
    body: "Shipped an aviation company's training platform end to end and led its move to AWS, cutting infrastructure overhead by 40%. Course delivery ran on S3 with media processing queued through SQS, so uploads never blocked a lesson.",
    stack: "PHP · Laravel · Vue · AWS S3 · SQS",
  },
  {
    key: "reliancehealth",
    kind: "role",
    tone: "slate",
    ...bar(at(2020, 6), at(2021, 6)),
    label: "Software Engineer · RelianceHealth",
    title: "Software Engineer · RelianceHealth",
    range: "Jun 2020 → Jun 2021 · Lagos",
    body: "Backend systems for a health-insurance platform, owning the growth and marketing-engineering stack.",
    stack: "PHP · MySQL · marketing automation",
  },
  {
    key: "rh-affiliate",
    kind: "child",
    tone: "slate-light",
    ...bar(at(2020, 8), at(2021, 3)),
    label: "Affiliate & referral engine",
    title: "Affiliate & referral engine",
    range: "RelianceHealth",
    body: "Shipped the affiliate and referral engine that turned existing members into an acquisition channel, cutting customer acquisition cost by 60%.",
    stack: "PHP · MySQL",
  },
  {
    key: "rh-dashboards",
    kind: "child",
    tone: "slate-light",
    ...bar(at(2021, 1), at(2021, 6)),
    label: "Growth dashboards & bots",
    title: "Growth dashboards & bots",
    range: "RelianceHealth",
    body: "Built the real-time MS Teams bots and performance dashboards that gave growth and ops teams live visibility, wired into ActiveCampaign, Zapier and the Facebook Conversion API.",
    stack: "MS Teams API · ActiveCampaign · Zapier",
  },
  {
    key: "compuco",
    kind: "role",
    tone: "slate",
    ...bar(at(2021, 6), at(2023, 10)),
    label: "Senior Software Engineer · Compuco",
    title: "Senior Software Engineer · Compuco",
    range: "Jun 2021 → Sep 2023 · London, remote",
    body: "PHP platforms for the NGO sector on the open-source CiviCRM ecosystem: CRM, payments, membership and authentication. A SQL refactor with CTEs took CRM API latency from four minutes to two seconds.",
    stack: "PHP · CiviCRM · Stripe · AWS Cognito",
  },
  {
    key: "cc-stripe",
    kind: "child",
    tone: "slate-light",
    ...bar(at(2021, 10), at(2022, 8)),
    label: "Multi-currency Stripe payments",
    title: "Multi-currency Stripe payments",
    range: "Compuco",
    body: "Led the multi-currency Stripe integration that opened donations across the EU, US and UK, letting donors give in their own currency and keeping the whole flow PCI-compliant.",
    stack: "PHP · Stripe · PCI",
  },
  {
    key: "cc-civicrm",
    kind: "child",
    tone: "slate-light",
    ...bar(at(2022, 5), at(2023, 10)),
    label: "CiviCRM extensions & SSO",
    title: "CiviCRM extensions & SSO",
    range: "Compuco",
    body: "Built open-source CiviCRM extensions now running across thousands of NGOs: federated SSO through AWS Cognito and OpenID Connect, and a multi-year membership engine whose fixed and rolling renewal logic lifted subscription retention.",
    stack: "PHP · CiviCRM · AWS Cognito · OpenID Connect",
  },
  {
    key: "openprovider",
    kind: "role",
    tone: "amber",
    ...bar(at(2023, 10), NOW),
    label: "Senior Software Engineer · Openprovider",
    title: "Senior Software Engineer · Openprovider",
    range: "Oct 2023 → now · Rotterdam, remote",
    body: "Core domain infrastructure as Go services on Kubernetes: pricing, availability, DNS, RDAP and authentication, holding a 99.99% uptime SLA across 4M+ domains. I own the architecture decisions the team builds on and mentor engineers on idiomatic Go.",
    stack: "Go · Kubernetes · MongoDB · Redis · MySQL · gRPC · OpenTelemetry",
  },
  {
    key: "op-pricing",
    kind: "child",
    tone: "amber-light",
    ...bar(at(2024, 1), at(2024, 10)),
    label: "Billing & pricing service",
    title: "Billing & pricing service",
    range: "Openprovider",
    body: "Led the billing and pricing service for real-time prices and promotions, and drove its migration from flat-file storage to a database cached in Redis, which improved availability and cut pricing-related support tickets by 35%.",
    stack: "Go · MongoDB · Redis",
  },
  {
    key: "op-domaincheck",
    kind: "child",
    tone: "amber-light",
    ...bar(at(2024, 8), at(2025, 4)),
    label: "Domain-check rebuild",
    title: "Domain-check rebuild",
    range: "Openprovider",
    body: "Rebuilt the domain-check service, cutting response times from 700ms–2s to around 10ms with a mix of Redis and in-process Go caching, and fixing the out-of-memory failures it hit under peak load.",
    stack: "Go · Redis · caching",
  },
  {
    key: "op-auth",
    kind: "child",
    tone: "amber-light",
    ...bar(at(2025, 2), at(2025, 11)),
    label: "gRPC authentication service",
    title: "gRPC authentication service",
    range: "Openprovider",
    body: "Scaled the Go gRPC authentication service to 100k+ concurrent sessions at 99.99% uptime.",
    stack: "Go · gRPC · Redis",
  },
  {
    key: "op-tracing",
    kind: "child",
    tone: "amber-light",
    ...bar(at(2025, 8), NOW),
    label: "Distributed tracing",
    title: "Distributed tracing",
    range: "Openprovider",
    body: "Implemented distributed tracing across the microservices and established a shared observability standard: one reusable OpenTelemetry and Elasticsearch APM library for the Go and PHP services, so any engineer can see where a failing request broke.",
    stack: "Go · PHP · OpenTelemetry · Elasticsearch APM",
  },
];


const selected = ref("openprovider");
const active = computed(
  () => spans.find((s) => s.key === selected.value) ?? spans[0]
);
</script>

<style lang="scss" scoped>
$grid: 300px minmax(0, 1fr);
$gap: 20px;

.trace {
  padding-top: 24px;
}

.trace__ruler {
  display: grid;
  grid-template-columns: $grid;
  gap: $gap;
  margin-top: 30px;
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
