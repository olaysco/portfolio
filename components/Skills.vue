<template>
  <section class="skills" id="skills">
    <div class="section-head">
      <h4 class="section-title">What I work with</h4>
      <p class="section-sub">
        Backend and cloud tooling I reach for to build systems that scale.
      </p>
    </div>

    <div class="skills-grid">
      <div class="skill-group" v-for="group in groups" :key="group.name">
        <h6 class="skill-group-title">{{ group.name }}</h6>
        <ul class="skill-list">
          <li v-for="item in group.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const groups = [
  {
    name: "Languages",
    items: ["Go", "TypeScript", "PHP", "Python", "Solidity"],
  },
  {
    name: "Cloud & Infra",
    items: ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD"],
  },
  {
    name: "Backend",
    items: ["Distributed Systems", "REST & gRPC", "Redis", "PostgreSQL", "Laravel", "NestJS"],
  },
  {
    name: "Frontend",
    items: ["Vue", "Nuxt", "Node.js", "React"],
  },
];
</script>

<style scoped>
.skills {
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
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}
.skill-group {
  background-color: #091b40;
  border: 1px solid rgba(156, 205, 198, 0.12);
  border-radius: 1rem;
  padding: 1.5rem;
}
.skill-group-title {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: #9ccdc6;
  margin-bottom: 1rem;
}
.skill-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.skill-list li {
  font-size: 0.85rem;
  color: var(--color__white);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.5rem;
  padding: 0.35rem 0.75rem;
}
</style>
