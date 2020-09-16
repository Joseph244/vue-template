<template>
    <Main />
</template>
<script>
import Main from './views/layout/Main';
export default {
    name: 'App',
    components: {
        Main
    },
    mounted() {
        console.log(`当前环境：${process.env.VUE_APP_ENV}, 版本号：${process.env.VUE_APP_VERSION}`);
    }
};
</script>
<style>
/* @keyframes labelMove {
    0% {
        left: 0px;
        transform: translate(0, 0);
    }
    100% {
        left: 100%;
        transform: translate(-100%, 0);
    }
} */
</style>