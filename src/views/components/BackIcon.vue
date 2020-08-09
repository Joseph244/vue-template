<style lang='less' module>
.backIcon {
    cursor: pointer;
    color: #00ffff;
    font-weight: bold;
    img {
        height: 1em;
        position: relative;
        top: 3px;
        left: 4px;
        right: 16px;
    }
    &:hover {
        color: @color-hover;
    }
}
</style>
<template>
  <div
    :class="$style.backIcon"
    @click="routeBack"
  >
    返回<img src="../../images/backIcon.png">
  </div>
</template>
<script>
export default {
    name: 'BackIcon',

    methods: {
        routeBack() {
            this.$router.back();
        }
    }
};
</script>