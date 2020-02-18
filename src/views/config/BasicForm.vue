<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="站点名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入站点名称' }]}
          ]"
          name="name"
          placeholder="给你的站点起个响亮的名字吧" />
      </a-form-item>

      <a-form-item
        label="域名"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'domain',
            {rules: [{ required: true, message: '请输入域名' }]}
          ]"
          name="domain"
          placeholder="输入你的站点域名" />
      </a-form-item>

      <a-form-item
        label="copyright"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'copyright',
            {rules: [{ required: true, message: '请输入标题' }]}
          ]"
          name="copyright"
          placeholder="输入版权所有信息" />
      </a-form-item>

      <a-form-item
        label="备案号"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'icp',
            {rules: [{ required: true, message: '输入你域名对应的备案信息' }]}
          ]"
          name="icp"
          placeholder="输入你域名对应的备案信息" />
      </a-form-item>

      <a-form-item
        label="站点关键字"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'keywords',
            {rules: [{ required: true, message: '输入你站点的关键字' }]}
          ]"
          name="keywords"
          placeholder="输入你站点的关键字，如HelloBlog" />
      </a-form-item>

      <a-form-item
        label="站点描述"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-textarea
          rows="4"
          placeholder="输入你站点的描述，如HelloBlog是一个前后端分离的博客"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '输入你站点的描述' }]}
          ]" />
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
      description: '定义站点的相关信息，可以让用户更加了解你。',
      value: 1,
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
              'configKey': 'name',
              'configValue': values.name
            },
            {
              'configKey': 'domain',
              'configValue': values.domain
            },
            {
              'configKey': 'keywords',
              'configValue': values.keywords
            },
            {
              'configKey': 'description',
              'configValue': values.description
            },
            {
              'configKey': 'copyright',
              'configValue': values.copyright
            },
            {
              'configKey': 'icp',
              'configValue': values.icp
            }
          ])
            .then(res => {
              this.$notification.success({
                message: '编辑站点信息成功'
              })
              this.$emit('refreshTable')
            })
            .catch(err => {
              console.log(err)
              this.$notification.success({
                message: '编辑站点信息失败'
              })
            })
        }
      })
    },
    getConfigList () {
      fetchConfigList({ type: 0 }).then(res => {
        const { models } = res
        this.form.resetFields()

        models.forEach((item) => {
          switch (item.configKey) {
            case 'name':
              this.data.name = item.configValue
              break
            case 'domain':
              this.data.domain = item.configValue
              break
            case 'keywords':
              this.data.keywords = item.configValue
              break
            case 'description':
              this.data.description = item.configValue
              break
            case 'copyright':
              this.data.copyright = item.configValue
              break
            case 'icp':
              this.data.icp = item.configValue
              break
          }
        })

        this.form = this.$form.createForm(this, {
          onFieldsChange: (_, changedFields) => {},
          mapPropsToFields: () => {
            return {
              name: this.$form.createFormField({
                value: this.data.name
              }),
              domain: this.$form.createFormField({
                value: this.data.domain
              }),
              keywords: this.$form.createFormField({
                value: this.data.keywords
              }),
              description: this.$form.createFormField({
                value: this.data.description
              }),
              copyright: this.$form.createFormField({
                value: this.data.copyright
              }),
              icp: this.$form.createFormField({
                value: this.data.icp
              })
            }
          }
        })
      })
    }
  }
}
</script>
