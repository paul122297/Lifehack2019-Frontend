import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import {initialize} from './helpers/general';
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://cdbarrera.test/'

initialize(store, router, axios);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
