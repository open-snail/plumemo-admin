<template>
  <div class="app-container">
    <a-card :bordered="false">
      <SearchForm ref="SearchForm" @reloadData="reloadData"/>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="createHandler">新建</a-button>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
        showPagination="true"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定删除这条分类？"
              @confirm="handleDelete(record)"
              @cancel="cancel"
              okText="Yes"
              cancelText="No"
            >
              <a href="#">删除</a>
            </a-popconfirm>
          </template>
        </span>
        <span slot="tagsList" slot-scope="record">
          <a-tag color="#2db7f5" v-for="item in record" :key="item.id">{{ item.name }}</a-tag>
        </span>
      </s-table>
      <CreateForm
        :formType="formType"
        :visible="visible"
        ref="createCategoryForm"
        @resetData="resetData"
        @refreshTable="refreshTable"
      />
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { table, filters } from './category-constants'
import CreateForm from './modules/CreateForm'
import { fetchCategoryList, deleteCategory } from '@/api/category'
import SearchForm from './modules/SearchForm'

export default {
  name: 'CategoryList',
  components: {
    CreateForm,
    STable,
    Ellipsis,
    SearchForm
  },
  filters: filters,
  data () {
    return {
      queryParam: {},
      loadData: parameter => {
        return fetchCategoryList(Object.assign(parameter, this.queryParam))
          .then(res => {
            console.log(res)
            return res
          })
      },
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      columns: table.columns,
      visible: false,
      formType: 'create'
    }
  },
  methods: {
    resetData (flag) {
      this.visible = flag
      this.record = null
    },
    refreshTable () {
      this.$refs.table.refresh()
    },
    reloadData (queryParam) {
      this.queryParam = queryParam
      this.refreshTable()
    },
    createHandler () {
      this.formType = 'create'
      this.visible = true
      this.$refs.createCategoryForm.resetForm()
    },
    handleEdit (record) {
      this.$refs.createCategoryForm.handleEdit(record)
      this.formType = 'edit'
      this.visible = true
    },
    handleSub () {
      this.visible = true
    },
    handleDelete (row) {
      deleteCategory(row.id).then(res => {
        this.$notification.success({
          message: '删除成功'
        })
        this.$refs.table.refresh()
      })
    },
    cancel () {},
    handleSelectChange (value) {
      console.log(`Selected: ${value}`)
    }
  }
}
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
