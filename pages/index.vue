<template>
  <div class="container mt-4 position-relative">
    <a href="#" class="post-search-trigger"></a>
    <div class="row">
      <div
        class="col-12 col-xs-12 col-sm-12 col-md-12 col-xl-12 mb-4"
        v-for="post in posts"
        :key="post.attributes.title"
      >
        <nuxt-link :to="getPermalink(post)" class="post-thumb-link">
          <article class="row">
            <div
              class="post-thumb d-none d-md-flex justify-content-center align-items-center col-2"
            >
              <img src="~/assets/images/post.jpg" class="img-fluid" alt />
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
export default {
	async asyncData() {
		const resolve = require.context('~/posts/', true, /\.md$/)
		const imports = resolve.keys().map(key => {
			const [, name] = key.match(/\/(.+)\.md$/)
			return resolve(key)
		})
		return {
			posts: imports
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
		}
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
.post-search-trigger {
	z-index: 1;
	display: block;
	color: rgb(133, 172, 197);
	height: 16px;
	width: 16px;
	background-repeat: no-repeat;
	background-position: center center;
	background-size: contain;
	/* background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjMuODA5IDIxLjY0NmwtNi4yMDUtNi4yMDVjMS4xNjctMS42MDUgMS44NTctMy41NzkgMS44NTctNS43MTEgMC01LjM2NS00LjM2NS05LjczLTkuNzMxLTkuNzMtNS4zNjUgMC05LjczIDQuMzY1LTkuNzMgOS43MyAwIDUuMzY2IDQuMzY1IDkuNzMgOS43MyA5LjczIDIuMDM0IDAgMy45MjMtLjYyNyA1LjQ4Ny0xLjY5OGw2LjIzOCA2LjIzOCAyLjM1NC0yLjM1NHptLTIwLjk1NS0xMS45MTZjMC0zLjc5MiAzLjA4NS02Ljg3NyA2Ljg3Ny02Ljg3N3M2Ljg3NyAzLjA4NSA2Ljg3NyA2Ljg3Ny0zLjA4NSA2Ljg3Ny02Ljg3NyA2Ljg3N2MtMy43OTMgMC02Ljg3Ny0zLjA4NS02Ljg3Ny02Ljg3N3oiLz48L3N2Zz4=); */
	position: fixed;
	right: 25px;
	/* top: 6.4rem; */
}
.post-search-trigger::before {
	content: '';
	display: block;
	width: 1px;
	height: calc(100vh - 200px);
	background-color: rgba(133, 172, 197, 0.2);
	position: fixed;
	right: 25px;
	top: calc(100vh - (100vh - 324px));
	bottom: 0;
}
.post-search-trigger::after {
	content: 'Search';
	font-family: 'Heebo', sans-serif;
	font-weight: 500;
	font-size: 11px;
	line-height: 1.6rem;
	text-transform: uppercase;
	letter-spacing: 5px;
	width: auto;
	-webkit-transform: rotate(-90deg);
	transform: rotate(-90deg);
	-webkit-transform-origin: 1.6rem 100%;
	transform-origin: 1.6rem 100%;
	position: absolute;
	top: 72px;
	left: 0;
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
</style>
