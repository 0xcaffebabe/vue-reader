<template>
  <div class="ebook">
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="previous"></div>
        <div class="center"></div>
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
      book: {}
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
    }
  },
  created () {
    this.showEpub()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
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
}
</style>
