<template>
  <div class="social-signup-container">
    <div class="sign-btn" @click="wechatHandleClick('wechat')">
      <span class="wx-svg-container"><svg-icon icon-class="wechat" class="icon" /></span>
      WeChat
    </div>
    <div class="sign-btn" @click="tencentHandleClick('tencent')">
      <span class="qq-svg-container"><svg-icon icon-class="qq" class="icon" /></span>
      QQ
    </div>
  </div>
</template>

<script>
import { getOauthLoginByGithub } from '@/api/user'
import openWindow from '@/utils/open-window'

export default {
  name: 'SocialSignin',
  methods: {
    wechatHandleClick(thirdpart) {
      getOauthLoginByGithub().then(res => {
        openWindow(res.model.authorizeUrl, '绑定GitHub', 540, 540)
        window.addEventListener('message', this.loginGithubHandel, false)
      })
    },
    loginGithubHandel(e) {
      const { socialId } = e.data
      console.log(e.data)
      if (socialId) {
        this.$store.dispatch('user/socialLogin', e.data).then(res => {
          console.log(res)
          if (res.success === 1) {
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          }
        })
        window.removeEventListener('message', this.loginGithubHandel, false)
      }
    },
    tencentHandleClick(thirdpart) {
      alert('ok')
      // this.$store.commit('SET_AUTH_TYPE', thirdpart)
      // const client_id = 'xxxxx'
      // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
      // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
      // openWindow(url, thirdpart, 540, 540)
    }
  }
}
</script>

<style lang="scss" scoped>
  .social-signup-container {
    margin: 20px 0;
    .sign-btn {
      display: inline-block;
      cursor: pointer;
    }
    .icon {
      color: #fff;
      font-size: 24px;
      margin-top: 8px;
    }
    .wx-svg-container,
    .qq-svg-container {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding-top: 1px;
      border-radius: 4px;
      margin-bottom: 20px;
      margin-right: 5px;
    }
    .wx-svg-container {
      background-color: #24da70;
    }
    .qq-svg-container {
      background-color: #6BA2D6;
      margin-left: 50px;
    }
  }
</style>
