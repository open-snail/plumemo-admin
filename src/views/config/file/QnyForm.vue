<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="access_key"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'accessKey',
            {rules: [{ required: true, message: '请输入accessKey' }]}
          ]"
          name="accessKey"
          placeholder="输入你的accessKey" />
      </a-form-item>

      <a-form-item
        label="secret_key"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'secretKey',
            {rules: [{ required: true, message: '请输入secretKey' }]}
          ]"
          name="secretKey"
          placeholder="输入你的secretKey" />
      </a-form-item>

      <a-form-item
        label="bucket"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'bucket',
            {rules: [{ required: true, message: '请输入bucket' }]}
          ]"
          name="bucket"
          placeholder="输入你的存储空间名称" />
      </a-form-item>

      <a-form-item
        label="域名"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'imageDomain',
            {rules: [{ required: true, message: '输入你的加速域名' }]}
          ]"
          name="imageDomain"
          placeholder="http://image.{host}.com" />
      </a-form-item>

      <a-form-item
        label="是否启用"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
      >
        <a-radio-group v-model="value">
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { fetchConfigList, updateConfig } from '@/api/config'
export default {
  name: 'BaseForm',
  data () {
    return {
      description: '定义七牛云信息，加快站点图片访问速度',
      value: 0,
      form: this.$form.createForm(this),
      data: {}
    }
  },
  created () {
    this.getConfigList()
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          updateConfig([
            {
              'configKey': 'qiniu_access_key',
              'configValue': values.accessKey
            },
            {
              'configKey': 'qiniu_secret_key',
              'configValue': values.secretKey
            },
            {
              'configKey': 'qiniu_bucket',
              'configValue': values.bucket
            },
            {
              'configKey': 'qiniu_image_domain',
              'configValue': values.imageDomain
            },
            {
              'configKey': 'store_type',
              'configValue': this.value === 1 ? 'qiniu' : 'default'
            }
          ])
            .then(res => {
              this.$notification.success({
                message: '编辑七牛云信息成功'
              })
              this.$emit('refreshTable')
            })
        }
      })
    },
    getConfigList () {
      fetchConfigList({ type: 1 }).then(res => {
        const { models } = res
        this.form.resetFields()

        models.forEach((item) => {
          switch (item.configKey) {
            case 'qiniu_access_key':
              this.data.accessKey = item.configValue
              break
            case 'qiniu_secret_key':
              this.data.secretKey = item.configValue
              break
            case 'qiniu_bucket':
              this.data.bucket = item.configValue
              break
            case 'qiniu_image_domain':
              this.data.imageDomain = item.configValue
              break
            case 'store_type':
              if (item.configValue === 'qiniu') {
                this.value = 1
              }
              break
          }
        })

        this.form = this.$form.createForm(this, {
          onFieldsChange: (_, changedFields) => {},
          mapPropsToFields: () => {
            return {
              accessKey: this.$form.createFormField({
                value: this.data.accessKey
              }),
              secretKey: this.$form.createFormField({
                value: this.data.secretKey
              }),
              bucket: this.$form.createFormField({
                value: this.data.bucket
              }),
              imageDomain: this.$form.createFormField({
                value: this.data.imageDomain
              })
            }
          }
        })
      })
    }
  }
}
</script>
