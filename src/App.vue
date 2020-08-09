<template>
    <Main></Main>
</template>
<script>
import Main from './views/layout/Main';
export default {
    name: 'app',
    components: {
        Main
    },
    mounted() {
        console.log(`当前环境：${process.env.VUE_APP_SECRET}, 版本号：${process.env.VUE_APP_VERSION}`);
    }
};
</script>
