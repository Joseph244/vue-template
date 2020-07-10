<template>
    <div :class="$style.main">
        <Header></Header>
        <div :class="$style.container">
            <LeftMenu @changeRoute="changeRoute"></LeftMenu>
            <ContentArea></ContentArea>
        </div>
    </div>
</template>
<script>
import Header from './Header.vue';
import LeftMenu from './LeftMenu.vue';
import ContentArea from './ContentArea.vue';
export default {
    name: 'Main',
    components: {
        Header,
        LeftMenu,
        ContentArea
    },
    mounted() {
        this.$store.commit('SET_ROUTES');
        this.$store.dispatch('equDict');
    },

    methods: {
        changeRoute(params) {
            this.$router
                .push({
                    name: params.name
                })
                .catch(err => {
                    err;
                });
        }
    }
};
</script>
<style lang="less" module>
.main {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: @bg;
    background-size: auto;
    padding: 5px; // padding默认是不算在内容区域的（也就是说padding会撑大宽高的），border-box可以把边框和内边距放入框中
    box-sizing: border-box;
    .container {
        position: relative;
        width: 100%;
        height: calc(100% - 70px);
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        .contentArea {
            position: relative;
            background: rgba(4, 62, 61);
            box-shadow: 0px 0px 30px #0be5de inset;
            height: 100%;
            width: 100%;
            overflow: auto;
            position: relative;
        }
    }
}
</style>
