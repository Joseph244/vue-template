<template>
    <Main />
</template>
<script>
import Main from './views/Main';
export default {
    name: 'App',
    components: {
        Main
    },
    mounted() {
        console.log(`版本号：${process.env.VUE_APP_VERSION}`);
    }
};
</script>
