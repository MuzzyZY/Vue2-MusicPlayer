<template>
  <div class="container">
    <div class="search">
      <svg t="1675883790115" class="icon icon-search" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3364" width="20" height="20" @click="$router.go(-1)">
        <path d="M874.666667 480H224L514.133333 170.666667c12.8-12.8 10.666667-34.133333-2.133333-44.8s-32-10.666667-44.8 2.133333l-341.333333 362.666667c-2.133333 2.133333-4.266667 6.4-6.4 8.533333-2.133333 4.266667-2.133333 6.4-2.133334 10.666667s0 8.533333 2.133334 10.666666c2.133333 4.266667 4.266667 6.4 6.4 8.533334l341.333333 362.666666c6.4 6.4 14.933333 10.666667 23.466667 10.666667 8.533333 0 14.933333-2.133333 21.333333-8.533333 12.8-12.8 12.8-32 2.133333-44.8L224 544H874.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z" fill="#666666" p-id="3365"></path>
      </svg>

      <input type="text" placeholder="请输入搜索关键字" v-model="searchKey" @keydown.enter="enterKey" />
    </div>
    <div class="itemList">
      <ul>
        <li class="item" v-for="(item,i) in searchList" :key="i" @click="updateIndex(item)">
          <div class="itemLeft">
            <span>{{i+1}}</span>
          </div>
          <div class="itemRight">
            <p>{{item.name}}</p>
            <span v-for="(item1,index) in item.artists" :key="index" class="singerName">
              {{item1.name}}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSearch } from '@/request/item.js'
export default {
  data() {
    return {
      searchKey: '',
      searchList: []
    }
  },
  methods: {
    async enterKey() {
      let res = await getSearch(this.searchKey.trim())
      if (res.data.result.songs) {
        this.searchList = res.data.result.songs
        // console.log(this.searchList)
        this.searchKey = ''
      } else {
        alert('搜索请求失败，请换一个关键词搜索')
      }
    },
    updateIndex(item) {
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      item.ar = item.artists
      // 这里是把搜索中点击的歌push到了playlist中所以不会继续播放后面的歌曲
      this.$store.commit('pushPlayList', item)
      this.$store.commit('updatePlayListIndex', this.$store.state.playList.length - 1)
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  padding-bottom: 2.666667rem /* 100/37.5 */;
}
.search {
  position: relative;
  .icon-search {
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
.itemList {
  .item {
    display: flex;
    justify-content: space-between;
    font-size: 0.426667rem /* 16/37.5 */;
    border-bottom: 1px solid #999;
    .itemLeft {
      flex: 1;
      padding-top: 0.373333rem /* 14/37.5 */;
      text-align: center;
      line-height: 1.2rem /* 45/37.5 */;
    }
    .itemRight {
      flex: 5;
      margin-bottom: 0.426667rem /* 16/37.5 */;
      p {
        margin-bottom: 0;
      }
      .singerName {
        font-size: 0.32rem; /* 12/37.5 */
      }
    }
  }
}
</style>