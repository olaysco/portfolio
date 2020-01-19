<template>
  <div class=" container">
    <div class="row banner-container">
      <div class="col-md-7 banner-wrapper">
        <div class="banner-content">
          <h3 class="text-uppercase">Hell0</h3>
          <h1 class="text-uppercase">I'm Olayiwola Odunsi</h1>
          <h5 class="text-uppercase">Software Engineer</h5>
          <div class="d-flex align-items-center">
            <a class="btn primary-btn mr-4" href="#"><span>Hire Me</span></a>
            <a class="btn primary-btn primary-btn-inverse" href="#"><span>Get CV</span></a>
          </div>
        </div>
      </div>
      <div class="col-md-5 banner-image">
        <img class="w-100 img-responsive" src="../assets/images/top-vector.png" alt="Software engineer illustration">
      </div>
    </div>
  </div>
</template>

<script>


export default {
}
</script>

<style>
.banner-wrapper,.banner-image {
  vertical-align: middle;
  align-self: center;
}
.banner-content{
  text-align: left;
}
.banner-content h3{
  font-size: 40px;
  margin-bottom: 20px;
  position: relative;
}
.banner-content h1{
  margin-top: 20px;
  font-size: 70px;
  line-height: 60px;
  margin-bottom: 25px;
}
.banner-content h5{
  font-size: 24px;
  margin-bottom: 35px;
  letter-spacing: 2px;
}
</style>
