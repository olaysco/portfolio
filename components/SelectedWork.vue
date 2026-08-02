<template>
  <section class="work-container" id="work">
    <div class="section-head">
      <h4 class="section-title">Selected Work</h4>
      <p class="section-sub">
        A few things I've designed, built and shipped, from AI agents to
        distributed backends.
      </p>
    </div>

    <div class="row">
      <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="(work, index) in works" :key="index">
        <article class="work-card h-100">
          <div class="work-card-top">
            <span class="work-index">{{ String(index + 1).padStart(2, "0") }}</span>
            <div class="work-links">
              <a
                v-if="work.repo"
                :href="work.repo"
                target="_blank"
                rel="noopener"
                aria-label="Source code on GitHub"
              >
                <i class="fab fa-github"></i>
              </a>
              <a
                v-if="work.live"
                :href="work.live"
                target="_blank"
                rel="noopener"
                aria-label="Live demo"
              >
                <i class="fas fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>

          <h5 class="work-title">{{ work.title }}</h5>
          <p class="work-desc">{{ work.desc }}</p>

          <ul class="work-stack">
            <li v-for="tag in work.stack" :key="tag">{{ tag }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const works = [
  {
    title: "Khanzuo",
    desc: "An AI agent that reproduces user-reported issues by navigating your app like a real user, then turns what breaks into fix-ready developer context.",
    stack: ["AI Agent", "LLM", "Vue"],
    repo: "https://github.com/olaysco/khanzuo",
    live: "",
  },
  {
    title: "Verifiland",
    desc: "A blockchain-based land registration and verification system, backed by smart contracts for tamper-proof ownership records.",
    stack: ["Solidity", "NestJS", "Vue"],
    repo: "https://github.com/olaysco/verifiland",
    live: "",
  },
  {
    title: "Stroke Prediction System",
    desc: "A 91%-accurate stroke risk model (Random Forest) paired with a GPT-powered assistant that explains the risk factors in plain language.",
    stack: ["Python", "LangChain", "Streamlit"],
    repo: "https://github.com/olaysco/stroke-prediction-system",
    live: "https://stroke-ml-ola.streamlit.app/",
  },
  {
    title: "Domain Search LLM",
    desc: "An LLM-assisted domain name search that suggests and checks available domains from a natural-language brief, written in Go.",
    stack: ["Go", "LLM", "API"],
    repo: "https://github.com/olaysco/domain-search-llm",
    live: "https://domain-search-llm.onrender.com/",
  },
  {
    title: "ChefGo",
    desc: "A Nigerian chef-hiring platform. Book verified local chefs to cook in your home or deliver fresh meals. “Airbnb for private chefs.”",
    stack: ["Go", "Vue", "Ionic"],
    repo: "https://github.com/olaysco/cheffie-fe",
    live: "",
  },
  {
    title: "Timetable Generator",
    desc: "A Laravel web app that generates conflict-free college timetables using a genetic algorithm. My most-starred open-source project.",
    stack: ["Laravel", "PHP", "Algorithms"],
    repo: "https://github.com/olaysco/timetable-generator",
    live: "",
  },
];
</script>

<style scoped>
.work-container {
  padding: 2rem 0 3rem;
}
.section-head {
  margin-bottom: 2.5rem;
}
.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color__white);
  margin-bottom: 0.5rem;
}
.section-sub {
  color: var(--color__white--muted);
  max-width: 46ch;
}
.work-card {
  display: flex;
  flex-direction: column;
  background-color: #091b40;
  border: 1px solid rgba(156, 205, 198, 0.12);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 12px 12px 40px rgb(5, 16, 40);
  transition: transform 160ms ease, border-color 160ms ease;
}
.work-card:hover {
  transform: translateY(-6px);
  border-color: rgba(156, 205, 198, 0.4);
}
.work-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.work-index {
  font-family: "Inconsolata", monospace;
  font-size: 1rem;
  color: #9ccdc6;
  letter-spacing: 1px;
}
.work-links {
  display: flex;
  gap: 0.85rem;
}
.work-links a {
  color: var(--color__white--muted);
  font-size: 1.05rem;
  transition: color 140ms ease;
}
.work-links a:hover {
  color: #9ccdc6;
}
.work-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color__white);
  margin-bottom: 0.6rem;
}
.work-desc {
  color: var(--color__white--muted);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
  flex: 1;
}
.work-stack {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.work-stack li {
  font-size: 0.75rem;
  letter-spacing: 0.4px;
  color: #9ccdc6;
  background: rgba(156, 205, 198, 0.08);
  border: 1px solid rgba(156, 205, 198, 0.18);
  border-radius: 999px;
  padding: 0.2rem 0.7rem;
}
</style>
