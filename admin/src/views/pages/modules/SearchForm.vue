<template>
  <div class="table-page-search-wrapper">
    <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="8" :sm="24">
          <a-form-item :label="$tv('page.search.title', 'Title')">
            <a-input
              v-model="queryParam.title"
              :placeholder="$tv('page.search.titlePlaceholder', 'Please input search title')"
            />
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item :label="$tv('page.search.status')">
            <a-select
              v-model="queryParam.status"
              :placeholder="$tv('page.search.statusPlaceholder', 'Please choose search status')"
            >
              <a-select-option v-for="option in statusOptions" :key="option.value" :value="option.value">{{
                option.label
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <template v-show="advanced">
          <a-col :md="8" :sm="24">
            <!-- <a-form-item label="创建时间">
              <a-date-picker @change="dateChange" style="width: 100%" placeholder="请选择日期" />
            </a-form-item> -->
          </a-col>
        </template>
        <a-col :md="(!advanced && 8) || 24" :sm="24">
          <span
            class="table-page-search-submitButtons"
            :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
          >
            <a-button type="primary" @click="handlerSearch">{{ $tv('common.btn.search', 'Search') }}</a-button>
            <a-button style="margin-left: 8px" @click="handleReset">{{ $tv('common.btn.reset', 'Reset') }}</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ $tv(`common.btn.${advanced ? 'collapse' : 'expand'}`, advanced ? 'Collapse' : 'Expand') }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </span>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { PageStatus } from '@/includes/datas/enums';

export default {
  name: 'PageSearch',
  props: {
    title: {
      type: String,
      default: '',
    },
    status: {
      type: Number,
      default: null,
    },
    createTime: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        title: this.title,
        status: this.status,
        createTime: this.createTime,
      },
    };
  },
  computed: {
    statusOptions() {
      return [
        {
          value: null,
          label: this.$tv('page.status.all', 'All'),
        },
        {
          value: PageStatus.published,
          label: this.$tv('page.status.published', 'Published'),
        },
        {
          value: PageStatus.draft,
          label: this.$tv('page.status.draft', 'Draft'),
        },
      ];
    },
  },
  methods: {
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    dateChange(date, dateString) {
      if (dateString !== '') {
        this.queryParam.createTime = new Date(dateString[0]).getTime();
      } else {
        this.queryParam.createTime = null;
      }
    },
    handleReset() {
      this.queryParam = {
        title: this.title,
        status: this.status,
        createTime: this.createTime,
      };
    },
    handlerSearch() {
      this.$emit('search', this.queryParam);
    },
  },
};
</script>
