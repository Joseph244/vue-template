<style lang="less" module>
.miniBreadcrumb {
    color: #00ffff;
    padding: 8px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #006666;
    span {
        &:after {
            content: '→';
            color: #009999;
        }
    }
}
</style>
<template>
    <div :class="$style.miniBreadcrumb">
        <span v-for="(item, index) in data" :key="index">
            {{ item.label }}
        </span>
    </div>
</template>
<script>
export default {
    name: 'MinBbreadcrumb',
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data() {
        return {};
    },
    computed: {},
    watch: {},
    created() {},
    methods: {}
};
</script>
