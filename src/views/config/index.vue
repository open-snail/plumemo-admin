<template>
  <div style="margin: 20px">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="sit">
        <site-config />
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="system">
        <system-config />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SiteConfig from './components/SiteConfig'
import SystemConfig from './components/SystemConfig'
export default {
  name: '',
  components: {
    SiteConfig,
    SystemConfig
  },
  props: {
  },
  data() {
    return {
      activeName: 'sit'
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?config=${val}`)
    }
  },
  mounted() {
    const tab = this.$route.query.config
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    handleClick(tab, event) {
    }
  }
}
</script>

<style scoped>

</style>
