// import axios from 'axios'
import mgr from '@/services/security/oidc-bouncer.js'
import {
  SET_AUTH_STATE,
  SET_USER
} from '@/store/mutation-types'

import {
// endpoints
} from '@/store/api-endpoints'

export const state = {
  user: null,
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
  [SET_AUTH_STATE] (state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },
  [SET_USER] (state, user) {
    state.user = user
  }
}

export const actions = {
  async authenticate ({ commit, state, rootGetters, dispatch }, returnPath) {
    const user = await dispatch('getUser')
    if (user) {
      commit(SET_AUTH_STATE, true)
      commit(SET_USER, user)
    } else {
      await dispatch('signIn', returnPath)
    }
  },
  async getUser  ({ commit, state, rootGetters }, payload) {
    try {
      let user = await mgr.getUser()
      return user
    } catch (err) {
      console.log(err)
    }
  },
  signIn (returnPath) {
    returnPath ? mgr.signinRedirect({ state: returnPath })
      : mgr.signinRedirect()
  }
}

export default {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
}
