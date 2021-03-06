<template>
  <a-form :form="form" class="page-form">
    <a-row :gutter="16">
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-item :label="$tv('page.form.title', 'Title')">
          <a-input
            style="width: 220px; max-width: 100%"
            :placeholder="$tv('page.form.titlePlaceholder', 'Please input title')"
            v-decorator="['title', { rules: rules.title }]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="24">
        <a-form-item :label="$tv('page.form.content', 'Content')">
          <MavonEditor
            ref="md"
            :toolbars="markdownOption"
            :box-shadow="false"
            :subfield="false"
            :ishljs="true"
            :placeholder="$tv('page.form.contentPlaceholder', 'Please input content')"
            style="min-height: 335px; z-index: 5"
            class="editor ant-input"
            v-decorator="['content', { initialValue: '', rules: rules.content }]"
            @imgAdd="handleEditorImgAdd"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import { mavonEditor as MavonEditor } from 'mavon-editor';
import { isPlainObject } from '@vue-async/utils';
import { markdownOption } from '../constants';

// Styles
import 'mavon-editor/dist/css/index.css';

export default {
  name: 'EditForm',
  components: {
    MavonEditor,
  },
  props: {
    defaultValues: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      tags: [],
      categories: [],
      thumbnailList: [],
      markdownOption: markdownOption(),
    };
  },
  created() {
    const { thumbnail, ...restVals } = this.defaultValues;

    if (thumbnail) {
      this.thumbnailList = [
        {
          uid: '-1',
          name: 'thumbnail',
          status: 'done',
          url: thumbnail,
        },
      ];
    }
    const model = Object.assign(
      {
        title: '',
        content: '',
      },
      restVals,
    );

    this.form = this.$form.createForm(this, {
      name: 'page_form',
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

    this.rules = {
      title: [
        {
          required: true,
          message: this.$tv('page.form.titleRequired', 'Please input page title'),
          whitespace: true,
        },
      ],
      content: [{ required: true, message: this.$tv('page.form.contentRequired', 'Please input page content') }],
    };
  },
  methods: {
    reset() {
      this.currentModel.content = '';
      this.form.resetFields();
    },
    validate(callback) {
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const pureValues = { ...values };
          if (pureValues.thumbnail.file) {
            pureValues.thumbnail =
              pureValues.thumbnail.file.response && isPlainObject(pureValues.thumbnail.file.response)
                ? pureValues.thumbnail.file.response.extra
                : null;
          } else {
            pureValues.thumbnail = this.defaultValues.thumbnail || null;
          }

          callback(pureValues);
        }
      });
    },
    handleEditorImgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('file', $file);
      // uploadFile(formdata).then((res) => {
      //   console.log(res);
      //   const url = res.extra;
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   // $vm.$img2Url 详情见本页末尾
      //   this.$refs.md.$img2Url(pos, url);
      // });
    },
  },
};
</script>
