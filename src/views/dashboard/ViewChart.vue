<template>
  <div>
    <div id="viewData"></div>
  </div>
</template>

<script>
import moment from 'moment'
import G2 from '@antv/g2'
import { getPostsStatistics } from '@/api/dashboard'
const DataSet = require('@antv/data-set')
export default {
  name: 'ViewChart',
  props: {},
  components: {},
  data () {
    return {
      viewRecords: null,
      chart: null
    }
  },
  methods: {
    createView () {
      this.chart = new G2.Chart({
        container: 'viewData',
        forceFit: true,
        height: 410,
        padding: [20, 90, 60, 50]
      })

      // this.chart.render()
    },
    viewCharts (viewRecords, type = 'day') {
      const ds = new DataSet()
      const dv = ds.createView().source(viewRecords)
      dv.transform({
        type: 'map',
        callback: function callback (row) {
          if (type === 'day') {
            row.time = moment(row.createTime).format('HH:mm')
            row.date = moment(row.createTime).format('YYYY-MM-DD')
          } else if (type === 'week') {
            row.time = '周' + row.index
            // row.date = ''
          } else if (type === 'month') {
            row.time = moment(row.createTime).format('DD')
            row.date = moment(row.createTime).format('YYYY-MM')
          } else if (type === 'year') {
            row.time = (moment(row.createTime).month() + 1) + '月'
            row.date = moment(row.createTime).format('YYYY')
          } else {
            row.time = moment(row.createTime).format('YYYY-MM-DD')
            row.date = moment(row.createTime).format('YYYY-MM')
          }

          return row
        }
      })
      this.chart.axis('time', {
        label: {
          textStyle: {
            fill: '#aaaaaa'
          }
        }
      })
      this.chart.axis('viewTotal', {
        label: {
          textStyle: {
            fill: '#aaaaaa'
          },
          formatter: text => {
            return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
          }
        }
      })

      this.chart.source(dv, {
        time: {
          tickCount: 12
        },
        date: {
          type: 'cat'
        }
      })
      if (type === 'day') {
        this.chart.legend({
          position: 'bottom', // 设置图例的显示位置
          attachLast: false
        })
      } else {
        this.chart.legend(false)
      }

      if (type === 'others' || type === 'week') {
        this.chart
          .line()
          .position('time*viewTotal')
          .color('date', ['#1890ff'])
      } else {
        this.chart
          .line()
          .position('time*viewTotal')
          .color('date', ['#d9d9d9', '#1890ff'])
      }
      this.chart.render()
    },
    getPostsStatistics (type = 'day', startTime, endTime) {
      getPostsStatistics({ type, startTime, endTime }).then(response => {
        this.viewCharts(response.models, type)
      })
    }
  },
  mounted () {
    this.createView()
    this.getPostsStatistics()
  }
}
</script>

<style scoped></style>
