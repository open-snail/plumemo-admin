import Vue from 'vue';
import { ACCESS_TOKEN } from '@/config/proLayoutConfigs';

// Types
import { Context } from '@nuxt/types';
import { store } from '@/store';

// 匿名允许路由名
const anonymousRouteNames = ['login'];

export default ({ route, redirect }: Context) => {
  const hasLogin = !!Vue.ls.get(ACCESS_TOKEN);

  // 如果没有获取到用户名称，则重新加载用户信息
  if (store.state.user.name === '') {
    store.dispatch("user/getUserInfo")
  }

  // 没有授权，需要登录
  if (!anonymousRouteNames.includes(route.name!) && !hasLogin) {
    redirect({ name: 'login' });
  }


};
