import Mode from 'frontmatter-markdown-loader/mode'
import markdown from './config/markdown'
import createSitemap from './sitemap';
const glob = require('glob')
const path = require('path')

async function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: "" })
        .map(filepath => `${url}/${path.basename(filepath, ".md")}`);
    })
  );
}

export default async () => {
  const dynamicRoutes = await getDynamicPaths({
    '': 'posts/*.md'
  });
  console.log(dynamicRoutes);
  await createSitemap(dynamicRoutes);
  return {
    generate: {
      routes: dynamicRoutes
    },
    target: 'static',

    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
      title: 'Olayiwola Odunsi - Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: process.env.npm_package_description || ''
        },
        {
          name: 'theme-color', content: '#08193d'
        },
        {
          name: 'apple-mobile-web-app-capable', content: 'yes'
        },
        {
          name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent'
        },
        {
          name: 'msapplication-navbutton-color', content: '#08193d'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
      '~/assets/style.css',
      '~/assets/scss/default.scss',
      '@fortawesome/fontawesome-free/css/all.css',
      'bootstrap-vue/dist/bootstrap-vue.css',
      'animate.css/animate.min.css'

    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/common.js', '~/plugins/eventBus.js'],
    /*
     ** Global style for every component
     */
    styleResources: {
      scss: [
        '~/assets/scss/_variables.scss',
        '~/assets/scss/_post.scss'
      ]
    },
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
      // Doc: https://bootstrap-vue.js.org
      'bootstrap-vue/nuxt',
      '@nuxtjs/style-resources'
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
          loader: 'frontmatter-markdown-loader',
          options: {
            mode: [Mode.META, Mode.HTML, Mode.BODY],
            vue: {
              root: 'markdown'
            },
            markdown
          }
        })
      }
    }
  }
}
