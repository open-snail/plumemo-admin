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
              <a-row class="form-row" :gutter="16" justify="space-between">
                <a-col :lg="22" :md="12" :sm="24">
                  <a-select placeholder="请选择code" v-show="!isAddCode" v-decorator="['code', { rules: [{ required: true, message: '请输入code', whitespace: true }] }]" >
                    <a-select-option value="byteblogs">ByteBlogs</a-select-option>
                    <a-select-option value="QQ">QQ</a-select-option>
                    <a-select-option value="CSDN">CSDN</a-select-option>
                    <a-select-option value="reward">打赏</a-select-option>
                    <a-select-option value="qrCode">二维码</a-select-option>
                    <a-select-option value="email">邮箱</a-select-option>
                    <a-select-option value="sifou">思否</a-select-option>
                    <a-select-option value="oschina">开源中国</a-select-option>
                  </a-select>
                  <a-input
                    placeholder="请输入code"
                    v-show="isAddCode"
                    v-decorator="['code', { rules: [{ required: true, message: '请输入code', whitespace: true }] }]"
                  />
                </a-col>
                <a-col :lg="2" :md="12" :sm="24">
                  <a-button
                    type="primary"
                    :icon="isAddCode?'select':'plus-circle'"
                    size="small"
                    shape="circle"
                    @click="handlerAddCode"></a-button>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="展示类型">
              <a-radio-group v-decorator="['showType', { initialValue: 1 }]" @change="changeShowType">
                <a-radio :value="1">图片</a-radio>
                <a-radio :value="2">文本信息</a-radio>
                <a-radio :value="3">跳转链接</a-radio>
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
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="是否主页社交信息">
              <a-radio-group v-decorator="['isHome', { initialValue: 0 }]">
                <a-radio :value="0">否</a-radio>
                <a-radio :value="1">是</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="图标">
              <UpLoadImage
                v-model="this.icon"
                @getImageUrl="getIcon"
                :placeholder="`请选择图标`"
                ref="handlerIconRef"
              ></UpLoadImage>
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
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="社交内容">
              <a-input v-show="!show" placeholder="请输入社交内容" v-decorator="['content']"/>
              <UpLoadImage
                v-show="show"
                @getImageUrl="getContent"
                ref="handlerContentRef"
                :placeholder="`请输入社交内容`"
                :imageUrl="this.content"
                :style="show?'':'display: none'"></UpLoadImage>
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
      content: null,
      icon: null,
      show: true,
      iconShow: true,
      isAddCode: false
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
          if (createParams['showType'] === 1) {
            createParams['content'] = this.content
          }
          createParams['icon'] = this.icon

          if (this.formType === 'create') {
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
          if (postForm.showType === 1) {
            this.show = true
            this.$refs.handlerContentRef.handleUrl(postForm.content)
          } else {
            this.show = false
          }

          this.$refs.handlerIconRef.handleUrl(postForm.icon)
          this.socialFrom.resetFields()
          this.socialFrom = this.$form.createForm(this, {
            onFieldsChange: (_, changedFields) => {},
            mapPropsToFields: () => {
              return {
                content: this.$form.createFormField({
                  value: postForm.content
                }),
                showType: this.$form.createFormField({
                  value: postForm.showType
                }),
                remark: this.$form.createFormField({
                  value: postForm.remark
                }),
                icon: this.$form.createFormField({
                  value: postForm.icon
                }),
                isEnabled: this.$form.createFormField({
                  value: postForm.isEnabled
                }),
                isHome: this.$form.createFormField({
                  value: postForm.isHome
                }),
                code: this.$form.createFormField({
                  value: postForm.code
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
    getContent (content) {
      this.content = content
    },
    getIcon (icon) {
      this.icon = icon
    },
    onClose () {
      this.resetForm()
      this.drawerVisible = false
      this.$emit('resetData', false)
    },
    resetForm () {
      this.show = true
      this.socialFrom.resetFields()
      this.$refs.handlerContentRef.handleUrl(null)
      this.$refs.handlerIconRef.handleUrl(null)
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
    },
    handlerAddCode () {
      this.isAddCode = !this.isAddCode
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
