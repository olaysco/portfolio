<template>
  <div class="container post">
    <div class="row">
      <div class="col-md-12">
        <div class="post-head">
          <h1 class="title">{{attributes.title}}</h1>
          <span class="meta">
            <i class="far fa-calendar-alt"></i>
            {{date}}
          </span>
          <span class="meta">
            <i class="far fa-clock"></i>
            {{length}} min read
          </span>
        </div>
        <div v-html="html" class="markdown"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mt-4">
        <a href="/" class="float-right text-underline">See more posts</a>
      </div>
    </div>
  </div>
</template>
<script>
import SinglePost from '~/components/SinglePost'
export default {
	head() {
		return {
			title: this.attributes.title
		}
	},
	async asyncData({ params, error }) {
		try {
			let post = await import(`~/posts/${params.slug}.md`)
			return {
				...post,
				length: Math.round(post.html.length / 4000) || 1,
				date: new Date(post.attributes.date).toLocaleString('en-NG', {
					month: 'long',
					year: 'numeric'
				})
			}
		} catch (err) {
			console.debug(err)
			error({ statusCode: 404, messgae: 'This post could not be found' })
		}
	},
	components: {
		SinglePost
	}
}
</script>
<style scoped></style>
