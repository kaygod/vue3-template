import { ElButton } from 'element-plus'
import { App } from 'vue-demi';


export const onDemand = (app:App<Element>)=>{

   app.component(ElButton.name, ElButton);

}