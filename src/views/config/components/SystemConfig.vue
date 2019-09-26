<template>
  <div style="width: 50%;margin: 0 auto">
    <el-form ref="systemConfigForm" :model="systemConfigForm" :rules="rules" label-width="100px">
      <el-divider><h3>七牛云配置</h3></el-divider>
      <el-form-item label="access_key" prop="name" label-width="100px">
        <el-input v-model="systemConfigForm.accessKey" placeholder="七牛云提供的access_key" />
      </el-form-item>
      <el-form-item label="secret_key" prop="name" label-width="100px">
        <el-input v-model="systemConfigForm.secretKey" placeholder="七牛云提供的secret_key" />
      </el-form-item>
      <el-form-item label="bucket" prop="name" label-width="100px">
        <el-input v-model="systemConfigForm.bucket" placeholder="blog" />
      </el-form-item>
      <el-form-item label="域名" prop="name" label-width="100px">
        <el-input v-model="systemConfigForm.imageDomain" placeholder="http://image.byteblogs.com" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('systemConfigForm')">确认更改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchConfigList, updateConfig } from '@/api/config'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      systemConfigForm: {
        accessKey: '',
        secretKey: '',
        bucket: '',
        imageDomain: ''
      },
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList() {
      fetchConfigList({ type: 1 }).then(res => {
        const { models } = res
        models.forEach((item) => {
          switch (item.configKey) {
            case 'qiniu_access_key':
              this.systemConfigForm.accessKey = item.configValue
              break
            case 'qiniu_secret_key':
              this.systemConfigForm.secretKey = item.configValue
              break
            case 'qiniu_bucket':
              this.systemConfigForm.bucket = item.configValue
              break
            case 'qiniu_image_domain':
              this.systemConfigForm.imageDomain = item.configValue
              break
          }
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateConfig([
            {
              'configKey': 'qiniu_access_key',
              'configValue': this.systemConfigForm.accessKey
            },
            {
              'configKey': 'qiniu_secret_key',
              'configValue': this.systemConfigForm.secretKey
            },
            {
              'configKey': 'qiniu_bucket',
              'configValue': this.systemConfigForm.bucket
            },
            {
              'configKey': 'qiniu_image_domain',
              'configValue': this.systemConfigForm.imageDomain
            }
          ]).then(res => {
            this.$message({
              message: '保存成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
