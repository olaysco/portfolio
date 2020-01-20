<template>
  <section class=" work-container pb-4">
    <h3>Selected Work</h3>
    <div class="row">
      <div class="col-md-4" v-for="(work,index) in works" :key="index">
        <WorkCard :work="work" />
      </div>
    </div>

  </section>

</template>
<script>
import WorkCard from "../components/WorkCard";
export default {
  data(){
    return {
      works: [{},{},{}]
    }
  },
  components: {
    WorkCard
  }
}
</script>
<style scoped>

</style>
