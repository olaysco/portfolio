<template>
  <div class=" container">
    <div class="row banner-container">
      <div class="col-md-7 banner-wrapper centerlize">
        <div class="banner-content">
          <!-- <h3 class="text-uppercase">Hell0</h3> -->
          <h1 class="text-uppercase">I'm Olayiwola Odunsi</h1>
          <h5 class="text-uppercase">Software Engineer</h5>
          <div class="d-flex align-items-center">
            <a class="btn primary-btn mr-4" href="#"><span>Hire Me</span></a>
            <a class="btn primary-btn primary-btn-inverse" target="__bkank" href="https://drive.google.com/file/d/1cIiWCdXwX0FL7GIpH7f38wtY0IyA8ALA/view?usp=sharing"><span>Get CV</span></a>
          </div>
        </div>
      </div>
      <div class=" d-none d-md-block col-md-5 banner-image centerlize">
        <img class="w-100 img-responsive" src="../assets/images/top-vector.png" alt="Software engineer illustration">
      </div>
    </div>
    <div class="row about-container">
      <div class="col-md-5">
        <img class="w-100 img-responsive" src="../assets/images/hi-vector.svg" alt="Hello illustration">
      </div>
      <div class="col-md-7">
        <div class="about-content text-left">
          <h2>WHO I AM</h2>
          <p>I am a full-stack software engineer and artist currently working at Penciledge LLC.
          I open source much of my software and write technical tutorials and articles on development.</p>
        </div>
        <Skills></Skills>
      </div>
    </div>
    <SelectedWork />
  </div>
</template>

<script>

import Skills from "../components/Skills";
import SelectedWork from"../components/SelectedWork";
export default {
  components: { Skills, SelectedWork }
}
</script>

<style>
.centerlize {
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
.banner-content h3:after {
  content: '';
  width: 410px;
  height: 2px;
  position: absolute;
  top: 50%;
  left: 23%;
  background: #000000;
  transition: width 10s cubic-bezier(0.215, 0.610, 0.355, 1);
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
