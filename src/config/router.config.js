// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      },
      // forms
      {
        path: '/article',
        redirect: '/article/list',
        component: PageView,
        meta: { title: '文章管理', icon: 'form' },
        children: [
          {
            path: '/article/list',
            name: 'ArticleList',
            component: () => import('@/views/article/ArticleList'),
            meta: { title: '文章列表', keepAlive: false }
          },
          {
            path: '/category/list',
            name: 'CategoryList',
            component: () => import('@/views/category/CategoryList'),
            meta: { title: '分类列表', keepAlive: false }
          },
          {
            path: '/tags/list',
            name: 'TagsList',
            component: () => import('@/views/tags/TagsList'),
            meta: { title: '标签列表', keepAlive: false }
          },
          {
            path: '/comment/list',
            name: 'CommentList',
            component: () => import('@/views/comment/CommentList'),
            meta: { title: '评论管理', keepAlive: false }
          }
        ]
      },
      // links
      {
        path: '/links',
        redirect: '/links/list',
        component: PageView,
        meta: { title: '友链管理', icon: 'share-alt' },
        children: [
          {
            path: '/links/list',
            name: 'LinksList',
            component: () => import('@/views/links/LinksList'),
            meta: { title: '友链列表', keepAlive: false }
          }
        ]
      },
      // user
      {
        path: '/auth',
        redirect: '/auth/list',
        component: PageView,
        meta: { title: '用户管理', icon: 'team' },
        children: [
          {
            path: '/user/list',
            name: 'userList',
            component: () => import('@/views/auth/UserList'),
            meta: { title: '用户列表', keepAlive: false }
          }
        ]
      },
      // logs
      {
        path: '/logs',
        redirect: '/logs/list',
        component: PageView,
        meta: { title: '日志管理', icon: 'snippets' },
        children: [
          {
            path: '/logs/list',
            name: 'logsList',
            component: () => import('@/views/logs/LogsList'),
            meta: { title: '日志列表', keepAlive: false }
          }
        ]
      },
      // menu
      {
        path: '/menu',
        redirect: '/menu/list',
        component: PageView,
        meta: { title: '菜单管理', icon: 'snippets' },
        children: [
          {
            path: '/menu/list',
            name: 'menuList',
            component: () => import('@/views/menu/MenuList'),
            meta: { title: '菜单列表', keepAlive: false }
          }
        ]
      },
      // social
      {
        path: '/social',
        redirect: '/social/list',
        component: PageView,
        meta: { title: '社交管理', icon: 'snippets' },
        children: [
          {
            path: '/social/list',
            name: 'socialList',
            component: () => import('@/views/social/SocialList'),
            meta: { title: '社交列表', keepAlive: false }
          }
        ]
      },
      // config
      {
        path: '/config',
        redirect: '/config/list',
        component: PageView,
        meta: { title: '系统配置', icon: 'tool' },
        children: [
          {
            path: '/config/site',
            name: 'BasicForm',
            component: () => import('@/views/config/BasicForm'),
            meta: { title: '站点信息', keepAlive: false }
          },
          {
            path: '/config/cloudMusic',
            name: 'cloudMusicForm',
            component: () => import('@/views/config/MusicForm'),
            meta: { title: '歌单配置', keepAlive: false }
          },
          {
            path: '/config/default/oss',
            name: 'DefaultForm',
            component: () => import('@/views/config/file/DefaultForm'),
            meta: { title: '服务器OSS配置', keepAlive: false }
          },
          {
            path: '/config/qiniu/oss',
            name: 'QnyForm',
            component: () => import('@/views/config/file/QnyForm'),
            meta: { title: '七牛云OSS配置', keepAlive: false }
          },
          {
            path: '/config/aliyun/oss',
            name: 'ALiYunOSSFrom',
            component: () => import('@/views/config/file/ALiYunOSSForm'),
            meta: { title: '阿里云OSS配置', keepAlive: false }
          },
          {
            path: '/config/cos/oss',
            name: 'COSForm',
            component: () => import('@/views/config/file/COSForm'),
            meta: { title: '腾讯云COS配置', keepAlive: false }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/settings',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', permission: [ 'user' ] }
              },
              {
                path: '/account/settings/password',
                name: 'UpdatePassword',
                component: () => import('@/views/account/settings/UpdatePassword'),
                meta: { title: '修改密码', keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
