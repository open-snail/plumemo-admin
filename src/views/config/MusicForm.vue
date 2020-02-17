<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="网易云歌单id"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="['cloudMusicId', {rules: [{ required: true, message: '请输入网易云歌单id' }]}]"
          name="name"
          placeholder="2965996277" />
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
      description: '登录网易云选择我的音乐，在浏览器上方链接可以获取到当前歌单id。',
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
              'configKey': 'cloud_music_id',
              'configValue': values.cloudMusicId
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
      fetchConfigList({ type: 2 }).then(res => {
        const { models } = res
        this.form.resetFields()

        models.forEach((item) => {
          switch (item.configKey) {
            case 'cloud_music_id':
              this.data.cloudMusicId = item.configValue
              break
          }
        })

        this.form = this.$form.createForm(this, {
          onFieldsChange: (_, changedFields) => {},
          mapPropsToFields: () => {
            return {
              cloudMusicId: this.$form.createFormField({
                value: this.data.cloudMusicId
              })
            }
          }
        })
      })
    }
  }
}
</script>
