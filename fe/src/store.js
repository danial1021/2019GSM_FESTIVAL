import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    sb: {
      act: false,
      msg: '',
      color: 'error'
    },
    user: {
      name: '유저',
      img: 'https://randomuser.me/api/portraits/men/85.jpg',
      id: ''
    }
  },
  mutations: { // token 을 받을 때 user 을 같이 넘김
    getToken (state, user) {
      state.token = localStorage.getItem('token')
      // console.log(user)
      state.user = user
    },
    delToken (state, user) {
      localStorage.removeItem('token')
      state.token = null
      state.user = {
        name: '유저',
        img: 'https://randomuser.me/api/portraits/men/85.jpg',
        id: ''
      }
    },
    pop (state, d) {
      state.sb.msg = d.msg
      state.sb.color = d.color
      state.sb.act = false
      if (d.act === undefined) state.sb.act = true
    }
  },
  actions: {

  }
})
