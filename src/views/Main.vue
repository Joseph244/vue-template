<template>
    <div :class="$style.main">
        <Header style="margin-bottom:10px" />
        <div :class="$style.container">
            <router-view />
        </div>
    </div>
</template>
<script>
import Header from './header.vue';
export default {
    name: 'Main',
    components: {
        Header,
    },
    mounted() {
        this.$store.commit('increment');
    }
};
</script>
<style lang="less" module>
.main {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: @bg;
    background-size: auto;

    .container {
        width: 100%;
        height: calc(100% - 90px);
    }
}
</style>
