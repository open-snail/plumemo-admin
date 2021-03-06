// Types
import { Plugin } from '@nuxt/types';
// import VueRouter, { RouteConfig } from 'vue-router';

const plugin: Plugin = (_cxt) => {
  // const { app } = cxt;
  // const options = app.router!.options;
  // (function setMeta(routes: RouteConfig[]) {
  //   routes.forEach((route) => {
  //     if (route.name && (route.name === 'articles' || route.name === 'medias')) {
  //       route.meta = { keepAlive: true };
  //     }
  //     if (route.children && route.children.length) {
  //       setMeta(route.children);
  //     }
  //   });
  // })(options.routes!);
  // const newRouter = new VueRouter(options);
  // (app.router as any).matcher = (newRouter as any).matcher;
};

export default plugin;
