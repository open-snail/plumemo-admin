<template>
  <div class="app-container">
    <a-card :bordered="false">
      <SearchForm ref="searchForm" @reloadData="reloadData"/>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :scroll="{ x: 1300 }"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
        showPagination="true"
      >
        <span slot="introduction" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>

        <span slot="role" slot-scope="text">
          <template>
            <a v-if="text === 1">用户</a>
            <a v-if="text === 2">管理员</a>
          </template>
        </span>

        <span slot="status" slot-scope="text">
          <template>
            <a v-if="text === 0">正常</a>
            <a v-if="text === 1">锁定</a>
          </template>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a v-if="record.status === 0 && record.roleId === 1" @click="handleEditStatus(record,1)">锁定</a>
            <a v-if="record.status === 1 && record.roleId === 1" @click="handleEditStatus(record,0)">解锁</a>
            <a-divider v-if="record.roleId === 1" type="vertical" />
            <a-popconfirm
              title="确定删除这个用户？"
              @confirm="handleDelete(record)"
              @cancel="cancel"
              okText="Yes"
              cancelText="No"
            >
              <a v-if="record.roleId === 1" href="#">删除</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { getUserList, updateStatus, deleteUser } from '@/api/user'
import { STable, Ellipsis } from '@/components'
import SearchForm from './modules/SearchForm'
import { filters, table } from './auth-constants'
export default {
  name: 'AuthList',
  components: {
    STable,
    Ellipsis,
    SearchForm
  },
  filters: filters,
  data () {
    return {
      queryParam: {},
      loadData: parameter => {
        return getUserList(Object.assign(parameter, this.queryParam)).then(res => {
          return res
        })
      },
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
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
  created () {},
  methods: {
    createHandler () {
      this.formType = 'create'
      this.visible = true
      this.$refs.createUserForm.resetForm()
    },
    handleEditStatus (record, status) {
      record.status = status
      updateStatus(record).then(res => {
        this.$notification.success({
          message: status ? '锁定成功' : '解锁成功'
        })
        this.$refs.table.refresh()
      })
    },
    handleDelete (record) {
      deleteUser(record.id).then(res => {
        this.$notification.success({
          message: '删除成功'
        })
        this.$refs.table.refresh()
      })
    },
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
    cancel () { }
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
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
