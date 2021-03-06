/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';
import camelCase from 'lodash.camelcase';
import { exec, findExecFile, startLoading } from './utils';

export async function run(
  file: string,
  args: { name?: string; filename?: string; dest?: string; info?: boolean } = {},
) {
  const entry = path.resolve(process.cwd(), file);
  const name = args.name;
  const filename = args.filename;
  let dest = args.dest;
  const showResult = args.info;

  const lstat = await fs.promises.lstat(entry);
  if (lstat.isFile()) {
    // 是文件则直接编译
    const stoploading = startLoading();
    const { stdout } = await exec(entry, { name, filename, dest });
    stoploading();
    showResult ? console.log(stdout) : console.log('\x1b[36m', 'build successfully', '\x1b[0m');
  } else if (lstat.isDirectory()) {
    const entryIndexFile = await findExecFile(entry);
    // 查找文件夹 index 文件
    if (entryIndexFile) {
      const stoploading = startLoading();
      const { stdout } = await exec(entryIndexFile, { name, filename, dest });
      stoploading();
      showResult ? console.log(stdout) : console.log('\x1b[36m', 'build successfully', '\x1b[0m');
    } else {
      /**
       * 循环文件夹中的文件 /file.[js(x),ts(x),vue] or /dir/index.[js(x),ts(x),vue]
       * 文件以文件名为 name
       * 文件夹index文件以文件夹名为 name
       */
      const dir = await fs.promises.opendir(entry);
      dest = dest || 'dist';
      let result = '';
      const stoploading = startLoading();
      for await (const dirent of dir) {
        if (dirent.isFile()) {
          const { stdout } = await exec(path.join(entry, dirent.name), {
            name: camelCase(dirent.name),
            filename: dirent.name,
            dest: path.join(dest, dirent.name),
          });
          result += '/r' + stdout;
        } else {
          const indexFile = await findExecFile(path.join(entry, dirent.name));
          if (indexFile) {
            const { stdout } = await exec(indexFile, {
              name: camelCase(dirent.name),
              filename: 'index',
              dest: path.join(dest, dirent.name),
            });
            result += '/r' + stdout;
          } else {
            // 未找到入口文件
            continue;
          }
          const adminFile = await findExecFile(path.join(entry, dirent.name), 'admin');
          if (adminFile) {
            const { stdout } = await exec(adminFile, {
              name: camelCase(dirent.name),
              filename: 'admin',
              dest: path.join(dest, dirent.name),
              noClean: true,
            });
            result += '/r' + stdout;
          } else {
            // 未找到入口文件
            continue;
          }
        }
      }
      stoploading();
      showResult ? console.log(result) : console.log('\x1b[36m', 'build successfully', '\x1b[0m');
    }
  } else {
    console.error('entry file not found');
  }
}
