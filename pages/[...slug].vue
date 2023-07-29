<template>
  <div class="container post">
    <ContentDoc v-slot="{ doc }">
      <div class="row head">
        <div class="col-md-12">
          <div class="post-head">
            <h1>{{ doc.title }}</h1>
            <span class="meta">
              <i class="far fa-calendar-alt"></i>
              {{ datePublished }}
            </span>
            <span class="meta">
              <i class="far fa-clock"></i>
              {{ length }} min read
            </span>
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
<script setup lang="ts">
import { Ref } from "vue";
import siteMeta from "~/utils/meta";

let { path } = useRoute();
let length: Ref<number> = ref(1);
let datePublished: Ref<string> = ref("");

if (path.slice(-1) === "/") {
  path = path.slice(0, -1);
}

const { data } = await useAsyncData(`content-${path}`, async () => {
  let article = await queryContent().where({ _path: path }).findOne();
  let surround = null;
  try {
    surround = await queryContent()
      .only(["_path", "title", "description"])
      .sort({ date: 1 })
      .findSurround(path);
  } catch (error) {
    surround = null;
  }

  return {
    article: article,
    surround: surround,
  };
});

if (data.value && data.value.article) {
  const article = data.value.article;

  // set the meta
  useHead({
    title: article.title,
    meta: siteMeta({
      title: article.title,
      description: article.description,
      mainImage: `https:\/\/olaysco.netlify.app\/cover\/cover-${article.cover}`,
    }),
  });

  try {
    // set content length in minutes
    length.value = Math.round(article.body.length / 4000) || 1;

    // set date article was published
    datePublished.value = new Date(article.date).toLocaleString("en-NG", {
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    console.log(error);
  }
}
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
