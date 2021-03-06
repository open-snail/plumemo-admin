import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RootState {}

export const store = new Vuex.Store<RootState>({
  strict: process.env.NODE_ENV !== 'production',
});

const createStore = (): Store<RootState> => {
  return store;
};

export default createStore;
