<style lang="less" module>
.logContent {
    .title {
        color: #00ffff;
        font-size: 15px;
        font-weight: bold;
    }
    .icon {
        float: right;

        color: #00ffff;
        font-size: 20px;
        cursor: pointer;
    }
    .icon:hover {
        color: @color-hover;
    }
    .content {
        margin-top: 8px;
        height: calc(100% - 30px);
        min-height: 300px;
        overflow-y: auto;
        border: 1px solid #006666;
        box-shadow: 0 0 10px #00cccc;
        word-break: break-all;

        > p:nth-child(2n) {
            background: #0b2121;
        }
    }
}
</style>
<template>
    <div :class="$style.logContent">
        <span :class="$style.title">日志</span>
        <i :class="$style.icon" class="el-icon-s-release" @click="clear"></i>
        <div :class="$style.content">
            <p v-for="(item, index) in logInfo" :key="index">{{ item }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'logContent',
    props: ['logInfo'],
    data() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {
        clear() {
            this.$parent.logInfo = [];
        }
    },
    created() {}
};
</script>
