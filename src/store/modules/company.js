/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'
const state  = {
    company: {},
    companies: [],
    full_companies: [],
    total: 0
};
const getters = {
    retrieveCompanies(state) {
        return state.companies
    },
    retrieveCompany(state) {
        return state.company
    },
    retrieveTotalCompanies(state) {
        return state.total
    },
    retrieveAllCompanies(state) {
        return state.full_companies
    }
};
const mutations = {
    setCompanies(state, payload){
        state.total = payload.total
        state.companies = payload.data
    },
    setAllCompanies(state, payload) {
        state.full_companies = payload
    },
    setCompany(state, payload) {
        state.company = payload
    },
    pushCompany(state, payload) {
        state.total++
        state.companies.push(payload)
    },
    updateCompany(state, payload) {
        let updateIndex = state.companies.findIndex(item => item.id === payload.id);
        Vue.set(state.companies, updateIndex, payload)
    },
    deleteCompany(state, id) {
        let deleteIndex = state.companies.findIndex(item => item.id === id);
        state.companies.splice(deleteIndex, 1)
    }
};
const actions = {
    retrieveAllCompanies(context){
        return new Promise((resolve, reject) => {
            axios.get(`/api/companies?full_data`)
            .then(response => {
                context.commit('setAllCompanies', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    retrieveCompanies(context, params){
        return new Promise((resolve, reject) => {
            axios.get(`/api/companies`, {params: params})
            .then(response => {
                context.commit('setCompanies', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    retrieveCompany(context, id){
        return new Promise((resolve, reject) => {
            axios.get(`/api/companies/${id}`)
            .then(response => {
                context.commit('setCompany', response.data)
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    storeCompany(context, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/companies`, payload)
            .then(response => {
                context.commit('pushCompany', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    updateCompany(context, payload) {
        return new Promise((resolve, reject) => {
            axios.put(`/api/companies/${payload.id}`, payload)
            .then(response => {
                context.commit('updateCompany', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    deleteCompany(context, id) {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/companies/${id}`)
            .then(response => {
                context.commit('deleteCompany', id)
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