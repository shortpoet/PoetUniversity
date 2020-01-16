import axios from 'axios'

import {
  LOAD_MODULES,
  CHANGE_MODULES_LOADED_STATE,
  CHANGE_MODULES_ERRORED_STATE,
  SET_ACTIVE_MODULES,
  SET_INACTIVE_MODULES,
  IS_ACTIVE,
  IS_INACTIVE,
  REORDER_MODULES
} from '@/store/mutation-types'

import {
  MODULES_API
} from '@/store/api-endpoints'

function swap (input, indexA, indexB) {
  var output = [...input]
  var temp = output[indexA]
  output[indexA] = output[indexB]
  output[indexB] = temp
  return output
}

export default {
  namespaced: true,
  state: {
    modulesLoaded: false,
    modulesErrored: false,
    modules: [],
    activeModules: [],
    inactiveModules: []
  },
  getters: {
    getModulesLoaded (state) {
      // console.log(state.activeModules)
      return state.modulesLoaded
    },
    getModulesErrored (state) {
      return state.modulesErrored
    },
    getModules (state) {
      return state.modules
    },
    getActiveModules (state) {
      return state.activeModules
    },
    getInactiveModules (state) {
      return state.inactiveModules
    }
  },
  mutations: {
    [LOAD_MODULES] (state, modules) {
      state.modules = modules
    },
    [CHANGE_MODULES_LOADED_STATE] (state, loaded) {
      state.modulesLoaded = loaded
    },
    [CHANGE_MODULES_ERRORED_STATE] (state, errored) {
      state.modulesErrored = errored
    },
    [SET_ACTIVE_MODULES] (state, array) {
      // console.log(array)
      state.activeModules = array
    },
    [SET_INACTIVE_MODULES] (state, array) {
      state.inactiveModules = array
    },
    [IS_ACTIVE] (state) {
      state.activeModules.forEach(x => { x.active = true; x.inactive = false })
    },
    [IS_INACTIVE] (state) {
      state.inactiveModules.forEach(x => { x.inactive = true; x.active = false })
    },
    [REORDER_MODULES] (state, payload) {
      // console.log(payload)
      switch (true) {
        case payload.activity === 'active' && payload.direction === 'left':
          // console.log(payload)
          // console.log(state.activeModules.map(x => x.Id))
          var mods = [...state.activeModules]
          var index = mods.findIndex(x => parseInt(x.Id) === payload.id)
          var newMods = swap(mods, index, index - 1)
          state.activeModules = newMods
          // console.log(state.activeModules.map(x => x.Id))
          break
        case payload.activity === 'active' && payload.direction === 'right':
          // console.log(payload)
          // console.log(state.activeModules.map(x => x.Id))
          mods = [...state.activeModules]
          index = mods.findIndex(x => parseInt(x.Id) === payload.id)
          newMods = swap(mods, index, index + 1)
          state.activeModules = newMods
          // console.log(state.activeModules.map(x => x.Id))
          break
        case payload.activity === 'inactive' && payload.direction === 'left':
          // console.log(payload)
          mods = [...state.inactiveModules]
          index = mods.findIndex(x => parseInt(x.Id) === payload.id)
          newMods = swap(mods, index, index - 1)
          state.inactiveModules = newMods
          break
        case payload.activity === 'inactive' && payload.direction === 'right':
          // console.log(payload)
          mods = [...state.inactiveModules]
          index = mods.findIndex(x => parseInt(x.Id) === payload.id)
          newMods = swap(mods, index, index + 1)
          state.inactiveModules = newMods
          break
      }
    }
  },
  actions: {
    loadModuleData ({ commit, state, rootGetters, dispatch }, payload) {
      // console.log(payload)
      axios
        .get(rootGetters.getUrlPrefix + MODULES_API)
        .then(function (response) {
          // console.log(response.data)
          // console.log(response.data.map(x=>x.Table))
          commit(LOAD_MODULES, response.data)
          // store.setCookie()
        })
        .catch(function (error) {
          console.log(error)
          commit(CHANGE_MODULES_ERRORED_STATE, true)
        })
        .finally(function () {
          console.log('modules finally')
          commit(CHANGE_MODULES_LOADED_STATE, true)
          // console.log(state.modules)
          // console.log(payload)
          dispatch('tables/loadTableData', payload, { root: true })
          dispatch('initActiveModules')
        })
    },
    initActiveModules ({ commit, state, dispatch, rootState }) {
      console.log('#### INIT ACTIVE ###')
      // console.log(rootState.activeCookie)
      // console.log(state.modules)
      // console.log(state.modules.filter(x => rootState.activeCookie.includes(x.Id)))

      // TODO includes in cookie logic errors in IE

      commit(SET_ACTIVE_MODULES, state.modules.filter(x => rootState.activeCookie.includes(x.Id)))
      commit(IS_ACTIVE)
      dispatch('initInactiveModules')
    },
    initInactiveModules ({ commit, state, dispatch, rootState }) {
      console.log('#### INIT INACTIVE ###')
      commit(SET_INACTIVE_MODULES, state.modules.filter(x => !rootState.activeCookie.includes(x.Id)))
      commit(IS_INACTIVE)
    },
    resetActiveModules ({ commit, state, dispatch, rootState }) {
      console.log('#### RESET ACTIVE ###')
      commit(SET_ACTIVE_MODULES, state.modules.filter(x => rootState.activeCookie.includes(x.Id)))
      commit(IS_ACTIVE)
      dispatch('resetInactiveModules')
      dispatch('resetCookie', null, { root: true })
      // dispatch({
      //   type: 'resetCookie',
      //   payload: null,
      //   options:{
      //     root: true
      //   }})
    },
    resetInactiveModules ({ commit, state, dispatch, rootState }) {
      // console.log('#### RESET INACTIVE ###')
      commit(SET_INACTIVE_MODULES, state.modules.filter(x => !rootState.activeCookie.includes(x.Id)))
      commit(IS_INACTIVE)
    },
    activateModule ({ commit, state, dispatch }, payload) {
      var newInactive = state.inactiveModules.filter(x => x.Id !== payload.id)
      var move = state.inactiveModules.filter(x => x.Id === payload.id)[0]
      var newActive = [...state.activeModules]
      newActive.push(move)
      commit(SET_INACTIVE_MODULES, newInactive)
      commit(SET_ACTIVE_MODULES, newActive)
      commit(IS_ACTIVE)
      commit(IS_INACTIVE)
      dispatch('resetCookie', null, { root: true })
    },
    deactivateModule ({ commit, state, dispatch }, payload) {
      var newActive = state.activeModules.filter(x => x.Id !== payload.id)
      var move = state.activeModules.filter(x => x.Id === payload.id)[0]
      var newInactive = [...state.inactiveModules]
      newInactive.push(move)
      commit(SET_ACTIVE_MODULES, newActive)
      commit(SET_INACTIVE_MODULES, newInactive)
      commit(IS_ACTIVE)
      commit(IS_INACTIVE)
      dispatch('resetCookie', null, { root: true })
    },
    resetModuleOrder ({ commit, state, dispatch }, payload) {
      commit(REORDER_MODULES, payload)
      commit(IS_ACTIVE)
      commit(IS_INACTIVE)
      dispatch('resetCookie', null, { root: true })
      // dispatch({
      //   type: 'resetCookie',
      //   payload: null,
      //   options:{
      //     root: true
      //   }})
    }
  }
}
