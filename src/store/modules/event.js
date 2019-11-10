/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'
const state  = {
    events: [],
    donors: []
};
const getters = {
    retrieveEvents(state) {
        return state.events
    },
    retrieveEventDonors(state) {
        return state.donors
    },
};
const mutations = {
    retrieveEvents(state, payload){
        state.events = payload
    },
    retrieveEventDonors(state, payload) {
        state.donors = payload
    },
    pushEvent(state, payload) {
        state.events.push(payload)
    },
    approveDonor(state, payload) {
        let donorIndex = state.donors.findIndex(item => item.id === payload.user_id);
        Vue.set(state.donors[donorIndex].pivot, 'approved', '1')
    }
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
    retrieveEvents(context){
        return new Promise((resolve, reject) => {
            axios.get(`/api/event`)
            .then(response => {
                context.commit('retrieveEvents', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    retrieveEventDonors(context, id){
        return new Promise((resolve, reject) => {
            axios.get(`/api/event/donors/${id}`)
            .then(response => {
                context.commit('retrieveEventDonors', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    addEvent(context, form){
        return new Promise((resolve, reject) => {
            console.log(form)
            axios.post('/api/event', form)
            .then(response => {
                //context.state.products.push(response.data.responseData);
                context.commit('pushEvent' , response.data)
                resolve(response)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    approveDonor(context, form){
        return new Promise((resolve, reject) => {
            axios.post('/api/approve', form)
            .then(response => {
                //context.state.products.push(response.data.responseData);
                context.commit('approveDonor' , form)
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