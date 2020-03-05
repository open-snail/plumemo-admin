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
              title="确定删除这个菜单？"
              @confirm="handleDelete(record)"
              @cancel="cancel"
              okText="Yes"
              cancelText="No"
            >
              <a href="#">删除</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>
      <CreateForm
        :formType="formType"
        :visible="visible"
        ref="createMenuForm"
        @resetData="resetData"
        @refreshTable="refreshTable"
      />
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { table, filters } from './menu-constants'
import { fetchMenuList, deleteMenu } from '@/api/menu'
import CreateForm from './modules/CreateForm'
import SearchForm from './modules/SearchForm'
import AvatarList from '@/components/AvatarList'
const AvatarListItem = AvatarList.AvatarItem

export default {
  name: 'MenuList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    SearchForm,
    AvatarList,
    AvatarListItem
  },
  filters: filters,
  data () {
    return {
      queryParam: {},
      loadData: parameter => {
        return fetchMenuList(Object.assign(parameter, this.queryParam))
          .then(res => {
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
  created () { },
  beforeCreate () {},
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
    handleSub () {
      this.visible = true
    },
    createHandler () {
      this.formType = 'create'
      this.visible = true
      this.$refs.createMenuForm.resetForm()
    },
    handleEdit (record) {
      this.formType = 'edit'
      this.visible = true
      this.$refs.createMenuForm.handleEdit(record)
    },
    handleDelete (row) {
      deleteMenu(row.id).then(res => {
        this.$notification.success({
          message: '删除成功'
        })
        this.$refs.table.refresh()
      })
    },
    cancel () { },
    handleSelectChange (value) {
      // console.log(`Selected: ${value}`)
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
