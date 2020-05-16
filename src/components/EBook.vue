<template>
  <div class="ebook">
    <title-bar :show="menuShow"></title-bar>
    <menu-bar
    :show="menuShow"
    ref="menuBar"
    :fontSizeList="fontSizeList"
    @setFontSize="handleSetFontSize"
    :themeList="themeList"
    :defaultTheme="defaultTheme"
    @setTheme="setTheme"
    @progressChange="onProgessChange"
    :progressAvaliable="bookAvaliable"
    ></menu-bar>
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
import TitleBar from './TitleNar'
import MenuBar from './MenuBar'
import Epub from 'epubjs'
const url = '/book.epub'
export default {
  data () {
    return {
      book: {},
      menuShow: false,
      bookAvaliable: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 }
      ],
      defaultTheme: 0,
      themeList: [
        {
          name: 'default',
          style: {
            body: {
              color: '#000', background: '#fff'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              color: '#000', background: '#ceeaba'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              color: '#fff', background: '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              color: '#000', background: 'rgb(241,236,226)'
            }
          }
        }
      ]
    }
  },
  components: {
    TitleBar, MenuBar
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
      this.themes = this.rendition.themes
      this.registerTheme()
      this.setTheme(0)
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        return this.book.locations.generate()
      }).then(location => {
        this.bookAvaliable = true
        this.locations = this.book.locations
        this.onProgessChange(50)
      })
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
      if (!this.menuShow) {
        this.$refs.menuBar.hideFontSetting()
      }
    },
    handleSetFontSize (fontSize) {
      console.log(fontSize)
      this.themes.fontSize(fontSize + 'px')
    },
    registerTheme () {
      this.themeList.forEach(v => {
        this.themes.register(v.name, v.style)
      })
    },
    setTheme (index) {
      this.themes.select(this.themeList[index].name)
    },
    onProgessChange (process) {
      console.log(process)
      const percentag = process / 100
      const location = percentag > 0 ? this.locations.cfiFromPercentage(percentag) : 0
      this.rendition.display(location)
    },
    jumpTo (href) {
      this.rendition.display(href)
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
