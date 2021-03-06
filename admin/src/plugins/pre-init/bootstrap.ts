import Vue from 'vue';
import { store } from '@/store';
import config, {
  SET_LAYOUT,
  SET_THEME,
  SET_PRIMARY_COLOR,
  SET_CONTENT_WIDTH,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIX_SIDEBAR,
  TOGGLE_SIDE_COLLAPSED,
  TOGGLE_COLOR_WEAK,
  TOGGLE_AUTO_HIDE_HEADER,
  TOGGLE_MULTI_TAB,
} from '@/config/proLayoutConfigs';

export default function Initializer() {
  store.commit(`app/${SET_LAYOUT}`, Vue.ls.get(SET_LAYOUT, config.settings.layout));
  store.commit(`app/${SET_THEME}`, Vue.ls.get(SET_THEME, config.settings.theme));
  store.commit(`app/${SET_PRIMARY_COLOR}`, Vue.ls.get(SET_PRIMARY_COLOR, config.settings.primaryColor));
  store.commit(`app/${SET_CONTENT_WIDTH}`, Vue.ls.get(SET_CONTENT_WIDTH, config.settings.contentWidth));
  store.commit(`app/${TOGGLE_FIXED_HEADER}`, Vue.ls.get(TOGGLE_FIXED_HEADER, config.settings.fixedHeader));
  store.commit(`app/${TOGGLE_FIX_SIDEBAR}`, Vue.ls.get(TOGGLE_FIX_SIDEBAR, config.settings.fixSiderbar));
  store.commit(`app/${TOGGLE_SIDE_COLLAPSED}`, Vue.ls.get(TOGGLE_SIDE_COLLAPSED, config.settings.sideCollapsed));
  store.commit(`app/${TOGGLE_COLOR_WEAK}`, Vue.ls.get(TOGGLE_COLOR_WEAK, config.settings.colorWeak));
  store.commit(`app/${TOGGLE_AUTO_HIDE_HEADER}`, Vue.ls.get(TOGGLE_AUTO_HIDE_HEADER, config.settings.autoHideHeader));
  store.commit(`app/${TOGGLE_MULTI_TAB}`, Vue.ls.get(TOGGLE_MULTI_TAB, config.settings.multiTab));

  // store.dispatch('setLang', Vue.ls.get(APP_LANGUAGE, 'en-US'))
  // last step
}
