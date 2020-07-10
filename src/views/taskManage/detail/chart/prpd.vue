<style lang="less" module>
.container {
    width: 400px;
    height: 300px;

    > div {
        width: 100%;
        height: 100%;
    }
}
</style>

<template>
    <div :class="$style.container">
        <div ref="prpd"></div>
    </div>
</template>

<script>
export default {
    props: {
        phase: {
            type: Array,
            default() {
                return [];
            }
        },
        phaseAmps: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            chart: null
        };
    },
    methods: {
        getOption() {
            const dataArray = [];
            this.phase.map((item, index) => {
                const ampList = this.phaseAmps[index];
                ampList.map(value => dataArray.push([item, value]));
            });

            return {
                title: {
                    text: 'PRPD',
                    left: 'center',
                    textStyle: {
                        color: '#35fdf1',
                        fontSize: 16
                    }
                },
                color: ['#00ffff'],
                tooltip: {},
                grid: {
                    show: true,
                    top: 40,
                    left: 10,
                    right: 20,
                    bottom: 20,
                    borderColor: '#176d73',
                    containLabel: true
                },
                legend: {
                    show: false
                },
                xAxis: {
                    name: '相位（°）',
                    type: 'value',
                    nameLocation: 'center',
                    nameTextStyle: {
                        color: '#35fdf1',
                        fontSize: 12,
                        padding: [10, 0, 0, 0]
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#25939a'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#1fb6b4'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#136164'
                        }
                    },
                    min: 0,
                    max: 360,
                    interval: 90
                },
                yAxis: {
                    name: '幅值（dB）',
                    type: 'value',
                    boundaryGap: false,
                    nameTextStyle: {
                        color: '#35fdf1',
                        fontSize: 12
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#25939a'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#1fb6b4'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#136164'
                        }
                    },
                    min: -60,
                    max: 0
                },
                series: [
                    {
                        name: '幅值',
                        type: 'scatter',
                        symbolSize: 5,
                        data: dataArray
                    }
                ]
            };
        }
    },
    watch: {
        phase() {
            this.chart.setOption(this.getOption());
        },
        phaseAmps() {
            this.chart.setOption(this.getOption());
        }
    },
    mounted() {
        this.chart = this.$echarts.init(this.$refs['prpd']);
        this.chart.setOption(this.getOption());
    }
};
</script>
