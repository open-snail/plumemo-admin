<template>
  <a-dropdown v-if="user && user.name" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar
        size="small"
        :src="user.avatar || 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'"
        class="antd-pro-global-header-index-avatar"
      />
      <span>{{ user.name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <template v-if="showMenu">
          <a-menu-item key="center" @click="handleAction('center')">
            <a-icon type="user" />
            {{ $tv('avatarDropdown.user.center', 'User Center') }}
          </a-menu-item>
          <a-menu-item key="settings" @click="handleAction('settings')">
            <a-icon type="setting" />
            {{ $tv('avatarDropdown.user.settings', 'Settings') }}
          </a-menu-item>
          <a-menu-divider />
        </template>
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          {{ $tv('avatarDropdown.user.logout', 'Logout') }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue';

export default {
  name: 'AvatarDropdown',
  props: {
    user: {
      type: Object,
      default: () => null,
    },
    showMenu: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleAction(key) {
      this.$emit('action', key);
    },
    handleLogout() {
      Modal.confirm({
        title: this.$tv('avatarDropdown.dialog.logout.title', 'Message'),
        content: this.$tv('avatarDropdown.dialog.logout.content', 'Do you really log-out?'),
        onOk: () => {
          this.handleAction('logout');
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
