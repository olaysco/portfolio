<template>
  <div class="container header-container">
    <b-navbar toggleable="lg" type="dark" >
      <b-navbar-brand href="#">
        <Logo />
      </b-navbar-brand>
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
