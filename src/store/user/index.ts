// store/user/index.ts
import { Module } from 'vuex'
import { SET_USER, SIGN_OUT } from './actionType'

// export type IUser = Record<'name' | 'password', string>
export type IUser = Record<'name', string>

export interface ILoginState {
  isLogin: boolean
  userInfo: IUser | null
}

// Module这个类型可以传两个范型变量 第一个是当前模块state的对象接口类型 第二个是主仓库state的对象接口类型
const LoginStore: Module<ILoginState, unknown> = {
  namespaced: true,
  state: {
    isLogin: true,
    userInfo: {
      name: ''
    }
  },
  getters: {},
  mutations: {
    [SET_USER](state, payload: IUser) {
      state.isLogin = true
      state.userInfo = payload
    },
    [SIGN_OUT](state) {
      state.isLogin = false
      state.userInfo = null
    }
  },
  actions: {
    [SET_USER]({ commit }, payload: IUser) {
      window.localStorage.setItem('user', JSON.stringify(payload))
      commit(SET_USER, payload)
    },
    [SIGN_OUT]({ commit }) {
      window.localStorage.removeItem('user')
      commit(SIGN_OUT)
    }
  }
}

export default LoginStore
