<template>
  <div style="width: 50%;margin: 0 auto">
    <el-form ref="siteConfigForm" :model="siteConfigForm" :rules="rules" label-width="100px" class="demo-siteConfigForm">
      <el-form-item label="站点名称" prop="name" label-width="100px">
        <el-input v-model="siteConfigForm.name" placeholder="ByteBlogs" />
      </el-form-item>
      <el-form-item label="域名" prop="name" label-width="100px">
        <el-input v-model="siteConfigForm.domain" placeholder="https://www.byteblogs.com" />
      </el-form-item>
      <el-form-item label="copyright" prop="name" label-width="100px">
        <el-input v-model="siteConfigForm.copyright" placeholder="Copyright © ByteBlogs" />
      </el-form-item>
      <el-form-item label="备案号" prop="name" label-width="100px">
        <el-input v-model="siteConfigForm.icp" placeholder="示例: 皖ICP备12345678号" />
      </el-form-item>
      <el-form-item label="站点关键字" prop="delivery" label-width="100px">
        <el-input v-model="siteConfigForm.keywords" placeholder="写代码、写代码、还是写代码" />
      </el-form-item>
      <el-form-item label="站点描述" prop="desc" label-width="100px">
        <el-input v-model="siteConfigForm.description" type="textarea" placeholder="随便写点什么" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('siteConfigForm')">确认更改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchConfigList, updateConfig } from '@/api/config'
export default {
  name: '',
  components: {
  },
  props: {
  },
  data() {
    return {
      siteConfigForm: {
        name: '',
        domain: '',
        keywords: '',
        description: '',
        copyright: '',
        icp: ''
      },
      rules: {
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList() {
      fetchConfigList({ type: 0 }).then(res => {
        const { models } = res
        models.forEach((item) => {
          switch (item.configKey) {
            case 'name':
              this.siteConfigForm.name = item.configValue
              break
            case 'domain':
              this.siteConfigForm.domain = item.configValue
              break
            case 'keywords':
              this.siteConfigForm.keywords = item.configValue
              break
            case 'description':
              this.siteConfigForm.description = item.configValue
              break
            case 'copyright':
              this.siteConfigForm.copyright = item.configValue
              break
            case 'icp':
              this.siteConfigForm.icp = item.configValue
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
              'configKey': 'name',
              'configValue': this.siteConfigForm.name
            },
            {
              'configKey': 'domain',
              'configValue': this.siteConfigForm.domain
            },
            {
              'configKey': 'keywords',
              'configValue': this.siteConfigForm.keywords
            },
            {
              'configKey': 'description',
              'configValue': this.siteConfigForm.description
            },
            {
              'configKey': 'copyright',
              'configValue': this.siteConfigForm.copyright
            },
            {
              'configKey': 'icp',
              'configValue': this.siteConfigForm.icp
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
