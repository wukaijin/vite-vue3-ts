// store/login/index.ts
import { Module } from 'vuex'
import { SET_AD } from './actionType'

export type IAd = Record<'name' | 'href', string>

export interface IHomeState {
  ad: IAd
}

// Module这个类型可以传两个范型变量 第一个是当前模块state的对象接口类型 第二个是主仓库state的对象接口类型
const HomeStore: Module<IHomeState, unknown> = {
  namespaced: true,
  state: {
    ad: {
      name: '',
      href: ''
    }
  },
  getters: {},
  mutations: {
    [SET_AD](state, payload: IAd) {
      state.ad = payload
    }
  },
  actions: {
    [SET_AD]({ commit }, payload: IAd) {
      commit(SET_AD, payload)
    }
  }
}

export default HomeStore
