<template>
  <div class="app-container">
    <a-card :bordered="false">
      <SearchForm ref="searchForm" @reloadData="reloadData"/>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="createHandler">新建</a-button>
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

        <span slot="content" slot-scope="text, record">
          <template>
            <avatar-list v-if="record.showType===1" size="large" ><avatar-list-item :tips="text" :src="text"/></avatar-list>
            <ellipsis v-if="record.showType!==1"  :length="10" tooltip>{{ text }}</ellipsis>
          </template>
        </span>

        <span slot="icon" slot-scope="text">
          <template>
            <avatar-list size="large" ><avatar-list-item :tips="text" :src="text"/></avatar-list>
          </template>
        </span>

        <span slot="showType" slot-scope="text">
          <template>
            <a v-if="text === 1">图片</a>
            <a v-if="text === 2">文本信息</a>
            <a v-if="text === 3">跳转链接</a>
          </template>
        </span>

        <span slot="isEnabled" slot-scope="text">
          <template>
            <a v-if="text === 0">否</a>
            <a v-if="text === 1">是</a>
          </template>
        </span>

        <span slot="isHome" slot-scope="text">
          <template>
            <a v-if="text === 0">否</a>
            <a v-if="text === 1">是</a>
          </template>
        </span>

        <span slot="remark" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>

        <span slot="createTime" slot-scope="text">
          {{ text | dayjs }}
        </span>

        <span slot="updateTime" slot-scope="text">
          {{ text | dayjs }}
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定删除这个社交信息？"
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
        ref="createSocialForm"
        @resetData="resetData"
        @refreshTable="refreshTable"
      />
    </a-card>
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import CreateForm from './modules/CreateForm'
import SearchForm from './modules/SearchForm'
import { filters, table } from './social-constants'
import AvatarList from '@/components/AvatarList'
import { fetchSocialList } from '@/api/social'
import { deleteSocial } from '../../api/social'
const AvatarListItem = AvatarList.AvatarItem
export default {
  name: 'SocialList',
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
        return fetchSocialList(Object.assign(parameter, this.queryParam)).then(res => {
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
      this.$refs.createSocialForm.resetForm()
    },
    handleEdit (record) {
      this.$refs.createSocialForm.handleEdit(record)
      this.formType = 'edit'
      this.visible = true
    },
    handleDelete (row) {
      deleteSocial(row.id).then(res => {
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
