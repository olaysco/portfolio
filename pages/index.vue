<template>
  <div class="home">
    <div class="shell">
      <!-- ── Hero ─────────────────────────────────────────────── -->
      <section id="top" class="hero">
        <div class="hero__copy">
          <p class="eyebrow hero__eyebrow">
            Oláyíwolá Odunsi · senior backend &amp; cloud
          </p>

          <h1 class="hero__title">I keep Go services alive under load.</h1>

          <p class="hero__lede">
            Currently the core domain infrastructure at
            <strong>Openprovider</strong>: pricing, availability, DNS, RDAP and
            authentication, on a 99.99% uptime SLA across 4M+ domains. Before Go
            it was PHP and Laravel, the years the habits around queues, retries
            and long-running jobs came from.
          </p>
          <p class="hero__lede">
            I write about queues, rate limiting, and the parts of distributed
            systems that fail quietly.
          </p>

          <div class="hero__actions">
            <a href="#projects" class="btn btn--solid">See the projects</a>
            <a href="#trace" class="btn btn--ghost">Read the trace</a>
          </div>
        </div>

        <aside class="panel hero__panel" aria-label="Profile at a glance">
          <div class="hero__panel-head">
            <span>SERVICE / odunsi</span>
            <span class="hero__panel-state">HEALTHY</span>
          </div>

          <div class="hero__panel-body">
            <dl class="facts">
              <div v-for="fact in facts" :key="fact.k" class="facts__row">
                <dt>{{ fact.k }}</dt>
                <dd>{{ fact.v }}</dd>
              </div>
            </dl>

            <div class="spark">
              <p class="spark__label">Requests / 24h</p>
              <div class="spark__bars" aria-hidden="true">
                <span
                  v-for="(height, i) in sparkline"
                  :key="i"
                  class="spark__bar"
                  :class="{ 'is-peak': height === peak }"
                  :style="{ height: `${height}%` }"
                ></span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <!-- ── Trace ────────────────────────────────────────────── -->
      <TraceTimeline />

      <!-- ── Private projects ─────────────────────────────────── -->
      <section id="projects" class="sect">
        <div class="sect__head">
          <h2 class="eyebrow">private projects / 3</h2>
          <span class="sect__note">problem → decision → result</span>
        </div>

        <ServiceCase
          index="01"
          title="HomeOS"
          problem="Bookings and chef payouts had to settle correctly while third-party payment webhooks arrived late, twice, or not at all."
          decision="Idempotency keys on every write and a Beanstalkd queue with exponential back-off, instead of confirming synchronously against the provider."
          :result="homeosResult"
          :metrics="homeosMetrics"
          :links="[
            { href: 'https://homeos.ng/home', label: 'Live product' },
            { href: 'https://github.com/olaysco/cheffie-fe', label: 'Source', muted: true },
          ]"
        >
          <template #media>
            <div class="panel path">
              <p class="path__label">Request path / booking</p>
              <ol class="path__steps">
                <li class="path__node">Client: Ionic / Vue</li>
                <li class="path__edge" aria-hidden="true"></li>
                <li class="path__node path__node--hot">API: Go · idempotency key</li>
                <li class="path__edge" aria-hidden="true"></li>
                <li class="path__node">Postgres: booking, ledger</li>
                <li class="path__edge" aria-hidden="true"></li>
                <li class="path__node">Beanstalkd: payout job</li>
                <li class="path__edge path__edge--noted">
                  <span>↺ retry, exponential back-off</span>
                </li>
                <li class="path__node path__node--unreliable">
                  Payment provider: webhooks, unreliable
                </li>
              </ol>
            </div>
          </template>
        </ServiceCase>

        <ServiceCase
          index="02"
          title="Ìtàn"
          problem="An LLM can describe an edit but cannot execute one, and a video agent that mutates state as it goes leaves nothing you can inspect, resume or trust twice."
          decision="Built from scratch in Go around a replayable edit ledger, where every agent action is an appended operation rather than a mutation, with ffmpeg and headless Chromium doing the work and models hot-swappable mid-session behind one interface."
          result="LLM-authored HTML/CSS/GSAP motion graphics render frame-accurate, and the same agent is drivable from a CLI, a browser UI or by voice."
          stack="Go · ffmpeg · headless Chromium · LLM APIs"
        >
          <template #media>
            <MediaSlot
              :src="media.itan"
              alt="Ìtàn editor mid-render"
              caption="A still from the editor: the agent assembling an edit, or the ledger replaying"
            />
          </template>
        </ServiceCase>

        <ServiceCase
          index="03"
          title="Khanzuo"
          problem="Bug reports arrive as prose. Reproducing them by hand is the slowest part of a fix, and the part nobody wants."
          decision="An agent that drives the real app like a user, then hands back fix-ready context. Traded deterministic scripted steps for an agent that can improvise around a vague report."
          result="Reports land as a replayed session with the failing step, console output and network trail attached, so the fix starts at the cause rather than the retelling."
          :links="[{ href: 'https://github.com/olaysco/khanzuo', label: 'Source' }]"
          stack="LLM agent · Vue"
          :divider="false"
        >
          <template #media>
            <MediaSlot
              :src="media.khanzuo"
              alt="Khanzuo agent mid-run"
              caption="A still from the demo: the agent mid-run"
            />
          </template>
        </ServiceCase>

        <p class="projects__also">
          Also shipped: ZapZap (Go logistics backend, zapzap.ng), Go-OTS
          (one-time secret CLI), Timetable Generator (conflict-free timetables
          via a genetic algorithm), Verifiland (Solidity land registry), Stroke
          Prediction System (91% accurate, GPT explainer). Smaller experiments,
          kept out of the way.
        </p>
      </section>

      <!-- ── Log ──────────────────────────────────────────────── -->
      <section id="log" class="sect">
        <div class="sect__head log__head">
          <h2 class="eyebrow">log / writing</h2>
          <button
            v-if="articles.length > previewCount"
            type="button"
            class="log__toggle"
            @click="showAll = !showAll"
          >
            {{ showAll ? `tail -${previewCount} ↑` : "tail all posts →" }}
          </button>
        </div>

        <NuxtLink
          v-for="(article, i) in articles"
          :key="article._path"
          :to="article._path"
          class="log__entry"
          :class="{ 'log__entry--folded': !showAll && i >= previewCount }"
        >
          <div class="log__meta">
            <span class="log__stamp">{{ stamp(article.date) }}</span>
            <span class="log__level" :class="`log__level--${level(article)}`">
              {{ level(article).toUpperCase() }}
            </span>
          </div>
          <div class="log__title">{{ article.title }}</div>
          <div class="log__note">{{ article.description }}</div>
        </NuxtLink>

        <p v-if="!articles.length" class="log__empty">No posts yet.</p>
      </section>

      <!-- ── About ────────────────────────────────────────────── -->
      <section id="about" class="sect about">
        <div class="about__side">
          <h2 class="eyebrow about__label">about</h2>
          <img
            class="about__portrait"
            src="/olayiwola.jpeg"
            alt="Oláyíwolá Odunsi"
            width="480"
            height="600"
            loading="lazy"
          />
          <p class="about__creds">
            MSc Artificial Intelligence &amp; Human Factors, Coventry. BSc
            Computer Science, First Class, Hertfordshire. Certified Kubernetes
            &amp; Cloud Native Associate. United Kingdom, remote across GMT and
            CET hours.
          </p>
        </div>

        <div class="about__main">
          <p class="about__pull">
            I work on the unglamorous half of a product: the queue that has to
            drain, the endpoint that has to hold at peak, the migration that
            cannot lose a row.
          </p>
          <p class="about__body">
            Most of what I know came from things breaking in production and
            having to explain why. That's also most of what I write about.
          </p>

          <p class="about__stack-label">Stack</p>
          <ul class="about__chips">
            <li v-for="skill in coreStack" :key="skill">{{ skill }}</li>
          </ul>
          <p class="about__also">Also: {{ alsoStack.join(" · ") }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";
import { media, metrics } from "~/utils/profile";

useHead({
  title: "Olayiwola Odunsi - Backend & Cloud Engineer",
});

/* ── Content ──────────────────────────────────────────────── */

const { data } = await useAsyncData("content-index", () =>
  queryContent().where({ published: true }).sort({ date: -1 }).find()
);

const articles = computed<ParsedContent[]>(() => data.value ?? []);

// Every post stays in the markup: folded entries are hidden in CSS, not
// dropped, so the prerender crawler still finds and builds each post route.
const previewCount = 3;
const showAll = ref(false);

function stamp(date: string | Date) {
  const d = new Date(date);
  return Number.isNaN(d.getTime())
    ? String(date)
    : d.toISOString().slice(0, 10);
}

/** Posts opt into a severity via frontmatter; everything else is routine. */
function level(article: any): string {
  const value = String(article.level ?? "info").toLowerCase();
  return ["info", "warn", "error"].includes(value) ? value : "info";
}

/* ── Hero ─────────────────────────────────────────────────── */

const facts = [
  { k: "RUNTIME", v: "Go" },
  { k: "ORCHESTRATOR", v: "Kubernetes" },
  { k: "DATA", v: "MongoDB · Redis · Postgres" },
  { k: "REGION", v: "United Kingdom · GMT" },
  { k: "SCALE", v: "4M+ domains" },
  { k: "UPTIME", v: "99.99%" },
];

// Decorative load profile for the "service" conceit, not measured traffic.
const sparkline = [
  38, 52, 30, 44, 61, 48, 35, 70, 55, 42, 88, 66, 51, 74, 43, 59, 96, 68, 47,
  62, 39, 71, 50, 33,
];
const peak = Math.max(...sparkline);

/* ── Private projects ─────────────────────────────────────── */

const homeosResult = [
  metrics.bookingsPerMonth ? `${metrics.bookingsPerMonth} bookings a month.` : "",
  "Duplicate payouts at zero: a replayed webhook settles the same booking once.",
  metrics.bookingP99 ? `${metrics.bookingP99} p99 on the booking endpoint.` : "",
]
  .filter(Boolean)
  .join(" ");

const homeosMetrics = [
  { value: metrics.bookingP99, label: "p99" },
  {
    value: metrics.bookingsPerMonth && `${metrics.bookingsPerMonth}/mo`,
    label: "Bookings",
  },
  { value: metrics.duplicatePayouts, label: "Duplicates", tone: "ok" as const },
];

/* ── About ────────────────────────────────────────────────── */

const coreStack = [
  "Go",
  "Kubernetes",
  "MongoDB",
  "Postgres",
  "Redis",
  "gRPC",
  "AWS",
  "OpenTelemetry",
];
const alsoStack = [
  "PHP",
  "Laravel",
  "Vue",
  "Node.js",
  "RabbitMQ",
  "Terraform",
  "TypeScript",
];
</script>

<style lang="scss" scoped>

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 64px;
  align-items: start;
  padding: 96px 0 72px;
  scroll-margin-top: calc(var(--nav-h) + 20px);
}

.hero__eyebrow {
  margin-bottom: 28px;
}

.hero__title {
  font-size: clamp(40px, 6.4vw, 74px);
  line-height: 1;
  letter-spacing: -0.035em;
  font-weight: 600;
  margin: 0;
  max-width: 19ch;
  text-wrap: pretty;
}

.hero__lede {
  font-size: 19px;
  line-height: 1.6;
  color: var(--ink-3);
  margin: 28px 0 0;
  max-width: 54ch;
  text-wrap: pretty;

  & + & {
    margin-top: 14px;
  }

  strong {
    color: var(--ink);
    font-weight: 600;
  }
}

.hero__actions {
  display: flex;
  gap: 12px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.hero__panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 18px;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--ink-4);
}

.hero__panel-state {
  color: var(--ok--soft);
}

.hero__panel-body {
  padding: 6px 18px 14px;
}

.facts {
  margin: 0;
}

.facts__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  padding: 11px 0;
  border-bottom: 1px dashed var(--line--dashed);
  font-family: var(--font-mono);
  font-size: 13px;

  dt {
    color: var(--ink-4);
    letter-spacing: 0.06em;
    font-weight: 400;
  }

  dd {
    color: var(--ink);
    font-weight: 500;
    text-align: right;
    margin: 0;
  }
}

.spark {
  padding: 18px 0 6px;
}

.spark__label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-4);
  margin: 0 0 10px;
}

.spark__bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 54px;
}

.spark__bar {
  flex: 1;
  min-width: 3px;
  background: rgba(245, 165, 36, 0.45);
  transition: background-color 140ms ease;

  &.is-peak {
    background: rgba(245, 165, 36, 0.7);
  }

  &:hover {
    background: var(--accent);
  }
}

.path {
  padding: 20px;
  height: 100%;
}

.path__label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-4);
  margin: 0 0 20px;
}

.path__steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.path__node {
  border: 1px solid var(--line--strong);
  padding: 12px 14px;
  font-family: var(--font-mono);
  font-size: 13px;
}

.path__node--hot {
  border-color: var(--accent);
  background: rgba(245, 165, 36, 0.1);
  color: var(--accent--soft);
}

.path__node--unreliable {
  border-style: dashed;
  border-color: rgba(238, 242, 249, 0.4);
  color: var(--ink-3);
}

.path__edge {
  height: 22px;
  width: 1px;
  background: var(--line--strong);
  margin-left: 26px;
}

.path__edge--noted {
  display: flex;
  align-items: center;
  gap: 10px;
  width: auto;
  background: none;

  &::before {
    content: "";
    height: 22px;
    width: 1px;
    background: var(--line--strong);
  }

  span {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--accent);
  }
}

.projects__also {
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--ink-4);
  margin: 0;
  padding-top: 8px;
}

.log__head {
  margin-bottom: 26px;
}

.log__toggle {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;

  &:hover {
    color: var(--accent--hi);
  }
}

.log__entry {
  display: block;
  border: 1px solid var(--line--dashed);
  background: var(--panel);
  padding: 18px 20px;
  margin-bottom: 12px;
  color: var(--ink);
  text-decoration: none;
  transition: border-color 140ms ease, background-color 140ms ease;

  &:hover {
    border-color: rgba(245, 165, 36, 0.55);
    background: var(--panel--hover);
  }
}

.log__entry--folded {
  display: none;
}

.log__meta {
  display: flex;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: 12px;
}

.log__stamp {
  color: var(--ink-4);
}

.log__level {
  letter-spacing: 0.08em;
}

.log__level--info {
  color: var(--ok--soft);
}

.log__level--warn {
  color: var(--accent);
}

.log__level--error {
  color: #ff8f7a;
}

.log__title {
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-top: 10px;
}

.log__note {
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-3);
  margin-top: 8px;
  max-width: 78ch;
}

.log__empty {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-4);
}

.about {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 56px;
  padding-bottom: 8px;
}

.about__label {
  margin-bottom: 22px;
}

.about__portrait {
  display: block;
  width: 100%;
  height: 300px;
  object-fit: cover;
  border: 1px solid var(--line);
  margin-bottom: 22px;
  filter: grayscale(1);
  transition: filter 200ms ease;

  &:hover {
    filter: grayscale(0);
  }
}

.about__creds {
  font-size: 16px;
  line-height: 1.65;
  color: var(--ink-3);
  margin: 0;
}

.about__pull {
  font-size: clamp(19px, 2.6vw, 22px);
  line-height: 1.5;
  color: var(--ink);
  margin: 0 0 18px;
  letter-spacing: -0.015em;
  text-wrap: pretty;
}

.about__body {
  font-size: 17px;
  line-height: 1.65;
  color: var(--ink-3);
  margin: 0 0 34px;
  max-width: 62ch;
}

.about__stack-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-4);
  margin: 0 0 14px;
}

.about__chips {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  li {
    border: 1px solid rgba(245, 165, 36, 0.45);
    color: var(--accent--soft);
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.04em;
    padding: 7px 11px;
  }
}

.about__also {
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--ink-4);
  margin: 16px 0 0;
}

@media screen and (max-width: 1000px) {
  .hero {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
    padding: 56px 0 48px;
  }

  .about {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
}

@media screen and (max-width: 560px) {
  .hero__lede {
    font-size: 17px;
  }

  .hero__actions .btn {
    flex: 1 1 100%;
    justify-content: center;
  }
}
</style>
