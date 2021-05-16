<style lang="less" module>
.Content {
    width: 100%;
    height: 100%;
    .chart {
        width: 100%;
        height: 50%;
    }
}
</style>
<template>
    <div :class="$style.Content">
        <div :class="$style.chart" id="echartsDomId32"></div>
    </div>
</template>
<script>
import echartsResize from '@/plugins/mixin/chartResize.js';
export default {
    name: 'Content',
    mixins: [echartsResize],
    data() {
        return {
            echartsDomId: 'echartsDomId32',
            alertTrendData: [
                {
                    time: '2020-10',
                    value: 80
                },
                {
                    time: '2020-11',
                    value: 74
                },
                {
                    time: '2020-12',
                    value: 60
                },
                {
                    time: '2021-01',
                    value: 56
                },
                {
                    time: '2021-02',
                    value: 68
                },
                {
                    time: '2021-03',
                    value: 40
                }
            ],
            diagnoseTrendData: [
                {
                    time: '2020-10',
                    value: 42
                },
                {
                    time: '2020-11',
                    value: 24
                },
                {
                    time: '2020-12',
                    value: 63
                },
                {
                    time: '2021-01',
                    value: 57
                },
                {
                    time: '2021-02',
                    value: 59
                },
                {
                    time: '2021-03',
                    value: 18
                }
            ]
        };
    },

    mounted() {
        this.setOption();
    },
    methods: {
        setOption() {
            let data = [];
            let data2 = [];
            for (let i of this.alertTrendData) {
                data.push([i.time, i.value]);
            }
            for (let i of this.diagnoseTrendData) {
                data2.push([i.time, i.value]);
            }
            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    top: 10,
                    right: 10,
                    data: ['监测类', '诊断类']
                },
                grid: {
                    top: '15%',
                    left: '2%',
                    right: '5%',
                    bottom: '0%',
                    containLabel: true,
                    show: true,
                    borderWidth: 1,
                    borderColor: '#4b7f7e'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    nameTextStyle: {
                        color: '#eaeeee'
                    },
                    splitLine: {
                        show: true
                    },
                    axisLabel: {
                        // y轴文字的配置
                        textStyle: {
                            color: '#eaeeee'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '数量'
                    // nameTextStyle: {
                    //     color: '#eaeeee'
                    // },
                    // axisLabel: {
                    //     // y轴文字的配置
                    //     textStyle: {
                    //         color: '#eaeeee'
                    //     }
                    // }
                },
                series: [
                    {
                        name: '监测类',
                        type: 'line',
                        data,
                        itemStyle: {
                            label: {
                                show: true,
                                color: '#eaeeee'
                            }
                        }
                    },
                    {
                        name: '诊断类',
                        type: 'line',
                        data: data2,
                        itemStyle: {
                            label: {
                                show: true,
                                color: '#eaeeee'
                            }
                        }
                    }
                ]
            };

            this.$chartMixinInitChart(option);
        }
    }
};
</script>
