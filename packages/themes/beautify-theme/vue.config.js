const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  lintOnSave: false,
  transpileDependencies: ['vuetify', '@vue-async/utils'],
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: isProd,
    // css预设器配置项
    loaderOptions: {
      scss: {
        //  implementation: require('sass'),
        //  fiber: require('fibers'),
        data: `
         @import "~vuetify/src/styles/styles.sass";
         `,
      },
      css: {
        // 模块定义设置
        modules: {
          localIdentName: isProd ? '[hash:base64]' : '[path]_[name]_[local]_[hash:base64:5]',
        },
        localsConvention: 'camelCaseOnly',
      },
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
  },
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
};
