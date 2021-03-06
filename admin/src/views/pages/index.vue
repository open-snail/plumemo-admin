<template>
  <a-card :bordered="false">
    <SearchForm ref="searchForm" @search="handleSearch" />
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
      <template #titles="text">
        <ellipsis :length="15" tooltip>{{ text }}</ellipsis>
      </template>
      <template #summary="text">
        <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
      </template>
      <template #status="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter($i18n.tv.bind($i18n))" />
      </template>
      <template #createTime="text">
        {{ text | dateFormat }}
      </template>
      <template slot="actions" slot-scope="text, record">
        <a :title="$tv('page.btnTips.edit')" @click="handleEdit(record)">{{ $tv('page.btnText.edit', 'Edit') }}</a>
        <a-divider type="vertical" />
        <a v-if="record.status === 1" :title="$tv('page.btnTips.publish')" @click="handleModifyStatus(record, 2)">{{
          $tv('page.btnText.publish', 'Publish')
        }}</a>
        <a
          v-else-if="record.status === 2"
          :title="$tv('page.btnTips.moveToDraft')"
          @click="handleModifyStatus(record, 1)"
          >{{ $tv('page.btnText.moveToDraft', 'Move to Draft') }}</a
        >
        <a-divider type="vertical" />
        <a-popconfirm
          :title="$tv('page.dialog.delete.content', 'Do you really want to delete this page?')"
          :okText="$tv('page.dialog.delete.okBtn', 'Ok')"
          :cancelText="$tv('page.dialog.delete.cancelBtn', 'No')"
          @confirm="handleDelete(record)"
        >
          <a href="#none" :title="$tv('page.btnTips.delete')">{{ $tv('page.btnText.delete', 'Delete') }}</a>
        </a-popconfirm>
      </template>
    </STable>
  </a-card>
</template>

<router>
{
  prop:true,
  meta:{
    title: 'All Pages',
    keepAlive: true,
  }
}
</router>

<script>
import { STable, Ellipsis } from '@/components';
import SearchForm from './modules/SearchForm';
import { pageApi } from '@/includes/datas';
import { filters, table } from './constants';

export default {
  name: 'PageIndex',
  components: {
    STable,
    Ellipsis,
    SearchForm,
  },
  filters: filters,
  props: {
    refresh: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      queryParam: {},
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
      columns: table().columns,
    };
  },
  methods: {
    loadData(parameter) {
      return pageApi.getList(Object.assign(parameter, this.queryParam));
    },
    refreshTable() {
      this.$refs.table.refresh();
    },
    onSelectChange() {
      console.log(arguments);
    },
    handleCreate() {
      this.$router.push({ name: 'pages-create' });
    },
    handleEdit(row) {
      this.$router.push({ name: 'pages-edit', params: { id: row.id } });
    },
    handleSearch(queryParam) {
      this.queryParam = queryParam;
      this.refreshTable();
    },
    handleModifyStatus(row, status) {
      pageApi
        .updateStatus(row.id, status)
        .then(() => {
          this.$notification.success({
            message: '更新状态成功',
          });
          this.$refs.table.refresh();
        })
        .catch(() => {
          this.$notification.error({
            message: '更新失败，请稍后重试',
          });
        });
    },
    handleDelete(row) {
      pageApi
        .delete(row.id)
        .then(() => {
          this.$notification.success({
            message: '删除成功',
          });
          this.$refs.table.refresh();
        })
        .catch(() => {
          this.$notification.error({
            message: '删除失败，请稍后重试',
          });
        });
    },
  },
};
</script>
