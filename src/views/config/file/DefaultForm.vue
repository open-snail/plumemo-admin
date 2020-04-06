<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="LocalPath"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'defaultPath',
            {rules: [{ required: true, message: '请输入文件存储路径' }]}
          ]"
          name="defaultPath"
          placeholder="请输入文件存储路径" />
      </a-form-item>
      <a-form-item
        label="域名"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'imageDomain',
            {rules: [{ required: true, message: '输入你的域名或者IP地址' }]}
          ]"
          name="imageDomain"
          placeholder="http://image.{host}.com/" />
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
  name: 'DefaultForm',
  data () {
    return {
      description: '定义站点图片存储地址，默认为windos:(D:/plumemo/blog/);linux:(/home/plumemo/blog/)，当没有启用任何云存储时，将使用默认的服务器OSS配置',
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
              'configKey': 'default_path',
              'configValue': values.defaultPath
            },
            {
              'configKey': 'default_image_domain',
              'configValue': values.imageDomain
            }
          ])
            .then(res => {
              this.$notification.success({
                message: '编辑服务器OSS信息成功'
              })
              this.$emit('refreshTable')
            })
            .catch(err => {
              console.log(err)
              this.$notification.success({
                message: '编辑服务器OSS信息失败'
              })
            })
        }
      })
    },
    getConfigList () {
      fetchConfigList({ type: 6 }).then(res => {
        const { models } = res
        this.form.resetFields()

        models.forEach((item) => {
          switch (item.configKey) {
            case 'default_path':
              this.data.defaultPath = item.configValue
              break
            case 'default_image_domain':
              this.data.imageDomain = item.configValue
              break
          }
        })

        this.form = this.$form.createForm(this, {
          onFieldsChange: (_, changedFields) => {},
          mapPropsToFields: () => {
            return {
              defaultPath: this.$form.createFormField({
                value: this.data.defaultPath
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
