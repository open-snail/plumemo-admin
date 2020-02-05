<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="文章数量" :total="quantityObject.articleTotal" v-if="quantityObject !== null">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <span>草稿箱  {{ quantityObject.draftTotal }}</span>
            <a-divider type="vertical" />
            <span>已发布 {{ quantityObject.publishTotal }}</span>
            <a-divider type="vertical" />
            <span>已同步 {{ quantityObject.syncTotal }}</span>
          </div>
          <template slot="footer">今日发布<span> {{ quantityObject.todayPublishTotal }}</span></template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="同步文章效果" :total="countPerson.viewsTotal | NumberFormat" v-if="countPerson !== null">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar/>
          </div>
          <template slot="footer" >
            文章 <span>{{ countPerson.articleTotal }}</span>
            <a-divider type="vertical" />
            点赞 <span>{{ countPerson.favorsTotal }}</span>
            <a-divider type="vertical" />
            评论 <span>{{ countPerson.commentsTotal }}</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="8" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="系统信息" :total="memoryInfo.usedRatio+ '%'" v-if="systemInfo !== null && memoryInfo !== null">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <a-progress :percent="memoryInfo.usedRatio" size="small" status="active" />
          </div>
          <template slot="footer">
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>内存 {{ memoryInfo.total }}GB</span>
              </template>
              内存 {{ memoryInfo.total }}GB
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

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a href="#" @click="dataHandler('day')">今日</a>
              <a href="#" @click="dataHandler('week')">本周</a>
              <a href="#" @click="dataHandler('month')">本月</a>
              <a href="#" @click="dataHandler('year')">本年</a>
            </div>
            <a-range-picker :style="{width: '256px'}" @change="dateChange" />
          </div>
          <a-tab-pane tab="访问量" key="1">
            <a-row>
              <a-col :xl="14" :lg="10" :md="12" :sm="24" :xs="24">
                <ViewChart ref="viewChart" :videoRecords="viewRecords"></ViewChart>
              </a-col>
              <a-col :xl="10" :lg="12" :md="12" :sm="24" :xs="24">
                <div class="ant-table-wrapper">
                  <a-table
                    row-key="index"
                    size="small"
                    :columns="rankingTableColumns"
                    :dataSource="rankingData"
                    :pagination="{ pageSize: 8 }"
                  >
                  </a-table>
                </div>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea, Ellipsis } from '@/components'
import { mixinDevice } from '@/utils/mixin'
import { fetchBolgQuantityTotal, getPostsRanking, getCountPerson, getViewsChart } from '@/api/dashboard'
import { getSystem, getMemory } from '@/api/monitor'
import ViewChart from './ViewChart'
import moment from 'moment'

const rankingTableColumns = [
  {
    dataIndex: 'index',
    title: '排名',
    width: 90
  },
  {
    dataIndex: 'title',
    title: '文章标题'
  },
  {
    dataIndex: 'viewTotal',
    title: '访问量'
  },
  {
    dataIndex: 'userTotal',
    title: '用户数'
  }
]

export default {
  name: 'Analysis',
  mixins: [mixinDevice],
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
    ViewChart
  },
  data () {
    return {
      loading: true,

      rankingTableColumns,
      rankingData: null,
      countPerson: null,
      viewsChart: null,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      quantityObject: null,
      systemInfo: null,
      memoryInfo: null,
      viewRecords: null,
      xAxis: null
    }
  },
  created () {
    this.loadBolgQuantityTotal()
    this.getSystem()
    this.getMemory()
    this.getPostsRanking()
    this.getCountPerson()
    this.getViewsChart()
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  methods: {
    loadBolgQuantityTotal () {
      fetchBolgQuantityTotal().then(response => {
        this.quantityObject = response.model
      })
    },
    getSystem () {
      getSystem().then(response => {
        this.systemInfo = response.model
      })
    },
    getMemory () {
      getMemory().then(response => {
        this.memoryInfo = response.model
      })
    },
    getCountPerson () {
      getCountPerson().then(response => {
        this.countPerson = response.model
      })
    },
    getViewsChart () {
      getViewsChart().then(response => {
        const data = []
        response.models.forEach(res => {
          data.push({
            x: moment(res.createTime).format('YYYY-MM-DD'),
            y: res.viewsTotal
          })
        })
        this.viewsChart = data
      })
    },
    getPostsRanking (type = 'day', startTime, endTime) {
      getPostsRanking({ type, startTime, endTime }).then(response => {
        this.rankingData = response.models
      })
    },
    dataHandler (type) {
      this.getPostsRanking(type)
      this.$refs.viewChart.getPostsStatistics(type)
    },
    dateChange (date, dateString) {
      this.getPostsRanking('others', new Date(dateString[0]).getTime(), new Date(dateString[1]).getTime())
      this.$refs.viewChart.getPostsStatistics('others', new Date(dateString[0]).getTime(), new Date(dateString[1]).getTime())
    }
  }
}
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
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }
</style>
