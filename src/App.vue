<template>
  <div id="app">
    <router-view></router-view>
    <!-- 播放组件 -->
    <MusicPlay></MusicPlay>
    <!-- router切换 -->
    <van-tabbar v-model="active" fixed class="navBar" active-color='rgb(155,9,9)'>
      <router-link to="/home">
        <van-tabbar-item icon="bookmark" @click="closeDetailShow">首页</van-tabbar-item>
      </router-link>
      <router-link to="/list">
        <van-tabbar-item icon="play-circle" @click="closeDetailShow">歌单</van-tabbar-item>
      </router-link>
      <router-link to="/userInfo">
        <van-tabbar-item icon="friends" @click="closeDetailShow">我的</van-tabbar-item>
      </router-link>
    </van-tabbar>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import MusicPlay from '@/components/playSong.vue'
export default {
  name: 'app',
  data() {
    return {
      active: 0
    }
  },
  components: {
    MusicPlay
  },
  methods: {
    ...mapMutations(['closeDetailShow'])
  }
}
</script>

<style lang='less' scoped>
.navBar {
  background-color: #fff;
  border-top: 0.026667rem /* 1/37.5 */ solid #999;
}
/deep/ .navBar .van-tabbar-item {
  margin-left: 1.92rem /* 72/37.5 */;
  margin-top: 0.16rem /* 6/37.5 */;
  color: rgb(194, 12, 12);
  line-height: 0.266667rem /* 10/37.5 */;
  background-color: #fff;
}
</style>