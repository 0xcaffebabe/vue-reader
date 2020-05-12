<template>
  <div class="ebook">
    <transition name="slide-down">
      <div class="title-wrapper" v-show="menuShow">
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
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="menuShow">
        <div class="icon-wrapper">
          <span>菜单</span>
        </div>
        <div class="icon-wrapper">
          <span>开关</span>
        </div>
        <div class="icon-wrapper">
          <span>亮度</span>
        </div>
        <div class="icon-wrapper">
          <span>字号</span>
        </div>
      </div>
    </transition>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="previous"></div>
        <div class="center" @click="toggleMenu"></div>
        <div class="right" @click="next"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Epub from 'epubjs'
const url = '/book.epub'
export default {
  data () {
    return {
      book: {},
      menuShow: false
    }
  },
  methods: {
    showEpub () {
      // 生成Book
      this.book = new Epub(url)
      console.log(this.book)
      // 生成 Rendition
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      // 渲染电子书
      this.rendition.display()
    },
    previous () {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    next () {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    toggleMenu () {
      this.menuShow = !this.menuShow
    }
  },
  created () {
    this.showEpub()
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
.slide-up-enter, .slide-up-leave-to {
  transform: translate3d(0,100%,0);
}
.slide-up-enter-to, .slide-up-leave {
  transform: translate3d(0,0,0);
}
.slide-up-enter-active, .slide-up-leave-active{
  transition: all .3s linear;
}
.ebook {
  position: relative;
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      z-index: 100;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 px2rem(100);
        // background: pink;
      }
      .center {
        flex: 1;
        // background: skyblue;
      }
      .right {
        flex: 0 0 px2rem(100);
        // background: deepskyblue;
      }
    }
  }
  .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0,0,0,.5);
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
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.5);
    background-color: #fff;
    .icon-wrapper {
      flex: 1;
      font-size: px2rem(18);
      height: px2rem(48);
      line-height: px2rem(48);
    }
  }
}
</style>
