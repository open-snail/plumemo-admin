<template>
  <a-form :form="form" class="article-form">
    <a-row :gutter="16">
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-item label="标题">
          <a-input
            style="width: 220px; max-width: 100%"
            :placeholder="$tv('article.form.titlePlaceholder', 'Please input title')"
            v-decorator="['alt']"
          />
        </a-form-item>
      </a-col>
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-item label="替代文本">
          <a-input
            style="width: 220px; max-width: 100%"
            :placeholder="$tv('article.form.titlePlaceholder', 'Please input title')"
            v-decorator="['description']"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import { isPlainObject } from '@vue-async/utils';
import { categoryApi, tagApi, authApi } from '@/includes/datas';

// Styles
import 'mavon-editor/dist/css/index.css';

export default {
  name: 'EditForm',
  components: {
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
      users: [],
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
        authorId: '',
        excerpt: '',
        thumbnail: { file: null, fileList: [] },
        categoryIds: [],
        tags: [],
        content: '',
      },
      restVals,
    );

    this.form = this.$form.createForm(this, {
      name: 'media_form',
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
    };
  },
  methods: {
    reset() {
      this.currentModel.content = '';
      this.form.resetFields();
    },
  },
};
</script>
