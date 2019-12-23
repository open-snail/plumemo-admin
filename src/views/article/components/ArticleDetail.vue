<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+ (postForm.status === 1 ? 'draft':'')">
        <CrawlerPlatformArticleDropdown @crawlerArticleData="getCrawlerArticleData" />
        <UploadCoverImageDropdown :thumbnail="imageUrl" @showPictureCardPreview="showPictureCardPreview" />
        <CommentDropdown v-model="postForm.isComment" />
        <PublishByteBlogsDropdown v-model="postForm.isPublishByteBlogs" />
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          草稿
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row align="middle" justify="space-between" type="flex">
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <mavon-editor
            ref="md"
            v-model="postForm.content"
            :ishljs="true"
            :toolbars="markdownOption"
            :box-shadow="false"
            placeholder="开始你的创作"
            style="height: 835px;z-index: 5"
            @imgAdd="$imgAdd"
            @save="clickSave"
          />
        </el-form-item>



        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="分类:">
          <el-select v-model="postForm.categoryId" placeholder="请选择">
            <el-option v-for="item in categorys" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="标签:">
          <el-tag
            v-for="(tag, index ) in dynamicTags"
            :key="index"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag.name }}
          </el-tag>
          <el-autocomplete
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="inline-input"
            value-key="name"
            :fetch-suggestions="querySearch"
            placeholder="Enter添加标签"
            @keyup.enter.native="handleInputConfirm"
            @select="handleSelect"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">新增标签</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchTagsList } from '@/api/tags'
import { fetchCategoryLists } from '@/api/category'
import { fetchArticle, createArticle, updateArticle } from '@/api/article'
import { uploadFile } from '@/api/upload'
import { CommentDropdown, PublishByteBlogsDropdown, CrawlerPlatformArticleDropdown, UploadCoverImageDropdown } from './Dropdown'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const defaultForm = {
  status: 1, // 1 草稿 2 文章
  title: '', // 文章题目
  content: '', // 文章内容
  sourceUri: '', // 文章外链
  thumbnail: '', // 文章图片
  id: undefined,
  isComment: 1,
  isPublishByteBlogs: 1
}
const markdownOption = {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: true, // 标记
  superscript: true, // 上角标
  subscript: true, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  fullscreen: false, // 全屏编辑
  readmodel: false, // 沉浸式阅读
  help: true, // 帮助
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  save: true, // 保存（触发events中的save事件）
  navigation: true, // 导航目录
  subfield: true, // 单双栏模式
  preview: true, // 预览
  htmlcode: true// 展示html源码
}
export default {
  name: 'ArticleDetail',
  components: {
    MDinput, mavonEditor, Sticky, CommentDropdown, PublishByteBlogsDropdown, CrawlerPlatformArticleDropdown, UploadCoverImageDropdown
  },
  props: {
    isEdit: {
      type: Boolean,
      default:
          false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      markdownOption: markdownOption,
      userListOptions: [],
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      tempRoute: {},
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      restaurants: [],
      imageUrl: '',
      dialogVisible: false,
      categoryId: '', // 选中Id
      categorys: [] // 所有分类
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    },
    displayTime: {
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    this.getCategoryList() // 分类
    this.getTagsList() // 标签
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  mounted() {
  },
  methods: {
    getCategoryList() {
      fetchCategoryLists().then(response => {
        this.categorys = response.models
      })
    },
    showPictureCardPreview(data) {
      this.postForm.thumbnail = data.extra
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      const index = this.restaurants.findIndex((value, index, array) => {
        return value.id === tag.id
      })
      if (tag.id !== null && index === -1) {
        this.restaurants.push(tag)
      }
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push({ name: inputValue })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.model
        this.dynamicTags = response.model.tagsList
        this.$nextTick(_ => {
          this.imageUrl = response.model.thumbnail
        })
        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.title}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      document.title = `${title} - ${this.postForm.title}`
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.isEdit) {
            updateArticle({
              id: this.postForm.id,
              status: 2, // 1 草稿 2 文章
              title: this.postForm.title, // 文章题目
              content: this.postForm.content, // 文章内容
              sourceUri: this.postForm.sourceUri, // 文章外链
              thumbnail: this.postForm.thumbnail, // 文章图片
              isComment: this.postForm.isComment,
              categoryId: this.postForm.categoryId, // 文章分类
              isPublishByteBlogs: this.postForm.isPublishByteBlogs,
              tagsList: this.dynamicTags
            }).then(response => {
              this.postForm.status = 2
              this.$router.push('/article/list') // 跳转到文章列表页
              this.loading = false
            }).catch(err => {
              console.log(err)
            })
          } else {
            createArticle({
              status: 2, // 1 草稿 2 文章
              title: this.postForm.title, // 文章题目
              content: this.postForm.content, // 文章内容
              sourceUri: this.postForm.sourceUri, // 文章外链
              thumbnail: this.postForm.thumbnail, // 文章图片
              isComment: this.postForm.isComment,
              categoryId:this.postForm.categoryId, // 文章分类
              isPublishByteBlogs: this.postForm.isPublishByteBlogs,
              tagsList: this.dynamicTags
            }).then(response => {
              this.postForm.status = 2

              // 跳转到文章列表页
              this.$router.push('/article/list')

              this.loading = false
            }).catch(err => {
              console.log(err)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 1
    },
    clickSave() {
    },
    getTagsList() {
      this.listLoading = true
      fetchTagsList(this.listQuery).then(response => {
        this.restaurants = response.models
        this.listLoading = false
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      if (item) {
        this.dynamicTags.push(item)
        this.restaurants.splice(this.restaurants.indexOf(item), 1)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    getCrawlerArticleData(data) {
      this.postForm.title = data.title
      this.postForm.content = data.content
    },
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      uploadFile(formdata).then(res => {
        console.log(res)
        const url = res.extra
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        this.$refs.md.$img2Url(pos, url)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }

  .article-textarea /deep/ {
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
