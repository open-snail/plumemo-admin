import path from 'path';
import fs, { Dirent } from 'fs';
import execa from 'execa';

// *.{js(x),ts(x),!d.ts}
function isJsOrTsFile(dirent: Dirent) {
  return !dirent.name.endsWith('.d.ts') && ['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(dirent.name));
}

// *.vue
function isVueFile(dirent: Dirent) {
  return ['.vue'].includes(path.extname(dirent.name));
}

/**
 *  执行 vue-cli-service build, target:lib
 */
export function exec(
  entry: string,
  {
    name,
    filename,
    dest = 'dist',
    watch = false,
    noClean = false,
  }: { name?: string; filename?: string; dest?: string; watch?: boolean; noClean?: boolean } = {},
) {
  const file = require.resolve('@vue/cli-service/bin/vue-cli-service');
  const args = ['build', '--target', 'lib']
    .concat(name ? ['--name', name] : [])
    .concat(filename ? ['--filename', filename] : [])
    .concat(noClean ? ['--no-clean'] : [])
    .concat(watch ? ['--watch'] : [])
    .concat(['--formats', watch ? 'umd' : 'umd,umd-min'])
    .concat('--dest', dest)
    .concat(entry);
  return execa(file, args);
}

/**
 *  从文件夹中查的入口文件
 */
export async function findExecFile(rootDir: string, filename = 'index') {
  const dir = await fs.promises.opendir(rootDir);
  for await (const dirent of dir) {
    const extname = path.extname(dirent.name);
    const basename = path.basename(dirent.name, extname);

    if (dirent.isFile() && (isJsOrTsFile(dirent) || isVueFile(dirent)) && basename === filename) {
      return path.resolve(rootDir, dirent.name);
    }
  }
  return;
}

/**
 * loading, return: unloading function
 */
export function startLoading(msg = 'Building for production...') {
  const P = ['|', '/', '-', '\\'];
  let x = 0;

  const interval = setInterval(() => {
    process.stdout.write(`\r\x1b[36m${P[x++]} ${msg}\x1b[0m`);
    x &= 3;
  }, 300);

  return () => {
    clearInterval(interval);
    process.stdout.clearLine(0);
    process.stdout.write('\r');
  };
}
