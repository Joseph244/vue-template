<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZZF
 * @Date: 2020-06-08 15:31:51
 * @LastEditors: ZZF
 * @LastEditTime: 2020-06-09 17:04:08
-->
<style lang="less" module>
.contentArea {
    position: relative;
    background: rgba(4, 62, 61);
    box-shadow: 0px 0px 30px #0be5de inset;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
}
</style>
<template>
    <section :class="$style.contentArea">
        <router-view :key="key"></router-view>
        <!-- router-view key 属性解释: http://www.manongjc.com/detail/6-aitoddzqncxaegj.html -->
    </section>
</template>
<script>
export default {
    name: 'ContentArea',
    components: {},
    data() {
        return {};
    },
    computed: {
        key() {
            return this.$route.fullPath;
        }
    },
    methods: {}
};
</script>
