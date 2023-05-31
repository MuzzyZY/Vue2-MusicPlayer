<template>
  <div>
    <DjDetailList :list="djList"></DjDetailList>
  </div>
</template>

<script>
import service from '@/request/api.js'
import DjDetailList from '@/components/djDetailList.vue'
export default {
  data() {
    return {
      djList: {}
    }
  },
  created() {
    let id = this.$route.query.id
    service({
      url: `/dj/detail?rid=${id}`
    }).then(res => {
      this.djList = res.data
      // console.log(this.djList)
    })
  },
  components: {
    DjDetailList
  }
}
</script>

<style>
</style>