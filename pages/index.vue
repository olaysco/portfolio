<template>
  <div class="home">
    <div class="shell">
      <!-- ── Hero ─────────────────────────────────────────────── -->
      <section id="top" class="hero">
        <div class="hero__copy">
          <p class="eyebrow hero__eyebrow">
            senior backend &amp; cloud engineer
          </p>

          <!-- <h1 class="hero__title">I design & build infrastructure that scales.</h1> -->

          <p class="hero__lede">
            My focus is on working on distributed systems, researching small LLM models, and studying philosophy in my free time. 
          </p>
          <!-- <p class="hero__lede">
            This is where I write about systems and anything that interests me.
          </p> -->

          <!-- <div class="hero__actions">
            <a href="#projects" class="btn btn--solid">See the projects</a>
            <a href="#trace" class="btn btn--ghost">Read the trace</a>
          </div> -->
        </div>

        <!-- <aside class="panel hero__panel" aria-label="Profile at a glance">
          <div class="hero__panel-head">
            <span>SERVICE / Olaysco</span>
            <span class="hero__panel-state">HEALTHY</span>
          </div>

          <div class="hero__panel-body">
            <dl class="facts">
              <div v-for="fact in facts" :key="fact.k" class="facts__row">
                <dt>{{ fact.k }}</dt>
                <dd>{{ fact.v }}</dd>
              </div>
            </dl>
          </div>
        </aside> -->
      </section>

      <!-- ── Trace ────────────────────────────────────────────── -->
      <!-- <TraceTimeline /> -->

      <!-- ── Private projects ─────────────────────────────────── -->
      <section id="projects" class="sect">
        <div class="sect__head">
          <h2 class="eyebrow">projects I'm currently working on in my free time</h2>
        </div>

        <ServiceCase
          index="01"
          title="HomeOS"
          :about="homeosAbout"
          :metrics="homeosMetrics"
          stack="Go, Postgres, Watermill, WebSocket, Docker, Redis, ElastiCache"
          :links="[{ href: 'https://homeos.ng/home', label: 'Live product' }]"
        >
          <template #media>
            <MediaSlot
              :src="media.homeos"
              alt="HomeOS booking flow"
              href="https://homeos.ng/home"
            />
          </template>
        </ServiceCase>

        <ServiceCase
          index="02"
          title="Ìtàn"
          about="Building Ìtàn from scratch in Go around a replayable video edit ledger, where every agent action is an appended operation rather than a mutation."
          stack="Go, ffmpeg, headless Chromium, OpenRouter LLM APIs"
          :links="[{ href: 'https://itan-302e1.web.app/', label: 'Live product' }]"
        >
          <template #media>
            <MediaSlot
              :src="media.itan"
              alt="Ìtàn editor mid-render"
              href="https://itan-302e1.web.app/"
            />
          </template>
        </ServiceCase>

        <ServiceCase
          index="03"
          title="Khanzuo"
          about="Khanzuo is an AI agent I built for my QA team (haha), it navigates the real app like a user would, following the reported steps while capturing console output, network calls and screen state. Bugs come back as a replayable session with the failing step and full trail attached."
          :links="[{ href: 'https://github.com/olaysco/khanzuo', label: 'Source' }]"
          stack="Go"
        >
          <template #media>
            <MediaSlot
              :src="media.khanzuo"
              alt="Khanzuo agent mid-run"
              href="https://github.com/olaysco/khanzuo"
            />
          </template>
        </ServiceCase>

        <ServiceCase
          index="04"
          title="Akitekt"
          about="Akitekt is a visual architecture workspace built around a single source-of-truth document, where the canvas and an AI assistant that proposes changes both operate through the same document-operation pipeline."
          :links="[
            { href: 'https://akitekt-309800167736.europe-west1.run.app/', label: 'Live product' },
            { href: 'https://github.com/olaysco/akitekt', label: 'Source' },
          ]"
          stack="Go, TypeScript, Vue"
          :divider="false"
        >
          <template #media>
            <MediaSlot
              :src="media.akitekt"
              alt="Akitekt architecture canvas"
              href="https://akitekt-309800167736.europe-west1.run.app/"
            />
          </template>
        </ServiceCase>

        <!-- <p class="projects__also">
          Also shipped: ZapZap (Go logistics backend, zapzap.ng), Go-OTS
          (one-time secret CLI), Timetable Generator (conflict-free timetables
          via a genetic algorithm), Verifiland (Solidity land registry), Stroke
          Prediction System (91% accurate, GPT explainer).
        </p> -->
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
            MSc Artificial Intelligence &amp; Human Factors. BSc
            Computer Science. Certified Kubernetes
            &amp; Cloud Native Associate.
          </p>
        </div>

        <div class="about__main">
          <!-- <p class="about__pull">
            I work on the unglamorous half of a product: the queue that has to
            drain, the endpoint that has to hold at peak, the migration that
            cannot lose a row.
          </p> -->
          <p class="about__body">
            Most of what I know came from things breaking in production and
            having to explain why. That's also most of what I write about.
          </p>

          <p class="about__stack-label">Stack</p>
          <ul class="about__chips">
            <li v-for="skill in coreStack" :key="skill">{{ skill }}</li>
          </ul>
          <p class="about__also">Also: {{ alsoStack.join(", ") }}</p>
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
  { k: "RUNTIME", v: "Go, PHP, Javascript" },
  { k: "ORCHESTRATOR", v: "Kubernetes" },
  { k: "DATA", v: "MongoDB, Redis, Postgres" },
  { k: "REGION", v: "United Kingdom, GMT" },
];

/* ── Private projects ─────────────────────────────────────── */

const homeosResult = [
  metrics.bookingsPerMonth ? `${metrics.bookingsPerMonth} bookings a month.` : "",
  "Duplicate payouts at zero: a replayed webhook settles the same booking once.",
  metrics.bookingP99 ? `${metrics.bookingP99} p99 on the booking endpoint.` : "",
]
  .filter(Boolean)
  .join(" ");

const homeosAbout =
  "HomeOS is an AI-powered operating system for the home, connecting homeowners to vetted service professionals for bookings, scheduling and payouts. " +
  homeosResult;

const homeosMetrics = [
  { value: metrics.bookingP99, label: "p99" },
  {
    value: metrics.bookingsPerMonth && `${metrics.bookingsPerMonth}/mo`,
    label: "Bookings",
  },
];

/* ── About ────────────────────────────────────────────────── */

const coreStack = [
  "Go",
  "PHP",
  "Kubernetes",
  "MongoDB",
  "Postgres",
  "Redis",
  "gRPC",
  "AWS",
  "OpenTelemetry",
];
const alsoStack = [
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
  font-size: 13px;
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
  font-size: 16px;
  line-height: 1.65;
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
