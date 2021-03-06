import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import app from './modules/app';
import user, { UserState } from './modules/user';
Vue.use(Vuex);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
  user: any
}

export const store = new Vuex.Store<RootState>({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    app,
    user,
  },
  state: () => ({
    // root states
    user: (state: UserState)=>state
  }),
  getters: {
    // root getters
  },
  mutations: {},
  actions: {},
});

const createStore = (): Store<RootState> => {
  return store;
};

export default createStore;
