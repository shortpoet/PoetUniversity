// import axios from 'axios'
import AuthService from '@/services/security/oidc-sentry.js'
// import AuthUser from '@/services/security/AuthUser'
// import router from '@/router/index'
import {
  SET_SENTRY_STATE,
  SET_SENTRY_USER,
  RESET_SENTRY_TOKEN_STATE
  // RESET_SENTRY_USER
} from '@/store/mutation-types'

import {
// endpoints
} from '@/store/api-endpoints'

export const state = {
  user: null,
  isAuthenticated: false,
  accessTokenExpired: undefined
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
  [SET_SENTRY_STATE] (state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },
  [SET_SENTRY_USER] (state, newUser) {
    state.user = newUser
  },
  [RESET_SENTRY_TOKEN_STATE] (state, newState) {
    state.accessTokenExpired = newState
  }
  // [RESET_SENTRY_USER] (state) {
  //   state.user = new AuthUser()
  // }
}

export const actions = {
  login ({ commit, state, rootGetters, dispatch }, returnPath) {
    const authService = new AuthService()
    authService.login(returnPath)
    // commit(SET_USER, user)
  },
  logout ({ commit, state, rootGetters, dispatch }) {
    const authService = new AuthService()
    authService.logout()
    // commit(SET_USER, user)
  },
  // tokenExpiredCallback ({ commit, state, rootGetters, dispatch }, payload) {
  //   // commit(SET_AUTH_STATE, true)
  //   commit(RESET_MOAT_USER)
  // },
  async authenticate ({ commit, state, rootGetters, dispatch }, returnPath) {
    console.log('start sentry authenticate')
    try {
      const authService = new AuthService()
      const user = await authService.getUser()
      console.log(user)
      if (user) {
      // if (user && user.isAuthenticated) {
        // if (user !== null && !user.expired) {
        // commit(RESET_SENTRY_TOKEN_STATE, user.expired)
        commit(SET_SENTRY_STATE, true)
        commit(SET_SENTRY_USER, user)
        console.info('Logged In: ', user)
      } else {
        console.info('No user initially logged in.')
        // here auto redirect to login
        dispatch('login', returnPath)
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
