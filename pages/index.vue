<template>
  <div class="container mt-4 position-relative">
    <search-box @filter="filterPost"></search-box>
    <div class="row mb-4">
      <div class="col-md-12 text-center">
        <blockquote>
          <span class="quote">Share your knowledge. it is a way to achieve immortality.</span>
          <b class="ml-3">Dalai Lama</b>
        </blockquote>
      </div>
    </div>
    <div class="row">
      <div
        class="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 mb-4"
        v-for="post in posts"
        :key="post.attributes.title"
      >
        <nuxt-link
          :to="getPermalink(post)"
          class="post-thumb-link"
          :aria-label="post.attributes.title"
        >
          <article class="row">
            <div
              class="post-thumb d-none d-md-flex justify-content-center align-items-center col-2"
            >
              <img
                :src="require(`../assets/images/cover-${post.attributes.cover}`)"
                class="img-fluid"
                alt
              />
            </div>
            <div class="post-text col-12 col-md-10">
              <div class="post-header">
                <h2 class="post-title">
                  <nuxt-link :to="getPermalink(post)">{{post.attributes.title}}.</nuxt-link>
                </h2>
                <div class="post-meta">
                  <span class="post-meta-date">
                    <a href="#">{{getDate(post)}}</a>
                  </span>
                </div>
              </div>
              <div class="post-excerpt">
                <p>{{post.attributes.description}}</p>
              </div>
            </div>
          </article>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from '~/components/SearchBox.vue'
export default {
	async asyncData() {
		const resolve = require.context('~/posts/', true, /\.md$/)
		const imports = resolve
			.keys()
			.map(key => {
				const [, name] = key.match(/\/(.+)\.md$/)
				return resolve(key)
			})
			.filter(({ attributes }) => attributes.published)
		return {
			posts: imports,
			allPosts: imports
		}
	},
	data() {
		return {
			prefix: ''
		}
	},
	methods: {
		getPermalink(post) {
			return `${this.prefix}/${
				post.meta.resourcePath
					.split('\\')
					.pop()
					.split('/')
					.pop()
					.split('.')[0]
			}`
		},
		getDate(post) {
			return new Date(post.attributes.date).toLocaleString('en-NG', {
				month: 'long',
				year: 'numeric'
			})
		},
		filterPost(text) {
			if (text.length < 2) {
				this.posts = this.allPosts
				return
			}
			this.posts = this.allPosts.filter(post => {
				let t = post.attributes.title + ' ' + post.attributes.description
				return t.toLowerCase().search(text.toLowerCase()) > -1
			})
		}
	},
	components: {
		SearchBox
	}
}
</script>
<style lang="scss" scoped>
a {
	color: var(--color__white);
	&:hover {
		text-decoration: none;
		& > article {
			transform: translateY(-10px);
			transition: all 100ms ease-in;
		}
	}
}
.post-thumb {
	position: relative;
	overflow: hidden;
	border-top-left-radius: 0.875rem;
	border-bottom-left-radius: 0.875rem;
	padding: 0.375rem;
}
.post-thumb img {
	vertical-align: bottom;
	transition: all 0.3s;
	border-radius: 0.875rem;
}
.post-text {
	padding: 2rem 1.5rem;
}
.post-title {
	font-size: 1.2rem;
	font-weight: 600;
	line-height: 1.231;
	margin-top: 0;
	margin-bottom: 0.8rem;
	a {
		color: var(--color__white);
	}
}
.post-meta {
	font-weight: 400;
	font-size: 11.5px;
	line-height: 2rem;
	text-transform: uppercase;
	letter-spacing: 1.2px;
	margin-bottom: 1.2rem;
	a {
		color: var(--color__white);
	}
}

.post-excerpt p {
	line-height: 1.882;
	display: -webkit-box !important;
	-webkit-line-clamp: 2;
	text-overflow: ellipsis;
	overflow: hidden !important;
	-webkit-box-orient: vertical;
}
article {
	border-radius: 0.875rem;
	box-shadow: 12px 12px 40px rgb(5, 16, 40);
	background-color: #091b40;
}
.post-thumb-link::before {
	content: '';
	display: block;
	background: rgba(21, 21, 21, 0.6);
	opacity: 0;
	visibility: hidden;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: all 0.3s;
	z-index: 1;
}
.post-thumb:hover .post-thumb-link::before {
	opacity: 1;
	visibility: visible;
}
.post-thumb:hover .post-thumb-link::after {
	opacity: 1;
	visibility: visible;
	-webkit-transform: scale(1);
	transform: scale(1);
}
.post-thumb-link::after {
	content: '...';
	font-family: georgia, serif;
	font-size: 2.4rem;
	z-index: 1;
	display: block;
	height: 88px;
	width: 88px;
	letter-spacing: -1px;
	line-height: 88px;
	margin-left: -44px;
	margin-top: -44px;
	position: absolute;
	left: 50%;
	top: 50%;
	text-align: center;
	color: #ffffff;
	opacity: 0;
	visibility: hidden;
	transition: all 0.3s;
	-webkit-transform: scale(0.5);
	transform: scale(0.5);
}

@media screen and (max-width: 600px) {
	.container {
		padding-right: 45px;
		padding-left: 45px;
	}
	/* .post-search-trigger {
    top: 12rem;
  } */
}
.quote {
	&::before {
		content: '\201C';
	}
	&::after {
		content: '\201D';
	}
}
</style>
