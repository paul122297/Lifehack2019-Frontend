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

};
const actions = {
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