<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="code">
              <a-input v-model="queryParam.code" placeholder="请输入code"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="社交内容">
              <a-input v-model="queryParam.content" placeholder="请输入社交内容"/>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="展示类型">
                <a-select v-model="queryParam.showType" placeholder="请选择" default-value="0">
                  <a-select-option value="1">图片</a-select-option>
                  <a-select-option value="2">文本信息</a-select-option>
                  <a-select-option value="3">跳转链接</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="handlerSearch">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {},
  components: {},
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
      console.log(this.queryParam)
      this.$emit('reloadData', this.queryParam)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {}
    }
  },
  mounted () {}
}
</script>

<style scoped>

</style>
