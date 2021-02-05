<style lang="less" module>
.filterRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: @background-white-secondary;
    padding: 10px 15px 10px 6px;
    padding: 10px 15px 10px 6px;
    border: 1px solid @background-primary;
    border-radius: 5px;
    margin-bottom: 6px;
    &::before {
        content: '|';
        color: transparent;
        position: absolute;
        border-left: 4px solid @color-light;
        height: 4%;
        left: 13px;
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
    name: 'FilterRow',
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() {},
    methods: {}
};
</script>
