<template>
  <div class="position-relative">
    <a
      href="#"
      class="post-search-trigger"
      aria-label="search posts trigger"
      @click="searchVisible()"
    ></a>
    <div class="search-input-wrapper" v-show="showSearch">
      <input
        type="text"
        name="search-input"
        aria-label="search posts"
        v-model="searchText"
        ref="searchInput"
        placeholder="Start typing to search"
      />
      <button aria-label="close search" @click="showSearch = false">x</button>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			searchText: '',
			showSearch: false
		}
	},
	watch: {
		searchText(oldVal, newVal) {
			if (oldVal !== newVal && newVal.length > 2) {
				this.$emit('filter', newVal)
			}
		}
	},
	methods: {
		searchVisible() {
			this.showSearch = true
			this.searchText = ''
			this.$refs.searchInput.focus()
		}
	}
}
</script>
<style lang="scss" scoped>
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
.search-input-wrapper {
	position: fixed;
	z-index: 20;
	width: 60vw;
	backdrop-filter: blur(10px);
	left: 50%;
	transform: translate(-50%, 0);
	top: 1.5em;
	& > input {
		width: 100%;
		background: transparent;
		border: 0;
		border-bottom: 1px solid rgba(133, 172, 197, 0.2);
		color: #ffffff;
		font-size: 2em;
		&:focus {
			outline: none;
		}
	}
	& > button {
		color: red;
		border: 0;
		background: 0;
		position: absolute;
		right: 20px;
		font-size: 1.6rem;
		top: -12px;
	}
}
</style>
