<template>
  <div>
    <transition name="slide-down">
      <div class="title-wrapper" v-show="show">
        <div class="left">
          <span>返回</span>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <span>购物车</span>
            <span>用户</span>
            <span>更多</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['show'],
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
.slide-down-enter, .slide-down-leave-to {
  transform: translate3d(0,-100%,0);
}
.slide-down-enter-to, .slide-down-leave {
  transform: translate3d(0,0,0);
}
.slide-down-enter-active, .slide-down-leave-active{
  transition: all .3s linear;
}
.title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0,0,0,.15);
    background-color: #fff;
    span {
      margin-left: px2rem(5);
      font-size: px2rem(18);
    }
    .left {
      flex: 0 0 px2rem(60);
    }
    .right {
      flex: 1;
      .icon-wrapper {
        float: right;
      }
    }
  }
</style>
