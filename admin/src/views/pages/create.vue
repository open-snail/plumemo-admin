<template>
  <div>
    <a-card
      size="small"
      :bordered="false"
      :style="{
        marginBottom: '10px',
        textAlign: 'right',
      }"
    >
      <a-button :title="$tv('page.btnTips.reset', 'Reset all fields')" @click="handleReset">
        {{ $tv('page.btnText.reset', 'Reset') }}
      </a-button>
      <a-button
        type="primary"
        :title="$tv('page.btnTips.save', 'Save the page and publish it')"
        @click.prevent.stop="handleSubmit"
      >
        {{ $tv('page.btnText.save', 'Save') }}
      </a-button>
      <a-button
        type="primary"
        :title="$tv('page.btnTips.saveToDraft', 'Save the page into draft box')"
        @click.prevent.stop="handleSubmit(true)"
      >
        {{ $tv('page.btnText.saveToDraft', 'Save to Draft') }}
      </a-button>
    </a-card>
    <a-card :bordered="false">
      <EditForm ref="form" :default-values="defaultValues" />
    </a-card>
    <a-card
      size="small"
      :bordered="false"
      :style="{
        marginTop: '10px',
        textAlign: 'right',
      }"
    >
      <a-button :title="$tv('page.btnTips.reset', 'Reset all fields')" @click="handleReset">
        {{ $tv('page.btnText.reset', 'Reset') }}
      </a-button>
      <a-button
        type="primary"
        :title="$tv('page.btnTips.save', 'Save the page and publish it')"
        @click.prevent.stop="handleSubmit"
      >
        {{ $tv('page.btnText.save', 'Save') }}
      </a-button>
      <a-button
        type="primary"
        :title="$tv('page.btnTips.saveToDraft', 'Save the page into draft box')"
        @click.prevent.stop="handleSubmit(true)"
      >
        {{ $tv('page.btnText.saveToDraft', 'Save to Draft') }}
      </a-button>
    </a-card>
  </div>
</template>

<router>
{
  meta:{
    title: 'New'
  }
}
</router>

<script>
import { pageApi } from '@/includes/datas';
import EditForm from './modules/EditForm';

export default {
  name: 'PageCreate',
  components: {
    EditForm,
  },
  data() {
    return {
      defaultValues: {
        author: '张三', // todo: 带上当前用户
      },
    };
  },
  methods: {
    handleReset() {
      this.$refs.form.reset();
    },
    handleSubmit(saveToDarft = false) {
      this.$refs.form.validate((values) => {
        const { tags, categoryIds, ...restValues } = values;
        const createParams = {
          tagsList: tags,
          categoryId: categoryIds.length ? categoryIds[0] : null, // todo: 多分类支持
          status: saveToDarft ? 1 : 2, // 1 草稿 2 文章
          ...restValues,
        };

        // 创建文章
        pageApi
          .create(createParams)
          .then(() => {
            this.$router.replace({ name: 'pages', params: { refresh: true } });
          })
          .catch((err) => {
            this.$notification.error({
              message: this.$tv(err.code || 500, err.message),
            });
          });
      });
    },
  },
};
</script>
