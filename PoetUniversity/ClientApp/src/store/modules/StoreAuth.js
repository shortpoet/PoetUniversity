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
  authenticate1 ({ commit, state, rootGetters, dispatch }, payload) {
    console.log('start authenticate')
    try {
      mgr.getUser().then(function (user) {
        if (user) {
          // commit(SET_AUTH_STATE, true)
          // commit(SET_USER, user)
          console.log('User logged in', user.profile)
        } else {
          console.log('User not logged in')
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
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
      const user = await dispatch('getUserRB')
      if (user) {
        // debugger
        commit(SET_AUTH_STATE, true)
        commit(SET_USER, user)
      } else {
        // debugger
        console.log('else signin')
        console.log(returnPath)
        await dispatch('signInRB', returnPath)
      }
    } catch (err) {
      console.log(err)
    }
  },
  getUser ({ commit, state, rootGetters }) {
    try {
      mgr.getUser().then(function (user) {
        // debugger
        if (user) {
          // commit(SET_AUTH_STATE, true)
          // commit(SET_USER, user)
          console.log('User logged in', user.profile)
        } else {
          console.log('User not logged in')
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
  async getUserRB  ({ commit, state, rootGetters }, payload) {
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
  },
  signInRB ({ commit, state, rootGetters, dispatch }, returnPath) {
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
