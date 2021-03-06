import Vue from 'vue';
import { mapState } from 'vuex';
import {
  SET_LAYOUT,
  SET_THEME,
  SET_PRIMARY_COLOR,
  SET_CONTENT_WIDTH,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIX_SIDEBAR,
  TOGGLE_COLOR_WEAK,
  TOGGLE_SIDE_COLLAPSED,
  Layout,
  Theme,
  ContentWidth,
} from '@/config/proLayoutConfigs';

// Types
import { AppState } from '@/store/modules/app';

export default Vue.extend({
  computed: {
    ...mapState<AppState, Dictionary<(state: AppState) => any>>('app', {
      layout: (state) => state.layout,
      theme: (state) => state.theme,
      primaryColor: (state) => state.primaryColor,
      fixedHeader: (state) => state.fixedHeader,
      fixSiderbar: (state) => state.fixSidebar,
      contentWidth: (state) => state.contentWidth,
      sideCollapsed: (state) => state.sideCollapsed,
      colorWeak: (state) => state.colorWeak,
      autoHideHeader: (state) => state.autoHideHeader,
      multiTab: (state) => state.multiTab,
    }),
  },
  methods: {
    isTopMenu() {
      return this.layoutMode === 'topmenu';
    },
    isSideMenu() {
      return !this.isTopMenu();
    },
    setLayout(val: Layout) {
      this.$store.commit(`app/${SET_LAYOUT}`, val);
    },
    setTheme(val: Theme) {
      this.$store.commit(`app/${SET_THEME}`, val);
    },
    setPrimaryColor(val: string) {
      this.$store.commit(`app/${SET_PRIMARY_COLOR}`, val);
    },
    setContentWidth(val: ContentWidth) {
      this.$store.commit(`app/${SET_CONTENT_WIDTH}`, val);
    },
    setFixedHeader(val: boolean) {
      this.$store.commit(`app/${TOGGLE_FIXED_HEADER}`, val);
    },
    setFixedSidebar(val: boolean) {
      this.$store.commit(`app/${TOGGLE_FIX_SIDEBAR}`, val);
    },
    setSideCollapsed(val: boolean) {
      this.$store.commit(`app/${TOGGLE_SIDE_COLLAPSED}`, val);
    },
    setColorWeak(val: boolean) {
      this.$store.commit(`app/${TOGGLE_COLOR_WEAK}`, val);
    },
  },
});
