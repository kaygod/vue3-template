import { createStore } from 'vuex';
import { m as HomePage } from './modules/HomePage';
import { m as Global } from './modules/Global';
import { RootState } from './store';

export default createStore<RootState>({
  modules:{
    HomePage,
    Global
  }
});
