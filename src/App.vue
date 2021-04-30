<template>
    <div :class="$style.main">
        <Header />
        <TopMenu />
        <div :class="$style.container">
            <!-- <LeftMenu /> -->
            <router-view :key="key" />
        </div>
    </div>
</template>
<script>
import Header from './views/layout/Header';
// import LeftMenu from './views/layout/LeftMenu.vue';
import TopMenu from './views/layout/TopMenu.vue';
export default {
    name: 'Main',
    components: {
        Header,
        // LeftMenu,
        TopMenu
    },
    computed: {
        key() {
            return this.$route.fullPath;
        }
    },
    mounted() {
        console.log(`当前系统名称:${process.env.VUE_APP_TITLE},客户端版本:${process.env.VUE_APP_VERSION}`);
        this.$store.commit('SET_ROUTES');  // 设置路由
        this.initQuery();
        this.$Bus.$on('init', vuexEventName => {
            this.initQuery(vuexEventName);
        });
    },
    methods: {
        // 全局监听转发事件
        initQuery(vuexEventName) {
            // 默认初始化操作
            if (!vuexEventName) {
                this.$store.dispatch('queryEquTypeList');
                this.$store.dispatch('queryBayUnitList');
                this.$store.dispatch('queryVoltageList');
                this.$store.dispatch('queryUnitList');
            } else {
                // vuex事件触发
                this.$store.dispatch(vuexEventName);
            }
        }
    }
};
</script>
<style lang="less" module>
.main {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: @bg;
    background-size: auto;
    box-sizing: border-box;
    .container {
        position: relative;
        width: 100%;
        height: calc(100% - 138px);
        padding-top: 6px;
        display: flex;
        justify-content: space-between;
        .contentArea {
            position: relative;
            height: 100%;
            width: 100%;
            overflow: auto;
            position: relative;
        }
    }
}
</style>
