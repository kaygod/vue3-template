import { RootState } from '@/store/store'
import { Module } from 'vuex'

export interface HomeType {
  name:string,
  age:number
}

export const m:Module<HomeType, RootState> = {
  namespaced: true,
  state: {
    name: 'hello world',
    age: 18
  },
  mutations: {
    incrementAge (state) {
      state.age = 3
    }
  },
  actions: {
    increment ({ commit }) {
      commit('incrementAge')
    }
  },
  getters: {
    getName (state) {
      return state.name.split('').reverse().join('')
    }
  }
}
