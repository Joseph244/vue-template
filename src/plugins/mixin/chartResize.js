import Echarts from 'echarts';
import lodashThrottle from 'lodash.throttle'; // 节流

export default {
    computed: {
        /**
         * @description 图表DOM获取与初始化
         * @param this.echartsDomId 在组建中data中申明的echarts的div id
         */
        $chartMixinWrapperDom() {
            const dom = document.getElementById(this.echartsDomId) || this.$refs[this.echartsDomId];
            return dom && Echarts.init(dom, 'customed', { renderer: 'svg' }); // 此处未采用canvas，采用svg显示清晰度和效果会更好
        },

        /** 图表resize节流，这里使用了lodash，也可以自己使用setTimout实现节流 */
        $chartMixinResize() {
            return lodashThrottle(() => this.$chartMixinWrapperDom.resize(), 400);
        }
    },
    mounted() {
        window.addEventListener('resize', this.$chartMixinResize);
    },
    methods: {
        //   在页面中要渲染echarts的地方调用
        $chartMixinInitChart(echartsOptions) {
            this.$chartMixinWrapperDom.setOption(echartsOptions);
        }
    },
    destroyed() {
        window.removeEventListener('resize', this.$chartMixinResize);
    }
};

// 使用方式： 目前只支持一个组件一个图表的情况

// template：支持id选择器定义或者ref定义（下面二选一）
// <div :class="$style.chart" id="echartsDomId32"></div>
// <div :class="$style.chart" ref="echartsDomId32"></div>

// <script>
// import echartsResize from '@/plugins/mixin/chartResize.js';
// export default {
//     mixins: [echartsResize],  // 需要的时候引入mixin
//     data() {
//         return {
//             echartsDomId: 'echartsDomId32'  // 图表的
//         };
//     },
//     mounted() {
//         this.setOption();
//     },
//     methods: {
//         setOption() {
//             const option = {
//                 tooltip: {
//                     trigger: 'axis'
//                 },
//                 legend: {
//                     top: 10,
//                     right: 10,
//                     data: ['监测类', '诊断类']
//                 },
//                 grid: {
//                     top: '15%',
//                     left: '2%',
//                     right: '5%',
//                     bottom: '0%',
//                     containLabel: true,
//                     show: true,
//                     borderWidth: 1,
//                     borderColor: '#4b7f7e'
//                 },
//                 xAxis: {
//                     type: 'category',
//                     boundaryGap: false,
//                     nameTextStyle: {
//                         color: '#eaeeee'
//                     },
//                     splitLine: {
//                         show: true
//                     },
//                     axisLabel: {
//                         // y轴文字的配置
//                         textStyle: {
//                             color: '#eaeeee'
//                         }
//                     }
//                 },
//                 yAxis: {
//                     type: 'value',
//                     name: '数量'
//                     // nameTextStyle: {
//                     //     color: '#eaeeee'
//                     // },
//                     // axisLabel: {
//                     //     // y轴文字的配置
//                     //     textStyle: {
//                     //         color: '#eaeeee'
//                     //     }
//                     // }
//                 },
//                 series: [
//                     {
//                         name: '监测类',
//                         type: 'line',
//                         data,
//                         itemStyle: {
//                             label: {
//                                 show: true,
//                                 color: '#eaeeee'
//                             }
//                         }
//                     },
//                     {
//                         name: '诊断类',
//                         type: 'line',
//                         data: data2,
//                         itemStyle: {
//                             label: {
//                                 show: true,
//                                 color: '#eaeeee'
//                             }
//                         }
//                     }
//                 ]
//             };
//             this.$chartMixinInitChart(option);   // mixin的方法，再需要绘制图表时调用
//         }
//     }
// };
