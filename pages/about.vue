<template>
  <div class="container about mt-4">
    <h1 class="about-title">About me</h1>

    <div class="row">
      <div class="col-12 col-md-8">
        <p>
          I'm <strong>Oláyíwolá Odunsi</strong>, a backend and cloud engineer
          with a passion for building solutions that scale and offer users a
          seamless experience. I hold a Higher National Diploma in Computer
          Science and I'm a certified Scrum Master.
        </p>
        <p>
          Most of my day-to-day is spent in <strong>Go</strong>, designing
          distributed systems and clean APIs, and running them on
          <strong>Kubernetes</strong> across the cloud. I've also shipped
          products with Laravel, Vue/Nuxt and, more recently, LLM-powered agents
          and machine-learning tools.
        </p>
        <p>
          I enjoy the whole path from idea to production: architecture,
          implementation, and the operational work that keeps things reliable.
          I've got the interpersonal skills to plug into and scale any
          distributed team, and I write about what I learn along the way.
        </p>

        <div class="about-cta">
          <a
            href="https://github.com/olaysco"
            target="_blank"
            rel="noopener"
            class="about-link"
            ><i class="fab fa-github"></i> GitHub</a
          >
          <a
            href="https://twitter.com/olaysco"
            target="_blank"
            rel="noopener"
            class="about-link"
            ><i class="fab fa-twitter"></i> Twitter</a
          >
          <a href="mailto:olayiwolaodunsi@gmail.com" class="about-link"
            ><i class="fas fa-envelope"></i> Email</a
          >
        </div>
      </div>

      <div class="col-12 col-md-4 text-center mt-4 mt-md-0">
        <img src="/olayiwola.jpeg" alt="Olayiwola Odunsi" class="about-photo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "About - Olayiwola Odunsi",
});
</script>

<style scoped>
.about {
  max-width: 960px;
  padding-bottom: 4rem;
}
.about-title {
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 700;
  margin-bottom: 2rem;
}
.about p {
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--color__white--muted);
  margin-bottom: 1.25rem;
}
.about strong {
  color: var(--color__white);
  font-weight: 600;
}
.about-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 2rem;
}
.about-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 140ms ease;
}
.about-link:hover {
  opacity: 0.75;
}
.about-photo {
  width: 100%;
  max-width: 260px;
  border-radius: 1rem;
  border: 1px solid rgba(156, 205, 198, 0.25);
}
</style>
