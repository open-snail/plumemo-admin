import { Module } from 'vuex';
import { InitContext, UserInfo } from '@plumemo/devtools/dev-core/types';

export type BThemeState = {
  userInfo: UserInfo | null;
  counts: {
    post: number;
    category: number;
    tag: number;
  } | null;
};

const bThemeModule: ({
  userApi,
}: Pick<InitContext, 'userApi' | 'articleApi' | 'categoryApi' | 'tagApi'>) => Module<BThemeState, {}> = ({
  userApi,
  articleApi,
  categoryApi,
  tagApi,
}) => ({
  namespaced: true,
  state() {
    return {
      userInfo: null,
      counts: null,
    };
  },
  actions: {
    async fetchCounts({ state }) {
      await Promise.all([categoryApi.getCount(), tagApi.getCount(), articleApi.getCount()]).then(
        ([category, tag, post]) => {
          state.counts = {
            category,
            tag,
            post,
          };
        },
      );
    },
    async fetchUserInfo({ state }) {
      await userApi.getInfo().then((info) => {
        state.userInfo = info;
      });
    },
    async getUserInfo({ dispatch, state }) {
      if (state.userInfo === null) {
        await dispatch('fetchUserInfo');
      }
      return state.userInfo;
    },
    async getCounts({ dispatch, state }) {
      if (state.counts === null) {
        await dispatch('fetchCounts');
      }
      return state.counts;
    },
  },
});

export default bThemeModule;
