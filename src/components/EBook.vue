<template>
  <div>
    <div class="read-wrapper">
      <div id="read"></div>
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
    }
  },
  created() {
    this.showEpub()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
</style>
