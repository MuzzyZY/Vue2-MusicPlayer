<template>
  <div class="listContainer">
    <van-nav-bar title="歌单推荐" />
    <keep-alive>
      <ul>
        <li v-for="item in list" :key="item.id">
          <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
            <div class="song">
              <img :src="item.coverImgUrl" alt="" width="100px" height="100px">
              <p>{{item.name}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </keep-alive>
  </div>
</template>

<script>
import { getHotList } from '@/request/item.js'
export default {
  name: 'list',
  data() {
    return {
      list: []
    }
  },
  created() {
    getHotList().then(res => {
      this.list = res.data.playlists
    })
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar {
  width: 100%;
  position: fixed;
  z-index: 0;
}
ul {
  padding-top: 1.226667rem /* 46/37.5 */;
  li {
    float: left;
    &:last-child {
      padding-bottom: 2.666667rem;
    }
  }
}
.song {
  img {
    margin: 0 auto;
    vertical-align: middle;
    border-radius: 0.266667rem /* 10/37.5 */;
    padding-left: 1.066667rem /* 40/37.5 */;
  }
  p {
    margin-right: 0.266667rem /* 10/37.5 */;
    width: 4.72rem /* 177/37.5 */;
    height: 0.853333rem /* 32/37.5 */;
    font-size: 0.32rem /* 12/37.5 */;
    font-style: normal;
    color: #000;
  }
}
</style>