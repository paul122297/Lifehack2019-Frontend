/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'
const state  = {
    accounts: [],
};
const getters = {
    retrieveAccounts(state) {
        return state.accounts
    },
};
const mutations = {
    retrieveAccounts(state, payload){
        state.accounts = payload
    },
    updateAccount(state, payload) {
        let updateIndex = state.accounts.findIndex(item => item.id === payload.id);
        Vue.set(state.accounts, updateIndex, payload)
    }
};
const actions = {
    accountOnline(context, id){
        return new Promise((resolve, reject) => {
            axios.put(`/api/account/online/${id}`, {})
            .then(response => {
                context.commit('updateAccount', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    accountOffline(context, id){
        return new Promise((resolve, reject) => {
            axios.put(`/api/account/offline/${id}`, {})
            .then(response => {
                context.commit('updateAccount', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        })
    },
    retrieveAccounts(context){
        return new Promise((resolve, reject) => {
            axios.get(`/api/accounts`)
            .then(response => {
                context.commit('retrieveAccounts', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
};


export default {
    state,
    getters,
    actions,
    mutations,
}