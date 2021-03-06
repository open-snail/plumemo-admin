/* eslint-disable no-console */
/**
 * 将 build、types、nuxt.config 复制到 devtools
 */
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');

const typesDir = 'types';
const nuxtConfigFile = 'nuxt.config';
const destDir = path.resolve('../packages/devtools/dev-core');

const nuxtCofnigPath = require.resolve(path.resolve('./', nuxtConfigFile));
let nuxtConfig = require(path.resolve('./', nuxtConfigFile));

if (typeof nuxtConfig === 'function') {
  nuxtConfig = nuxtConfig({});
}

try {
  // 删除文件夹及内容
  if (fs.existsSync(destDir)) {
    child_process.spawnSync('rm', ['-rf', destDir]);
  }

  // 创建文件夹
  fs.mkdirSync(destDir);

  // 复制文件
  const buildDir = nuxtConfig.buildDir || '.nuxt';
  const staticDir =
    (nuxtConfig.srcDir || '') + (nuxtConfig.dir && nuxtConfig.dir.static ? nuxtConfig.dir.static : 'static');

  child_process.spawnSync('cp', [
    '-r',
    path.resolve('./', buildDir),
    path.resolve('./', staticDir),
    path.resolve('./', typesDir),
    nuxtCofnigPath,
    destDir,
  ]);

  console.log('\x1b[36m', 'copy to devtools successfully', '\x1b[0m');
} catch (err) {
  console.log('\x1b[31m', `copy to devtools unsuccessfully, ${err.message}`, '\x1b[0m');
}
