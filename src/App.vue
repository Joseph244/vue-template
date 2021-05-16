<template>
    <router-view :key="key" />
</template>
<script>
export default {
    name: 'App',
    computed: {
        key() {
            return this.$route.fullPath;
        }
    },
    mounted() {
        console.log(`当前系统名称:${process.env.VUE_APP_TITLE},客户端版本:${process.env.VUE_APP_VERSION}`);
        this.$store.commit('SET_ROUTES'); // 设置路由
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
            } else {
                // vuex事件触发
                this.$store.dispatch(vuexEventName);
            }
        }
    }
};
</script>
