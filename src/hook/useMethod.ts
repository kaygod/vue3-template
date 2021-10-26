import { mapActions,mapMutations,useStore } from "vuex";


export const useMethod = (module_name:string,wrapper:string[])=>{

  const store = useStore() as any;
  
  const options = store._modules.root._rawModule.modules[module_name];
  
  const { mutations = {},actions = {}  } = options;

  const mutation_keys = Object.keys(mutations);

  const action_keys = Object.keys(actions);

  const action_wrapper:string[] = [];

  const mutation_wrapper:string[] = []; 

  wrapper.forEach((item)=>{
     if(mutation_keys.includes(item)){
       mutation_wrapper.push(item);
     }
     if(action_keys.includes(item)){
       action_wrapper.push(item);
     }
  })

  const aactions = mapActions(module_name, action_wrapper);

  const mmutations = mapMutations(module_name,mutation_wrapper);

  bindStore([aactions,mmutations]);

  return [aactions,mmutations];
}

function bindStore(list:any[]){
    const store = useStore() as any;
    list.forEach((item)=>{
        for(let key in item){
            item[key] = item[key].bind({$store:store});
        }   
    })
}