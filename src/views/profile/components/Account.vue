<template>
  <el-form>
    <el-form-item label="名称">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item label="个人简介">
      <el-input v-model.trim="user.introduction" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUser } from '@/api/user'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          introduction: ''
        }
      }
    }
  },
  methods: {
    submit() {
      updateUser(this.user).then(res => {
        const { success } = res
        if (success === 1) {
          this.$message({
            message: '用户信息更新成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.$store.dispatch('user/getInfo')
        }
      })
    }
  }
}
</script>
