<template>
  <div class="login-container">
    <div class="bg" :style="backImage" ></div>
    <div class="login-form">
      <div class="title-container">
        <h3 class="title">
          欢迎登陆HelloBlog后台管理系统
        </h3>
      </div>
      <div class="title-container" style="text-align: center;" @click="handleLogin">
        <svg-icon icon-class="github" style="width: 100px;height: 100px" />
      </div>
    </div>
  </div>
</template>

<script>
import { getOauthLoginByGithub } from '@/api/user'
import openWindow from '@/utils/open-window'
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      loading: false,
      redirect: undefined,
      otherQuery: {},
      backImage:
        'background-image: url(' +
        require('../../assets/images/bg.jpg') +
        ');'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    handleLogin() {
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
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray: #2d3a4b;

.bg{
  position: fixed;
  width: 100%;
  height: 100%;
  -moz-background-size: cover;
  -o-background-size: cover;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: top center;
  z-index: -999;
}
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 300px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
