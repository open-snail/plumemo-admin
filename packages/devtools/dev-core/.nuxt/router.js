import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

import _3a46af13 from '..\\src\\views\\index.tsx'
import _fddf8564 from '..\\src\\layouts\\error.tsx'

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _3a46af13,
    name: "index"
  }, {
    path: "/error",
    component: _fddf8564,
    props: true,
    name: "error"
  }, {
    path: "*",
    component: _fddf8564,
    props: {"error":{"statusCode":404}}
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
