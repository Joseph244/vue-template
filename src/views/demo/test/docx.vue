
​
<template>
    <div class="rolling overflow-hide" :style="{height: '50px'}">
        <!-- <div>
            <img src="../../../images/spriteImgs/able.png" />
            <img src="../../../images/spriteImgs/alert.png" />
            <img src="../../../images/spriteImgs/borderCorner.png" />
            <img src="../../../images/spriteImgs/equEvent.png" />
        </div> -->
        <i class="icon icon-equEvent"></i>
        <i class="icon icon-alert"></i>
        <i class="icon icon-high"></i>
        <i class="icon icon-leftArrow"></i>
        <i class="icon icon-offline"></i>
    </div>
</template>
 
<script>
export default {
  name: 'Rolling',
  props: {
    // 需要滚动内容列表, 默认数组
    eventWarning: {
      type: Array,
      default: () => {
        return [1,2,3,4,5,6,7,8,89]
      }
    },
    // 需要滚动内容的高度,默认Number
    rollingHeight: {
      type: Number,
      default: 40
    }
  },
  data () {
    return {
      isRolling: true
    }
  },
  watch: {
    rollingHeight (val, oldVal) {
      console.log(0)
      if (val && val !== oldVal) {
        console.log(1)
        // this.isRolling = this.$refs.rollingContainer.offsetHeight - this.rollingHeight > 0
        // this.$refs.rollingContainer.style.height = this.$refs.rollingContainer.offsetHeight * 2 + 'px';
      }
    }
  },
  mounted(){
    console.log(2)
        // this.$refs.rollingContainer.style.height = this.$refs.rollingContainer.offsetHeight * 2 + 'px';

  }
}
</script>
<style scoped>
.rolling{
  overflow: hidden;
  height: 60px;
}
.animation {
    animation: moving 5s linear infinite;
  }
  /*定义动画*/
  @keyframes moving {
    form {
      transform: translateY(0);
    }
    to {
      transform: translateY(-50%);
    }
  }

</style>