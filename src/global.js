// 工程全局变量
const globalData = {
    // 板子类型字典
    PANELTYPES: {
        DEVICE: '边缘',
        MCB: '主控'
    },
    // 专业类型字典
    MAJORTYPES: {
        1: '输电',
        2: '变电'
    },
    // 传感器类型
    SENSORTYPES: {
        0: '微功率',
        1: '低功耗'
    },
    // 平台通道类型
    ACCESSTYPES: {
        1: '4G',
        2: '内网'
    },
    globalFun: () => {
        alert('全局函数');
    }
};
const global = {
    install: function(Vue, options) {
        for (let g of Object.keys(globalData)) {
            Vue.prototype[g] = globalData[g];
        }
    }
};
export default global;
