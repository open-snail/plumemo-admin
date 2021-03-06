/**
 * vue-cli-service build --target lib --name module-test --dest dist/module-test module-test/index.js
 */

const fs = require('fs');
const path = require('path');
const execa = require('execa');

async function exec(name, execFile) {
  const { stdout } = await execa(require.resolve('@vue/cli-service/bin/vue-cli-service'), [
    'build',
    '--target',
    'lib',
    '--name',
    name,
    '--dest',
    `dist/${name}`,
    execFile,
  ]);
  return stdout;
}

// *.{js,ts,!d.ts}
function isJsOrTsFile(dirent) {
  return !dirent.name.endsWith('.d.ts') && ['.js', '.ts'].includes(path.extname(dirent.name));
}

// *.vue
function isVueFile(dirent) {
  return ['.vue'].includes(path.extname(dirent.name));
}

async function findFile(rootDir, filename = 'index') {
  const dir = await fs.promises.opendir(rootDir);
  for await (const dirent of dir) {
    const extname = path.extname(dirent.name);
    const basename = path.basename(dirent.name, extname);

    if (
      dirent.isFile() &&
      (isJsOrTsFile(dirent) || isVueFile(dirent)) &&
      path.basename(dirent.name, extname) === filename
    ) {
      return path.resolve(rootDir, dirent.name);
    }
  }
}

async function run(files) {
  // 指定文件
  if (files && files.length) {
    for (file of files) {
      const fullpath = path.resolve(__dirname, '../', file);
      const lstat = await fs.promises.lstat(fullpath);
      if (lstat.isFile()) {
        const result = await exec(path.basename(fullpath, path.extname(fullpath)), fullpath);
        console.log(result);
      } else {
        const indexFile = await findFile(fullpath);
        if (indexFile) {
          const result = await exec(path.basename(fullpath), indexFile);
          console.log(result);
        } else {
          console.error('can not find index file!');
        }
      }
    }
  } else {
    // 所有 src/*.{!d.ts} or src/*/index.{!d.ts}
    const rootDir = path.resolve(__dirname, '../src');

    const dir = await fs.promises.opendir(rootDir);
    for await (const dirent of dir) {
      if (dirent.isFile()) {
        // 文件
        if (!isJsOrTsFile(dirent) && !isVueFile(dirent)) {
          continue;
        }

        const rootFile = path.resolve(rootDir, dirent.name);
        const result = await exec(path.basename(dirent.name, path.extname(dirent.name)), rootFile);
        console.log(result);
      } else {
        // 目录=》 index.js/index.ts
        const indexFile = await findFile(path.resolve(rootDir, dirent.name));
        if (indexFile) {
          const result = await exec(dirent.name, indexFile);
          console.log(result);
        } else {
          console.error('can not find index file!');
        }
      }
    }
  }
}

async function genJsonFile(filename) {
  const distDir = path.resolve(__dirname, '../dist');
  const filepath = path.resolve(distDir, `${filename}.json`);
  const dir = await fs.promises.opendir(distDir);
  const content = {};
  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      const umdFile = await findFile(path.resolve(distDir, dirent.name), `${dirent.name}.umd.min`);
      content[dirent.name] = dirent.name + '/' + path.basename(umdFile);
    }
  }
  fs.writeFile(filepath, JSON.stringify(content), 'utf8', () => {
    console.log(`create json file ${filepath} successfully!`);
  });
}

if (require.main === module) {
  const argv = process.argv.splice(2);
  const files = argv.filter((arg) => !arg.startsWith('--'));
  const options = argv
    .filter((arg) => !files.includes(arg))
    .reduce((prev, curr) => {
      const keyValue = curr
        .substr(2)
        .split('=')
        .filter((arg) => !!arg);
      keyValue.length && (prev[keyValue[0]] = keyValue.length === 1 ? true : keyValue[1]);
      return prev;
    }, {});
  const genJson = run(files)
    .then(() => {
      // 生成 json 文件
      options.json && options.json !== 'false' && genJsonFile(options.json === true ? 'modules' : options.json);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    });
}
