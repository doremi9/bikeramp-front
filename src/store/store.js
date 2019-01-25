import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import * as auth from './modules/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      apiToken: null,
      signedUp: '',
      signUpError: '',
      
    },
    data: {
      rides: []
    },
    alerts: {
      showErrorAlert: false,
      showSuccessAlert: false
    },
    serverData: {
      serverResponsError: false
    },
    loading: false
  },
  getters,
  mutations,
  actions,
  modules: {
    auth
  }
})
