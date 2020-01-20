<template>
  <div class="card border-0 work-card">
    <div class="card-body">

    </div>
    <div class="card-footer">

    </div>
  </div>
</template>
<script>
export default {
  props:{
    work: Object
  }
}
</script>
<style scoped>
.work-card{
  background: #fff;
  border-radius: 10px;
  box-shadow: 12px 12px 40px rgba(119,127,136,.25);
  padding: 24px 0;
  text-align: center;
}
.work-card .card-footer{
  background-color: unset;
  border-top: 0px;
}
</style>
