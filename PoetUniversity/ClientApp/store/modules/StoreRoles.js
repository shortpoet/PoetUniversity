import axios from 'axios'

import {
  LOAD_ROLES,
  CHANGE_ROLES_LOADED_STATE,
  CHANGE_ROLES_ERRORED_STATE,
  SET_ROLE_MODULES
} from '@/store/mutation-types'

import {
  ROLES_API
} from '@/store/api-endpoints'

export default {
  namespaced: true,
  state: {
    rolesLoaded: false,
    rolesErrored: false,
    roles: [],
    roleModules: []
  },
  getters: {
    getRolesLoaded (state) {
      console.log(state.rolesLoaded)
      return state.rolesLoaded
    },
    getRolesErrored (state) {
      return state.rolesErrored
    },
    getRoles (state) {
      return state.roles
    }
  },
  mutations: {
    [LOAD_ROLES] (state, roles) {
      state.roles = roles
    },
    [CHANGE_ROLES_LOADED_STATE] (state, loaded) {
      state.rolesLoaded = loaded
    },
    [CHANGE_ROLES_ERRORED_STATE] (state, errored) {
      state.rolesErrored = errored
    },
    [SET_ROLE_MODULES] (state, payload) {
      state.roleModules = payload.modules
    }
  },
  actions: {
    loadRoleData ({ commit, state, getters, rootGetters }) {
      console.log('#### loading ROLE data from action ####')
      axios
        .get(rootGetters.getUrlPrefix + ROLES_API)
        .then(function (response) {
          console.log(response)
          commit(LOAD_ROLES, response.data)
        })
        .catch(function (error) {
          console.log(error)
          commit(CHANGE_ROLES_ERRORED_STATE, true)
        })
        .finally(function () {
          console.log('roles finally')
          commit(CHANGE_ROLES_LOADED_STATE, true)
          console.log(getters.getRolesLoaded)
        })
    },
    sendRoleModules ({ commit, dispatch }, payload) {
      // VueCookies.set('active-list', active)
      commit(SET_ROLE_MODULES, payload)
      dispatch('setCookie', null, { root: true })
      // dispatch({
      //   type: 'setCookie',
      //   payload: null,
      //   options:{
      //     root: true
      //   }})
    }
  }
}
