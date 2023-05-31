<template>
  <div>
    <MusicList :list="playList"></MusicList>
  </div>
</template>

<script>
import axios from 'axios'
import MusicList from '@/components/musicList.vue'
export default {
  data() {
    return {
      playList: {}
    }
  },
  created() {
    let id = this.$route.query.id
    axios.get(`http://localhost:3000/playlist/detail?id=${id}`).then(res => {
      // console.log(res)
      this.playList = res.data.playlist
    })
  },
  components: {
    MusicList
  }
}
</script>

<style>
</style>