<template>
  <a-card :bordered="false">
    <a-spin :spinning="loading">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="全部">
          <a-row :gutter="18" v-if="rows.length > 0">
            <a-col :xs="8" :sm="4" :md="6" :lg="8" :xl="8" v-for="(item, index) in rows" :key="index">
              <a-card hoverable>
                <a-row type="flex" justify="space-between">
                  <a-col :span="5" style="margin: auto 0px">
                    <img :src="item.avatar" :alt="item.title" width="94px" height="94px" />
                  </a-col>
                  <a-col :span="13">
                    <p>{{ item.title }}</p>
                    <p>{{ item.description }}</p>
                    <p>作者: {{ item.userName }}</p>
                  </a-col>
                  <a-col :span="4">
                    <a-button type="primary" @click="downloadPlugin(item.pluginId)" :disabled="item.status">
                      {{ item.status ? '已安装' : '现在安装' }}
                    </a-button>
                  </a-col>
                </a-row>
                <a-divider />
                <a-row>
                  <a-col :span="12">
                    <a-statistic title="安装" :value="item.download">
                      <template #suffix>
                         次
                      </template>
                    </a-statistic>
                  </a-col>
                  <a-col :span="12" style="text-align: right">
                    <span>最后更新: {{ item.updateTime | timeFromNow }}</span>
                    <p>兼容当前版本</p>
                  </a-col>
                </a-row>
              </a-card>
            </a-col>
          </a-row>
          <a-empty v-else />
        </a-tab-pane>
        <a-tab-pane key="2" tab="热门" force-render><a-empty /> </a-tab-pane>
        <a-tab-pane key="3" tab="推荐"><a-empty /> </a-tab-pane>
        <a-tab-pane key="4" tab="收藏"> <a-empty /> </a-tab-pane>
        <a-input-search placeholder="搜索插件" style="width: 300px" slot="tabBarExtraContent" @search="onSearch" />
      </a-tabs>
    </a-spin>
  </a-card>
</template>

<script>
import { pluginApi } from '@/includes/datas';
export default {
  name: 'PluginIndex',
  data() {
    return {
      visible: false,
      rows: [],
      installeds: [],
      loading: false,
    };
  },
  created() {
    this.getPluginIdList();
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
      pluginApi.getList({ pluginType: 2, keyword: keyword }).then((res) => {
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
            message: '插件安装成功',
          });
        }

        this.loading = false;
      });
    },
    onSearch(keyword) {
      this.getList(keyword);
    },
    getPluginIdList() {
      pluginApi.getPluginIdList().then((rows) => {
        this.installeds = rows;
        this.loading = false;
      });
    },
  },
};
</script>
