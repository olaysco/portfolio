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
      works: [
              {'thumbnail':'https://res.cloudinary.com/penciledge/image/upload/c_thumb,w_400,g_face/v1579554536/cimee_olyk98.png',
              'image':'https://res.cloudinary.com/penciledge/image/upload/v1579554536/cimee_olyk98.gif',
                'title':'Video Conferencing Application',
                  'desc':'A major feature in Cimee is One-to-one Audio/Video Calling: HD video/audio calls to any user at any time and share information in a real-time with low data consumption.',
                  'stack':'',
                  'link': 'https://cimee.live'},
              {'thumbnail':'https://res.cloudinary.com/penciledge/image/upload/c_thumb,w_400,g_face/v1579553346/landover_frnqwt.png',
              'image':'https://res.cloudinary.com/penciledge/image/upload/v1579553346/landover_frnqwt.gif',
              'title':'School Administration System',
              'desc':"OverLand SMS is a student management solution created for an Aviation school  to enable the company's Training Department to seamlessly perform administrative work faster, secured and immune from human errs.",
              'stack':'',
              'link':'https://penciledgedev.xyz/'},
              {'thumbnail':'https://res.cloudinary.com/penciledge/image/upload/c_thumb,w_400,g_face/v1579553335/estate_o4tq9j.png',
                'image':'https://res.cloudinary.com/penciledge/image/upload/v1579553335/estate_o4tq9j.gif',
              'title':'Estate Management Suite',
              "desc":'Real estate management suite is a Platform As a Service developed to help Real Estate Administrators, owners and residents manage their records, transactions and communications.',
              'stack':'',
              'link': 'http://159.203.121.97/'}]
    }
  },
  components: {
    WorkCard
  }
}
</script>
<style scoped>

</style>
