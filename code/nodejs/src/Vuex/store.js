import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    user: {
      userName: '',
      password: ''
    }
  },
  mutations: {
    increment(state, msg) {
      state.user.userName = msg.userName
      state.user.password = msg.password
    }
  },
  getters: {
    user: function (state, getters) {
      return state.user;
    }
  },
  actions: {
    increment(state, msg) {
      state.commit('increment', msg)
    }
  }
})

export default store;
