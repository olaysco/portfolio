
const glob = require('glob');
const path = require('path');

var getDynamicRoutes = function() {
  return [].concat(
    glob
      .sync('*.md', { cwd: 'posts/' })
      .map((filepath) => `/software/${path.basename(filepath, '.md')}`),
    glob
      .sync('*.md', { cwd: 'blog/' })
      .map((filepath) => `/blog/${path.basename(filepath, '.md')}`)
  )
}

var dynamicPaths = getDynamicRoutes();

export default {

  generate: {
    routes: dynamicPaths
  },

  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'bootstrap-vue/dist/bootstrap-vue.css',
    '~assets/style.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/common.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        include: [path.resolve(__dirname, 'posts')],
        loader: 'frontmatter-markdown-loader'
      })
    }
  }
}
