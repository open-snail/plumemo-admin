module.exports = {
  publicPath: './',
  productionSourceMap: false,
  lintOnSave: false,
  transpileDependencies: ['@vue-async/utils'],
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    loaderOptions: {
      postcss: {
        path: __dirname,
      },
      less: {
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
};
