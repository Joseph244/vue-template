<style lang="less" module>
.systemHeader {
    width: 100%;
    height: 80px;
    padding: 0 20px;
    background: @header-bg;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div,
    .author {
        display: flex;
        align-items: center;
    }
    .author {
        color: @color-title;
    }
    .title {
        color: @color-title;
        font-size: 24px;
        letter-spacing: 2px;
        font-weight: bold;
    }

    .titleLogo {
        content: @logo;
        height: 54px;
        margin-right: 10px;
    }
    .icon {
        fill: @color-title;
        width: 30px;
        height: 30px;
        margin: 0 10px;
    }

    .fullScreenBtn {
        color: @color-title;
        font-size: 20px;
        margin-right: 20px;
        cursor: pointer;
    }
}
</style>
<template>
    <header :class="$style.systemHeader">
        <div>
            <img :class="$style.titleLogo" alt="" />
            <div :class="$style.title">
                {{ title }}
            </div>
        </div>
        <div>
            <el-tooltip effect="dark" :content="fullScreenFlag ? '退出全屏' : '全屏显示'" placement="top">
                <i :class="$style.fullScreenBtn" class="el-icon-full-screen" @click="fullScreen"></i>
            </el-tooltip>
            <div :class="$style.author">
                <!-- svg组件使用 -->
                <svgIcon :class="$style.icon" name="user" />
                <div>{{ authorName }}</div>
            </div>
        </div>
    </header>
</template>
<script>
import Api from '@/api/other';
import tools from '@/tools';
export default {
    name: 'Header',
    data() {
        return {
            fullScreenFlag: false,
            title: process.env.VUE_APP_TITLE
        };
    },
    computed: {
        authorName() {
            return this.$store.state.authorName || '管理员';
        }
    },
    methods: {
        fullScreen() {
            this.$tools.fullScreen();
            this.fullScreenFlag = !this.fullScreenFlag;
        }
    }
};
</script>
