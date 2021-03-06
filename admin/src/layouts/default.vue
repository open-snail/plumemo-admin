<template>
  <pro-layout
    id="layout-default"
    class="layout"
    :menus="menus"
    :collapsed="sideCollapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :i18nRender="i18nRender"
    v-bind="settings"
  >
    <!-- <template #menuHeaderRender>
      <div>
        <logo-svg />
        <h1>{{ title }}</h1>
      </div>
    </template> -->

    <template #headerContentRender>
      <breadcrumb style="padding: 0 12px; line-height: 64px" v-if="settings.layout !== 'topmenu' && !isMobile" />
    </template>

    <template #rightContentRender>
      <right-content
        :top-menu="settings.layout === 'topmenu'"
        :is-mobile="isMobile"
        :user="currentUser"
        :theme="settings.theme"
        :locale="$i18n.locale"
        :support-languages="supportLanguages"
        :i18nRender="i18nRender"
        @changeLocale="handleChangeLocale"
        @action="handleAction"
      />
    </template>
    <template #footerRender>
      <global-footer></global-footer>
    </template>
    <!-- <setting-drawer :settings="settings" @change="handleSettingChange" /> -->
    <nuxt class="content" />
  </pro-layout>
</template>

<script>
import ProLayout from '@ant-design-vue/pro-layout';
import { appMixin } from '@/mixins';
import { RightContent, Breadcrumb, GlobalFooter } from '@/components';
import { localeFuncs, settingsFuncs } from '@/includes/functions';
import config, { ContentWidth } from '@/config/proLayoutConfigs';

export default {
  name: 'DefaultLayout',
  mixins: [appMixin],
  components: {
    ProLayout,
    // SettingDrawer,
    RightContent,
    Breadcrumb,
    GlobalFooter,
  },
  data() {
    return {
      menus: [], //菜单
      currentUser: this.$store.state.user, // 当前用户信息
      supportLanguages: localeFuncs.getSupportLanguages(), // 语言支持列表
      query: {}, // 媒体查询
      isMobile: false, // 是否手机模式
    };
  },
  computed: {
    //pro-layout 配置
    settings() {
      return {
        title: config.settings.title, // 标题
        logo: config.settings.logo, // Logo
        layout: this.layout,
        theme: this.theme,
        primaryColor: this.primaryColor,
        contentWidth: this.layout === 'sidemenu' ? ContentWidth.Fluid : this.contentWidth,
        fixedHeader: this.fixedHeader,
        fixSiderbar: this.fixSiderbar,
        colorWeak: this.colorWeak,
        hideHintAlert: true,
        hideCopyButton: true,
      };
    },
  },
  created() {
    const routerReslove = this.$router.resolve.bind(this.$router);
    this.menus = (function formatMenus(menus) {
      return menus.map(({ name, title, icon, children }) => ({
        name,
        path: routerReslove({ name }).href,
        meta: { title, icon },
        children: children && children.length ? formatMenus(children) : null,
      }));
    })(settingsFuncs.getSiderMenus());
  },
  mounted() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.setSideCollapsed(!this.sideCollapsed);
        setTimeout(() => {
          this.setSideCollapsed(!this.sideCollapsed);
        }, 16);
      });
    }

    // first update color
    // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
    if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
      // updateTheme(this.settings.primaryColor);
    }

    //setting-drawer theme options
    if (!window.umi_plugin_ant_themeVar) {
      // @ts-ignore
      window.umi_plugin_ant_themeVar = config.themeVar;
    }

  },
  methods: {
    i18nRender(key) {
      return this.$i18n.tv(key, key);
    },
    handleChangeLocale(locale) {
      this.$i18n.locale = locale;
    },
    handleMediaQuery(val) {
      this.query = val;
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false;
        return;
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true;
        this.setSideCollapsed(false);
        this.setContentWidth(ContentWidth.Fluid);
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse(val) {
      this.setSideCollapsed(val);
    },
    // handleSettingChange({ type, value }) {
    //   type && (this.settings[type] = value);
    //   switch (type) {
    //     case 'contentWidth':
    //       this.settings[type] = value;
    //       break;
    //     case 'layout':
    //       if (value === 'sidemenu') {
    //         this.settings.contentWidth = CONTENT_WIDTH.Fluid;
    //       } else {
    //         this.settings.fixSiderbar = false;
    //         this.settings.contentWidth = CONTENT_WIDTH.Fixed;
    //       }
    //       break;
    //   }
    // },

    handleAction(key) {
      if (key === 'center') {
        this.$router.push({ name: 'account-user' });
      } else if (key === 'settings') {
        this.$router.push({ name: 'account-settings' });
      } else if (key === 'logout') {
        this.$store.dispatch('user/logout').then(() => {
          this.$router.push({ name: 'login' });
        });
      }
    },
  },
};
</script>

<style lang="less">
.ant-pro-basicLayout {
  .ant-pro-global-header-trigger {
    padding: 0 12px;
  }

  .ant-pro-global-header-index-right {
    margin-right: 12px;

    &.ant-pro-global-header-index-dark {
      .ant-pro-global-header-index-action {
        color: hsla(0, 0%, 100%, 0.85);

        &:hover {
          background: #1890ff;
        }
      }
    }

    .ant-pro-account-avatar {
      .antd-pro-global-header-index-avatar {
        margin: ~'calc((@{layout-header-height} - 24px) / 2)' 0;
        margin-right: 8px;
        color: @primary-color;
        vertical-align: top;
        background: rgba(255, 255, 255, 0.85);
      }
    }

    .menu {
      .anticon {
        margin-right: 8px;
      }

      .ant-dropdown-menu-item {
        min-width: 100px;
      }
    }
  }
}
</style>
