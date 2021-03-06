<template>
  <div>
    <a-drawer :title="title" placement="right" :closable="true" @close="onClose" :visible="drawerVisible" :width="950">
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
          <a-col :lg="24" :md="12" :sm="24">
            <a-form-item label="分类描述">
              <a-input
                placeholder="请输入分类描述"
                v-decorator="[
                  'description',
                  { rules: [{ required: true, message: '请输入分类描述', whitespace: true }] },
                ]"
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
            zIndex: '10',
          }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose"> 取消 </a-button>
          <a-button type="primary" @click="handleSubmit"> 提交 </a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
import { categoryApi } from '@/includes/datas';
export default {
  name: 'CreateCategoryForm',
  props: {
    formType: {
      type: String,
      default: 'create',
    },
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      title: '新增分类',
      dynamicTags: [],
      tagsSize: 5,
      id: null,
      drawerVisible: false,
      categoryForm: this.$form.createForm(this, { name: 'create_category' }),
    };
  },
  watch: {
    visible(val) {
      this.drawerVisible = val;
    },
    formType(val) {
      this.title = val === 'create' ? '新增分类' : '更新分类';
    },
  },
  beforeCreate() {},
  created() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.categoryForm.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          const createParams = { ...values };

          createParams['parentId'] = 0;
          if (this.formType === 'create') {
            categoryApi
              .create(createParams)
              .then((res) => {
                this.$notification.success({
                  message: '新增分类成功',
                });
                this.$emit('refreshTable');
              })
              .catch((err) => {
                console.log(err);
                this.$notification.success({
                  message: '新增分类失败',
                });
              });
          } else {
            createParams['id'] = this.id;
            categoryApi
              .update(this.id, createParams)
              .then((res) => {
                this.$notification.success({
                  message: '编辑分类成功',
                });
                this.$emit('refreshTable');
              })
              .catch((err) => {
                console.log(err);
                this.$notification.success({
                  message: '编辑分类失败',
                });
              });
          }
          this.resetForm();
          this.drawerVisible = false;
          this.$emit('resetData', false);
        }
      });
    },
    handleEdit(record) {
      this.id = record.id;
      categoryApi
        .get(record.id)
        .then((response) => {
          const postForm = response;

          this.categoryForm = this.$form.createForm(this, {
            onFieldsChange: (_, changedFields) => {},
            mapPropsToFields: () => {
              return {
                name: this.$form.createFormField({
                  value: postForm.name,
                }),
                  description: this.$form.createFormField({
                  value: postForm.description,
                }),
              };
            },
            onValuesChange: (_, values) => {},
          });
        })
        .catch((err) => {
          console.log(err);
        });

      this.drawerVisible = true;
    },
    onClose() {
      this.resetForm();
      this.drawerVisible = false;
      this.$emit('resetData', false);
    },
    resetForm() {
      this.categoryForm.resetFields();
    },
    handleSelectChange(value) {
      console.log(`Selected: ${value}`);
    },
  },
};
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
