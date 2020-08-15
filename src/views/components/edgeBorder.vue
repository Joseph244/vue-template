<style lang="less" module>
.container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    --width: 20px;
    --height: 20px;
    --lineWidth: 1px;
    --color: transparent;

    .leftTop,
    .rightTop,
    .leftBottom,
    .rightButtom {
        position: absolute;
        width: var(--width);
        height: var(--height);
    }

    .leftTop {
        top: 0;
        left: 0;
        border-left: var(--lineWidth) solid var(--color);
        border-top: var(--lineWidth) solid var(--color);
    }
    .rightTop {
        top: 0;
        right: 0;
        border-right: var(--lineWidth) solid var(--color);
        border-top: var(--lineWidth) solid var(--color);
    }
    .leftBottom {
        bottom: 0;
        left: 0;
        border-left: var(--lineWidth) solid var(--color);
        border-bottom: var(--lineWidth) solid var(--color);
    }
    .rightButtom {
        bottom: 0;
        right: 0;
        border-right: var(--lineWidth) solid var(--color);
        border-bottom: var(--lineWidth) solid var(--color);
    }
}
</style>

<template>
    <div ref="con" :class="$style.container">
        <i :class="$style.leftTop"></i>
        <i :class="$style.rightTop"></i>
        <i :class="$style.leftBottom"></i>
        <i :class="$style.rightButtom"></i>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: Number,
            default: 20
        },
        height: {
            type: Number,
            default: 20
        },
        lineWidth: {
            type: Number,
            default: 1
        },
        color: {
            type: String,
            default: 'transparent'
        }
    },
    mounted() {
        this.$refs.con.style.setProperty('--width', this.width + 'px');
        this.$refs.con.style.setProperty('--height', this.height + 'px');
        this.$refs.con.style.setProperty('--lineWidth', this.lineWidth + 'px');
        this.$refs.con.style.setProperty('--color', this.color);
    }
};
</script>
