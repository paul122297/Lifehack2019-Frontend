import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import authentication from './modules/authentication';

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authentication,
  }
})
