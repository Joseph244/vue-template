<template>
    <svg aria-hidden="true">
        <use :xlink:href="icon"></use>
    </svg>
</template>

<script>
export default {
    name: 'icon-svg',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    computed: {
        icon() {
            return `#jsc-${this.name}`;
        }
    }
};

// 使用方式
// <svgIcon style="fill:red;width:40px;height:40px;" name="iotid" />;
</script>
