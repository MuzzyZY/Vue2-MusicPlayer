import Vue from 'vue'
import Vuex from 'vuex'
import {getMusicLyric, getPhoneLogin} from '@/request/item.js'
import {service} from '@/request/api.js'
import { createStore } from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    playList:[{
      al:{
        id: 98552611,
        pic: 109951168144739040,
        picUrl: "https://p2.music.126.net/31bb_Z1fCOo2VZNSMDBRaw==/109951168144739034.jpg",
        pic_str: "109951168144739034"
      },
      ar:[{
        name:'Justin Bieber'
      }],
      name: "Come Around Me",
      id:1496770948,
  }],
  // 默认下标为0
  playListIndex:0 ,
  isbtnShow:true,
  // 歌曲详情页展示
  detailShow:false,
  // 歌词部分
  lyricList:{},
  // 当前时间
  currentTime:0,
  // 歌曲总时长
  duration:0,
  isLogin:false
},
  mutations:{
    updateIsbtnShow(state,value){
      state.isbtnShow = value
    },
    pushPlayList(state,value){
      state.playList.push(value)
    },
    updatePlayList(state,value){
      state.playList = value
    },
    updatePlayListIndex(state,value){
      state.playListIndex = value
    },
    updateDetailShow(state){
      state.detailShow =!state.detailShow
    },
    closeDetailShow(state){
      state.detailShow = false
    },
    updateLyricList(state,value){
      state.lyricList = value
    },
    updateCurrentTime(state,value){
      // console.log(state.currentTime)
      state.currentTime = value
    },
    updateDuration(state,value){
      state.duration = value
    },
    updateIsLoginIn(state){
      state.isLogin = true
    }
  },
  actions:{
    async getLyric(context,value) {
      let res = await getMusicLyric(value)
      context.commit('updateLyricList',res.data.lrc)
    },
  },
  modules:{}
})
// 设置默认播放列表
export default store