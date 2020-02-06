import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import {initialize} from './helpers/general';
import axios from 'axios'

Vue.config.productionTip = false

//const API_ORIGIN_ENDPOINT = 'appcon2020-env.gwphp3mwkp.ap-southeast-1.elasticbeanstalk.com'

//axios.defaults.baseURL = 'http://blood-bank-backend.test/'
axios.defaults.baseURL = `http://appcon2020-env.gwphp3mwkp.ap-southeast-1.elasticbeanstalk.com/`

initialize(store, router, axios);

import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  authEndpoint: 'http://appcon2020-env.gwphp3mwkp.ap-southeast-1.elasticbeanstalk.com/broadcasting/auth',
  //authEndpoint: 'http://blood-bank-backend.test/broadcasting/auth',
  broadcaster: 'pusher',
  key: 'bloodbankpusheridkey',
  cluster: 'mt1',
  //encrypted: false,
  wsHost: 'appcon2020-env.gwphp3mwkp.ap-southeast-1.elasticbeanstalk.com',
  //wsHost: window.location.hostname,
  wsPort: 6001,
  disableStats: true,
  //enabledTransports: ['ws']
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
