<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  created() {
    this.templateRender = new Function(this.post.vue.render)()
    this.$options.staticRenderFns = new Function(
      this.post.vue.staticRenderFns
    )()
  },
  render(h) {
    return this.templateRender()
  }
}
</script>
<style scoped></style>
