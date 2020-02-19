<template>
  <div v-if="countDown>1">
    <div class="alert alert-warning alert-dismissible" ref="alert" role="alert">Site is still undergoing construction
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  </div>

</template>
<script>
export default {
  data(){
    return {
      countDown : 4
    }
  },
  mounted(){
    setTimeout(()=>{
      this.countDown = 0;
    }, (this.countDown*1000))
  }
}
</script>
<style scoped>
</style>
