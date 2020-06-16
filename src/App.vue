<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZZF
 * @Date: 2020-06-08 15:31:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-08 18:26:43
-->
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
