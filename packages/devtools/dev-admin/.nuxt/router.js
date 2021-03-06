import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

import _809e7a42 from '../src/views/404.vue'
import _f21fe6b4 from '../src/views/articles.vue'
import _826402ae from '../src/views/articles/index.vue'
import _42a62135 from '../src/views/articles/create.vue'
import _5824d15e from '../src/views/articles/_id.vue'
import _05f970f0 from '../src/views/categories/index.vue'
import _20d02d3e from '../src/views/dashboard/index.vue'
import _f82e3e60 from '../src/views/login.vue'
import _4ead2290 from '../src/views/medias.vue'
import _06b3e98a from '../src/views/medias/index.vue'
import _8060b23a from '../src/views/medias/create.vue'
import _201d3bab from '../src/views/pages.vue'
import _4f9b15ee from '../src/views/pages/index.vue'
import _69081ae0 from '../src/views/pages/create.vue'
import _b59c8854 from '../src/views/pages/_id.vue'
import _42bdb30a from '../src/views/plugins/index.vue'
import _8582d8e8 from '../src/views/settings.vue'
import _e70d7de2 from '../src/views/settings/index.vue'
import _767010e5 from '../src/views/settings/general.vue'
import _74572e05 from '../src/views/tags/index.vue'
import _f473601a from '../src/views/themes.vue'
import _20345794 from '../src/views/themes/index.vue'
import _d3cbab72 from '../src/views/themes/color.vue'
import _7f425127 from '../src/views/themes/customize.vue'
import _c111624c from '../src/views/themes/libs.vue'
import _46a92093 from '../src/views/themes/widgets.vue'
import _5ab99b7c from '../src/views/tools.vue'
import _89c50176 from '../src/views/tools/index.vue'
import _e9bbea5e from '../src/views/tools/export.vue'
import _0551eb7c from '../src/views/tools/import.vue'
import _22df0b2e from '../src/views/account/settings.vue'
import _4d521856 from '../src/views/account/user.vue'
import _69cc1794 from '../src/views/categories/create.vue'
import _2b0cddb2 from '../src/views/plugins/installed.vue'
import _3e42dd59 from '../src/views/tags/create.vue'

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
    path: "/404",
    component: _809e7a42,
    name: "404"
  }, {
    path: "/articles",
    component: _f21fe6b4,
    meta: {"title":"Articles"},
    children: [{
      path: "",
      component: _826402ae,
      meta: {"title":"All Articles","keepAlive":true},
      name: "articles"
    }, {
      path: "create",
      component: _42a62135,
      meta: {"title":"New"},
      name: "articles-create"
    }, {
      path: ":id",
      component: _5824d15e,
      meta: {"title":"Edit"},
      name: "articles-edit"
    }]
  }, {
    path: "/categories",
    component: _05f970f0,
    meta: {"title":"Categories"},
    name: "categories"
  }, {
    path: "/dashboard",
    component: _20d02d3e,
    meta: {"title":"Dashboard"},
    name: "dashboard"
  }, {
    path: "/login",
    component: _f82e3e60,
    name: "login"
  }, {
    path: "/medias",
    component: _4ead2290,
    meta: {"title":"Medias"},
    children: [{
      path: "",
      component: _06b3e98a,
      meta: {"title":"All Medias"},
      name: "medias"
    }, {
      path: "create",
      component: _8060b23a,
      meta: {"title":"New"},
      name: "medias-create"
    }]
  }, {
    path: "/pages",
    component: _201d3bab,
    meta: {"title":"Pages"},
    children: [{
      path: "",
      component: _4f9b15ee,
      meta: {"title":"All Pages","keepAlive":true},
      name: "pages"
    }, {
      path: "create",
      component: _69081ae0,
      meta: {"title":"New"},
      name: "pages-create"
    }, {
      path: ":id",
      component: _b59c8854,
      meta: {"title":"Edit"},
      name: "page-edit"
    }]
  }, {
    path: "/plugins",
    component: _42bdb30a,
    name: "plugins"
  }, {
    path: "/settings",
    component: _8582d8e8,
    meta: {"title":"Settings"},
    children: [{
      path: "",
      component: _e70d7de2,
      redirect: {"name":"settings-general"},
      name: "settings"
    }, {
      path: "general",
      component: _767010e5,
      meta: {"title":"General Settings"},
      name: "settings-general"
    }]
  }, {
    path: "/tags",
    component: _74572e05,
    meta: {"title":"Tags"},
    name: "tags"
  }, {
    path: "/themes",
    component: _f473601a,
    meta: {"title":"Themes"},
    children: [{
      path: "",
      component: _20345794,
      redirect: {"name":"themes-libs"},
      name: "themes"
    }, {
      path: "color",
      component: _d3cbab72,
      meta: {"title":"Theme Color"},
      name: "themes-color"
    }, {
      path: "customize",
      component: _7f425127,
      meta: {"title":"Theme Customize"},
      name: "themes-customize"
    }, {
      path: "libs",
      component: _c111624c,
      meta: {"title":"Theme Libs"},
      name: "themes-libs"
    }, {
      path: "widgets",
      component: _46a92093,
      meta: {"title":"Widgets"},
      name: "themes-widgets"
    }]
  }, {
    path: "/tools",
    component: _5ab99b7c,
    meta: {"title":"Tools"},
    children: [{
      path: "",
      component: _89c50176,
      redirect: {"name":"tools-import"},
      name: "tools"
    }, {
      path: "export",
      component: _e9bbea5e,
      meta: {"title":"Export"},
      name: "tools-export"
    }, {
      path: "import",
      component: _0551eb7c,
      meta: {"title":"Import"},
      name: "tools-import"
    }]
  }, {
    path: "/account/settings",
    component: _22df0b2e,
    meta: {"title":"Site Settings"},
    name: "account-settings"
  }, {
    path: "/account/user",
    component: _4d521856,
    meta: {"title":"User Info"},
    name: "account-user"
  }, {
    path: "/categories/create",
    component: _69cc1794,
    name: "categories-create"
  }, {
    path: "/plugins/installed",
    component: _2b0cddb2,
    name: "plugins-installed"
  }, {
    path: "/tags/create",
    component: _3e42dd59,
    name: "tags-create"
  }, {
    path: "/",
    redirect: {"name":"dashboard"}
  }, {
    path: "*",
    redirect: {"name":"404"}
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
