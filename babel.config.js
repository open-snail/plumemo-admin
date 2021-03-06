/**
 * 根据使用导入:
 * https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
 */

module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false, // 对ES6的模块文件不做转化，以便使用tree shaking、sideEffects等
          spec: true,
          forceAllTransforms: true,
          useBuiltIns: 'usage', // 根据使用导入
          corejs: {
            version: 3, // 使用core-js@3
            proposals: false,
          },
        },
      ],
    ],
    babelrcRoots: ['.', 'packages/*'],
  };
};
