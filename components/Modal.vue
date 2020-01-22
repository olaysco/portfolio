<template>
  <div>
    <b-modal v-model="show">Hello From Modal!</b-modal>
  </div>

</template>
<script>
export default {
  props: [
    "show"
  ]
}
</script>
<style scoped>
</style>
