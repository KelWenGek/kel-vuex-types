import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import http from './http';
import VueMeta from 'vue-meta';

Vue.config.productionTip = false

Vue.use(http);
// Vue.use(VueMeta, {
//   keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
//   attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
//   ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
//   tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
// })
http.interceptors.response.use(res => {
  return { data: res.data, config: res.config };
});
new Vue({
  render: h => h(),
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
