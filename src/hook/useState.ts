import { mapState, createNamespacedHelpers,useStore } from "vuex";
import { computed, ComputedRef } from "vue";

/**
 * 对store导出数据做封装
 */
export const useState = (module_name:string,wrapper:string[])=>{
  
  const store = useStore()
  
  let mapFn = mapState;

  if(module_name != null){
      mapFn = createNamespacedHelpers(module_name).mapState;
  }

  const storeStateFns = mapFn(wrapper);

  // 对数据进行转换
  const storeState:{ [key:string]: ComputedRef<any>} = {};

  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({$store: store})
    storeState[fnKey] = computed(fn)
  })

  return storeState;
  
}