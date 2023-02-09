<template>
  <div class="musicList">
    <!-- 顶部返回栏 -->
    <div class="top">
      <div class="topBar">
        <svg t="1675712340201" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3364" width="20" height="20" @click="onClickLeft">
          <path d="M874.666667 480H224L514.133333 170.666667c12.8-12.8 10.666667-34.133333-2.133333-44.8s-32-10.666667-44.8 2.133333l-341.333333 362.666667c-2.133333 2.133333-4.266667 6.4-6.4 8.533333-2.133333 4.266667-2.133333 6.4-2.133334 10.666667s0 8.533333 2.133334 10.666666c2.133333 4.266667 4.266667 6.4 6.4 8.533334l341.333333 362.666666c6.4 6.4 14.933333 10.666667 23.466667 10.666667 8.533333 0 14.933333-2.133333 21.333333-8.533333 12.8-12.8 12.8-32 2.133333-44.8L224 544H874.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z" fill="#666666" p-id="3365"></path>
        </svg>
        <p @click="goTop">歌单</p>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        <div class="pic">
          <img :src="list.coverImgUrl" alt="">
          <span class="count">
            <van-icon name="play-circle-o" />
            {{changeCount(list.playCount)}}
          </span>
        </div>
        <div class="info">
          {{list.name}}
          <div class="author">
            <img :src="list.creator.avatarUrl" alt="">
            {{list.creator.nickname}}
          </div>
          <div class="disc">
            {{list.description}}
          </div>
        </div>
      </div>
    </div>
    <!-- 底部歌单内歌曲的渲染 -->
    <div class="bottom">
      <ul>
        <li v-for='(item,index) in songsList' :key="item.id" @click="playMusic(index)">
          <span class="index">{{index+1}}</span>
          <span class="info">
            <p class="name">{{item.name}}</p>
            <span class="author" v-for="(item1,index) in item.ar" :key="index">{{item1.name}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      songsList: []
    }
  },
  props: {
    list: {
      default: {},
      type: Object
    }
  },
  methods: {
    onClickLeft() {
      window.history.back()
    },
    goTop() {
      document.documentElement.scrollTop = 0
    },
    changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    },
    playMusic(i) {
      this.updatePlayList(this.songsList)
      this.updatePlayListIndex(i)
    },
    ...mapMutations(['updatePlayList', 'updatePlayListIndex'])
  },
  created() {
    let id = this.$route.query.id
    axios.get(`http://localhost:3000/playlist/track/all?id=${id}&limit=50&offset=0`).then(res => {
      this.songsList = res.data.songs
      // console.log(this.songsList)
    })
  }
}
</script>

<style lang='less' scoped>
.topBar {
  width: 100%;
  height: 1.333333rem /* 50/37.5 */;
  padding: 0.266667rem /* 10/37.5 */;
  box-sizing: border-box;
  position: fixed;
  background-color: #fff;
  p {
    margin-top: 0;
    display: inline-block;
    width: 8.333333rem /* 50/37.5 */;
    margin-bottom: 0;
    text-align: center;
    font-size: 0.426667rem /* 16/37.5 */;
  }
  svg {
    margin-top: 10px;
  }
}
.content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4.666667rem /* 175/37.5 */;
  padding-top: 1.333333rem /* 50/37.5 */;
  .pic {
    float: left;
    position: relative;
    width: 4.48rem /* 168/37.5 */;
    img {
      margin: 0.266667rem /* 10/37.5 */ 0.266667rem /* 10/37.5 */ 0.533333rem /* 20/37.5 */ 0.533333rem /* 20/37.5 */;
      width: 4rem /* 150/37.5 */;
      height: 4rem /* 150/37.5 */;
      border-radius: 0.32rem /* 12/37.5 */;
      vertical-align: middle;
    }
    .count {
      position: absolute;
      right: 0;
      top: 0.4rem /* 15/37.5 */;
      font-size: 0.32rem /* 12/37.5 */;
      color: #fff;
    }
  }
  .info {
    float: right;
    padding-top: 0.426667rem /* 16/37.5 */;
    padding-right: 0.213333rem /* 8/37.5 */;
    font-size: 0.426667rem /* 16/37.5 */;
    width: 4.533333rem /* 170/37.5 */;
    height: 3.866667rem /* 145/37.5 */;
    word-break: break-all;
    overflow: auto;
    white-space: normal;
    .author {
      margin-top: 0.266667rem /* 10/37.5 */;
      font-size: 0.373333rem /* 14/37.5 */;
      img {
        width: 0.8rem /* 30/37.5 */;
        height: 0.8rem /* 30/37.5 */;
        vertical-align: middle;
        border-radius: 0.4rem /* 15/37.5 */;
      }
    }
    .disc {
      margin-top: 0.373333rem /* 14/37.5 */;
      font-size: 0.32rem /* 12/37.5 */;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.bottom {
  margin-bottom: 2.666667rem /* 100/37.5 */;
  li {
    display: flex;
    height: 1.546667rem /* 58/37.5 */;
    justify-content: space-around;
    border-top: 0.026667rem /* 1/37.5 */ solid gainsboro;
    font-size: 0.373333rem /* 14/37.5 */;
    .index {
      display: inline-block;
      flex: 1;
      line-height: 1.653333rem /* 62/37.5 */;
      text-align: center;
    }
    .info {
      font-size: 0.373333rem /* 14/37.5 */;
      flex: 4;
      margin-bottom: 0.266667rem /* 10/37.5 */;
      .name {
        margin-bottom: 0;
        font-size: 0.346667rem /* 13/37.5 */;
      }
      .author {
        margin-right: 0.266667rem /* 10/37.5 */;
        font-size: 0.32rem; /* 12/37.5 */
      }
    }
    .mv {
      flex: 1;
    }
  }
}
</style>