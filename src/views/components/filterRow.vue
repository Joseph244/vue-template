<style lang="less" module>
.filterRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: @background-secondary;
    padding: 6px 15px 6px 6px;
    margin-bottom: 6px;
    margin-top: 5px;
    &::before {
        content: '|';
        color: transparent;
        position: absolute;
        border-left: 4px solid @color-light;
        height: 4%;
        left: 0;
    }
    .left {
        display: flex;
        align-items: center;

        .title {
            font-size: 15px;
            color: @color-white;
            font-weight: bold;
            padding: 0 14px;
        }
    }
}
</style>
<template>
    <div :class="$style.filterRow">
        <div :class="$style.left">
            <label :class="$style.title"><i class="fa fa-filter"></i>检索项:</label>
            <slot></slot>
        </div>
        <div>
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
// import {} from '@/api'
export default {
    name: 'filterRow',
    data() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {}
};
</script>
