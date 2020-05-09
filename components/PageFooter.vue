<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <span> —— Olayiwola Odunsi {{year}} &copy </span>
        </div>
        <div class="col-md-6 text-right">
          <a href="github.com/olaysco">
            <i class="fab fa-github"></i> Check on github ——
          </a>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  computed: {
    year(){
      return new Date().getFullYear()
    }
  }
}
</script>
<style lang="scss" scoped>
.footer{
  box-shadow: -2px -4px 7px 1px #f4f4f4;
  margin-top: 2rem;
  a,
  span{
    color: var(--color__text--muted);
  }
}
.footer > div{
  padding: 1em;
}
</style>
