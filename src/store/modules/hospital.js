/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'
const state  = {
    hospitals: [],
    transactions: []
};
const getters = {
    retrieveHospitals(state) {
        return state.hospitals
    },
    retrieveHospitalTransactions(state) {
        return state.transactions
    },
};
const mutations = {
    retrieveHospitals(state, payload){
        state.hospitals = payload
    },
    retrieveHospitalTransactions(state, payload) {
        state.transactions = payload
    },
    pushHospital(state, payload) {
        state.hospitals.push(payload)
    },

    // updateBrand(state, payload) {
    //     let updateIndex = state.events.findIndex(item => item.id === payload.id);
    //     Vue.set(state.events, updateIndex, payload)
    // },
    // deleteBrand(state, id) {
    //     let deleteIndex = state.events.findIndex(item => item.id === id);
    //     state.events.splice(deleteIndex, 1)
    // }
};
const actions = {
    retrieveHospitals(context){
        return new Promise((resolve, reject) => {
            axios.get(`/api/hospital`)
            .then(response => {
                context.commit('retrieveHospitals', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    retrieveHospitalTransactions(context, id){
        return new Promise((resolve, reject) => {
            axios.get(`/api/hospital/transactions/${id}`)
            .then(response => {
                context.commit('retrieveHospitalTransactions', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    addHospital(context, form){
        return new Promise((resolve, reject) => {
            console.log(form)
            axios.post('/api/hospital', form)
            .then(response => {
                //context.state.products.push(response.data.responseData);
                context.commit('pushHospital' , response.data)
                resolve(response)
            })
            .catch(error => {
                console.log(error)
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