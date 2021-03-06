import Vue from 'vue';
import config, {
  SET_LAYOUT,
  SET_THEME,
  SET_PRIMARY_COLOR,
  SET_CONTENT_WIDTH,
  TOGGLE_SIDE_COLLAPSED,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIX_SIDEBAR,
  TOGGLE_AUTO_HIDE_HEADER,
  TOGGLE_COLOR_WEAK,
  TOGGLE_MULTI_TAB,
  Layout,
  Theme,
  ContentWidth,
} from '@/config/proLayoutConfigs';

// Types
import { Module } from 'vuex';
import { RootState } from '../';

export type AppState = {
  layout: Layout;
  theme: Theme;
  primaryColor: string | null;
  contentWidth: ContentWidth;
  fixedHeader: boolean;
  fixSidebar: boolean;
  sideCollapsed: boolean;
  colorWeak: boolean;
  autoHideHeader: boolean;
  multiTab: boolean;
};

const app: Module<AppState, RootState> = {
  namespaced: true,
  state: () => ({
    layout: config.settings.layout,
    theme: config.settings.theme,
    primaryColor: config.settings.primaryColor,
    contentWidth: config.settings.contentWidth,
    fixedHeader: config.settings.fixedHeader,
    fixSidebar: config.settings.fixSiderbar,
    sideCollapsed: config.settings.sideCollapsed,
    colorWeak: config.settings.colorWeak,
    // 下面两个暂时没有用
    autoHideHeader: config.settings.autoHideHeader,
    multiTab: config.settings.multiTab,
  }),
  mutations: {
    [SET_LAYOUT]: (state, mode) => {
      state.layout = mode;
      Vue.ls.set(SET_LAYOUT, mode);
    },
    [SET_THEME]: (state, theme) => {
      state.theme = theme;
      Vue.ls.set(SET_THEME, theme);
    },
    [SET_PRIMARY_COLOR]: (state, color) => {
      state.primaryColor = color;
      Vue.ls.set(SET_PRIMARY_COLOR, color);
    },
    [SET_CONTENT_WIDTH]: (state, type) => {
      state.contentWidth = type;
      Vue.ls.set(SET_CONTENT_WIDTH, type);
    },
    [TOGGLE_FIXED_HEADER]: (state, mode) => {
      state.fixedHeader = mode;
      Vue.ls.set(TOGGLE_FIXED_HEADER, mode);
    },
    [TOGGLE_FIX_SIDEBAR]: (state, mode) => {
      state.fixSidebar = mode;
      Vue.ls.set(TOGGLE_FIX_SIDEBAR, mode);
    },
    [TOGGLE_SIDE_COLLAPSED]: (state, mode) => {
      state.sideCollapsed = mode;
      Vue.ls.set(TOGGLE_SIDE_COLLAPSED, mode);
    },
    [TOGGLE_COLOR_WEAK]: (state, mode) => {
      state.colorWeak = mode;
      Vue.ls.set(TOGGLE_COLOR_WEAK, mode);
    },
    [TOGGLE_AUTO_HIDE_HEADER]: (state, mode) => {
      state.autoHideHeader = mode;
      Vue.ls.set(TOGGLE_AUTO_HIDE_HEADER, mode);
    },
    [TOGGLE_MULTI_TAB]: (state, mode) => {
      state.multiTab = mode;
      Vue.ls.set(TOGGLE_MULTI_TAB, mode);
    },
  },
};

export default app;
