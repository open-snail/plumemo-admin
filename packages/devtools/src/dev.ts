/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import { loadNuxt } from 'nuxt';
import { exec } from './utils';

export async function run(
  file: string,
  args: {
    name?: string;
    filename?: string;
    dest?: string;
    plugin?: boolean;
    admin?: boolean;
    port?: number;
    host?: string;
    'proxy-api-target'?: string;
  } = {},
) {
  const entry = path.join(process.cwd(), file);
  const name = args.name;
  const filename = args.filename;
  const dest = args.dest || 'dist';
  const isPlugin = !!args.plugin;
  const isAdmin = !!args.admin;
  const port = args.port || 5007;
  const host = args.host || 'localhost';
  const proxyApiTarget = args['proxy-api-target'];

  const apiPath = `dev-${isAdmin ? 'admin' : isPlugin ? 'plugins' : 'theme'}`;
  const staticPath = path.resolve(process.cwd(), dest);
  const packageJosn = require(path.resolve(process.cwd(), 'package'));

  /**
   * 自定义 name 或 package.json 中的 name 或文件名
   */
  let moduleName: string;
  let moduleEntry: string;
  let moduleStyles: string | string[];
  if (isAdmin) {
    const conf = packageJosn['admin:main'];
    if (!conf || !conf.moduleName || !conf.entry) return;
    moduleName = conf.moduleName;
    moduleEntry = conf.entry;
    moduleStyles = conf.styles;
  } else {
    moduleName = name || packageJosn.name || path.basename(entry);
    moduleEntry = packageJosn['main'];
    moduleStyles = packageJosn['main:styles'];
  }
  /**
   * express 静态文件以 arg.dest 为根目录，文件加载时需要去掉前缀
   */
  // 去掉 arg.dest 前缀
  if (moduleEntry.startsWith(dest)) {
    moduleEntry = moduleEntry.substr(dest.length);
  }

  // 转成数组并去掉 arg.dest 前缀
  if (typeof moduleStyles === 'string') {
    moduleStyles = [moduleStyles];
  }
  if (moduleStyles && moduleStyles.length) {
    moduleStyles = moduleStyles.map((style: string) => {
      return style.startsWith(dest) ? style.substr(dest.length) : style;
    });
  }

  // build module and watch
  exec(entry, { name, filename, dest, watch: true }).stdout!.pipe(process.stdout);

  const app = express();
  // 静态文件服务器
  app.use('/', express.static(staticPath));
  // 创建代理到静态文件服务器上
  app.use(`/${apiPath}`, (req, resp) => {
    // plugin 返回数组, theme 返回对象
    const data = {
      moduleName,
      entry: moduleEntry,
      styles: moduleStyles,
    };
    resp.send({
      success: 1,
      message: 'devtools',
      ...(isAdmin ? { models: [data] } : isPlugin ? { models: [data] } : { model: data }),
    });
  });

  return await start(host, port, apiPath);

  // 执行 nuxt stsrt
  async function start(host: string, port: number, apiPath: string) {
    const nuxtConfigFile = 'nuxt.config';
    const proxyPath = `http://${host}:${port}/${apiPath}`;
    const rootDir = path.resolve(__dirname, `../dev-${isAdmin ? 'admin' : 'core'}`);
    const nuxtConfig = require(path.resolve(rootDir, nuxtConfigFile));
    const staticDir = nuxtConfig.dir && nuxtConfig.dir.static ? nuxtConfig.dir.static : 'static';
    const configContext: Record<string, any> = {
      devtools: true,
    };

    if (proxyApiTarget) {
      configContext.devProxyApiTarget = proxyApiTarget;
    }

    if (isAdmin) {
      configContext.devProxyModuleTarget = proxyPath;
    } else if (isPlugin) {
      configContext.devProxyPluginTarget = proxyPath;
    } else {
      configContext.devProxyThemeTarget = proxyPath;
    }

    const nuxt = await loadNuxt({
      for: 'start',
      rootDir,
      // configFile: nuxtConfigFile,
      configContext,
    });

    app.use(express.static(path.resolve(rootDir, staticDir)));
    app.use(nuxt.render);

    // start server
    app.listen(port, host, () =>
      console.log(
        '\x1b[36m',
        `Listening on: http://${host}:${port}${
          proxyApiTarget ? `\n API Proxy to: ${proxyApiTarget}` : ''
        } \n wait for module build completely \n`,
        '\x1b[0m',
      ),
    );
  }
}
