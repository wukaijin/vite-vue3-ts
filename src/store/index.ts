// store/index.ts
import { createStore } from 'vuex'
import home from './home'
import user from './user'

const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    home,
    user
  }
})

export default store
