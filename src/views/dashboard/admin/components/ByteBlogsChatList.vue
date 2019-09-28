<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>ByteBlogs云聊主题列表</span>
        <a href="https://www.byteblogs.com/chat/" style="float: right; padding: 3px 0"> 更多主题</a>
      </div>
      <div class="infinite-list-wrapper" style="overflow:auto;margin-top: -15px;">
        <div
          v-infinite-scroll="load"
          class="list"
          infinite-scroll-disabled="disabled"
        >
          <div class="content-list">
            <div v-for="(item) in chatList" :key="item.id" class="content-list-item">
              <div class="list-item-top">
                <span>{{ item.tagsName }}</span>
                <span class="dot">·</span>
                <span>{{ item.name }}</span>
                <span class="dot">·</span>
                <span>{{ parseTime(item.createTime,"{y}-{m}-{d} {h}:{i}:{s}") }}</span>
              </div>
              <div class="list-item-middle">
                <a :href="`https://www.byteblogs.com/chat/`+item.id"><span style="color: #2e3135;" class="suspension">{{ item.title }}</span></a>
              </div>
              <div class="list-item-bottom">
                <span><svg-icon icon-class="zan" style="width: 16px;height: 16px" />  {{ item.favors }}</span>
                <span class="dot">·</span>
                <span> <svg-icon icon-class="comment" style="width: 16px;height: 16px" />  &nbsp;{{ item.comments }} &nbsp;</span>
                <span class="dot">·</span>
                <span> <svg-icon icon-class="read" style="width: 16px;height: 16px" /> &nbsp;{{ item.views }} &nbsp;</span>
              </div>
            </div>
          </div>
        </div>
        <p v-if="loading" style="text-align: center;">加载中...</p>
        <p v-if="noMore" style="text-align: center;">没有更多了</p>
      </div>
    </el-card>

  </div>
</template>

<script>
import { fetchByteBlogsChatList } from '@/api/dashboard'
import { parseTime } from '@/utils/index.js'
export default {
  name: 'ByteBlogsArticleChatList',
  data() {
    return {
      chatList: [],
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
    load() {
      this.loading = true
      fetchByteBlogsChatList({
        page: this.listQuery.page + 1,
        size: this.listQuery.size
      }).then(response => {
        if (response.success === 1) {
          this.chatList.push(...response.models)
          this.listQuery.page = response.pageInfo.pageIndex
          this.listQuery.size = response.pageInfo.pageSize
          this.listQuery.total = response.pageInfo.total
          this.loading = false
        }
      })
    },
    parseTime(time, option) {
      return parseTime(time, option)
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

  .dot {
    color: #999;
    font-weight: normal;
    padding: 0 5px;
  }

  .content-list{
    /*width: 100%;*/
    line-height: 20px;
    /*height: 50px;*/
  }

  .list-item-top{
    font-size: 12px;
    color: #b2bac2;
  }

  .content-list-item{
    background: white;
    border-bottom: 0.1px solid #cccccc;
    padding: 18px 18px;
    /*background-color: rgba(0,0,0,.01);*/
  }
  .list-item-middle{
    padding-top: 5px;
  }

  .list-item-middle span{
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
  }

  .list-item-bottom {
    display: flex;
    padding-top: 10px;
    width: 100%;
    line-height: 25px;
    font-size: 12px;
    align-items: stretch;
  }

  .list-item-bottom span {
    color: #b2bac2;
    margin-left: .2em;
    font-weight: 700;
  }
  .suspension:hover{
    text-decoration: underline;
  }

  .infinite-list-wrapper{
    height: 665px;
    padding: 0;
    margin: 0;
    list-style: none;;
  }
</style>
