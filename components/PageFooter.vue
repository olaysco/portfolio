<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <span>—— Olayiwola Odunsi {{year}} &copy</span>
        </div>
        <div class="col-6 text-right">
          <a href="hhtps://github.com/olaysco">
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
		year() {
			return new Date().getFullYear()
		}
	}
}
</script>
<style lang="scss" scoped>
.footer {
	box-shadow: -2px -4px 7px 1px #0a1835;
	margin-top: 2rem;
	a,
	span {
		color: var(--color__white);
	}
}
.footer > div {
	padding: 1em;
}
</style>
