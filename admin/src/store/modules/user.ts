import Vue from 'vue';
import { ACCESS_TOKEN } from '@/config/proLayoutConfigs';
import { welcome } from '@/utils/util';
import { authApi } from '@/includes/datas';

// Types
import { Module } from 'vuex';
import { RootState } from '../';
import { Role } from 'types/datas/auth';

export type UserState = {
  welcome: string;
  name: string;
  avatar: string | null;
  roles: Role[];
  info: Dictionary<any>;
};

const user: Module<UserState, RootState> = {
  namespaced: true,
  state: () => ({
    welcome: welcome(),
    name: '',
    avatar: null,
    roles: [],
    info: {},
  }),
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
  },
  getters: {
    name: (state: UserState) => state.name
  },
  actions: {
    // 登录
    login({ dispatch }, loginQuery) {
      return authApi.login(loginQuery).then((model) => {
        Vue.ls.set(ACCESS_TOKEN, model.token, 7 * 24 * 60 * 60 * 1000);
        return dispatch('getUserInfo');
      });
    },

    // 获取用户信息
    getUserInfo({ commit }) {
      return authApi.getLoginUserInfo().then((model) => {
        const { name, avatar, roles, ...rest } = model;

        commit('SET_NAME', name);
        commit('SET_ROLES', roles);
        commit('SET_AVATAR', avatar);
        commit('SET_INFO', rest);
      });
    },

    // 登出
    logout({ commit }) {
      return authApi.logout().then(() => {
        // 清空 state
        commit('SET_NAME', '');
        commit('SET_ROLE', null);
        commit('SET_AVATAR', null);
        commit('SET_INFO', {});
        Vue.ls.remove(ACCESS_TOKEN);
      });
    },
  },
};

export default user;
