import { RootState } from "@/store/store";
import { Module } from "vuex";

export interface HomeType {
  name:string,
  age:number
}

export const m:Module<HomeType,RootState> = {
  namespaced:true, 
  state: {
    name:"hello world",
    age:18
  },
  mutations:{
    increment (state) {
      state.name = "123";
    }  
  },
  actions:{
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
        commit('increment')
    }
  }
}