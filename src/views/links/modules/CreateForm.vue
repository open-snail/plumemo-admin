<template>
  <div>
    <a-drawer
      :title="title"
      placement="right"
      :closable="true"
      @close="onClose"
      :visible="drawerVisible"
      :width="950">
      <a-form @submit="handleSubmit" :form="linksForm" class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="友链名称">
              <a-input
                placeholder="请输入友链名称"
                v-decorator="['name', { rules: [{ required: true, message: '请输入友链名称', whitespace: true }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="友链标题">
              <a-input
                placeholder="请输入友链标题"
                v-decorator="['title', { rules: [{ required: true, message: '请输入友链标题', whitespace: true }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="友链Logo">
              <UpLoadImage
                v-model="this.logo"
                @getImageUrl="getLogo"
                :placeholder="`请选择图标`"
                ref="handlerLogoRef"
                :imageUrl="this.logo"
              ></UpLoadImage>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="友链地址">
              <a-input
                placeholder="请输入友链地址"
                v-decorator="['href', { rules: [{ required: true, message: '请输入友链地址', whitespace: true }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="友链排序">
              <a-input
                placeholder="友链排序"
                v-decorator="['sort']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="网站简介">
              <a-input
                placeholder="请输入网站简介"
                v-decorator="['description', { rules: [{ required: true, message: '请输入网站简介', whitespace: true }] }]"
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
import { createLink, fetchLink, updateLink } from '@/api/link'
import UpLoadImage from '@/components/UpLoadImageAndFillInput/UpLoadImage'

export default {
  name: 'CreateLinksForm',
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
      title: '新增友链',
      id: null,
      logo: null,
      drawerVisible: false,
      linksForm: this.$form.createForm(this, { name: 'create_links' })
    }
  },
  watch: {
    visible (val) {
      this.drawerVisible = val
    },
    formType (val) {
      this.title = (val === 'create' ? '新增友链' : '更新友链')
    }
  },
  beforeCreate () { },
  created () { },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.linksForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const createParams = { ...values }
          createParams['logo'] = this.logo
          if (this.formType === 'create') {
            createLink(createParams)
              .then(res => {
                this.$notification.success({
                  message: '新增友链成功'
                })
                this.$emit('refreshTable')
              })
              .catch(err => {
                console.log(err)
                this.$notification.success({
                  message: '新增友链失败'
                })
              })
          } else {
            createParams['id'] = this.id
            updateLink(createParams)
              .then(res => {
                this.$notification.success({
                  message: '编辑友链成功'
                })
                this.$emit('refreshTable')
              })
              .catch(err => {
                console.log(err)
                this.$notification.success({
                  message: '编辑友链失败'
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
      fetchLink(record.id)
        .then(response => {
          const postForm = response.model
          this.$refs.handlerLogoRef.handleUrl(postForm.logo)
          this.linksForm.resetFields()
          this.linksForm = this.$form.createForm(this, {
            onFieldsChange: (_, changedFields) => {},
            mapPropsToFields: () => {
              return {
                name: this.$form.createFormField({
                  value: postForm.name
                }),
                title: this.$form.createFormField({
                  value: postForm.title
                }),
                href: this.$form.createFormField({
                  value: postForm.href
                }),
                logo: this.$form.createFormField({
                  value: postForm.logo
                }),
                description: this.$form.createFormField({
                  value: postForm.description
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
      this.linksForm.resetFields()
      this.$refs.handlerLogoRef.handleUrl(null)
    },
    getLogo (logo) {
      this.logo = logo
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
