<template>
  <div class="app-container">
    <a-card :bordered="false">
      <SearchForm ref="searchForm" @reloadData="reloadData"/>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="createHandler">新建</a-button>
        <a-button type="primary" icon="import" @click="importHandler">导入</a-button>
      </div>
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
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="syncStatus" slot-scope="text">
          <a-badge :status="text | syncStatusTypeFilter" :text="text | syncStatusFilter" />
        </span>
        <span slot="summary" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="createTime" slot-scope="text">
          {{ text | dayjs }}
        </span>
        <span slot="titles" slot-scope="text">
          <ellipsis :length="15" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleSync(record)">同步</a>
            <a-divider type="vertical" />
            <a v-if="record.status === 1" @click="handleModifyStatus(record,2)">发布</a>
            <a v-if="record.status === 2" @click="handleModifyStatus(record,1)">草稿箱</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定删除这篇文章？"
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

      <CreateArticleForm
        :formType="formType"
        :visible="visible"
        ref="createArticleForm"
        @resetData="resetData"
        @refreshTable="refreshTable"
      />

      <ImportFormForm
        @refreshTable="refreshTable"
        ref="importFormFormForm"
      />
    </a-card>
  </div>
</template>

<script>
import { fetchList, updateArticleStatus, deletePosts, publishByteBlogs } from '@/api/article'
import { STable, Ellipsis } from '@/components'
import CreateArticleForm from './modules/CreateForm'
import ImportFormForm from './modules/ImportForm'
import SearchForm from './modules/SearchForm'
import { filters, table } from './article-constants'
export default {
  name: 'ArticleList',
  components: {
    STable,
    Ellipsis,
    CreateArticleForm,
    SearchForm,
    ImportFormForm
  },
  filters: filters,
  data () {
    return {
      queryParam: {},
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return fetchList(Object.assign(parameter, this.queryParam)).then(res => {
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
      this.$refs.createArticleForm.resetForm()
    },
    handleEdit (record) {
      this.$refs.createArticleForm.handleEdit(record)
      this.formType = 'edit'
      this.visible = true
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
    handleModifyStatus (record, status) {
      updateArticleStatus({
        id: record.id,
        status: status
      }).then(res => {
        this.$notification.success({
          message: '更新状态成功'
        })
        this.$refs.table.refresh()
      })
    },
    handleSync (record) {
      publishByteBlogs({ id: record.id }).then(res => {
        const { success } = res
        if (success === 1) {
          this.$notification.success({
            message: '同步成功',
            description:
              '已存入ByteBlogs草稿箱,您可以去ByteBlogs进行发布'
          })
          this.$refs.table.refresh()
        }
      })
    },
    handleDelete (row) {
      deletePosts(row.id).then(res => {
        this.$notification.success({
          message: '删除成功'
        })
        this.$refs.table.refresh()
      })
    },
    cancel () {
    },
    goByteBlogsEdit () {
      window.open('https://www.byteblogs.com/editor/posts', '_blank')
    },
    draftForm () {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 1
    },
    importHandler () {
      this.$refs.importFormFormForm.showDrawerVisible(true)
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
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
