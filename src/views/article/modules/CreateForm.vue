<template>
  <div>
    <a-drawer
      :title="title"
      placement="right"
      :closable="true"
      @close="onClose"
      :visible="drawerVisible"
      :width="950">
      <a-form @submit="handleSubmit" :form="form" class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="标题">
              <a-input
                placeholder="请输入文章标题"
                v-decorator="['title', { rules: [{ required: true, message: '请输入文章标题', whitespace: true }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="允许评论">
              <a-radio-group v-decorator="['isComment', { initialValue: 1 }]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="同步byteblogs">
              <a-radio-group v-decorator="['isPublishByteBlogs', { initialValue: 1 }]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <!--          <a-col :lg="8" :md="12" :sm="24">-->
          <!--            <a-form-item label="博客搬家">-->
          <!--              <a-radio-group v-model="isMove">-->
          <!--                <a-radio :value="1">是</a-radio>-->
          <!--                <a-radio :value="0">否</a-radio>-->
          <!--              </a-radio-group>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="分类">
              <a-select size="default" style="width: 200px" v-decorator="['categoryId']" @change="handleSelectChange">
                <a-select-option v-for="item in categoryList" :key="String(item.id)" :value="String(item.id)">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="标签">
              <a-select
                mode="tags"
                style="width: 100%"
                @change="handleSelectChange"
                :maxTagCount="tagsSize"
                placeholder="请选择标签"
                v-decorator="['tagsList']"
              >
                <a-select-option v-for="(item) in dynamicTags" :key="String(item.id)" :value="String(item.id)" >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-item label="权重">
              <a-input-number id="inputNumber" :min="1" :max="500" v-decorator="['weight', { initialValue: 1 }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-row class="form-row" :gutter="16">
            <a-col :lg="24" :md="12" :sm="24">
              <a-form-item label="封面图">
                <a-upload
                  action="/api/blog/file/file/v1/upload/"
                  listType="picture-card"
                  :fileList="fileList"
                  @preview="handlePreview"
                  @change="handleChange"
                  v-decorator="['thumbnail']"
                >
                  <div v-if="fileList.length < 1">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="16">
            <a-col :lg="24" :md="12" :sm="24">
              <a-form-item label="内容">
                <mavon-editor
                  ref="md"
                  v-model="content"
                  :ishljs="true"
                  :toolbars="markdownOption"
                  :box-shadow="false"
                  :subfield="false"
                  placeholder="开始你的表演"
                  style="height: 835px;z-index: 5"
                  @imgAdd="$imgAdd"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-row>
        <div
          :style="{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: '10'
          }"
        >
          <a-button :style="{marginRight: '8px'}" @click="onClose">
            取消
          </a-button>
          <a-button type="primary" @click="handleSubmit">
            提交
          </a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
import {
  createArticle,
  updateArticle,
  fetchArticle
} from '@/api/article'
import { markdownOption } from '../article-constants'
import { mavonEditor } from 'mavon-editor'
import { uploadFile } from '@/api/upload'
import { fetchTagsList } from '@/api/tags'
import { fetchCategoryLists } from '@/api/category'
export default {
  name: 'CreateArticleForm',
  components: {
    mavonEditor
  },
  props: {
    formType: {
      type: String,
      default: 'create'
    },
    visible: {
      type: Boolean
    }
  },
  data () {
    return {
      title: '新增文章',
      isSync: 0,
      isComment: 0,
      isMove: 0,
      markdownOption: markdownOption,
      content: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      dynamicTags: [],
      tagsSize: 5,
      weightValue: 1,
      categoryList: [],
      id: null,
      drawerVisible: false,
      form: this.$form.createForm(this, { name: 'create_article' })
    }
  },
  watch: {
    visible (val) {
      this.drawerVisible = val
    },
    formType (val) {
      this.title = (val === 'create' ? '新增文章' : '更新文章')
    }
  },
  created () {
    this.getTagsList()
    this.getCategoryList()
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err && this.content !== null) {
          console.log('Received values of form: ', values)
          const createParams = { ...values }

          const arr = []
          if (createParams.tagsList !== undefined) {
            createParams.tagsList.forEach((item, index) => {
              this.dynamicTags.forEach(item1 => {
                if (item1.id === Number(item)) {
                  arr[index] = item1
                }
              })
            })
          }

          createParams.tagsList = [...arr]
          // 1 草稿 2 文章
          createParams['status'] = 2
          createParams['content'] = this.content

          if (createParams.thumbnail !== undefined &&
            createParams.thumbnail !== null &&
            createParams.thumbnail.file !== null &&
            createParams.thumbnail.file !== undefined) {
            createParams.thumbnail = createParams.thumbnail.file.response.extra
          }

          if (this.formType === 'create') {
            createArticle(createParams)
              .then(response => {
                this.$notification.success({
                  message: response.message
                })
                this.$emit('refreshTable')
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            createParams['id'] = this.id
            updateArticle(createParams)
              .then(response => {
                this.$notification.success({
                  message: response.message
                })
                this.$emit('refreshTable')
              })
              .catch(err => {
                console.log(err)
              })
          }

          this.content = ''
          this.form.resetFields()
          this.drawerVisible = false
          this.$emit('resetData', false)
        }
      })
    },
    handleEdit (record) {
      this.id = record.id
      fetchArticle(record.id)
        .then(response => {
          const postForm = response.model
          console.log(postForm)
          this.tagsList = postForm.tagsList
          this.content = postForm.content

          if (postForm.thumbnail !== null && postForm.thumbnail !== undefined) {
            this.fileList[0] = {
              uid: '-1',
              name: 'xxx.png',
              status: 'done',
              url: postForm.thumbnail
            }
          }

          const arr = []
          if (postForm.tagsList !== undefined && postForm.tagsList !== null) {
            postForm.tagsList.forEach((item, index) => {
              arr[index] = String(item.id)
            })
          }

          this.form.resetFields()
          this.form = this.$form.createForm(this, {
            onFieldsChange: (_, changedFields) => {},
            mapPropsToFields: () => {
              return {
                title: this.$form.createFormField({
                  value: postForm.title
                }),
                thumbnail: this.$form.createFormField({
                  value: postForm.thumbnail
                }),
                content: this.$form.createFormField({
                  value: postForm.content
                }),
                isComment: this.$form.createFormField({
                  value: postForm.isComment
                }),
                categoryId: this.$form.createFormField({
                  value: postForm.categoryId === 0 || postForm.categoryId === undefined ? '' : postForm.categoryId + ''
                }),
                weight: this.$form.createFormField({
                  value: postForm.weight
                }),
                tagsList: this.$form.createFormField({
                  value: arr
                })
              }
            },
            onValuesChange: (_, values) => {
              console.log(values)
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
      this.drawerVisible = true
    },
    onClose () {
      this.resetForm()
      this.drawerVisible = false
      this.$emit('resetData', false)
    },
    resetForm () {
      this.content = ''
      this.form.resetFields()
    },
    getTagsList () {
      fetchTagsList().then(response => {
        this.dynamicTags = response.models
      })
    },
    getCategoryList () {
      fetchCategoryLists().then(response => {
        this.categoryList = response.models
      })
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      console.log(fileList)
      this.fileList = fileList
    },
    handleSelectChange (value) {
      console.log(`Selected: ${value}`)
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    },
    $imgAdd (pos, $file) {
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
<style>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
