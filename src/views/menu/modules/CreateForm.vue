<template>
  <div>
    <a-drawer
      :title="title"
      placement="right"
      :closable="true"
      @close="onClose"
      :visible="drawerVisible"
      :width="950">
      <a-form @submit="handleSubmit" :form="menuForm" class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="菜单名称">
              <a-input
                placeholder="请输入菜单名称"
                v-decorator="['title', { rules: [{ required: true, message: '请输入菜单名称', whitespace: true }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="菜单icon">
              <UpLoadImage
                v-model="this.icon"
                @getImageUrl="getIcon"
                :placeholder="`请选择图标`"
                ref="handlerIconRef"
                :imageUrl="this.icon"
              ></UpLoadImage>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="跳转链接">
              <a-input
                placeholder="请输入跳转链接"
                v-decorator="['url', { rules: [{ required: true, message: '请输入跳转链接', whitespace: true }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="12" :md="6" :sm="12">
            <a-form-item label="排序">
              <a-input
                placeholder="请输入排序"
                v-decorator="['sort']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="12" :md="6" :sm="12">
            <a-form-item label="父菜单id">
              <a-input
                placeholder="请输入父菜单id"
                v-decorator="['parentId']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <div
          :style="{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: '10'
          }"
        >
          <a-button :style="{marginRight: '8px'}" @click="onClose">取消</a-button>
          <a-button type="primary" @click="handleSubmit">提交</a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
import { createMenu, fetchMenu, updateMenu } from '../../../api/menu'
import UpLoadImage from '@/components/UpLoadImageAndFillInput/UpLoadImage'

export default {
  name: 'CreateMenuForm',
  components: {
    UpLoadImage
  },
  props: {
    formType: {
      type: String,
      default: 'create'
    },
    visible: {
      type: Boolean
    }
  },
  data () {
    return {
      title: '新增菜单',
      id: null,
      drawerVisible: false,
      icon: null,
      menuForm: this.$form.createForm(this, { name: 'create_menu' })
    }
  },
  watch: {
    visible (val) {
      this.drawerVisible = val
    },
    formType (val) {
      this.title = (val === 'create' ? '新增菜单' : '更新菜单')
    }
  },
  beforeCreate () { },
  created () { },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.menuForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const createParams = { ...values }
          createParams['icon'] = this.icon
          if (this.formType === 'create') {
            createMenu(createParams)
              .then(res => {
                this.$notification.success({
                  message: '新增菜单成功'
                })
                this.$emit('refreshTable')
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            createParams['id'] = this.id
            updateMenu(createParams)
              .then(res => {
                this.$notification.success({
                  message: '编辑菜单成功'
                })
                this.$emit('refreshTable')
              })
              .catch(err => {
                console.log(err)
              })
          }
          this.resetForm()
          this.drawerVisible = false
          this.$emit('resetData', false)
        }
      })
    },
    handleEdit (record) {
      this.id = record.id
      fetchMenu(record.id)
        .then(response => {
          const postForm = response.model
          this.$refs.handlerIconRef.handleUrl(postForm.icon)
          this.menuForm.resetFields()
          this.menuForm = this.$form.createForm(this, {
            onFieldsChange: (_, changedFields) => {},
            mapPropsToFields: () => {
              return {
                parentId: this.$form.createFormField({
                  value: postForm.parentId
                }),
                title: this.$form.createFormField({
                  value: postForm.title
                }),
                icon: this.$form.createFormField({
                  value: postForm.icon
                }),
                url: this.$form.createFormField({
                  value: postForm.url
                }),
                sort: this.$form.createFormField({
                  value: postForm.sort
                })
              }
            },
            onValuesChange: (_, values) => {
              console.log(values)
            }
          })
        })
        .catch(err => {
          console.log(err)
        })

      this.drawerVisible = true
    },
    onClose () {
      this.resetForm()
      this.drawerVisible = false
      this.$emit('resetData', false)
    },
    resetForm () {
      this.menuForm.resetFields()
    },
    getIcon (icon) {
      this.icon = icon
    },
    handleSelectChange (value) {
      console.log(`Selected: ${value}`)
    }
  }
}
</script>
<style>
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
