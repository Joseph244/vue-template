<style lang='less' module>
.basebar {
    height: 100%;
    width: 100%;
}
</style>
<template>
    <div :class="$style.basebar" ref="mybar"></div>
</template>
<script>
import ChartMixin from '@/mixins/resize.js';
export default {
  name: 'basebar',
  mixins: [ChartMixin],
  props: {
    title: {
      type: String,
      default: ''
    },
    legend: { type: Array, default: () => { return [] } },
    xAxisData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      loading: true,
      echartsDomId: 'mybar'
    };
  },
  computed: {},
  watch: {
    // 数据更新重新画图
    data: function () {
      console.log(JSON.stringify(this.getOption()))
      this.$chartMixinInitChart(this.getOption());
    }
  },
  methods: {
    getOption() {
      return {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          textStyle: {
            color: 'white'
          },
          data: this.legend || [] // 所有设备类型
        },
        grid: {
          containLabel: true,
          left: '2%',
          right: '2%',
          bottom: '2%'
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value',
          }
        ],
        series: this.data
        //  {
        //     name: '设备类型名称',
        //     type: 'bar',
        //     stack: 'xxx电站',
        //     data: [120, 132, 101, 134, 90, 230, 210]
        // },
      };
    }
  },
  mounted() {
    this.$chartMixinInitChart(this.getOption());
  }
};
</script>