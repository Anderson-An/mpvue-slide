<style>
  .mpvue-slide {
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .mpvue-slide .slide-wrap {
    display: flex;
    width: max-content;
  }
</style>
<template>
   <div class="mpvue-slide">
     <div
      class="slide-wrap"
      @touchstart="touchstart"
      @touchmove="touchmove"
      :animation="animationData">
      <slot></slot>
     </div>
   </div>
</template>
<script>
  import { boundingClientRect, slideAnimate } from './utils/adapter'
  export default {
    props: {
      speed: {
        type: Number,
        default: 17
      },
      isStick: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        animationData: {
          transformOrigin: '50% 50%',
          duration: 300,
          timingFunction: 'ease',
          delay: 0
        },
        startX: 0,
        transX: 0,
        wrapWidth: 0,
        slideWidth: 0
      }
    },
    methods: {
      async touchstart (e) {
        // 获取startX 在mpvue中会有mp属性
        if (e.mp !== undefined) {
          this.startX = e.mp.touches[0].clientX
        } else {
          this.startX = e.touches[0].clientX
        }

        // 获取wrap层的宽度
        const $wrapRect = await boundingClientRect('.mpvue-slide>.slide-wrap')
        this.wrapWidth = $wrapRect.width

        const $slideRect = await boundingClientRect('.mpvue-slide')
        this.slideWidth = $slideRect.width
      },
      touchmove (e) {
        // 获取distance
        let moveX = 0
        if (e.mp !== undefined) {
          moveX = e.mp.touches[0].clientX
        } else {
          moveX = e.touches[0].clientX
        }

        const distance = moveX - this.startX
        this.startX = moveX
        this.transX = this.transX + distance
        // 边界检测
        this.transX = this.getSafeWidth(this.transX)
        // 创建动画 动画移动跟随distance
        this.animationData = slideAnimate(this.speed, this.transX, '.mpvue-slide>.slide-wrap')
      },
      /**
       * @desc 获取偏移的安全距离
       * @param {number} transX - 横向偏移量
       * @return {transX} 安全的便宜距离
       */
      getSafeWidth (transX) {
        const safeWidth = this.wrapWidth - this.slideWidth
        if (transX > 0) {
          return 0
        }
        if (transX < -safeWidth) {
          return -safeWidth
        }
        return transX
      }
    }
  }
</script>
