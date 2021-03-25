/**
 * routes
 */
import { RouteConfig, Route } from 'vue-router';

function interopDefault(promise: Promise<any>) {
  return promise.then((m) => m.default || m);
}

const routes: RouteConfig[] = [
  {
    path: '',
    name: 'index',
    component: () => interopDefault(import(/* webpackChunkName: "views" */ '@/views')),
  },
  {
    path: 'article/:id',
    name: 'b-theme-article',
    component: () => interopDefault(import(/* webpackChunkName: "views" */ '@/views/article')),
  },
  {
    path: 'archive',
    name: 'b-theme-archive',
    component: () => interopDefault(import(/* webpackChunkName: "views" */ '@/views/archive')),
  },
  {
    path: 'about',
    name: 'b-theme-about-me',
    component: () => interopDefault(import(/* webpackChunkName: "views" */ '@/views/about-me')),
  },
  {
    path: 'search',
    name: 'b-theme-search',
    component: () => interopDefault(import(/* webpackChunkName: "views" */ '@/views/search')),
  },
  {
    path: 'search/:keywords',
    name: 'b-theme-search-keywords',
    component: () => interopDefault(import(/* webpackChunkName: "views" */ '@/views/search-result')),
    props: true,
  },
  {
    path: 'category/:id',
    name: 'b-theme-search-category',
    component: () => interopDefault(import(/* webpackChunkName: "views" */ '@/views/search-result')),
    props: (to: Route) => ({ type: 'category', id: to.params.id }),
  },
  {
    path: 'tag/:id',
    name: 'b-theme-search-tag',
    component: () => interopDefault(import(/* webpackChunkName: "views" */ '@/views/search-result')),
    props: (to: Route) => ({ type: 'tag', id: to.params.id }),
  },
];

export default routes;
