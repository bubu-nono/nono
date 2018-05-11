import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import login from '@/pages/home/login'
// import pict from '@/pages/home/pict'
import music from '@/pages/home/Music'
import artlist from '@/pages/home/Artlist'
import echarts from '@/pages/home/echarts'
import migration from '@/pages/home/migration'
import prose from '@/pages/home/prose'
import store from '@/Vuex/store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      component: Home,
      name: 'home',
      title: '导航一',
      leaf: false,
      iconCls: 'el-icon-location', // 图标样式class
      children: [
        {
         path: '/table',
         component(resolve) {
            // 用这种方式 就不用在上面import导入组件了
           require(['../pages/home/pict.vue'], resolve)
         },
         name: 'table',
         title: '图片组件'
        }, { path: '/form',
        component: music,
        name: 'form',
        title: '音乐组件'
        }, { path: '/user',
        component: artlist,
        name: 'user',
        title: '文章组件'
        }
      ]
    },
    {
      path: '/',
      component: Home,
      title: '导航二',
      leaf: false,
      name: '导航二',
      iconCls: 'el-icon-message',
      children: [
        { path: '/page4', component: music, name: 'page4', title: '音乐2' },
        { path: '/page5', component: migration, name: 'migration', title: '人口迁移' },
        { path: '/echarts', component: echarts, name: 'echarts', title: '图表' },
        { path: '/prose', component: prose, name: 'prose', title: '散文' }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    store.getters.user.userName = ''
  }
  let user = store.getters.user
  console.log(user)
  if (user.userName === '' && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
