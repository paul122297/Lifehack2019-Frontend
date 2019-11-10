import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import {initialize} from './helpers/general';
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://ec2-3-0-177-23.ap-southeast-1.compute.amazonaws.com/'

initialize(store, router, axios);

import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'ITMSPNP2019CRAME',
  cluster: 'mt1',
  //encrypted: false,
  wsHost: 'ec2-3-0-177-23.ap-southeast-1.compute.amazonaws.com',
  wsPort: 6001,
  disableStats: true,
  enabledTransports: ['ws']
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
