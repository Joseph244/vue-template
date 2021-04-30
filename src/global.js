// 工程约定的全局变量，会在vue原型链直接载入（此处会打包压缩，若需要打包后可修改则存放在/public/config/WENV.js，通过window.xxx访问）
const INNERGLOBALDATA = {
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
    globalFun: () => {
        console.info('全局函数');
    }
};
const global = {
    install: function(Vue, options) {
        for (let g of Object.keys(INNERGLOBALDATA)) {
            Vue.prototype[g] = INNERGLOBALDATA[g];
        }
    }
};
export default global;
