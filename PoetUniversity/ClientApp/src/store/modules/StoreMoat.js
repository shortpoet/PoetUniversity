// import axios from 'axios'
import AuthService from '@/services/security/oidc-moat.js'
import AuthUser from '@/services/security/AuthUser'
import router from '@/router/index'
import {
  SET_MOAT_STATE,
  SET_MOAT_USER,
  RESET_MOAT_USER
} from '@/store/mutation-types'

import {
// endpoints
} from '@/store/api-endpoints'

export const state = {
  user: new AuthUser(),
  isAuthenticated: false
}

export const getters = {
  getAuthState () {
    return state.isAuthenticated
  },
  getUser () {
    return state.user
  }
}

export const mutations = {
  [SET_MOAT_STATE] (state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },
  [SET_MOAT_USER] (state, newUser) {
    state.user = newUser
  },
  [RESET_MOAT_USER] (state) {
    state.user = new AuthUser()
  }
}

export const actions = {
  login ({ commit, state, rootGetters, dispatch }, returnPath) {
    console.log(returnPath)
    router.push(`/login?returnTo=${returnPath}`)
    // commit(SET_AUTH_STATE, true)
    // commit(SET_USER, user)
  },
  logout ({ commit, state, rootGetters, dispatch }, payload) {
    // commit(SET_AUTH_STATE, true)
    // commit(SET_USER, user)
  },
  tokenExpiredCallback ({ commit, state, rootGetters, dispatch }, payload) {
    // commit(SET_AUTH_STATE, true)
    commit(RESET_MOAT_USER)
  },
  async authenticate ({ commit, state, rootGetters, dispatch }, returnPath) {
    console.log('start authenticate')
    console.log(returnPath)
    // debugger
    try {
      const authService = new AuthService(this.tokenExpiredCallback, '/logincallback')
      const user = await authService.getUser()
      if (user && user.isAuthenticated) {
        commit(SET_MOAT_STATE, true)
        commit(SET_MOAT_USER, user)
        console.info('Logged In: ', user.name, user.userName)
      } else {
        console.info('No user initially logged in.')
        // here auto redirect to login
        // dispatch('login', returnPath)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
}
