/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'
const state  = {
    brands: [],
};
const getters = {
    retrieveBrands(state) {
        return state.brands
    },
};
const mutations = {
    retrieveBrands(state, payload){
        state.brands = payload
    },
    pushBrand(state, payload) {
        state.brands.push(payload)
    },
    updateBrand(state, payload) {
        let updateIndex = state.brands.findIndex(item => item.id === payload.id);
        Vue.set(state.brands, updateIndex, payload)
    },
    deleteBrand(state, id) {
        let deleteIndex = state.brands.findIndex(item => item.id === id);
        state.brands.splice(deleteIndex, 1)
    }
};
const actions = {
    retrieveBrands(context, params){
        if (params.sortBy == '') {
            params.sortBy = 'id'
          }
        return new Promise((resolve, reject) => {
            axios.get(`/api/brand/index?search=${params.search}&order_by=${params.sortBy}&sort_by=${params.descending ? 'desc' : 'asc'}&rowsPerPage=${params.per_page}&page=${params.current_page}`)
            .then(response => {
                context.commit('retrieveBrands', response.data.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
        }) 
    },
    addBrand(context, form){
        return new Promise((resolve, reject) => {
            console.log(form)
            axios.post('/api/brand/create', form)
            .then(response => {
                //context.state.products.push(response.data.responseData);
                context.commit('pushBrand' , response.data)
                resolve(response)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    updateBrand(context, form){
        return new Promise((resolve, reject) => {
            axios.put(`/api/brand/update/${form.id}`, form)
            .then(response => {
                context.commit('updateBrand' , response.data)
                resolve(response)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    deleteBrand(context, id) {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/brand/delete/${id}`)   
            .then(response => {
                resolve(response)
                context.commit('deleteBrand' , id)
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