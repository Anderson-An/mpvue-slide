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
   <view class="mpvue-slide">
     <view
      class="slide-wrap"
      @touchstart="touchstart"
      @touchmove="touchmove"
      :animation="animationData">
      <slot></slot>
     </view>
   </view>
</template>
<script>
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
        slideWidth: 0
      }
    },
    methods: {
      touchstart (e) {
        // 获取startX
        this.startX = e.mp.touches[0].clientX
        // 获取wrap层的宽度
        const query = wx.createSelectorQuery()
        query.selectAll('.mpvue-slide>.slide-wrap').boundingClientRect((res) => {
          this.wrapWidth = res[0].width
        }).exec()
        // 获取slide层宽度
        query.selectAll('.mpvue-slide').boundingClientRect((res) => {
          this.slideWidth = res[0].width
        }).exec()
      },
      touchmove (e) {
        // 获取distance
        const moveX = e.mp.touches[0].clientX
        const distance = moveX - this.startX
        this.startX = moveX
        this.transX = this.transX + distance
        // 边界检测
        this.transX = this.getSafeWidth(this.transX)
        // 创建动画 动画移动跟随distance
        this.animationData = this.slideAnimate(this.speed, this.transX)
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
      },
      /**
       * @desc 生成滑动动画
       * @param {number} speed - 动画运行时间
       * @param {number} transX - 横向偏移量
       * @return {object} animationData
       */
      slideAnimate (speed, transX) {
        const animation = wx.createAnimation({
          transformOrigin: 'left top',
          timingFunction: 'linear',
          duration: speed || 17,
          delay: 0
        })
        animation.translateX(transX).step()
        return animation.export()
      }
    }
  }
</script>
