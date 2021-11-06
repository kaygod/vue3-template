import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store,{key} from './store'
import installElementPlus from './plugins/element'

const app = createApp(App)
installElementPlus(app)
app.use(store,key).use(router).mount('#app')