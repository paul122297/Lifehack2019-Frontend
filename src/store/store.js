import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import authentication from './modules/authentication'
import BrandModule from './modules/brand'
import CategoryModule from './modules/category'



export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authentication,
    brand: BrandModule,
    category: CategoryModule
  }
})
