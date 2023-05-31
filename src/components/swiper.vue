<template>
  <div class="swiperContainer">
    <div class="swiper">
      <van-swipe :autoplay="3000" indicator-color="white" loop>
        <van-swipe-item v-for="(image,index) in bannerDate" :key='index'>
          <img :src="image.pic" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      bannerDate: []
    }
  },
  created() {
    // 获取banner图数据
    axios.get('http://localhost:3000/banner?type=2').then(res => {
      if (res.data.code === 200) {
        this.bannerDate = res.data.banners
      }
    })
  }
}
</script>

<style lang='less' scoped>
.swiper img {
  height: 4.4rem;
}
</style>