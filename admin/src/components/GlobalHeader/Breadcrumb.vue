<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="item in breadList" :key="item.title">
      <nuxt-link v-if="item.isLink" :to="{ path: item.to || '/' }">{{ item.title }}</nuxt-link>
      <span v-else>{{ item.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import camelCase from 'lodash.camelcase';

export default {
  data() {
    return {
      name: '',
      breadList: [],
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      const list = [];
      // this.breadList.push({name: 'index', path: '/dashboard/', meta: {title: '首页'}})

      this.name = this.$route.name;
      const matched = this.$route.matched;
      matched.forEach(({ name, path, meta: { title } }, index) => {
        // item.name !== 'index' && this.breadList.push(item)
        if (index > 0) {
          const prevRoute = matched[index - 1];
          const { resolved } = this.$router.resolve(prevRoute.path);
          if (resolved.name === name) {
            // 嵌套路由与parent 路由相同，直接修改上一个的 title
            list[index - 1].title = (title && this.$tv(`breadcrumb.${camelCase(title)}`, title)) || name;
            return;
          }
          list[index - 1].isLink = true; // 最后一个不可点击
        }
        list.push({
          title: (title && this.$tv(`breadcrumb.${camelCase(title)}`, title)) || name,
          to: path,
        });
      });
      this.breadList = list;
    },
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
};
</script>

<style scoped></style>
