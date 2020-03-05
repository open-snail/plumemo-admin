<template>
  <div>
    <a-drawer
      :title="title"
      placement="right"
      :closable="true"
      @close="onClose"
      :visible="drawerVisible"
      :width="950">
      <a-form @submit="handleSubmit" :form="commentForm" class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="回复内容">
              <a-input
                placeholder="请输入回复内容"
                v-decorator="['content', { rules: [{ required: true, message: '请输入回复内容', whitespace: true }] }]"
              />
            </a-form-item>
          </a-col>
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
          <a-button :style="{marginRight: '8px'}" @click="onClose">取消</a-button>
          <a-button type="primary" @click="handleSubmit">提交</a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
import {
  replyComment
} from '@/api/comment'
import { fetchTagsList } from '@/api/tags'
export default {
  name: 'CreateCommentForm',
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
      dynamicTags: [],
      tagsSize: 5,
      id: null,
      drawerVisible: false,
      commentForm: this.$form.createForm(this, { name: 'create_comment' })
    }
  },
  watch: {
    visible (val) {
      this.drawerVisible = val
    },
    formType (val) {
      this.title = (val === 'create' ? '新增评论' : '更新评论')
    }
  },
  beforeCreate () {
  },
  created () {
    this.getTagsList()
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.commentForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const createParams = { ...values }
          const arr = []
            createParams['parentId'] = this.id
            replyComment(createParams)
              .then(res => {
                this.$emit('refreshTable')
              })
              .catch(err => {console.log(err)})
          }
          this.resetForm()
          this.drawerVisible = false
          this.$emit('resetData', false)
      })
    },
    handleEdit (record) {
      this.id = record.id
      this.drawerVisible = true
    },
    onClose () {
      this.resetForm()
      this.drawerVisible = false
      this.$emit('resetData', false)
    },
    resetForm () {
      this.commentForm.resetFields()
    },
    getTagsList () {
      fetchTagsList().then(response => {
        this.dynamicTags = response.models
      })
    },
    handleSelectChange (value) {
      console.log(`Selected: ${value}`)
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
