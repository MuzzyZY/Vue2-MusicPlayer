<template>
  <div class="playSong">
    <!-- 底部播放区的左边部分 -->
    <div class="left" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div class="info">
        <p>{{playList[playListIndex].name}}</p>
      </div>
    </div>
    <!-- 底部播放区的右边部分 -->
    <div class="right">
      <i class="iconfont icon-timeout" @click="play" v-if='isbtnShow'></i>
      <i class="iconfont icon-play" @click="play" v-else></i>
    </div>
    <audio ref="audio" :src="` https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`" muted preload></audio>
    <!-- vant组件的popup弹出层 -->
    <van-popup v-model="detailShow" position="right" :overlay="false" :style="{width:'100%',height:'100%'}">
      <MusicDetail :addDuration="addDuration" :play=" play" :isbtnShow="isbtnShow" :musicList="playList[playListIndex]">
      </MusicDetail>
    </van-popup>
  </div>
</template>

<script>
import MusicDetail from '@/components/musicDetail.vue'
import { mapMutations, mapState } from 'vuex'
import { getMusicLyric } from '@/request/item.js'
export default {
  data() {
    return {
      interVal: 0
    }
  },
  components: {
    MusicDetail
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'isbtnShow', 'detailShow'])
  },
  mounted() {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    console.log(this.playList[this.playListIndex])
    this.updateTime()
  },
  updated() {
    // this.getSongLyric()
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    this.addDuration()
  },
  methods: {
    getSongLyric() {
      getMusicLyric(this.playList[this.playListIndex].id).then(res => {
        console.log(res.data.lrc)
      })
    },
    updateRange(val) {
      this.$refs.audio.currentTime = val
    },
    play() {
      // 判断是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.updateIsbtnShow(false)
        this.updateTime()
      } else {
        this.$refs.audio.pause()
        this.updateIsbtnShow(true)
        clearInterval(this.interVal)
      }
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration)
    },
    updateTime() {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 600)
    },
    ...mapMutations(['updateIsbtnShow', 'updateDetailShow', 'updateCurrentTime', 'updateDuration'])
  },
  watch: {
    // 监听下标 如果下标发生改变就自动播放音乐
    playListIndex() {
      this.$refs.audio.autoplay = true
      // 本来暂停状态点击后改变图标
      if (this.isbtnShow || !this.isbtnShow) {
        this.updateIsbtnShow(false)
      }
    },
    // 监听playlist
    playList() {
      if (this.isbtnShow) {
        this.$refs.audio.autoplay = true
        this.updateIsbtnShow(false)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.playSong {
  width: 100%;
  height: 1.333333rem /* 50/37.5 */;
  position: fixed;
  bottom: 1.333333rem /* 50/37.5 */;
  background-color: #fff;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.26666px;
  justify-content: space-between;
  .left {
    display: flex;
    width: 50%;
    justify-content: space-around;
    align-items: center;
    text-align: Justify;
    font-size: 0.426667rem /* 16/37.5 */;
    p {
      width: 100%;
      margin: 0;
      text-align: center;
      font-size: 0.32rem /* 12/37.5 */;
    }
    span {
      font-size: 0.32rem /* 12/37.5 */;
      text-align: center;
    }
    img {
      width: 1.333333rem /* 50/37.5 */;
      height: 1.333333rem /* 50/37.5 */;
      vertical-align: middle;
    }
  }
  .right {
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      font-size: 1.07rem;
    }
  }
}
</style>