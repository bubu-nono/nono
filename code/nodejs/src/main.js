// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import fastClisk from 'fastclick'
import ElementUI from 'element-ui'
import VueJsonp from 'vue-jsonp'
import echarts from 'echarts'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vuex from 'vuex'
import store from './Vuex/store'
import 'swiper/dist/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/reset.css'
import './assets/style/border.css'
import './assets/style/iconfont.css'
import animate from 'animate.css'
Vue.use(animate)
Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false
Vue.use(VueJsonp)
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
Vue.prototype.$echarts = echarts
// fastClisk.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
