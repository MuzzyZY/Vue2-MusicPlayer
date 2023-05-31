<template>
  <div>
    <router-link to="/home">
      <van-icon name="arrow-left" />
    </router-link>
    <span style="font-size:20px">dj详情页</span>
    <van-dialog v-model="show" title="警告">
      <span style="font-size:14px">
        因不明白如何调用播放电台的相关API而取消dj详情页功能
      </span>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
  props: {
    list: {
      default: {},
      type: Object
    }
  },
  mounted() {
    // console.log(this.list)
  },
  methods() {
    Dialog.alert({
      title: '标题',
      message: '弹窗内容'
    }).then(() => {
      // on close
    })
  }
}
</script>

<style lang='less' scoped>
.van-icon-arrow-left {
  font-size: 0.533333rem /* 20/37.5 */;
}
</style>