<style lang="less" module>
.contentArea {
    position: relative;
    background: rgba(4, 62, 61, 0.3);
    box-shadow: 0px 0px 10px #0be5de inset;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
}
</style>
<template>
    <section :class="$style.contentArea">
        <router-view :key="key"></router-view>
        <!-- router-view key 属性解释: 由于 Vue 会复用相同组件, 即 /page/1 => /page/2 或者 /page?id=1 => /page?id=2 这类链接跳转时, 将不在执行created, mounted之类的钩子，为了避免这种情况，参考：
         http://www.manongjc.com/detail/6-aitoddzqncxaegj.html -->
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
