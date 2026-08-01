<template>
  <div class="container header-container">
    <b-navbar toggleable="lg" :dark="true">
      <b-navbar-brand to="/" aria-label="olayiwola odunsi logo">
        <Logo />
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto align-items-center">
        <b-nav-item to="/about">
          <span class="nav-text">About</span>
        </b-nav-item>
        <b-nav-item href="https://github.com/olaysco" target="_blank" rel="noopener">
          <i class="fab fa-github fa-2x" title="Github profile"></i>
        </b-nav-item>
        <b-nav-item href="https://twitter.com/olaysco" target="_blank" rel="noopener">
          <i class="fab fa-twitter fa-2x" title="on Twitter"></i>
        </b-nav-item>
        <b-nav-item href="mailto:olayiwolaodunsi@gmail.com">
          <i class="fas fa-envelope fa-2x" title="Email"></i>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
import Logo from "./Logo";
export default {
  components: { Logo },
};
</script>
<style scoped>
.nav-text {
  color: #fff;
  font-size: 1rem;
}
.nav-text:hover {
  color: #9ccdc6;
}
</style>
