<template>
  <div class="popList">
    <!-- 顶部样式 -->
    <div class="musicTop">
      <div class="title">精选热门歌单</div>
      <router-link to="/list"><i class="iconfont icon-more_android_light"></i></router-link>
    </div>
    <keep-alive>
      <!-- 内容部分 -->
      <div class="musicList">
        <van-swipe :loop='false' width="100" :show-indicators='false' class="list-swipe" height="4.93rem">
          <van-swipe-item v-for="item in popMusicList" :key="item.id">
            <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
              <img :src="item.coverImgUrl" alt="">
              <span class="playCount">
                <van-icon name='play-circle-o'></van-icon>
                {{changeCount(item.playCount)}}
              </span>
              <span class="descr">{{item.name}}</span>
            </router-link>
          </van-swipe-item>
        </van-swipe>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import { getPopMusicList } from '@/request/item.js'
export default {
  data() {
    return {
      popMusicList: []
    }
  },
  created() {
    getPopMusicList().then(res => {
      this.popMusicList = res.data.playlists
      // console.log(this.popMusicList)
    })
  },
  methods: {
    changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.popList {
  height: 4.4rem;
  padding: 10px;
  display: -webkit-box; /* 或者是 -webkit-inline-box */
  overflow: hidden;
  -webkit-line-clamp: 4; /* 能够显示的最大行数 */
  -webkit-box-orient: vertical; /* 将盒子排列方向设置为纵向 */
  .musicTop {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.266rem;
    i {
      font-size: 0.533333rem /* 20/37.5 */;
    }
    .title {
      font-size: 0.48rem;
      font-weight: 700;
    }
  }
}
.musicList {
  height: 3.626667rem /* 136/37.5 */;
  .descr {
    display: inline-block;
    height: 0.53rem;
    font-size: 0.32rem;
    color: #000;
  }
  .playCount {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.32rem;
    color: #fff;
  }
  .list-swipe {
    height: 100%;
  }
  .van-swipe-item {
    height: 3.2rem;
    margin-right: 5px;
    position: relative;
    a {
      display: inline-block;
      text-align: center;
    }
  }
  img {
    width: 2.66rem;
    border-radius: 0.133rem;
  }
}
</style>