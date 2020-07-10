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
        data: function() {
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
                    trigger: 'axis'
                },
                grid: {
                    containLabel: true,
                    left: '3%',
                    right: '4%',
                    bottom: '3%'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        type: 'bar',
                        data: this.data
                    }
                ]
            };
        }
    },
    mounted() {
        this.$chartMixinInitChart(this.getOption());
    }
};
</script>