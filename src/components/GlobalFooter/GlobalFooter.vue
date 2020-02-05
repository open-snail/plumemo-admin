<template>
  <div class="footer">
    <div class="links">
      <a
        href="http://helloblog.byteblogs.com/#/"
        target="_blank"
      >hello blog 首页</a>
      <a
        href="https://github.com/byteblogs168/hello-blog-admin"
        target="_blank"
      >
        <a-icon type="github" />
      </a>
      <a href="http://helloblog.byteblogs.com/docs/">hello blog</a>
      <a href="https://www.byteblogs.com/">byteblogs</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /> 2019-{{year}} <span> hello blog 开源社区</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

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
</style>
