<template>
  <div class="container">
    <div class="center">
      <!-- 登陆框 -->
      <div class="user">
        <p>账号登录</p>
        <!-- 用户名密码及登录按钮部分 -->
        <div class="form">
          <div class="acount">
            <svg t="1675902220431" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8173" width="25" height="25">
              <path d="M725.333333 721.066667l-38.4-38.4H379.733333l-38.4 38.4V768h384v-46.933333z m85.333334-38.4v170.666666H256v-170.666666h4.266667l85.333333-85.333334h375.466667l89.6 85.333334z m-85.333334-320c0 106.666667-85.333333 192-192 192S341.333333 469.333333 341.333333 362.666667 426.666667 170.666667 533.333333 170.666667 725.333333 256 725.333333 362.666667z m-85.333333 0C640 302.933333 593.066667 256 533.333333 256S426.666667 302.933333 426.666667 362.666667s46.933333 106.666667 106.666666 106.666666S640 422.4 640 362.666667z" fill="#444444" p-id="8174"></path>
            </svg>
            <input type="text" placeholder="账号" v-model="acount">
          </div>
          <div class="password">
            <svg t="1675902192965" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8034" width="25" height="25">
              <path d="M597.333333 469.333333v-42.666666h85.333334v42.666666h-85.333334z m-170.666666 0H341.333333V341.333333c0-93.866667 76.8-170.666667 170.666667-170.666666s170.666667 76.8 170.666667 170.666666v42.666667h-85.333334V341.333333c0-46.933333-38.4-85.333333-85.333333-85.333333s-85.333333 38.4-85.333333 85.333333v128z m-170.666667-42.666666h512v426.666666H256V426.666667z m85.333333 85.333333v256h341.333334v-256H341.333333z m170.666667 170.666667c-25.6 0-42.666667-17.066667-42.666667-42.666667s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666667z" fill="#444444" p-id="8035"></path>
            </svg>
            <input type="password" placeholder="密码" v-model="password">
          </div>
          <div>
            <button type="button" class="btn" @click="verify">马上登录</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 警示框部分 -->
    <van-dialog v-model="show" title="警告">
      <p>您输入的账号或密码不正确，请重新输入试试</p>
    </van-dialog>
    <!-- 底部部分 -->
    <div class="foot">
      <p>{{time}}</p>
    </div>
  </div>

</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      time: '',
      acount: '',
      password: '',
      show: false
    }
  },
  created() {
    var myTime = new Date()
    var year = myTime.getFullYear()
    var month = myTime.getMonth() + 1
    var day = myTime.getDate()
    this.time = `${year}年${month}月${day}日`
  },
  methods: {
    verify() {
      if (this.acount.trim() === 'admin' && this.password.trim() === 'admin') {
        this.updateIsLoginIn()
        this.$router.push('/userInfo')
      } else {
        this.show = true
      }
    },
    ...mapMutations(['updateIsLoginIn'])
  }
}
</script>

<style lang='less' scoped>
.user {
  p {
    text-align: center;
  }
  .acount {
    margin-left: 0.533333rem /* 20/37.5 */;
    input {
      border: 0;
      border-bottom: 1px solid #999;
      margin-bottom: 0.266667rem /* 10/37.5 */;
    }
  }
  .password {
    margin-left: 0.533333rem /* 20/37.5 */;
    input {
      border: 0;
      border-bottom: 1px solid #999;
    }
  }
  .btn {
    float: right;
    margin: 0.8rem /* 30/37.5 */;
    font-size: 0.533333rem /* 20/37.5 */;
  }
}
.foot {
  position: fixed;
  bottom: 16%;
  right: 0;
  text-align: center;
  font-size: 0.426667rem /* 16/37.5 */;
}
</style>