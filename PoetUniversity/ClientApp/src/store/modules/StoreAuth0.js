// import axios from 'axios'
import mgr from '@/services/security/auth0-bouncer.js'
import {
  SET_AUTH0_STATE,
  SET_AUTH0_USER
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
  [SET_AUTH0_STATE] (state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },
  [SET_AUTH0_USER] (state, user) {
    state.user = user
  }
}

export const actions = {
  login ({ commit, state, rootGetters, dispatch }, payload) {
    mgr.signinRedirect()
    // commit(SET_AUTH_STATE, true)
    // commit(SET_USER, user)
  },
  logout ({ commit, state, rootGetters, dispatch }, payload) {
    mgr.signoutRedirect()
    // commit(SET_AUTH_STATE, true)
    // commit(SET_USER, user)
  },
  async authenticate ({ commit, state, rootGetters, dispatch }, returnPath) {
    console.log('start authenticate')
    console.log(returnPath)
    // debugger
    try {
      const user = await dispatch('getUser')
      if (user) {
        // debugger
        commit(SET_AUTH0_STATE, true)
        commit(SET_AUTH0_USER, user)
      } else {
        // debugger
        console.log('else signin')
        console.log(returnPath)
        await dispatch('signIn', returnPath)
      }
    } catch (err) {
      console.log(err)
    }
  },
  async getUser ({ commit, state, rootGetters }, payload) {
    try {
      // debugger
      let user = await mgr.getUser()
      return user
    } catch (err) {
      console.log(err)
    }
  },
  signIn ({ commit, state, rootGetters, dispatch }, returnPath) {
    console.log(returnPath)
    console.log(mgr)
    // mgr.signinRedirect()
    // debugger
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
