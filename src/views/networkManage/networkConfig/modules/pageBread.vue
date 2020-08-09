<style lang="less" module>
.pageBread {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 4px 0;
    border-bottom: 1px dashed rgba(0, 153, 153, 0.4);
    .breadTitle {
        color: #00ffff;
        text-decoration: underline;
        i {
            margin-right: 4px;
        }
    }
}
</style>
<template>
    <div :class="$style.pageBread">
        <span :class="$style.breadTitle"><i class="el-icon-s-home"></i>{{ title }}</span>
        <BackIcon></BackIcon>
    </div>
</template>
<script>
export default {
    name: 'pageBread',
    props: {
        title: {
            type: String,
            required: true
        }
    },
    data() {
        return {};
    }
};
</script>
