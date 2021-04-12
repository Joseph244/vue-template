<template>
    <div class="warp">
        <ul ref="annn" class="ul-item animation">
            <li v-for="(item, index) in listData" :key="index" class="li-item">
                {{ item }}
            </li>
            <li v-for="(item, index) in listData" :key="index" class="li-item">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'Example03Basic',
    data () {
      return {
        listData: [1, 222222222, 3, 4, 5, 6],
        classOption: {
          limitMoveNum: 0,
          direction: 2,
        }
      }
    },
    mounted(){
      console.log(this.$refs.annn.offsetWidth, this.$refs.annn.style.width)
      this.$refs.annn.style.width = this.$refs.annn.offsetWidth / 2 + 'px'
    }
  }
</script>

<style lang="less" scoped>
:global{
.animation {
    width: max-content;   // 此时由于放了两遍子元素，所以max-content的宽度是子元素的两倍；结合this.$refs.annn.style.width = this.$refs.annn.offsetWidth / 2 + 'px'，使得滚动距离为实际子元素的宽度
    // width: 300px;  // 子元素的总宽度
    animation: moving 2s linear infinite;
  }
  /*定义动画*/
  @keyframes moving {
    form {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);   // 此处的100%是指.wrap，实际应该是所有元素的总长才对
    }
  }
  .warp {
    width: 200px;
    height: 120px;
    margin: 0 auto;
    overflow: hidden;
    border: 1px solid red;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      &.ul-item {
        display: flex;
        .li-item {
          width: fit-content;
          height: 120px;
          margin-right: 10px;
          line-height: 120px;
          background-color: #999;
          color: #fff;
          text-align: center;
          font-size: 30px;
        }
      }
    }
  }
}

</style>
