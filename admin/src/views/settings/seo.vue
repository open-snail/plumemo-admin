<template>
  <div class="app-container">
    <a-card :bordered="false">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="描述">
          <a-input v-decorator="['description', { rules: [{ required: true, message: '请输入描述!' }] }]" />
        </a-form-item>
        <a-form-item label="关键词">
          <a-input v-decorator="['keywords', { rules: [{ required: true, message: '输入你站点的关键!' }] }]" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit"> 提交 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { optionsApi } from '@/includes/datas/options';
export default {
  name: 'SettingsSeo',
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated_' }),
      optionsNameList: ['keywords', 'description'],
      model: {},
      membership: false,
    };
  },
  fetch() {
    return Promise.all([this.getOptions()]).catch(() => {
      // ignoer error
    });
  },
  created() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);

          let arr = [];
          Object.keys(values).forEach((key) => {
            console.log(key, values[key]);
            arr.push({
              configKey: key,
              configValue: values[key],
            });
          });
          optionsApi.create(arr).then((res) => {
            console.log(res);
          });
        }
      });
    },
    getOptions() {
      optionsApi.getList(this.optionsNameList.join(',')).then((res) => {
        let model = res.rows.reduce((obj, curr) => {
          obj[curr['configKey']] = curr['configValue'];
          return obj;
        }, {});

        this.form = this.$form.createForm(this, {
          name: 'coordinated',
          mapPropsToFields: () => {
            // 默认值
            return Object.keys(model).reduce((prev, key) => {
              prev[key] = this.$form.createFormField({
                value: model[key],
              });
              return prev;
            }, {});
          },
        });
      });
    },
  },
};
</script>
>>>>>>> 0a47e65bca7632b4292452bc3b32a6c124b0c1ef
