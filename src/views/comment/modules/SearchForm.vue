<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="搜索">
              <a-input v-model="queryParam.keywords" placeholder="请输入评论内容/文章标题"/>
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="handlerSearch">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'SearchForm',
  props: {
  },
  components: {
  },
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {}
    }
  },
  methods: {
    handlerSearch () {
      this.$emit('reloadData', this.queryParam)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        createTime: moment(new Date())
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
