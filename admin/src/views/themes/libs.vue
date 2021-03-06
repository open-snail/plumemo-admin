<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-input-search placeholder="搜索已安装主题" style="width: 300px" slot="tabBarExtraContent" @search="onSearch" />
      <a-button type="primary" icon="plus" @click="addThemes">添加主题</a-button>
    </div>
    <div class="ant-pro-pages-account-projects-cardList">
      <a-list :loading="loading" :data-source="rows" :grid="{ gutter: 24, xxl: 4, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card class="ant-pro-pages-account-projects-card" hoverable>
            <img
              slot="cover"
              src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png"
              :alt="item.title"
              style="height: 250px"
            />
            <a-card-meta :title="item.title">
              <template slot="description">
                <ellipsis :length="50">{{ item.description }}</ellipsis>
              </template>
            </a-card-meta>
            <div class="cardItemContent">
              <span>{{ item.updateAt | timeFromNow }}</span>
              <span v-if="item.status === 'ENABLE'"> 已启用 </span>
              <span v-else>
                <a-popconfirm title="确认启用此主题吗?" @confirm="confirm(item)" okText="启用" cancelText="取消">
                  启用
                </a-popconfirm>
              </span>
              <div class="avatarList">
                <a-tooltip v-if="item.provider !== ''">
                  <template slot="title">{{ item.provider }}</template>
                  <a-avatar :src="item.avatar" />
                </a-tooltip>
              </div>
            </div>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </a-card>
</template>

<router>
{
  meta:{
    title: 'Theme Libs',
  }
}
</router>

<script>
import { pluginApi } from '@/includes/datas';
import { Ellipsis } from '@/components';
export default {
  name: 'ThemeLibs',
  data() {
    return {
      visible: false,
      rows: [],
      loading: false,
    };
  },
  components: {
    Ellipsis,
  },
  created() {
    this.getList();
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    handleOk() {
      this.visible = true;
    },
    getList(keyword) {
      this.loading = true;
      pluginApi.getInstalledPluginList({ pluginType: 1, keyword: keyword }).then((res) => {
        console.log(res);
        this.rows = res.rows;
        this.loading = false;
      });
    },
    downloadPlugin(pluginId) {
      this.loading = true;
      pluginApi.startPlugin(pluginId).then((res) => {
        const { success } = res;
        if (success === 1) {
          this.$notification.success({
            message: '主题启用成功',
          });
        }
        this.loading = false;
      });
    },
    onSearch(keyword) {
      this.getList(keyword);
    },
    addThemes() {
      this.$router.push('/themes/featured');
    },
  },
};
</script>

<style lang="less" scoped>
.ant-pro-pages-account-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0, 0, 0, 0.45);
      font-size: medium;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
</style>
