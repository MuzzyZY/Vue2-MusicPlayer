<template>
  <div class="homeContainer">
    <!-- 搜索栏 -->
    <div class="search">
      <van-icon name="search" class="icon-search" />
      <router-link to="/search">
        <input type="text" name="" placeholder="请输入搜索关键词">
      </router-link>
    </div>
    <!-- 轮播图 -->
    <Swiper></Swiper>
    <!-- 推荐歌单列表 -->
    <RecList></RecList>
    <!-- 精品热门歌单列表 -->
    <PopRecList></PopRecList>
    <!-- 精品最新歌单列表 -->
    <ClassicMusicList></ClassicMusicList>
    <!-- 电台列表 -->
    <DjList></DjList>
  </div>
</template>

<script>
import Swiper from '@/components/swiper.vue'
import RecList from '@/components/recommandList.vue'
import PopRecList from '@/components/popRecList.vue'
import ClassicMusicList from '@/components/ClassicMusicList.vue'
import DjList from '@/components/djList.vue'
export default {
  name: 'home',
  data() {
    return {}
  },
  components: {
    Swiper,
    RecList,
    PopRecList,
    ClassicMusicList,
    DjList
  }
}
</script>

<style lang='less' scoped>
.search {
  border: 1px solid #999;
  position: relative;
  .van-icon-search {
    position: absolute;
    top: 20%;
    left: 1%;
  }
}
input {
  outline-style: none;
  border-radius: 3px;
  padding: 0.266667rem /* 10/37.5 */;
  margin-left: 60px;
  width: 80%;
  font-size: 14px;
  font-family: 'Microsoft soft';
  background: transparent;
  border: 1px solid #ffffff;
}
</style>