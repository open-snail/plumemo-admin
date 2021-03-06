<template>
  <a-card :bordered="false">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="热门">
        <div class="ant-pro-pages-account-projects-cardList">
          <a-list
            :loading="loading"
            :data-source="rows"
            :grid="{ gutter: 24, xxl: 4, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }"
          >
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
                  <span>{{ item.updateTime | timeFromNow }}</span>
                  <span v-if="item.status"> 已安装 </span>
                  <span v-else>
                    <a-popconfirm
                      title="确认安装此主题吗?"
                      @confirm="downloadPlugin(item.pluginId)"
                      okText="安装"
                      cancelText="取消"
                    >
                      安装
                    </a-popconfirm>
                  </span>
                  <div class="avatarList">
                    <a-tooltip>
                      <template slot="title">{{ item.userName }}</template>
                      <a-avatar :src="item.avatar" />
                    </a-tooltip>
                  </div>
                </div>
              </a-card>
            </a-list-item>
          </a-list>
        </div>
      </a-tab-pane>
      <a-input-search placeholder="搜索主题" style="width: 300px" slot="tabBarExtraContent" @search="onSearch" />
    </a-tabs>
  </a-card>
</template>

<router>
{
  meta:{
    title: 'Featured',
  }
}
</router>

<script>
import { pluginApi } from '@/includes/datas';
import { Ellipsis } from '@/components';
export default {
  name: 'Featured',
  data() {
    return {
      visible: false,
      rows: [],
      installeds: [],
      loading: false,
    };
  },
  components: {
    Ellipsis,
  },
  created() {
    this.getInstalledPluginList();
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
      pluginApi.getList({ pluginType: 1, keyword: keyword }).then((res) => {
        const { rows } = res;

        rows.forEach((item, index, arr) => {
          if (this.installeds.indexOf(item.pluginId) !== -1) {
            item['status'] = true;
          } else {
            item['status'] = false;
          }
        });

        this.rows = rows;
        this.loading = false;
      });
    },
    downloadPlugin(pluginId) {
      this.loading = true;
      pluginApi.downloadPlugin(pluginId).then((res) => {
        const { success } = res;
        if (success === 1) {
          this.$notification.success({
            message: '主题安装成功',
          });
        }
        this.loading = false;
      });
    },
    onSearch(keyword) {
      this.getList(keyword);
    },
    getInstalledPluginList() {
      pluginApi.getPluginIdList().then((rows) => {
        this.installeds = rows
        this.loading = false;
      });
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
