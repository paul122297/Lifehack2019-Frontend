/* eslint-disable */
import axios from 'axios'
const state  = {
    token: localStorage.getItem('access_token') || null,
    currentUser: localStorage.getItem('current_user') || {},
};
const getters = {
    loggedIn(state) {
        return state.token != null
    },
    getToken(state) {
        return state.token
    },
    currentUser(state) {
        return state.currentUser
    },
};
const mutations = {
    retrieveToken(state, token){
        state.token = token
      },
    destroyToken(state){
        state.token = null
    },
    retrieveUser(state, user){
        state.currentUser = user
    },
    destroyUser(state){
       state.currentUser = null
    },
};
const actions = {
    retrieveToken(context, credentials){
        return new Promise((resolve, reject) => {
            axios.post('/api/login', {
                email: credentials.email,
                password: credentials.password,
            })
            .then(response => {
                var token = response.data.token.access_token
                localStorage.setItem('access_token', token)
                context.commit('retrieveToken', token)

                var user = response.data.user
                localStorage.setItem('current_user', JSON.stringify(user))
                context.commit('retrieveUser', JSON.stringify(user))
                resolve(response)
                //console.log(token)
                setTimeout(() => {
                    context.dispatch('accountOnline', user.id)
                }, 500);
                
            })
            .catch(error => {
                reject(error.response.data)
            })
          })
        },
        destroyToken(context, credentials){
          if(context.getters.loggedIn) {
            return new Promise((resolve, reject) => {
            context.dispatch('accountOffline', JSON.parse(context.getters.currentUser).id)
            .then(res => {
                    axios.post('/api/logout', credentials)
                    .then(response => {
                        localStorage.removeItem('access_token')
                        context.commit('destroyToken')
    
                        localStorage.removeItem('current_user')
                        context.commit('destroyUser')
                        resolve(response)
                    })
                    .catch(error => {
                        localStorage.removeItem('access_token')
                        context.commit('destroyToken')
    
                        localStorage.removeItem('current_user')
                        context.commit('destroyUser')
                        reject(error)
                    })
                })
                .catch(error => {
                    localStorage.removeItem('access_token')
                    context.commit('destroyToken')

                    localStorage.removeItem('current_user')
                    context.commit('destroyUser')
                    reject(error)
                })
            })
          }
        },
};


export default {
    state,
    getters,
    actions,
    mutations,
}