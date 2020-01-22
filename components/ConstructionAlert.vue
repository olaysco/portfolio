<template>
  <div>
<b-alert
      :show="true"
      dismissible
      variant="warning"
      @dismissed="countDown=0"
      @dismiss-count-down="(val)=>countDown = val"
    >
      Site is still undergoing construction
    </b-alert>
  </div>

</template>
<script>
export default {
  data(){
    return {
      countDown : 5
    }
  }
}
</script>
<style scoped>
</style>
