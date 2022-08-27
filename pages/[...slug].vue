<template>
  <div class="container post">
    <div class="row head">
      <div class="col-md-12">
        <div class="post-head"></div>
      </div>
    </div>
    <div class="row body">
      <div class="col-md-12 markdown">
        <ContentDoc />
      </div>
    </div>
    <div class="row footer">
      <div class="col-md-12 mt-4">
        <a href="/" class="float-right text-underline">See more posts</a>
      </div>
    </div>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
@media only screen and (max-width: 640px) {
  .container.post {
    padding-left: 0px;
    padding-right: 0px;
    .row {
      margin-right: 0px;
      margin-left: 0px;
      &.body > div {
        padding-right: 0px;
        padding-left: 0px;
        & > .markdown {
          border-radius: 0px;
        }
      }
    }
  }
}
</style>
