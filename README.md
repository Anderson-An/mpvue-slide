# mpvue-slide
在小程序mpvue框架使用的侧滑组件
```
npm install mpvue-slide --save
```
```
<!-- speed是动画持续时间，可不传，默认为17ms -->
<slide :speed="100">
  <image  v-for="item in imgUrls" :key="item" :src="item" class="slide-image"  width="355" height="150"/>
</slide>

<script>
import slide from 'mpvue-slide'
export default {
  .
  .
  .
  components: {
    slide
  }
  .
  .
  .
}
</script>
```

Todo:
- [ ] 吸附  
![image](https://github.com/lulusir/mpvue-slide/blob/master/images/demo.gif)