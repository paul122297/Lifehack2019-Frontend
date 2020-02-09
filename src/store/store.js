import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import authentication from './modules/authentication'
import EventModule from './modules/event'
import HospitalModule from './modules/hospital'
import ChatModule from './modules/chats'
import AccountModule from './modules/accounts'
import CompanyModule from './modules/company'

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authentication,
    event: EventModule,
    hospital: HospitalModule,
    chat: ChatModule,
    accounts: AccountModule,
    company: CompanyModule
  }
})
