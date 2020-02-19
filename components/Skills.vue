<template>
  <section class="section">
  <div class="wall">
    <div class="v-boxes">
      <div class="box">
        <span class="tooltip">CSS</span>
        <div class="box-face">
          <div class="box-text"><i class="fab fa-css3-alt"></i></div>
        </div>
        <div class="box-back">
          <div class="box-text">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
          </div>
        </div>
      </div>
      <div class="box">
        <span class="tooltip">JavaScript</span>
        <div class="box-face">
          <div class="box-text"><i class="fab fa-js-square"></i></div>
        </div>
        <div class="box-back">
          <div class="box-text">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="far fa-star"></i>
          </div>
        </div>
      </div>
      <div class="box">
        <span class="tooltip">Docker</span>
        <div class="box-face">
          <div class="box-text"><i class="fab fa-docker"></i></div>
        </div>
        <div class="box-back">
          <div class="box-text">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
        </div>
      </div>
      <div class="box">
        <span class="tooltip">Github</span>
        <div class="box-face">
          <div class="box-text"><i class="fab fa-github-alt"></i></div>
        </div>
        <div class="box-back">
          <div class="box-text">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="far fa-star"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="v-boxes second">
      <div class="box">
        <span class="tooltip">PHP</span>
        <div class="box-face">
          <div class="box-text"><i class="fab fa-php"></i></div>
        </div>
        <div class="box-back">
          <div class="box-text">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="far fa-star"></i>
          </div>
        </div>
      </div>
      <div class="box">
        <span class="tooltip">HTML 5</span>
        <div class="box-face">
          <div class="box-text"><i class="fab fa-html5"></i></div>
        </div>
        <div class="box-back">
          <div class="box-text">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>
        </div>
      </div>
      <div class="box">
        <span class="tooltip">NodeJs</span>
        <div class="box-face">
          <div class="box-text"><i class="fab fa-node-js"></i></div>
        </div>
        <div class="box-back">
          <div class="box-text">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="v-boxes third">
      <div class="box">
        <span class="tooltip">Laravel</span>
        <div class="box-face">
          <div class="box-text"><i class="fab fa-laravel"></i></div>
        </div>
        <div class="box-back">
          <div class="box-text">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
            <i class="far fa-star"></i>
          </div>
        </div>
      </div>
      <div class="box">
        <span class="tooltip">Typescript</span>
        <div class="box-face">
          <div class="box-text"><img src="https://www.typescriptlang.org/assets/images/icons/favicon.ico" alt=""></div>
        </div>
        <div class="box-back">
          <div class="box-text">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="v-boxes forth">
      <div class="box link">
        <div class="box-face">
          <div class="box-text"><i class="fab fa-vuejs"></i></div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
export default {

}
</script>
<style scoped>
.section {
  display: flex;
  justify-content: center;
  padding-left: 75px;
  transform: rotate(45deg);
}
@media only screen and (max-width: 768px) {
  .section{
    transform: unset;
    padding-left: 0px;
  }
}

.wall {
  display: flex;
}

.v-boxes {
  display: flex;
  flex-direction: column;
}
.v-boxes:not(:first-child) {
  margin-left: -75px;
}

.second {
  margin-top: 75px;
}

.third {
  margin-top: 150px;
}

.forth {
  margin-top: 225px;
}

.box {
  width: 100px;
  height: 100px;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  margin: 25px;
  cursor: pointer;
}
.box:hover:not(.link) > .box-face, .box:hover > .box-back {
  transform: translateZ(100px) rotateX(180deg);
  background-color: transparent !important;
}
.box:hover:not(.link) > .box-face > .box-text {
  opacity: 0;
}
.box:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
.box:hover.link > .box-face {
  background-color: transparent !important;
}
.box:hover.link > .box-face > .box-text {
  color: #323232;
}
.box.link > .box-face {
  background-color: #323232;
  border: 1px solid #323232;
  box-sizing: border-box;
  transition: background-color .5s;
}
.box.link .box-text {
  color: #efefef;
  transition: color .5s;
}

.box-face, .box-back {
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100px;
  height: 100px;
  background-color: #dedede;
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  transform: rotate(90deg);
  transform-style: preserver-3d;
  -webkit-transform-style: preserver-3d;
  -moz-transform-style: preserver-3d;
  transition: transform 1s, background-color 0s .3s;
}

.box-face .box-text {
  line-height: 100px;
  text-align: center;
  font-size: 40px;
  color: #bababa;
  -webkit-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  transform: rotate(-135deg);
  transition: opacity 0s linear .3s;
}

.box-back .box-text {
  line-height: 100px;
  text-align: center;
  font-size: 12px;
  color: #636363;
  -webkit-transform: rotate(-135deg);
  -ms-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  transform: rotate(-135deg) rotateY(180deg);
  transition: opacity 0s linear .3s;
}

.box-back {
  z-index: 0;
  background-image: linear-gradient(#fff, #efefef);
}

.box-text img {
  max-width: 32px;
  max-height: 32px;
  -webkit-filter: grayscale(100%) saturate(0);
  filter: grayscale(100%) saturate(0);
  opacity: .5;
}

.tooltip {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: 10px;
  left: 35px;
  width: 80px;
  font-size: 13px;
  color: #000;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.8);
  padding: 5px 0;
  z-index: 1000;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
  transition: visibility 0s linear .3s, opacity 1s linear .3s;
}

.tooltip:after {
  position: absolute;
  top: -5px;
  left: 35px;
  content: ' ';
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid black;
}

</style>
