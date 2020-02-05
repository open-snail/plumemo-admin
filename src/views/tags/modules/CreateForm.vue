<template>
  <div>
    <a-drawer
      :title="title"
      placement="right"
      :closable="true"
      @close="onClose"
      :visible="drawerVisible"
      :width="950">
      <a-form @submit="handleSubmit" :form="tagsForm" class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="标签名称">
              <a-input
                placeholder="请输入标签名称"
                v-decorator="['name', { rules: [{ required: true, message: '请输入标签名称', whitespace: true }] }]"
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
import { createTags, fetchTags, updateTags } from '@/api/tags'
export default {
  name: 'CreateCategoryForm',
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
      title: '新增标签',
      id: null,
      drawerVisible: false,
      tagsForm: this.$form.createForm(this, { name: 'create_tags' })
    }
  },
  watch: {
    visible (val) {
      this.drawerVisible = val
    },
    formType (val) {
      this.title = (val === 'create' ? '新增标签' : '更新标签')
    }
  },
  beforeCreate () { },
  created () { },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.tagsForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const createParams = { ...values }
          if (this.formType === 'create') {
            createTags(createParams)
              .then(res => {
                this.$notification.success({
                  message: '新增标签成功'
                })
                this.$emit('refreshTable')
              })
              .catch(err => {
                console.log(err)
                this.$notification.success({
                  message: '新增标签失败'
                })
              })
          } else {
            createParams['id'] = this.id
            updateTags(createParams)
              .then(res => {
                this.$notification.success({
                  message: '编辑标签成功'
                })
                this.$emit('refreshTable')
              })
              .catch(err => {
                console.log(err)
                this.$notification.success({
                  message: '编辑标签失败'
                })
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
      fetchTags(record.id)
        .then(response => {
          const postForm = response.model
          this.tagsForm = this.$form.createForm(this, {
            onFieldsChange: (_, changedFields) => {},
            mapPropsToFields: () => {
              return {
                name: this.$form.createFormField({
                  value: postForm.name
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
      this.tagsForm.resetFields()
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
