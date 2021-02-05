import Echarts from 'echarts';
import lodashThrottle from 'lodash.throttle';

export default {
    computed: {
        /**
         * @description 图表DOM获取与初始化
         * @param this.echartsDomId 在组建中data中申明的echarts的div id
         */
        $chartMixinWrapperDom() {
            const dom = document.getElementById(this.echartsDomId) || this.$refs[this.echartsDomId];
            console.log('dom', dom);
            return dom && Echarts.init(dom);
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
