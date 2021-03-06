/**
 * router/utils
 */
import { Component } from 'vue';
import { RouteConfig, Route } from 'vue-router';
import kebabCase from 'lodash.kebabcase';
import { trailingSlash } from '@/utils/path';

// Types
import { LocaleConfig, LangConfig } from 'types/functions/locale';

/**
 * layouts
 */
export function layout(path: string, name: string, children: RouteConfig[]) {
  const folder = kebabCase(name);

  return {
    path,
    component: () =>
      import(
        /* webpackChunkName: "layout-[request]" */
        `@/layouts/${folder}/index`
      ),
    props: true,
    children,
  };
}

/**
 * pages
 */
export function route(path: string, name: string, file: string) {
  const folder = (file || `${kebabCase(name)}`).toLowerCase();

  return {
    component: () => import(`@/views/${folder}/index`),
    name,
    path,
  };
}

/**
 * 子模块路由处理方式一
 * 判断前缀"/"
 */
export function root(routes: RouteConfig[]) {
  // Add start slash
  return routes.map((route) => {
    !route.path.startsWith('/') && (route.path = '/' + route.path);
    return route;
  });
}

/**
 * 子模块路由处理方式一
 * 添加多语言到 params
 */
export function genLocaleConfig(localeConfig: LocaleConfig) {
  // Matches allowed languages
  const localePattern = localeConfig.supportLanguages
    .map((lang: LangConfig) => lang.alternate || lang.locale)
    .join('|');
  const localeRegexp = new RegExp('^(' + localePattern + ')$');
  // 判断是否在支持的语言中在在
  const hasLocale = function (locale: string) {
    return localeConfig.supportLanguages.some(
      (lang: LangConfig) => lang.alternate === locale || lang.locale === locale,
    );
  };

  // Matches any language identifier
  const genericLocaleRegexp = /[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}/;

  const preferredLocale =
    typeof document === 'undefined'
      ? localeConfig.default
      : navigator.languages.find((l: string) => l.match(localeRegexp)) || localeConfig.default;

  localeConfig.supportLanguages.find((lang: LangConfig) => lang.alternate || lang.locale) || {};

  return {
    localePattern,
    localeRegexp,
    genericLocaleRegexp,
    preferredLocale,
    hasLocale,
  };
}

/**
 * 多语言路由配置
 * @param children
 * @param locale
 */
export function localeRoot(children: RouteConfig[], locale: LocaleConfig) {
  const { localePattern, genericLocaleRegexp, preferredLocale } = genLocaleConfig(locale);

  // Reomve start slash
  (function removeStartSlash(items: RouteConfig[]) {
    items.forEach((item) => {
      item.path.startsWith('/') && (item.path = item.path.substr(1));
    });
  })(children);

  return [
    layout(`/:lang(${localePattern})`, 'Root', children),
    {
      path: `/:lang(${genericLocaleRegexp.source})/*`,
      redirect: (to: Route) => trailingSlash(`/${preferredLocale}/${to.params.pathMatch || ''}`),
    },
    {
      // The previous one doesn't match if there's no slash after the language code
      path: `/:lang(${genericLocaleRegexp.source})`,
      redirect: () => `/${preferredLocale}/`,
    },
    redirect((to: Route) => trailingSlash(`/${preferredLocale}${to.path}`)),
  ];
}

export function redirect(redirect: (to: Route) => string) {
  return { path: '*', redirect };
}

// 合并路由（将新路由配置合并到老路由配置中）
export const megreRoutes = (oldRoutes: RouteConfig[], newRoutes: RouteConfig[]) => {
  newRoutes.forEach((current: RouteConfig) => {
    const matchRoute = oldRoutes.find(
      (route: RouteConfig) => (current.name && route.name === current.name) || route.path === current.path,
    );
    if (matchRoute) {
      // 如果找到已在在的
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children, name, ...restOptions } = current;
      Object.assign(matchRoute, restOptions); // 合并路由参数

      if (children) {
        !matchRoute.children && (matchRoute.children = []);
        megreRoutes(matchRoute.children, children);
      }
    } else {
      // 插入到 path:'*'之前
      const insertIndex = oldRoutes.findIndex((route: RouteConfig) => route.path === '*');
      // 如果没找到
      oldRoutes.splice(insertIndex < 0 ? 0 : insertIndex, 0, current);
    }
  });
};

/**
 * vue-router 不支持异步组件 loading
 * https://github.com/chrisvfritz/vue-enterprise-boilerplate/blob/master/src/router/routes.js#L93-L131
 */
export function lazyLoadView(
  asyncView: any,
  {
    loadingComponent,
    errorComponent,
    delay = 200,
    timeout = 10000,
  }: {
    loadingComponent?: Component;
    errorComponent?: Component;
    delay?: number;
    timeout?: number;
  } = {},
) {
  const AsyncHandler = () => ({
    component: asyncView,
    // A component to use while the component is loading.
    loading: loadingComponent || {
      render: (h: any) => h('h1', {}, 'Loading...'),
    },
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: errorComponent || {
      render: (h: any) => h('h1', {}, 'Load component error.'),
    },
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout,
  });

  return Promise.resolve({
    functional: true,
    render(h: any, { data, children }: any) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children);
    },
  });
}
