<style lang="less" module>
.container {
    width: 500px;
    height: 300px;
    margin: 0 20px;
    > div {
        width: 100%;
        height: 100%;
    }
}
</style>

<template>
    <div :class="$style.container">
        <div ref="prps"></div>
    </div>
</template>

<script>
export default {
    props: {
        cycleAmps: {
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
            this.cycleAmps.map((item, index) => {
                item.map(val => dataArray.push([val.phase, index + 1, val.value + 60]));
            });

            return {
                color: ['#29bfc8'],
                title: {
                    text: 'PRPS',
                    left: 'center',
                    textStyle: {
                        color: '#35fdf1',
                        fontSize: 16
                    }
                },
                tooltip: {},
                // visualMap: {
                //     max: 60,
                //     min: 0,
                //     top: 'bottom',
                //     left: 'right',
                //     inRange: {
                //         color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                //     }
                // },
                xAxis3D: {
                    name: '相位（°）',
                    type: 'value',
                    min: 0,
                    max: 360,
                    nameTextStyle: {
                        color: '#35fdf1',
                        fontSize: 14
                    }
                },
                yAxis3D: {
                    name: '周期（T）',
                    type: 'value',
                    nameTextStyle: {
                        color: '#35fdf1',
                        fontSize: 14
                    },
                    min: 0,
                    max: 50
                },
                zAxis3D: {
                    name: '幅值（dB）',
                    type: 'value',
                    nameTextStyle: {
                        color: '#35fdf1',
                        fontSize: 14,
                        top: 0
                    },
                    nameGap: 10,
                    min: 0,
                    max: 60,
                    axisLabel: {
                        formatter(value) {
                            return value - 60;
                        }
                    },
                    interval: 20
                },
                grid3D: {
                    top: -20,
                    axisTick: {
                        // show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#25939a'
                        }
                    },
                    axisLabel: {
                        // show: false,
                        textStyle: {
                            color: '#1fb6b4'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#136164'
                        }
                    },
                    axisPointer: {
                        lineStyle: {
                            color: '#29bfc8'
                        }
                    },
                    viewControl: {
                        maxDistance: 200,
                        minDistance: 200
                    }
                },
                series: [
                    {
                        animation: false,
                        type: 'bar3D',
                        data: dataArray,
                        shading: 'lambert',
                        barSize: 2,
                        tooltip: {
                            formatter(a, b, c) {
                                return `相位：${a.value[0]}°<br />周期：${a.value[1]}<br />幅值：${a.value[2]}dB`;
                            }
                        }
                    }
                ]
            };
        }
    },
    watch: {
        cycleAmps() {
            this.chart.clear();
            this.chart.setOption(this.getOption());
        }
    },
    mounted() {
        this.chart = this.$echarts.init(this.$refs['prps']);
        this.chart.setOption(this.getOption());
    }
};
</script>
