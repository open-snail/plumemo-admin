<template>
  <div>
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form ref="updatePassword" :form="form" id="updatePassword">
          <a-popover
            placement="rightTop"
            :trigger="['focus']"
            :getPopupContainer="(trigger) => trigger.parentElement"
            v-model="state.passwordLevelChecked">
            <a-form-item>
              <a-input
                type="password"
                autocomplete="false"
                placeholder="请输入原始密码"
                v-decorator="['passwordOld', {rules: [{ required: true, message: '原始密码必填'}], validateTrigger: ['change', 'blur']}]"
              ></a-input>
            </a-form-item>
            <template slot="content">
              <div :style="{ width: '240px' }" >
                <div :class="['user-register', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span></div>
                <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
                <div style="margin-top: 10px;">
                  <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                </div>
              </div>
            </template>
            <a-form-item>
              <a-input
                type="password"
                @click="handlePasswordInputClick"
                autocomplete="false"
                placeholder="至少6位密码，区分大小写"
                v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
              ></a-input>
            </a-form-item>
          </a-popover>

          <a-form-item>
            <a-input
              type="password"
              autocomplete="false"
              placeholder="确认密码"
              v-decorator="['password2', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSubmit">提交</a-button>
            <a-button style="margin-left: 8px" @click="resetForm">重置</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { updatePassword } from '@/api/user'
const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default {
  name: '',
  props: {
  },
  components: {
  },
  computed: {
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),

      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      registerBtn: false
    }
  },
  methods: {
    handlePasswordLevel (rule, value, callback) {
      let level = 0

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('密码强度不够'))
      }
    },
    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      console.log('value', value)
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },
    handlePasswordInputClick () {
      this.state.passwordLevelChecked = false
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const updateParams = { ...values }
          const sha256 = require('js-sha256').sha256
          updateParams.password = sha256(values.password)
          updateParams.passwordOld = sha256(values.passwordOld)
          updateParams.password2 = ''
          this.$confirm({
            title: '提示',
            content: '密码修改，需要重新登录',
            onOk: () => {
              updatePassword(updateParams)
                .then(response => {
                  const { success } = response
                  if (success === 1) {
                    setTimeout(() => {
                      window.location.reload()
                    }, 16)
                  }
                })
            }
          })
        }
      })
    },
    resetForm () {
      this.form.resetFields()
    },
    handleLogout () {

    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
