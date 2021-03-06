<template>
  <div class="app-container">
    <a-card :bordered="false">
      <a-row type="flex" justify="center">
        <a-col :span="6">
          <img
            src="http://localhost:8086/api/plumemo-service/files/45e99646-784f-4349-b1d4-fbf41906aeb1.jpeg"
            width="360"
            height="200"
          />
          <br />
          <br />
          <br />
          <div class="media-detail">
            <p>地址: </p>
            <p>文件名: aaa</p>
            <p>文件类型: aaa</p>
            <p>大小: aaa</p>
          </div>
        </a-col>
        <a-col :span="10">
          <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
            <a-form-item label="替换文本">
              <a-input v-decorator="['alt', { rules: [{ required: true, message: '请输入替换文本' }] }]" />
            </a-form-item>
            <a-form-item label="描述">
              <a-input v-decorator="['description', { rules: [{ required: true, message: '请输入替换描述' }] }]" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" html-type="submit"> Submit </a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<router>
{
  name:'medias-edit',
  meta:{
    title: 'Edit'
  }
}
</router>
<script>
export default {
  name: 'MediasEdit',
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    getMedia(id) {},
  },
};
</script>

<style>
.media-detail {
  font-size: 16px;
  font-weight: bold;
  color: rgb(58, 57, 57);
}
</style>