<template>
  <div class="container post">
    <ContentDoc v-slot="{ doc }">
      <div class="row head">
        <div class="col-md-12">
          <div class="post-head">
            <h1>{{ doc.title }}</h1>
          </div>
        </div>
      </div>
      <div class="row body">
        <div class="col-md-12 markdown">
          <ContentRenderer :value="doc" />
        </div>
      </div>
    </ContentDoc>

    <div class="row footer">
      <div class="col-md-12 mt-4">
        <a href="/" class="float-right text-underline">See more posts</a>
      </div>
    </div>
  </div>
</template>
<script setup>
import siteMeta from "~/utils/meta";

const { path } = useRoute();
const { data } = await useAsyncData(`content-${path}`, async () => {
  let article = queryContent().where({ _path: path }).findOne();
  let surround = queryContent()
    .only(["_path", "title", "description"])
    .sort({ date: 1 })
    .findSurround(path);
  return {
    article: await article,
    surround: await surround,
  };
});

// set the meta
useHead({
  title: data.value.article.title,
  meta: siteMeta({
    title: data.value.article.title,
    description: data.value.article.description,
    mainImage: `\/${data.value.article.cover}`,
  }),
});
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 640px) {
  .container.post {
    padding-left: 0px;
    padding-right: 0px;
    .row {
      margin-right: 0px;
      margin-left: 0px;
      &.body > div {
        padding-left: 1.5em;
        padding-right: 1.5em;
        &.markdown {
          border-radius: 0px;
        }
      }
    }
  }
}
</style>

function asyncData(arg0: { $content: any; params: any }) { throw new Error("Function not
implemented.") }
