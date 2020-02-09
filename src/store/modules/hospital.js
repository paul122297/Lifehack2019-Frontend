/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'
const state  = {
    hospital: {},
    hospitals: [],
    total: 0
};
const getters = {
    retrieveHospitals(state) {
        return state.hospitals
    },
    retrieveHospital(state) {
        return state.hospitals
    },
    retrieveTotalHospitals(state) {
        return state.total
    },
};
const mutations = {
    setHospitals(state, payload){
        state.total = payload.total
        state.hospitals = payload.data
    },
    setHospital(state, payload) {
        state.hospital = payload
    },
    pushHospital(state, payload) {
        state.total++
        state.hospitals.push(payload)
    },
    updateHospital(state, payload) {
        let updateIndex = state.hospitals.findIndex(item => item.id === payload.id);
        Vue.set(state.hospitals, updateIndex, payload)
    },
    deleteHospital(state, id) {
        let deleteIndex = state.hospitals.findIndex(item => item.id === id);
        state.hospitals.splice(deleteIndex, 1)
    }
};
const actions = {
    retrieveHospitals(context, params){
        return new Promise((resolve, reject) => {
            axios.get(`/api/hospitals`, {params: params})
            .then(response => {
                context.commit('setHospitals', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    retrieveHospital(context, id){
        return new Promise((resolve, reject) => {
            axios.get(`/api/hospitals/${id}`)
            .then(response => {
                context.commit('setHospital', response.data)
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    storeHospital(context, payload) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/hospitals`, payload)
            .then(response => {
                context.commit('pushHospital', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    updateHospital(context, payload) {
        return new Promise((resolve, reject) => {
            axios.put(`/api/hospitals/${payload.id}`, payload)
            .then(response => {
                context.commit('updateHospital', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    deleteHospital(context, id) {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/hospitals/${id}`)
            .then(response => {
                context.commit('deleteHospital', id)
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