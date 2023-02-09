<template>
  <div class="detai">
    <!-- 顶部信息及返回 -->
    <div class="top">
      <div class="name">
        <svg t="1675759409522" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3364" width="20" height="20" @click="updateDetailShow">
          <path d="M874.666667 480H224L514.133333 170.666667c12.8-12.8 10.666667-34.133333-2.133333-44.8s-32-10.666667-44.8 2.133333l-341.333333 362.666667c-2.133333 2.133333-4.266667 6.4-6.4 8.533333-2.133333 4.266667-2.133333 6.4-2.133334 10.666667s0 8.533333 2.133334 10.666666c2.133333 4.266667 4.266667 6.4 6.4 8.533334l341.333333 362.666666c6.4 6.4 14.933333 10.666667 23.466667 10.666667 8.533333 0 14.933333-2.133333 21.333333-8.533333 12.8-12.8 12.8-32 2.133333-44.8L224 544H874.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z" fill="#666666" p-id="3365"></path>
        </svg>
        <p class="songname" style="font-size:14px">{{this.musicList.name}}</p>
        <p v-for='item in musicList.ar' :key="item.id">
          {{item.name}}
        </p>
      </div>
    </div>
    <!-- 内容区域(图片) -->
    <div class="content" v-show="!isLyricShow">
      <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}">
      <img src="@/assets/cd.png" alt="" class="img_cd">
      <img :src="musicList.al.picUrl" alt="" @click="isLyricShow = true " class="img_cover" :class="{img_cover_active:!isbtnShow,img_cover_pause:isbtnShow}">
    </div>
    <!-- 歌词区域 -->
    <div class="musicLyric" style="font-size: 12px" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow = false">
      <p v-for="item in lyric" :key="item.id" :class="{active:(currentTime*1000>=item.time && currentTime*1000<item.pre)}">
        {{item.lrc}}
      </p>
    </div>
    <!-- 进度条 -->
    <!-- 最大值设定为歌曲的总长 -->
    <div>
      <input type="range" name="" id="range" min="0" :max="duration" v-model="currentTime" step="0.01" :disabled='true'>
    </div>
    <!-- 底部控制栏 -->
    <div class="bottom">
      <van-icon name="exchange" />
      <van-icon name="arrow-left" @click="goPlay(-1)" />
      <van-icon name="play-circle-o" @click="play" v-if="isbtnShow" />
      <van-icon name="pause-circle-o" @click='play' v-else />
      <van-icon name="arrow" @click="goPlay(1)" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  props: ['musicList', 'play', 'isbtnShow', 'addDuration'],
  data() {
    return {
      isLyricShow: false
    }
  },
  computed: {
    ...mapState(['lyricList', 'currentTime', 'playListIndex', 'playList', 'duration']),
    lyric() {
      let arr
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3) //切割分钟数
          let sec = item.slice(4, 6) //切割秒数
          let msec = item.slice(7, 10) //切割毫秒数
          let lrc = item.slice(11, item.length)
          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(msec)
          if (isNaN(Number(msec))) {
            msec = item.slice(7, 9)
            lrc = item.slice(10, item.length)
            time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(msec)
          }
          return { min, sec, msec, lrc, time }
        })
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000
          } else {
            item.pre = arr[i + 1].time
          }
        })
      }
      // console.log(arr)
      return arr
    }
  },
  // 监听currentTime
  watch: {
    currentTime(newVal) {
      let p = document.querySelector('p.active')
      if (p) {
        if (p.offsetTop > 270) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 270
        }
      }
      if (newVal === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0)
          this.play()
        } else {
          this.updatePlayListIndex(this.playListIndex + 1)
        }
      }
    }
  },
  created() {
    // console.log(this.lyricList.lyric)
  },
  mounted() {
    this.addDuration()
  },
  methods: {
    ...mapMutations(['updateDetailShow', 'updatePlayListIndex', 'updateCurrentTime']),
    goPlay(val) {
      let index = this.playListIndex + val
      if (index < 0) {
        index = this.playList.length - 1
      } else if (index == this.playList.length) {
        index = 0
      }
      this.updatePlayListIndex(index)
    }
  }
}
</script>

<style lang='less' scoped>
.top {
  height: 1.6rem /* 60/37.5 */;
  svg {
    float: left;
    margin-left: 0.4rem /* 15/37.5 */;
    padding-top: 0.32rem /* 12/37.5 */;
  }
  .name {
    margin-top: 5px;
    text-align: center;
    position: relative;
    p {
      margin: 0 auto;
      text-align: center;
      padding-top: 10px;
      margin-right: 1.066667rem /* 40/37.5 */;
      font-size: 0.373333rem /* 14/37.5 */;
      &:nth-child(n + 1) {
        padding-top: 0;
        font-size: 0.32rem /* 12/37.5 */;
        text-align: center;
      }
    }
  }
}
.content {
  width: 100%;
  height: 12rem /* 450/37.5 */;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    display: inline-block;
    width: 2.7rem /* 120/37.5 */;
    height: 4rem /* 150/37.5 */;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2.7rem /* 120/37.5 */;
    height: 4rem /* 150/37.5 */;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_cd {
    width: 6.666667rem /* 250/37.5 */;
    height: 6.666667rem /* 250/37.5 */;
    position: absolute;
    bottom: 3.066667rem /* 115/37.5 */;
    z-index: -1;
  }
  .img_cover {
    width: 4.266667rem /* 160/37.5 */;
    height: 4.266667rem /* 160/37.5 */;
    border-radius: 50%;
    position: absolute;
    bottom: 4.186667rem /* 157/37.5 */;
    animation: rotate_cover 12s linear infinite;
  }
  .img_cover_active {
    animation-play-state: running;
  }
  .img_cover_pause {
    animation-play-state: paused;
  }
  @keyframes rotate_cover {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 11.733333rem /* 440/37.5 */;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.266667rem /* 10/37.5 */;
  overflow: scroll;
  scroll-behavior: smooth;
  .active {
    color: lightseagreen;
    font-size: 0.4rem /* 15/37.5 */;
  }
  p {
    margin: 0;
    margin-bottom: 0.4rem /* 15/37.5 */;
    width: 80%;
    text-align: center;
    word-wrap: break-word;
    word-break: break-all;
  }
}
#range {
  width: 100%;
  height: 2px;
}
.bottom {
  position: fixed;
  bottom: 9%;
  font-size: 1.066667rem /* 40/37.5 */;
  i {
    margin-right: 0.853333rem /* 32/37.5 */;
    &:first-child {
      margin-left: 0.533333rem /* 20/37.5 */;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>