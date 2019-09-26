<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>ByteBlogs文章列表</span>
        <a href="https://www.byteblogs.com/" style="float: right; padding: 3px 0"> 更多文章</a>
      </div>
      <div class="infinite-list-wrapper" style="overflow:auto">
        <div
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
        >
          <div v-for="(item, index) in list" :key="index">
            <el-row align="middle" justify="center" type="flex">
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="2">
                <el-avatar :src="item.avatar" />
              </el-col>
              <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="16">
                <a :href="'https://www.whatyun.cn/article/'+item.id"> <span style="display: inline;font-weight: 500;font-size: 18px; line-height: 28px; color: #212121; position: relative; vertical-align: middle;">{{ item.title }}</span></a>
              </el-col>
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="5">
                <span style="font-size: 16px;padding-left: 6px"> {{ item.views }} 浏览 ⋅ {{ item.comments }} 回复</span>
              </el-col>
            </el-row>
            <el-divider />
          </div>

        </div>
        <p v-if="loading" style="text-align: center;">加载中...</p>
        <p v-if="noMore || false" style="text-align: center;">没有更多了</p>
      </div>
    </el-card>

  </div>
</template>

<script>
import { fetchByteBlogsList } from '@/api/dashboard'
export default {
  name: 'ByteBlogsArticleList',
  data() {
    return {
      list: [],
      loading: false,
      listQuery: {
        page: 0,
        size: 10,
        total: 10
      }
    }
  },
  computed: {
    noMore() {
      return this.listQuery.page * this.listQuery.size >= this.listQuery.total
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  created() {
    this.load()
  },
  methods: {
    async load() {
      this.loading = true
      await fetchByteBlogsList({
        page: this.listQuery.page + 1,
        size: this.listQuery.size
      }).then(response => {
        if (response.success === 1) {
          this.list.push(...response.models)
          this.listQuery.page = response.pageInfo.pageIndex
          this.listQuery.size = response.pageInfo.pageSize
          this.listQuery.total = response.pageInfo.total
        }
      })
      this.loading = false
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .infinite-list-wrapper{
    height: 650px;
    padding: 0;
    margin: 0;
    list-style: none;;
  }

</style>
