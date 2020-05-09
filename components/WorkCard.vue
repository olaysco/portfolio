<template>
  <div class="card border-0 work-card pt-0 click">
    <div class="card-body p-0" @mouseenter="changeImage('enter')" @mouseleave="changeImage('leave')">
      <img :src="imgLink" :alt="imgLink" class="w-100 img-responsive br-10 hide" >
      <img :src="imgLink" :alt="imgLink" class="w-100 img-responsive br-10">
    </div>
    <div class="card-footer">
      <h6 class="text-left my-2 text-bold">{{work.title}}</h6>
      <span class="text-left work-desc">
        {{work.desc}}
      </span>
      <br />
      <a :href="work.link" target="__blank">{{work.link}}</a>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    work: Object
  },
  data: ()=>{
    return { imgLink: '' }
  },
  methods: {
    changeImage(event){
      if(event === 'enter'){
        this.imgLink = this.work.image;
      }else{
        this.imgLink = this.work.thumbnail;
      }
    }
  },
  created(){
    this.imgLink = this.work.thumbnail;
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
  min-height: 225px;
}
.br-10{
  border-radius:  10px;
}
.text-bold{
  font-weight: bold;
}
.work-card .card-footer{
  background-color: unset;
  border-top: 0px;
}
.work-desc{
  display: -webkit-box !important;
    -webkit-line-clamp: 5;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
}
.click{
  cursor: pointer;
}
.hide{
  display: none;
}
</style>
