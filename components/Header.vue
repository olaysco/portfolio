<template>
  <div class="container header-container">
    <b-navbar toggleable="lg" type="light" >
      <b-navbar-brand href="#">
        <Logo />
      </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="https://github.com/olaysco" target="__blank"><i class="fab fa-github fa-2x"></i></b-nav-item>
          <b-nav-item href="https://twitter.com/horllaysco" ><i class="fab fa-twitter fa-2x"></i></b-nav-item>
        </b-navbar-nav>
    </b-navbar>
  </div>

</template>
<script>
import Logo from "./Logo";
export default {
  components: { Logo }
}
</script>
<style scoped>
</style>
