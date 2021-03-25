/**
 * routes
 */
import { RouteConfig } from 'vue-router';

function interopDefault(promise: Promise<any>) {
  return promise.then((m) => m.default || m);
}

const routes: RouteConfig[] = [
  {
    path: 'themes/settings',
    name: 'b-theme-settings',
    component: () => interopDefault(import(/* webpackChunkName: "router-theme" */ '@/admin/views/settings')),
    meta: {
      title: 'Theme Settings Demo',
    },
  },
];

export default routes;
