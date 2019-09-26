<template>
  <div class="dashboard-editor-container">
<!--    <github-corner class="github-corner" />-->

    <panel-group :quantityObject="quantityObject" />

    <el-row :gutter="7">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:20px;margin-bottom:30px;">
        <byte-blogs-article-list></byte-blogs-article-list>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-left:20px;margin-bottom:30px;">
        <ByteBlogsChatList></ByteBlogsChatList>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import ByteBlogsArticleList from './components/ByteBlogsArticleList'
import ByteBlogsChatList from './components/ByteBlogsChatList'
import { fetchBolgQuantityTotal } from '@/api/dashboard'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    ByteBlogsArticleList,
    ByteBlogsChatList
  },
  data() {
    return {
      quantityObject: null
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      fetchBolgQuantityTotal().then(response => {
        this.quantityObject = response.model
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
