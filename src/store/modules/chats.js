/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'
const state  = {
    chats: [],
    friends: []
};
const getters = {
    retrieveChats(state) {
        return state.chats
    },
    retrieveFriends(state) {
        return state.friends
    },
};
const mutations = {
    retrieveChats(state, payload){
        state.chats = payload
    },
    retrieveFriends(state, payload) {
        state.friends = payload
    },
    pushChat(state, payload) {
        state.chats.push(payload)
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
    retrieveChats(context, id){
        return new Promise((resolve, reject) => {
            axios.get(`/api/get-chats/${id}`)
            .then(response => {
                context.commit('retrieveChats', response.data.chats)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    retrieveFriends(context){
        return new Promise((resolve, reject) => {
            axios.get(`/api/friends`)
            .then(response => {
                context.commit('retrieveFriends', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    sendChat(context, form){
        return new Promise((resolve, reject) => {
            axios.post('/api/send-chat', form)
            .then(response => {
                //context.state.products.push(response.data.responseData);
                context.commit('pushChat' , response.data)
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