<template>
  <div class="antv-chart-mini">
    <div class="chart-wrapper" :style="{ height: 30 }">
      <v-chart :force-fit="true" :height="height" :data="data" :padding="[36, 5, 18, 5]" v-if="data !== null">
        <v-tooltip />
        <v-bar position="x*y" />
      </v-chart>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getViewsChart } from '@/api/dashboard'

// const data = []
// const beginDay = new Date().getTime()
//
// for (let i = 0; i < 10; i++) {
//   data.push({
//     x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
//     y: Math.round(Math.random() * 10)
//   })
// }
const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y
  })
]

const scale = [{
  dataKey: 'x',
  min: 0
}, {
  dataKey: 'y',
  title: '时间',
  min: 1
}]
export default {
  name: 'MiniBar',
  props: {
  },
  data () {
    return {
      data: null,
      tooltip,
      scale,
      height: 100
    }
  },
  created () {
    this.getViewsChart()
  },
  methods: {
    getViewsChart () {
      getViewsChart().then(response => {
        const data = []
        response.models.forEach(res => {
          data.push({
            x: moment(res.createTime).format('YYYY-MM-DD'),
            y: res.viewsTotal
          })
        })
        this.data = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "chart";
</style>
