import axios from 'axios'
import router from '../router'

export default {
  signup({ commit }, payload){
    axios.post('/api/users', payload)
      .then(response => {
        commit('signedUp')
      })
      .catch(error => {
        commit('signUpError');
      })
  },
  login({ commit }, payload){
    axios.post('/api/users/login', payload)
      .then(response => {
        commit('authenticateUser', {
          token: response.data.api_token,
          user: response.data.user
        })
        localStorage.setItem('token', response.data.api_token)
        localStorage.setItem('user', response.data.user)
        router.replace('/')
      })
      .catch(error => {
        commit('showErrorAlert')
      })
  },
  fetchUserRides({ commit }) {
    axios.get('/api/stats/current_week')
      .then(response => {
        commit('fetchUserRides', response)
      })
      .catch(error => {
        commit('serverResponsError')
      })
  },
  logout({ commit }) {
    commit('clearAuthData');
    commit('clearUserData');
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.replace('/')
  },
  tryAutoLogin({ commit }){
    const token = localStorage.getItem('token')
    if (!token){
      return
    }
    const user = localStorage.getItem('user')
    if (!user) {
      return
    }
    commit('authenticateUser', { token: token, user: user })
  },
  createRide({ commit }, ride){
    axios.post('/api/trips', ride)
      .then(response => {
        console.log(ride)
        commit('addRide', response.data)
      })
      .catch(error => {
        commit('showErrorAlert')
      })
  }
}