import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import router from './router'
import 'bootstrap'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(VueRouter)
axios.defaults.withCredentials =false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
