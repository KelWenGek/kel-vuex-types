import Vue from 'vue'
import * as VuexTypes from '../vuex-types';
import http from '../http';
importStoreModules(['root', 'test', 'another'], './modules/');

Vue.use(VuexTypes);


export default VuexTypes.createStore({
  root,
  modules: [
    test,
    another
  ],
  plugins: [
    http
  ]
})
