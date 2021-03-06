<template>
  <a-card :bordered="false">
    <STable
      ref="table"
      size="small"
      rowKey="id"
      :scroll="{ x: 1300 }"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
      showPagination="auto"
    >
      <span slot="desc" slot-scope="text">{{ text }} <a-divider type="vertical" /> <a>查看详情</a></span>
      <template slot="actions" slot-scope="text, record">
        <a @click="start(record.pluginId)">启用</a>
        <a-divider type="vertical" />
        <a @click="stop(record.pluginId)">停用</a>
        <a-divider type="vertical" />
        <a @click="unload(record.pluginId)">卸载</a>
      </template>
    </STable>
  </a-card>
</template>

<script>
import { STable, Ellipsis } from '@/components';
import { pluginApi } from '@/includes/datas';
const columns = [
  {
    dataIndex: 'title',
    key: 'title',
    title: '插件',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '作者',
    dataIndex: 'provider',
    key: 'provider',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    scopedSlots: { customRender: 'desc' },
  },
  {
    title: '版本号',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: '操作',
    key: 'actions',
    scopedSlots: { customRender: 'actions' },
  },
];

export default {
  name: 'PluginsInstalled',
  components: {
    STable,
    Ellipsis,
  },
  data() {
    return {
      data: [],
      columns,
      queryParam: {},
      loadData: (parameter) => {
        parameter['pluginType'] = 2;
        return pluginApi.getInstalledPluginList(Object.assign(parameter, this.queryParam)).then((res) => {
          return res;
        });
      },
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = [];
          },
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange,
        },
      },
    };
  },
  created() {},
  methods: {
    start(pluginId) {
      pluginApi.startPlugin(pluginId).then((res) => {
        this.$refs.table.refresh();
      });
    },
    unload(pluginId) {
      pluginApi.unload(pluginId).then((res) => {
        this.$refs.table.refresh();
      });
    },
    stop(pluginId) {
      pluginApi.stopPlugin(pluginId).then((res) => {
        this.$refs.table.refresh();
      });
    },
  },
};
</script>
