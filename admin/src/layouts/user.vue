<template>
  <div id="layout-user" :class="['layout', `theme-${theme}`]">
    <div class="container">
      <nuxt :class="device" />
    </div>
    <div class="footer">
      <div class="links">
        <a href="_self">帮助</a>
        <a href="_self">隐私</a>
        <a href="_self">条款</a>
      </div>
      <div class="copyright">Copyright &copy; 2020 byteblogs</div>
    </div>
  </div>
</template>

<script>
import { appMixin, deviceMixin } from '@/mixins';

export default {
  name: 'UserLayout',
  mixins: [appMixin, deviceMixin],
  data() {
    return {};
  },
};
</script>

<style lang="less">
#layout-user {
  min-height: 0;
  color: #333;
  background: #f0f2f5 url(~@/assets/images/background.svg) no-repeat 50%;
  background-size: 100%;
  position: relative;

  .container {
    width: 100%;
    min-height: 100vh;
    padding: 110px 0 144px;
    position: relative;
  }

  .footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;

    a {
      text-decoration: none;
    }

    .links {
      margin-bottom: 8px;
      font-size: 14px;
      a {
        color: rgba(0, 0, 0, 0.45);
        transition: all 0.3s;
        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
  }

  .theme-dark& {
    color: #f2f2f2;
    background-color: #333;

    .footer {
      .links a,
      .copyright {
        color: rgba(255, 255, 255, 0.45);
      }
    }
  }
}
</style>
