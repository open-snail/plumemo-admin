<template>
  <div :class="wrpCls">
    <avatar-dropdown :user="user" :class="prefixCls" :i18nRender="i18nRender" @action="(key) => $emit('action', key)" />
    <select-lang-dropdown
      :locale="locale"
      :supportLanguages="supportLanguages"
      :class="prefixCls"
      @change="(locale) => $emit('changeLocale', locale)"
      v-if="supportLanguages.length"
    />
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown';
import SelectLangDropdown from './SelectLangDropdown';

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLangDropdown,
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action',
    },
    isMobile: {
      type: Boolean,
      default: () => false,
    },
    topMenu: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      default: () => null,
    },
    theme: {
      type: String,
      required: true,
    },
    locale: {
      type: String,
      default: () => null,
    },
    supportLanguages: {
      type: Array,
      default: () => [],
    },
    i18nRender: {
      type: Function,
      default: () => null,
    },
  },
  computed: {
    wrpCls() {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${this.isMobile || !this.topMenu ? 'light' : this.theme}`]: true,
      };
    },
  },
};
</script>
