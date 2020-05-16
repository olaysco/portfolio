<template>
  <div class="container">
    <div class="row banner-container">
      <div class="col-md-7 banner-wrapper centerlize">
        <div class="banner-content">
          <!-- <h3 class="text-uppercase">Hell0</h3> -->
          <h1 class="text-uppercase invisible animate__slow" ref="my_name">I'm Olayiwola Odunsi</h1>
          <h5 class="text-uppercase invisible animate__slow" ref="my_title">Software Engineer</h5>
          <div class="align-items-center display-flex invisible animate__slow" ref="hero_btns">
            <a class="btn primary-btn mr-4 text-white" @click="hireMe()">
              <span>Let's Talk</span>
            </a>
            <a
              class="btn primary-btn primary-btn-inverse"
              target="__bkank"
              href="https://drive.google.com/file/d/1cIiWCdXwX0FL7GIpH7f38wtY0IyA8ALA/view?usp=sharing"
            >
              <span>Get CV</span>
            </a>
          </div>
        </div>
      </div>
      <div class="d-none d-md-block col-md-5 banner-image centerlize">
        <img
          class="w-100 img-responsive"
          src="../assets/images/top-vector.png"
          alt="Software engineer illustration"
        />
      </div>
      <a href="#about" class="arrow-down animate__animated animate__bounce">
        <img src="../assets/images/triangle.svg" alt="triangle">
      </a>
    </div>
    <div class="row about-container" id="about">
      <div class="col-md-5">
        <img
          class="w-100 img-responsive"
          src="../assets/images/hi-vector.svg"
          alt="Hello illustration"
        />
      </div>
      <div class="col-md-7">
        <div class="about-content text-left">
          <h2>WHO I AM</h2>
          <p>
            Olayiwola is a technology enthusiast with a passion for crafting software solutions
            that makes life easy for the rest of world.
            <br>
             let me also brag that I'm a certified scrum master.
            <br>
            <br>
            <a href="/blog">This is where I share everything I learn on my journey with the world.</a>
          </p>
        </div>
        <Skills></Skills>
      </div>
    </div>
    <!-- <SelectedWork /> -->
    <Contact />
  </div>
</template>

<script>

import Contact from '../components/Contact'
import Skills from '../components/Skills'
import SelectedWork from '../components/SelectedWork'
export default {
  components: { Skills, SelectedWork, Contact},
  methods: {
    hireMe() {
      this.$eventBus.$emit('hire-me-clicked')
    },
    animateNow(ref, animation, prefix = 'animate__') {
      return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const elem = this.$refs[`${ref}`];
        elem.classList.add(`${prefix}animated`, animationName);
        function handleAnimationEnd() {
          elem.classList.remove(`${prefix}animated`, animationName);
          elem.removeEventListener('animationend', handleAnimationEnd);
          resolve('Animation ended');
        }
        elem.addEventListener('animationend', handleAnimationEnd);
      });
    }
  },
  data(){
    return {
      yearsOfExp: new Date().getFullYear() - 2016
    }
  },
  mounted() {
    this.$refs.my_name.classList.remove('invisible')
    this.animateNow("my_name", "bounce").then(()=>{
      this.$refs.my_title.classList.remove('invisible')
      this.animateNow("my_title", "bounce").then(()=>{
        this.$refs.hero_btns.classList.remove('invisible')
        this.animateNow("hero_btns", "bounce")
      })
    })
  }
}
</script>

<style lang="scss">
.arrow-down{
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;
  bottom: 50px;
  height: 4px;
  width: 4px;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
}
.display-flex{
  display: flex
}
.centerlize {
  vertical-align: middle;
  align-self: center;
}
.banner-content {
  text-align: left;
  *{
    transition: all 100ms #{$transition__normal};
  }
}
.banner-content h3 {
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
  transition: width 10s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.banner-content h1 {
  margin-top: 20px;
  font-size:3.2rem;
  line-height: 60px;
  margin-bottom: 25px;
}
.banner-content h5 {
  font-size: 24px;
  margin-bottom: 35px;
  letter-spacing: 2px;
}
</style>
