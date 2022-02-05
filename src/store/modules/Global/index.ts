import { RootState } from '@/store/store'
import { Module } from 'vuex'

export interface GlobalType {
  data:string,
}

export const m:Module<GlobalType, RootState> = {
  namespaced: true,
  state: {
    data: 'hello world'
  },
  mutations: {
    increment (state) {
      state.data = 'hello'
    }
  },
  actions: {
    incrementIfOddOnRootSum ({ commit }) {
      commit('increment')
    }
  }
}
