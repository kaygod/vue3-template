import { createStore, Store, useStore as baseStore } from 'vuex'
import { m as HomePage } from './modules/HomePage'
import { m as Global } from './modules/Global'
import { RootState, AllState } from './store'
import { InjectionKey } from 'vue'

export default createStore<RootState>({
  state: {
    content: 'hello guy'
  },
  modules: {
    HomePage,
    Global
  },
  mutations: {
    updateContent (state, payload) {
      if (typeof payload === 'object') {
        payload = 'welcome'
      }
      state.content = `hello ${payload}`
    }
  },
  actions: {
    update ({ commit }) {
      commit('updateContent', 'world')
    }
  },
  getters: {
    getContent (state) { // 字符串颠倒
      return state.content.split('').reverse().join('')
    }
  }
})

export const key:InjectionKey<Store<RootState>> = Symbol('')

export function useStore () {
  return baseStore<AllState>(key)
}
