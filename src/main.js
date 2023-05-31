import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index.js'
// 导入vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
import icon from '@/assets/font_3880885_bopvla7vlue/iconfont.css'
import 'amfe-flexible'

import $ from 'jquery'

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')

