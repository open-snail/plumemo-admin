/* eslint-disable prettier/prettier */

const isProd = process.env.NOEW_ENV === 'production';

// eslint-disable-next-line no-unused-vars
const assetsCDN = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    'vue-i18n': 'VueI18n',
    'vue-meta': 'VueMeta',
  },
  css: [
    // { href: '//cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css', prefetch: true },
  ],
  js: [
    { src: '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js', preload: true },
    { src: '//cdn.jsdelivr.net/npm/vue-router@3.3.4/dist/vue-router.min.js', preload: true },
    { src: '//cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex.min.js', preload: true },
    { src: '//cdn.jsdelivr.net/npm/vue-i18n@8.20.0/dist/vue-i18n.min.js', preload: true },
    { src: '//cdn.jsdelivr.net/npm/vue-meta@2.4.0/dist/vue-meta.min.js', preload: true },
  ],
};

const port = process.env.PORT || 5008;
const host = process.env.HOST || 'localhost';

module.exports = (configContext) => {
  return {
    vue: {
      config: {
        productionTip: false,
        devtools: !isProd,
      },
    },
    server: {
      port, // default: 3000
      host, // default: localhost,
      https: false,
    },
    env: {
      // axios baseUrl (服务端 axios 请求时必须有前缀)
      baseUrl: process.env.BASE_URL || `http://${host}:${port}`,
    },
    ssr: false,
    srcDir: 'src/',
    dir: {
      pages: 'views',
    },
    head: {
      titleTemplate: (title) => (title ? `${title} | Po Blog` : 'Po Blog'),
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Po Blog' },
      ],
      script: [],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      style: [],
    },
    css: ['~/assets/styles/index.scss'],
    loading: '~/components/PageLoading',
    modules: ['@nuxtjs/proxy'],
    proxy: {
      // 在 devtools 时调试主题模块代理
      ...(configContext.devProxyThemeTarget
        ? {
            '/api/plumemo-service/modules/themes': {
              target: configContext.devProxyThemeTarget,
              changeOrigin: false,
              ws: false,
              pathRewrite: {
                '^/api/plumemo-service/modules/themes': '',
              },
            },
          }
        : null),
      // 在 devtools 时调试插件模块代理
      ...(configContext.devProxyPluginTarget
        ? {
            '/api/plumemo-service/modules/plugins': {
              target: configContext.devProxyPluginTarget,
              changeOrigin: false,
              ws: false,
              pathRewrite: {
                '^/api/plumemo-service/modules/plugins': '',
              },
            },
          }
        : null),
      // 在 dev 或 devtools 模式下接口代理(此代理在 BASE_URL 被设置成跨域后无效, 请在 dev 模式下不要设置此环境变量)
      ...((configContext.dev && process.env.PROXYAPI_URL) || configContext.devProxyApiTarget
        ? {
            '/api/plumemo-service': {
              /**
               * devProxyApiTarget: 在 devtools 自定义接口地址
               * PROXYAPI_URL: 在 scripts serve 自定义环境变量接口地址
               * fallback 到当前 domain
               */
              target: configContext.devProxyApiTarget || process.env.PROXYAPI_URL || '/',
            },
          }
        : null),
    },
    plugins: [
      { src: 'plugins/i18n' }, // locale
      { src: 'plugins/pre-init' }, // pre-init
      { src: 'plugins/module-loader', ssr: false }, // modules load
      { src: 'plugins/router' }, // router
    ],
    router: {
      extendRoutes(routes, resolve) {
        routes.push(
          ...[
            {
              path: '/error',
              name: 'error',
              props: true,
              component: resolve(__dirname, './src/layouts/error.tsx'),
            },
            {
              path: '*',
              props: { error: { statusCode: 404 } },
              component: resolve(__dirname, './src/layouts/error.tsx'),
            },
          ],
        );
      },
    },
    buildModules: ['@nuxt/typescript-build'],
    build: {
      babel: {
        // use babel.config.js
        babelrc: true,
        configFile: true,
        cacheDirectory: undefined,
      },
      optimization: {
        splitChunks: {
          chunks: 'async',
        },
      },
      splitChunks: {
        vendor: true,
        commons: true,
        runtime: true,
        pages: false,
        layouts: false,
      },
      transpile: ['@vue-async/module-loader'],
      extractCSS: true,
      loaders: {
        scss: {
          // implementation: require('sass'),
          // fiber: require('fibers'),
          data: `
        @import "./src/assets/styles/fn.scss";
        `,
        },
        cssModules: {
          modules: {
            localIdentName: isProd ? '[hash:base64]' : '[path]_[name]_[local]_[hash:base64:5]',
          },
          localsConvention: 'camelCaseOnly',
        },
      },
      /*
       ** You can extend webpack config here
       */
      // eslint-disable-next-line no-unused-vars
      extend(config, ctx) {},
    },
    // 启动加载 loading 配置
    loadingIndicator: {
      name: 'three-bounce',
      color: '#f67280',
      background: 'white',
    },
    // 忽略文件的 auto build
    ignore: [
      // 'layouts/root'
    ],
  };
};
