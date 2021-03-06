<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="文章数量" :total="quantityObject.articleTotal" v-if="quantityObject !== null">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <span>草稿箱  {{ quantityObject.draftTotal}}</span>
            <a-divider type="vertical" />
            <span>已发布  {{ quantityObject.publishTotal}}</span>
            <a-divider type="vertical" />
            <span>评论  {{ quantityObject.commentsTotal}}</span>
          </div>
          <template slot="footer">今日发布<span> {{ quantityObject.todayPublishTotal}}</span></template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="用户数量" :total="countPerson.total" v-if="countPerson !== null">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>

          <template slot="footer">今日新增<span> {{ countPerson.newUserTotal}}</span></template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="系统信息" :total="systemInfo.usedRatio + '%'" v-if="systemInfo !== null">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <a-progress :percent="systemInfo.usedRatio" size="small" status="active" />
          </div>
          <template slot="footer">
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>内存 {{ systemInfo.total }}GB</span>
              </template>
              内存 {{ systemInfo.total }}GB
            </a-tooltip>
            <a-divider type="vertical" />
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>系统 {{ systemInfo.osName }}</span>
              </template>
              系统 {{ systemInfo.osName }}
            </a-tooltip>
            <a-divider type="vertical" />
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>JDK {{ systemInfo.javaVersion }}</span>
              </template>
              JDK {{ systemInfo.javaVersion }}
            </a-tooltip>
          </template>
        </chart-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { deviceMixin } from '@/mixins';
import { dashboardApi } from '@/includes/datas';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  RankList,
  Bar,
  Trend,
  NumberInfo,
  MiniSmoothArea,
  Ellipsis,
} from '@/components';
export default {
  name: 'Analysis',
  mixins: [deviceMixin],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea,
    Ellipsis,
  },
  data() {
    return {
      loading: true,
      countPerson: null,
      quantityObject: null,
      systemInfo: null,
 
    };
  },
  created() {
    this.getPostsQuantityTotal();
    this.getSystem();
    this.getUsersQuantityTotal();
    setTimeout(() => {
      this.loading = !this.loading;
    }, 1000);
  },
  methods: {
    getPostsQuantityTotal() {
      dashboardApi.getPostsQuantityTotal().then((response) => {
        this.quantityObject = response.model;
      });
    },
    getSystem() {
      dashboardApi.getSystem().then((response) => {
        this.systemInfo = response.model;
      });
    },
    getUsersQuantityTotal() {
      dashboardApi.getUsersQuantityTotal().then((response) => {
        this.countPerson = response.model;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);
  /deep/ .ant-card-head {
    position: relative;
  }
}

.dashboard-analysis-iconGroup {
  i {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: color 0.32s;
    color: black;
  }
}
.analysis-salesTypeRadio {
  position: absolute;
  right: 54px;
  bottom: 12px;
}
</style>