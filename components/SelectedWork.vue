<template>
  <section class=" work-container pb-4">
    <h3>Selected Work</h3>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="(work,index) in works" :key="index">
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
      works: [{'image':'https://res.cloudinary.com/penciledge/image/upload/c_thumb,w_400,g_face/v1579554536/cimee_olyk98.png',
                'title':'Video Conferencing Application',
                  'desc':'A major feature in Cimee is One-to-one Audio/Video Calling: HD video/audio calls to any user at any time and share information in a real-time with low data consumption.','stack':''},
              {'image':'https://res.cloudinary.com/penciledge/image/upload/c_thumb,w_400,g_face/v1579553346/landover_frnqwt.png', 'title':'School Administration System',
              'desc':"OverLand SMS is a student management solution created for an Aviation school  to enable the company's Training Department to seamlessly perform administrative work faster, secured and immune from human errs.",'stack':''},
              {'image':'https://res.cloudinary.com/penciledge/image/upload/c_thumb,w_400,g_face/v1579553335/estate_o4tq9j.png', 'title':'Estate Management Suite',
              "desc":'Real estate management suite is a Platform As a Service developed to help Real Estate Administrators, owners and residents manage their records, transactions and communications.','stack':''}]
    }
  },
  components: {
    WorkCard
  }
}
</script>
<style scoped>

</style>
