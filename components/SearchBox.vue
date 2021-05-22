<template>
  <div class="position-relative">
    <a
      href="#"
      ref="searchTrigger"
      class="post-search-trigger"
      aria-label="search posts trigger"
      @click="searchVisible()"
    ></a>
    <transition name="input-fade">
      <div class="search-input-wrapper" v-show="showSearch">
        <input
          type="text"
          name="search-input"
          aria-label="search posts"
          v-model="searchText"
          ref="searchInput"
          placeholder="Start typing to search"
          autofocus
          autocomplete="off"
        />
        <button aria-label="close search" @click="hideSearch()">x</button>
      </div>
    </transition>
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
		searchText(newVal, oldVal) {
			this.$emit('filter', newVal)
		}
	},
	methods: {
		searchVisible() {
			this.showSearch = true
			this.$nextTick(function () {
				this.$refs.searchInput.focus()
			});
			console.log(this.$refs.searchInput)
		},
		hideSearch() {
			this.showSearch = false
			this.searchText = '';
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
	// backdrop-filter: blur(10px);
	left: 50%;
	transform: translate(-50%, 0);
	background-color: #fff;
	padding: 1em 2em;
	border-radius: 8px;
	top: 1.5em;
	box-shadow: 1px 0px 6px 4px rgba(16, 31, 64, 0.67);
	transition: all 2ms;

	@media (max-width: 768px) {
		width: 89vw;
	}
	& > input {
		width: 100%;
		background: transparent;
		border: 0;
		// border-bottom: 1px solid rgba(133, 172, 197, 0.2);
		color: #08193d;
		font-size: 0.9em;
		&:focus {
			outline: none;
		}
	}
	& > button {
		color: #110909;
		border: 0;
		background: 0;
		position: absolute;

		top: 12px;
	}
}
.input-fade-enter-active,
.input-fade-leave-active {
	transition: opacity 0.5s;
}
.input-fade-enter,
.input-fade-leave-to {
	opacity: 0;
}
</style>
