<template>
  <div>
    <a-drawer
      :title="title"
      placement="right"
      :closable="true"
      @close="onClose"
      :visible="drawerVisible"
      :width="950">
      <a-form @submit="handleSubmit" :form="categoryForm" class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="分类名称">
              <a-input
                placeholder="请输入分类名称"
                v-decorator="['name', { rules: [{ required: true, message: '请输入分类名称', whitespace: true }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
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
  createCategory,
  updateCategory,
  fetchCategory
} from '@/api/category'
import { fetchTagsList } from '@/api/tags'
export default {
  name: 'CreateCategoryForm',
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
      title: '新增分类',
      dynamicTags: [],
      tagsSize: 5,
      id: null,
      drawerVisible: false,
      categoryForm: this.$form.createForm(this, { name: 'create_category' })
    }
  },
  watch: {
    visible (val) {
      this.drawerVisible = val
    },
    formType (val) {
      this.title = (val === 'create' ? '新增分类' : '更新分类')
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
      this.categoryForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const createParams = { ...values }

          const arr = []
          if (createParams.tagsList !== undefined) {
            createParams.tagsList.forEach((item, index) => {
              this.dynamicTags.forEach(item1 => {
                console.log('item1.id=' + item1.id + ',item=' + Number(item) + 'itemStr=' + item)
                if (item1.id === Number(item)) {
                  arr[index] = item1
                }
              })
            })
          }
          createParams.tagsList = [...arr]
          if (this.formType === 'create') {
            createCategory(createParams)
              .then(res => {
                this.$notification.success({
                  message: '新增分类成功'
                })
                this.$emit('refreshTable')
              })
              .catch(err => {
                console.log(err)
                this.$notification.success({
                  message: '新增分类失败'
                })
              })
          } else {
            createParams['id'] = this.id
            updateCategory(createParams)
              .then(res => {
                this.$notification.success({
                  message: '编辑分类成功'
                })
                this.$emit('refreshTable')
              })
              .catch(err => {
                console.log(err)
                this.$notification.success({
                  message: '编辑分类失败'
                })
              })
          }
          this.resetForm()
          this.drawerVisible = false
          this.$emit('resetData', false)
        }
      })
    },
    handleEdit (record) {
      this.id = record.id
      fetchCategory(record.id)
        .then(response => {
          const postForm = response.model
          this.tagsList = postForm.tagsList

          const arr = []
          if (postForm.tagsList !== undefined && postForm.tagsList !== null) {
            postForm.tagsList.forEach((item, index) => {
              arr[index] = String(item.id)
            })
          }

          this.categoryForm = this.$form.createForm(this, {
            onFieldsChange: (_, changedFields) => {},
            mapPropsToFields: () => {
              return {
                name: this.$form.createFormField({
                  value: postForm.name
                }),
                tagsList: this.$form.createFormField({
                  value: arr
                })
              }
            },
            onValuesChange: (_, values) => {
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
      this.categoryForm.resetFields()
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
