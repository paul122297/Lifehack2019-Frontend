/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'
const state  = {
    category: [],
};
const getters = {
    retrieveCategory(state) {
        return state.category
    },
};
const mutations = {
    retrieveCategory(state, payload){
        state.category = payload
    },
    pushCategory(state, payload) {
        state.category.push(payload)
    },
    updateCategory(state, payload) {
        let updateIndex = state.category.findIndex(item => item.id === payload.id);
        Vue.set(state.category, updateIndex, payload)
    },
    deleteCategory(state, id) {
        let deleteIndex = state.category.findIndex(item => item.id === id);
        state.category.splice(deleteIndex, 1)
    }
};
const actions = {
    retrieveCategory(context, params){
        if (params.sortBy == '') {
            params.sortBy = 'id'
          }
        return new Promise((resolve, reject) => {
            axios.get(`/api/category/index?search=${params.search}&order_by=${params.sortBy}&sort_by=${params.descending ? 'desc' : 'asc'}&rowsPerPage=${params.per_page}&page=${params.current_page}`)
            .then(response => {
                context.commit('retrieveCategory', response.data.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    addCategory(context, form){
        return new Promise((resolve, reject) => {
            console.log(form)
            axios.post('/api/category/create', form)
            .then(response => {
                //context.state.products.push(response.data.responseData);
                context.commit('pushCategory' , response.data)
                resolve(response)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    updateCategory(context, form){
        return new Promise((resolve, reject) => {
            axios.put(`/api/category/update/${form.id}`, form)
            .then(response => {
                context.commit('updateCategory' , response.data)
                resolve(response)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    deleteCategory(context, id) {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/category/delete/${id}`)   
            .then(response => {
                resolve(response)
                context.commit('deleteCategory' , id)
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