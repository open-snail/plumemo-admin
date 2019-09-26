<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>
      博客搬家
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-padding no-border" style="width:600px;height: 200px">
      <el-form ref="postForm" :model="postForm" :rules="rules" label-width="80px">
        <el-form-item label-width="30px" style="margin-bottom: 15px" prop="platformType">
          <div style="margin-top: 20px">
            <el-radio-group v-model="postForm.platformType" size="mini">
              <el-radio label="1" border size="medium">掘金</el-radio>
              <el-radio label="2" border size="medium">简书</el-radio>
              <el-radio label="3" border size="medium">CSDN</el-radio>
              <el-radio label="4" border size="medium">思否</el-radio>
              <el-radio label="5" border size="medium">博客园</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label-width="30px" style="margin-bottom: 0px" prop="sourceUri">
          <el-input v-model="postForm.sourceUri" placeholder="请输入需要搬家文章地址">
            <template slot="prepend">
              链接
            </template>
          </el-input>
        </el-form-item>
        <el-form-item style="float: right;margin-top: 15px;margin-right: 20px" label-width="80px">
          <el-button v-loading="loading" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button v-loading="loading" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { crawlerArticle } from '@/api/article'
const defaultForm = {
  platformType: null, // 文章内容
  sourceUri: '' // 文章外链
}
export default {
  props: {
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      rules: {
        platformType: [{ required: true, message: '请选择需要获取文章的平台' }],
        sourceUri: [{ required: true, message: '请选择需要获取文章的链接' }]
      },
      loading: false
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs['postForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          crawlerArticle(this.postForm).then(res => {
            this.$emit('crawlerArticleData', res.model)
            this.loading = false
            this.$message({
              message: '数据获取成功',
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
    resetForm() {
      this.$refs['postForm'].resetFields()
    },
    resetPostForm() {
      this.$refs['postForm'].resetFields()
      this.dynamicTags = []
      this.inputValue = ''
    }
  }
}
</script>
