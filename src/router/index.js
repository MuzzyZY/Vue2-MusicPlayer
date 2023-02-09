import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Home from '../views/homeView.vue'
import List from '../views/listView.vue'
import User from '../views/userInfo.vue'

import ItemMusic from '../views/musicList/itemMusic.vue'
import DjMusic from '../views/musicList/djMusic.vue'
import Search from '@/components/search.vue'
import store from '@/store/index.js'
import Login from '@/components/login.vue'
Vue.use(VueRouter)


const routes = [
  {path: '/',redirect:'/home'},
  {path: '/home',name: 'home',component: Home},
  {path: '/list',name: 'list',component: List},
  {path: '/userInfo',name: 'userInfo',
   beforeEnter: (to, from, next) => {
    if(store.state.isLogin){
      next()
    }  else{
      next('/login')
    }
  },
   component: User},
  {path:'/itemMusic',component:ItemMusic},
  {path:'/djMusic',component:DjMusic},
  {path:'/search',component:Search},
  {path:'/login',component:Login}
]

const router = new VueRouter({
  routes
})

export default router
