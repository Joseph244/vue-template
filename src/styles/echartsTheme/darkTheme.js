// echarts Theme 主题(官网配置地址： https://echarts.apache.org/zh/theme-builder.html)
// dark 深色主题配置
const darkTheme = {
    color: [
        '#54d6e8',
        '#91cc75',
        '#bf9b19',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#38a4dd',
        '#ea6a3d',
        '#dbe555',
        '#edcc43',
        '#52dbd8',
        '#ade541',
        '#7bffdd',
        '#5db5b2',
        '#18db30',
        '#fcfc47',
        '#9a60b4',
        '#ea7ccc',
        '#52e2d8'
    ],
    backgroundColor: 'rgba(0, 0, 0, 0)',
    textStyle: {},
    title: {
        textStyle: {
            color: '#464646'
        },
        subtextStyle: {
            color: '#6E7079'
        }
    },
    line: {
        itemStyle: {
            borderWidth: 1
        },
        lineStyle: {
            width: 2
        },
        symbolSize: 4,
        symbol: 'emptyCircle',
        smooth: false
    },
    radar: {
        itemStyle: {
            borderWidth: 1
        },
        lineStyle: {
            width: 2
        },
        symbolSize: 4,
        symbol: 'emptyCircle',
        smooth: false
    },
    bar: {
        itemStyle: {
            barBorderWidth: '0',
            barBorderColor: '#eaeeee'
        }
    },
    pie: {
        itemStyle: {
            borderWidth: '0',
            borderColor: '#eaeeee'
        }
    },
    scatter: {
        itemStyle: {
            borderWidth: '0',
            borderColor: '#eaeeee'
        }
    },
    boxplot: {
        itemStyle: {
            borderWidth: '0',
            borderColor: '#eaeeee'
        }
    },
    parallel: {
        itemStyle: {
            borderWidth: '0',
            borderColor: '#eaeeee'
        }
    },
    sankey: {
        itemStyle: {
            borderWidth: '0',
            borderColor: '#eaeeee'
        }
    },
    funnel: {
        itemStyle: {
            borderWidth: '0',
            borderColor: '#eaeeee'
        }
    },
    gauge: {
        itemStyle: {
            borderWidth: '0',
            borderColor: '#eaeeee'
        }
    },
    candlestick: {
        itemStyle: {
            color: '#eb5454',
            color0: '#47b262',
            borderColor: '#eb5454',
            borderColor0: '#47b262',
            borderWidth: 1
        }
    },
    graph: {
        itemStyle: {
            borderWidth: '0',
            borderColor: '#eaeeee'
        },
        lineStyle: {
            width: 1,
            color: '#aaa'
        },
        symbolSize: 4,
        symbol: 'emptyCircle',
        smooth: false,
        color: ['#54d6e8', '#91cc75', '#bf9b19', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        label: {
            color: '#eaeeee'
        }
    },
    map: {
        itemStyle: {
            normal: {
                areaColor: '#eee',
                borderColor: '#444',
                borderWidth: 0.5
            },
            emphasis: {
                areaColor: 'rgba(255,215,0,0.8)',
                borderColor: '#444',
                borderWidth: 1
            }
        },
        label: {
            normal: {
                textStyle: {
                    color: '#000'
                }
            },
            emphasis: {
                textStyle: {
                    color: 'rgb(100,0,0)'
                }
            }
        }
    },
    geo: {
        itemStyle: {
            normal: {
                areaColor: '#eee',
                borderColor: '#444',
                borderWidth: 0.5
            },
            emphasis: {
                areaColor: 'rgba(255,215,0,0.8)',
                borderColor: '#444',
                borderWidth: 1
            }
        },
        label: {
            normal: {
                textStyle: {
                    color: '#000'
                }
            },
            emphasis: {
                textStyle: {
                    color: 'rgb(100,0,0)'
                }
            }
        }
    },
    // 只要设置x轴或者y轴为categoryAxis，即会使用下面的默认设置
    categoryAxis: {
        axisLine: {
            show: true,
            lineStyle: {
                color: '#1c7a7d'
            }
        },
        axisTick: {
            show: false,
            lineStyle: {
                color: '#eaeeee'
            }
        },
        axisLabel: {
            show: true,
            textStyle: {
                fontSize: 14,
                color: '#eaeeee'
            }
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: ['#4b7f7e']
            }
        },
        splitArea: {
            show: false,
            areaStyle: {
                color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
            }
        }
    },
    valueAxis: {
        // 坐标轴线
        axisLine: {
            show: true,
            lineStyle: {
                color: '#1c7a7d'
            }
        },
        // 坐标轴刻度
        axisTick: {
            show: false,
            lineStyle: {
                color: '#6E7079'
            }
        },
        axisLabel: {
            show: true,
            textStyle: {
                fontSize: 14,
                color: '#eaeeee'
            }
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: ['#1c7a7d']
            }
        },
        splitArea: {
            show: false,
            areaStyle: {
                color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
            }
        },
        // 坐标轴单位文字
        nameTextStyle: {
            fontSize: 14,
            color: '#eaeeee'
        }
    },
    logAxis: {
        axisLine: {
            show: false,
            lineStyle: {
                color: '#6E7079'
            }
        },
        axisTick: {
            show: false,
            lineStyle: {
                color: '#6E7079'
            }
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#6E7079'
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: ['#E0E6F1']
            }
        },
        splitArea: {
            show: false,
            areaStyle: {
                color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
            }
        }
    },
    timeAxis: {
        axisLine: {
            show: true,
            lineStyle: {
                color: '#6E7079'
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: '#6E7079'
            }
        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#6E7079'
            }
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: ['#E0E6F1']
            }
        },
        splitArea: {
            show: false,
            areaStyle: {
                color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
            }
        }
    },
    toolbox: {
        iconStyle: {
            normal: {
                borderColor: '#999'
            },
            emphasis: {
                borderColor: '#666'
            }
        }
    },
    legend: {
        textStyle: {
            color: '#eaeeee'
        }
    },
    tooltip: {
        axisPointer: {
            lineStyle: {
                color: '#ccc',
                width: 1
            },
            crossStyle: {
                color: '#ccc',
                width: 1
            }
        }
    },
    timeline: {
        lineStyle: {
            color: '#DAE1F5',
            width: 2
        },
        itemStyle: {
            normal: {
                color: '#A4B1D7',
                borderWidth: 1
            },
            emphasis: {
                color: '#FFF'
            }
        },
        controlStyle: {
            normal: {
                color: '#A4B1D7',
                borderColor: '#A4B1D7',
                borderWidth: 1
            },
            emphasis: {
                color: '#A4B1D7',
                borderColor: '#A4B1D7',
                borderWidth: 1
            }
        },
        checkpointStyle: {
            color: '#316bf3',
            borderColor: 'fff'
        },
        label: {
            normal: {
                textStyle: {
                    color: '#A4B1D7'
                }
            },
            emphasis: {
                textStyle: {
                    color: '#A4B1D7'
                }
            }
        }
    },
    visualMap: {
        color: ['#bf444c']
    },
    dataZoom: {
        backgroundColor: 'rgba(9,99,97,0)',
        borderColor: '#08b4ae',
        fillerColor: 'rgba(9,99,97,0.5)',
        handleStyle: {
            color: '#18a7a5',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        }
    },
    markPoint: {
        label: {
            color: '#eaeeee'
        },
        emphasis: {
            label: {
                color: '#eaeeee'
            }
        }
    }
};

export default darkTheme;
