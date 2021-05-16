<style lang="less" module>
.center {
    width: 1200px;
    height: 800px;
}
</style>
<template>
    <div :class="$style.center">
        <div id="center_map" style="width:100%;height:100%;"></div>
    </div>
</template>
<script>
import '@/tools/echartsMap';
export default {
    name: 'center',
    data() {
        return {
            mapPoints: {
                // 常州
                Changzhou: [
                    {
                        name: '变压器有载分接开关监测诊断系统',
                        value: [119.9, 31.84, 10]
                    },
                    {
                        name: '网络化油色谱管控系统',
                        value: [119.34, 31.77, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [119.36, 31.29, 0]
                    }
                ],

                // 淮安数据
                Huaian: [
                    {
                        name: '变压器有载分接开关监测诊断系统',
                        value: [119.13, 33.65, 0]
                    },
                    {
                        name: '网络化油色谱管控系统',
                        value: [119.17, 33.46, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [119.08, 32.95, 0]
                    }
                ],

                // 连云港
                Lianyungang: [
                    {
                        name: '网络化油色谱管控系统',
                        value: [119.06, 34.98, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [119.61, 34.5, 0]
                    }
                ],

                // 南通
                Nantong: [
                    {
                        name: '网络化油色谱管控系统',
                        value: [121.13, 31.86, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [120.37, 32.19, 0]
                    },
                    {
                        name: '红外智能诊断分析系统',
                        value: [120.57, 32.49, 0]
                    }
                ],

                // 苏州
                Suzhou: [
                    {
                        name: '变压器有载分接开关监测诊断系统',
                        value: [120.75, 31.77, 0]
                    },
                    {
                        name: '网络化油色谱管控系统',
                        value: [120.73, 31.25, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [120.65, 31.97, 0]
                    },
                    {
                        name: '紫外智能诊断分析系统',
                        value: [120.52, 31.26, 0]
                    },
                    {
                        name: '红外智能诊断分析系统',
                        value: [120.85, 31.12, 0]
                    }
                ],

                // 南京
                Nanjing: [
                    {
                        name: '电流互感器油压监测系统',
                        value: [118.81, 32.4, 0]
                    },
                    {
                        name: '老旧电缆智能诊断系统',
                        value: [118.5, 32.05, 0]
                    },
                    {
                        name: '网络化油色谱管控系统',
                        value: [118.9, 32.1, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [119.0, 31.61, 0]
                    },
                    {
                        name: '主设备知识库',
                        value: [118.8, 31.35, 0]
                    },
                    {
                        name: '红外智能诊断分析系统',
                        value: [119.2, 31.39, 0]
                    }
                ],

                // 泰州数据
                Taizhou: [
                    {
                        name: '变压器有载分接开关监测诊断系统',
                        value: [119.88, 32.5, 0]
                    },
                    {
                        name: '电流互感器油压监测系统',
                        value: [120.09, 32.12, 0]
                    },
                    {
                        name: '网络化油色谱管控系统',
                        value: [119.9, 32.2, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [120.09, 32.12, 0]
                    }
                ],

                // 无锡数据
                Wuxi: [
                    {
                        name: '网络化油色谱管控系统',
                        value: [120.42, 31.69, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [120.25, 31.6, 0]
                    },
                    {
                        name: '红外智能诊断分析系统',
                        value: [120.45, 31.79, 0]
                    }
                ],

                // 宿迁数据
                Suqian: [
                    {
                        name: '网络化油色谱管控系统',
                        value: [118.28, 33.72, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [118.31, 33.95, 0]
                    }
                ],

                // 徐州数据
                Xuzhou: [
                    {
                        name: '网络化油色谱管控系统',
                        value: [117.68, 34.33, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [116.94, 34.85, 0]
                    },
                    {
                        name: '紫外智能诊断分析系统',
                        value: [117.88, 33.8, 0]
                    }
                ],

                // 盐城数据
                Yancheng: [
                    {
                        name: '网络化油色谱管控系统',
                        value: [119.84, 34.06, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [120.3, 33.14, 0]
                    },
                    {
                        name: '紫外智能诊断分析系统',
                        value: [119.72, 33.86, 0]
                    }
                ],

                // 扬州数据
                Yangzhou: [
                    {
                        name: '网络化油色谱管控系统',
                        value: [119.48, 32.84, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [119.58, 32.48, 0]
                    },
                    {
                        name: '红外智能诊断分析系统',
                        value: [119.15, 32.32, 0]
                    }
                ],

                // 镇江数据
                Zhenjiang: [
                    {
                        name: '储能电站火灾预警系统',
                        value: [119.54, 31.89, 0]
                    },
                    {
                        name: '网络化油色谱管控系统',
                        value: [119.41, 32.08, 0]
                    },
                    {
                        name: '输变电设备自然灾害预警系统',
                        value: [119.43, 32.22, 0]
                    }
                ]
            },
            chart: null
        };
    },
    computed: {
        // 地图上的点数据
        pointData() {
            let arr = [];
            for (let i of Object.keys(this.mapPoints)) {
                for (let j of this.mapPoints[i]) {
                    arr.push(j);
                }
            }
            return arr;
        }
    },
    mounted() {
        // 构建chart对象
        this.chart = this.$echarts.init(document.getElementById('center_map'), { renderer: 'svg' });
        this.initMapChart();
    },
    methods: {
        initMapChart() {
            let option = {
                geo3D: {
                    map: 'jiangsu',
                    // environment: 'rgba(7,86,86,0.5)',
                    shading: 'lambert',
                    left: -40,
                    top: -30,
                    viewControl: {
                        distance: 104,
                        panMouseButton: 'left',
                        rotateMouseButton: 'right',
                        animation: true,
                        alpha: 45,
                        beta: -20
                        // center: this.positionInfo[this.city]
                    },
                    label: {
                        show: true,
                        textStyle: {
                            fontSize: 18,
                            color: 'black',
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            padding: 3
                        }
                    },
                    // splitArea: {
                    //     show: true,
                    //     areaStyle: {
                    //         color: 'red'
                    //     }
                    // },
                    itemStyle: {
                        color: 'rgb(30,131,125)',
                        opacity: 0.6,
                        borderWidth: 1,
                        borderColor: '#00bcb6'
                    }, // 地图上每个省的颜色配置
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: 20,
                                fontWeight: 'bold',
                                backgroundColor: 'rgba(255,255,255,1)',
                                color: '#000'
                            }
                        }
                        // itemStyle: {
                        //     color: 'rgb(30,131,125)',
                        //     opacity: 0.8,
                        //     borderColor: '#00bcb6',
                        //     borderWidth: 1
                        // }
                    }
                },
                series: [
                    {
                        name: '系统分布',
                        type: 'scatter3D',
                        symbol: 'pin', //  'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow',
                        coordinateSystem: 'geo3D',
                        shading: 'lambert',
                        data: this.pointData,
                        symbolSize: 26,
                        itemStyle: {
                            color: '#00da8a'
                        },
                        emphasis: {
                            itemStyle: {
                                fontSize: 20,
                                fontWeight: 'bold'
                            },
                            label: {
                                show: true,

                                textStyle: {
                                    padding: 5,
                                    fontSize: 22,
                                    backgroundColor: 'rgba(255,255,255,1)',
                                    color: 'black'
                                },
                                formatter: params => {
                                    return params.data.name;
                                }
                            }
                        }
                    }
                ]
            };

            this.chart.clear();
            this.chart.setOption(option);
        }
    }
};
</script>
