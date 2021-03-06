<template>
  <div id="login">
    <div class="top">
      <p class="title">欢迎登陆Plumeno后台管理系统</p>
      <p class="desc">一个简单通用的前后分离的博客系统</p>
    </div>
    <a-form id="login-form" :form="form" @submit.prevent.stop="handleSubmit">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="请输入邮箱地址"
          v-decorator="[
            'email',
            {
              rules: [{ required: true, message: '请输入用户名' }],
              validateTrigger: 'change',
            },
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="请输入密码"
          v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-alert type="error" showIcon :message="loginError" v-if="loginError" />

      <a-form-item style="margin-top: 24px">
        <a-button block size="large" type="primary" htmlType="submit" :loading="logining" :disabled="logining"
          >确定</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { timeFix } from '@/utils/util';

export default {
  layout: 'user',
  inject: ['isMobile'],
  data() {
    return {
      logining: false,
      loginError: '',
      form: this.$form.createForm(this),
    };
  },
  methods: {
    ...mapActions('user', ['login']),
    handleSubmit() {
      this.logining = true;
      this.loginError = '';
      this.form.validateFields({ force: true }, (err, values) => {
        if (err) {
          this.loginError = err.message;
          this.logining = false;
          return;
        }
        const loginParams = { ...values };
        const sha256 = require('js-sha256').sha256;
        loginParams.password = sha256(values.password);

        this.login(loginParams)
          .then(() => {
            this.$router.push({ path: '/' });
            // 延迟 1 秒显示欢迎信息
            setTimeout(() => {
              this.$notification.success({
                message: '欢迎',
                description: `${timeFix()}，欢迎回来`,
              });
            }, 1000);
          })
          .catch((err) => {
            if (this.isMobile()) {
              this.$notification.error({
                message: err.message,
              });
            } else {
              this.loginError = err.message;
            }
          })
          .finally(() => {
            this.logining = false;
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  text-align: center;

  .title {
    font-size: 2rem;
    font-weight: bold;

    .mobile & {
      font-size: 1.25rem;
    }
  }

  .desc {
    font-size: 0.875rem;
    color: #999;
    margin-top: 12px;
  }
}

#login-form {
  margin: 0 auto;
  padding: 30px 16px 0;
  width: 368px;
  max-width: 100%;

  .mobile & {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>
