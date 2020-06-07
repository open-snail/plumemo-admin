<template>
  <div class="app-container">
    <a-card :bordered="false">
      <SearchForm ref="SearchForm" @reloadData="reloadData"/>
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

        <span slot="content" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="postTitle" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="parentUserName" slot-scope="text">
         {{ text === undefined ? '无': text }}
        </span>

        <!--   添加操作     -->
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">回复</a>

            <a-divider type="vertical" />

            <a-popconfirm
              title="确定删除这条评论？"
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
        ref="createCommentForm"
        @resetData="resetData"
        @refreshTable="refreshTable"
      />
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { table, filters } from './comment-constants'
import CreateForm from './modules/CreateForm'
import { fetchCommentLists, deleteComment } from '@/api/comment'
import SearchForm from './modules/SearchForm'

export default {
  name: 'CommentList',
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
        return fetchCommentLists(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res
          })
      },
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.handleSelectChange
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
      this.$refs.createCommentForm.resetForm()
    },
    handleEdit (record) {
      this.$refs.createCommentForm.handleEdit(record)
      this.formType = 'edit'
      this.visible = true
    },
    handleSub () {
      this.visible = true
    },
    handleDelete (row) {
      deleteComment(row.id).then(res => {
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
