import 'babel-polyfill'
import { mount } from '@vue/test-utils'
import slide from '../mpvue-slide.vue'

describe('mpvue-slide', () => {
  const wrapper = mount(slide, {
    slots: {
      default: `<img src="" alt="" class="slide-img">`
    }
  })
  const WRAP_WIDTH = 200
  const SLIDE_WIDTH = 100
  const CLIENT_X = 123
  const mockMpEvent = {mp: {touches: [{clientX: CLIENT_X}]}}

  it('渲染正常', () => {
    expect(wrapper.find('.slide-img').exists()).toBe(true)
    expect(wrapper.contains('.mpvue-slide')).toBe(true)
    expect(wrapper.contains('.slide-wrap')).toBe(true)
  })

  it('props 正常', () => {
    wrapper.setProps({
      speed: 170,
      isStick: true
    })
    expect(wrapper.vm.speed).toBe(170)
    expect(wrapper.vm.isStick).toBe(true)
  })

  it('getSafeValue 如果值在区间内就返回原值，否者就返回边界', () => {
    const boundary = [-100, 0]
    const randomInBoundary = -Math.round(Math.random() * (boundary[1] - boundary[0]))
    // 边界检查
    expect(wrapper.vm.getSafeValue(1, boundary))
      .toBe(boundary[1])
    expect(wrapper.vm.getSafeValue(-101, boundary))
      .toBe(boundary[0])

    expect(wrapper.vm.getSafeValue(randomInBoundary, boundary)).toBe(randomInBoundary)
  })

  it('computed transBoundary 正常', () => {
    wrapper.setData({
      wrapWidth: 200,
      slideWidth: 100
    })
    expect(wrapper.vm.transBoundary).toEqual([-100, 0])
  })

})