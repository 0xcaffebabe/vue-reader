<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="show" :class="{'hide-box-shadow': fontSettingShow || !show}">
        <div class="icon-wrapper">
          <span>菜单</span>
        </div>
        <div class="icon-wrapper">
          <span @click="showSetting(2)">进度</span>
        </div>
        <div class="icon-wrapper">
          <span @click="showSetting(1)">主题</span>
        </div>
        <div class="icon-wrapper">
          <span @click="fontSettingShow = !fontSettingShow;showSetting(0)">字号</span>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="fontSettingShow">
        <div class="setting-font-size" v-if="showFlag == 0">
          <div class="preview" :style="{'font-size': fontSizeList[0].fontSize + 'px'}">A</div>
          <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index">
            <div class="point"
            @click="setFontSize(item.fontSize)"
            :class="{active : defaultFontSize == item.fontSize}">.</div>
          </div>
          <div class="preview" :style="{'font-size': fontSizeList[fontSizeList.length-1].fontSize + 'px'}">A</div>
        </div>
        <div class="setting-theme" v-else-if="showFlag == 1">
          <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index">
            <div class="preview"
            :style="{background: item.style.body.background}"
            @click="$emit('setTheme', index)"
            ></div>
            <div class="text">{{item.name}}</div>
          </div>
        </div>
        <div class="setting-progress" v-else-if="showFlag== 2">
          <input type="range" style="width:100%" min="0" max="100" step="1"
          v-model="progress"
          @change="$emit('progressChange',progress)"
          v-if="progressAvaliable"
          >
          <span v-else>加载中</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['show', 'fontSizeList', 'defaultTheme', 'themeList', 'progressAvaliable'],
  data () {
    return {
      fontSettingShow: false,
      defaultFontSize: 14,
      showFlag: 2,
      progress: 0
    }
  },
  methods: {
    showSetting (flag) {
      this.fontSettingShow = true
      this.showFlag = flag
    },
    hideFontSetting () {
      this.fontSettingShow = false
    },
    setFontSize (fontSize) {
      this.defaultFontSize = fontSize
      this.$emit('setFontSize', fontSize)
    }
  },
  created () {
    console.log(this.themeList)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global';
.slide-up-enter, .slide-up-leave-to {
  transform: translate3d(0,px2rem(108),0);
}
.slide-up-enter-to, .slide-up-leave {
  transform: translate3d(0,0,0);
}
.slide-up-enter-active, .slide-up-leave-active{
  transition: all .3s linear;
}
.menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
    background-color: #fff;
    .icon-wrapper {
      flex: 1;
      font-size: px2rem(18);
      height: px2rem(48);
      line-height: px2rem(48);
    }
}
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  width: 100%;
  height: px2rem(60);
  background-color: #fff;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
  z-index: 101;
  .setting-font-size{
    display: flex;
    height: 100%;
    .preview {
      float: 0 0 px2rem(40);
      @include center;
    }
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
  }
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        height: px2rem(36);
        border: p2xrem(3) solid #000;
      }
      .text {
        flex: 0 0 px2rem(30);
        font-size: px2rem(16);
        color: #333;
        @include center;
      }
    }
  }
}
.hide-box-shadow {
  box-shadow: none;
}
.hide-border-top {
  border-top: none!important;
}
.active {
  color: red;
}
</style>
