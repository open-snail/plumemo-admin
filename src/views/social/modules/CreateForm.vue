<template>
  <div>
    <a-drawer
      :title="title"
      placement="right"
      :closable="true"
      @close="onClose"
      :visible="drawerVisible"
      :width="950">
      <a-form @submit="handleSubmit" :form="socialFrom" class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="code">
              <a-input
                placeholder="code"
                v-decorator="['code', { rules: [{ required: true, message: '请输入code', whitespace: true }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="社交账户">
              <a-input
                placeholder="请输入社交账户"
                v-decorator="['account']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="icon">
              <UpLoadImage @getImageUrl="getIconUrl" ref="handlerIconRef" :placeholder="`请输入icon`"></UpLoadImage>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16" v-if="show">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="二维码">
              <UpLoadImage @getImageUrl="getQrCodeUrl" ref="handlerQrCodeRef" :placeholder="`请输入二维码`"></UpLoadImage>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="跳转链接">
              <a-input
                placeholder="请输入跳转链接,eg:tencent://message/?uin=123456;https://;"
                v-decorator="['url']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="备注">
              <a-input
                placeholder="请输入备注"
                v-decorator="['remark']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="展示类型">
              <a-radio-group v-decorator="['showType', { initialValue: 1 }]" @change="changeShowType">
                <a-radio :value="1">二维码</a-radio>
                <a-radio :value="2">文本信息</a-radio>
                <a-radio :value="3">跳转链接</a-radio>
                <a-radio :value="4">打赏</a-radio>
                <a-radio :value="5">其他</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="是否启用">
              <a-radio-group v-decorator="['isEnabled', { initialValue: 0 }]">
                <a-radio :value="0">否</a-radio>
                <a-radio :value="1">是</a-radio>
              </a-radio-group>
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
import { fetchSocial, updateSocial } from '@/api/social'
import { createSocial } from '../../../api/social'
import UpLoadImage from '@/components/UpLoadImageAndFillInput/UpLoadImage'
export default {
  name: 'CreateSocialForm',
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
      title: '新增社交信息',
      id: null,
      drawerVisible: false,
      socialFrom: this.$form.createForm(this, { name: 'create_social' }),
      icon: null,
      qrCode: null,
      show: true
    }
  },
  watch: {
    visible (val) {
      this.drawerVisible = val
    },
    formType (val) {
      this.title = (val === 'create' ? '新增社交信息' : '更新社交信息')
    }
  },
  beforeCreate () {},
  created () {},
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.socialFrom.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const createParams = { ...values }
          if (this.formType === 'create') {
            createParams['qrCode'] = this.qrCode
            createParams['icon'] = this.icon
            createSocial(createParams)
              .then(res => {
                this.$notification.success({
                  message: '新增社交信息成功'
                })
                this.$emit('refreshTable')
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            createParams['id'] = this.id
            updateSocial(createParams)
              .then(res => {
                this.$notification.success({
                  message: '编辑社交信息成功'
                })
                this.$emit('refreshTable')
              })
              .catch(err => {
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
      fetchSocial(record.id)
        .then(response => {
          const postForm = response.model
          this.$refs.handlerIconRef.handleUrl(postForm.icon)
          this.$refs.handlerQrCodeRef.handleUrl(postForm.qrCode)
          this.socialFrom.resetFields()
          this.socialFrom = this.$form.createForm(this, {
            onFieldsChange: (_, changedFields) => {},
            mapPropsToFields: () => {
              return {
                code: this.$form.createFormField({
                  value: postForm.code
                }),
                account: this.$form.createFormField({
                  value: postForm.account
                }),
                showType: this.$form.createFormField({
                  value: postForm.showType
                }),
                url: this.$form.createFormField({
                  value: postForm.url
                }),
                remark: this.$form.createFormField({
                  value: postForm.remark
                }),
                createTime: this.$form.createFormField({
                  value: postForm.createTime
                }),
                updateTime: this.$form.createFormField({
                  value: postForm.updateTime
                }),
                isEnabled: this.$form.createFormField({
                  value: postForm.isEnabled
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
    getIconUrl (url) {
      this.icon = url
    },
    getQrCodeUrl (url) {
      this.qrCode = url
    },
    onClose () {
      this.resetForm()
      this.drawerVisible = false
      this.$emit('resetData', false)
    },
    resetForm () {
      this.socialFrom.resetFields()
    },
    handleSelectChange (value) {
      console.log(`Selected: ${value}`)
    },
    changeShowType (e) {
      if (e.target.value === 1) {
        this.show = true
      } else {
        this.show = false
      }
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
