import axios from 'axios'

import {
  LOAD_PARTS,
  CHANGE_PARTS_LOADED_STATE,
  CHANGE_PARTS_ERRORED_STATE,
  CHANGE_PARTS_PARAMS
} from '@/store/mutation-types'

import {
  PARTS_API
} from '@/store/api-endpoints'

var partsKeys = [
  'ItemId', 'Step', 'SubStep', 'StepStatusId', 'Emergent',
  'MainSourceSystem', 'MainSourceId', 'StepTitle', 'Complete',
  'ProportionComplete', 'SourceSystem', 'IsCurrentOrLast', 'IsOverdue',
  'IsOffPlan', 'IsOnPlan', 'WasLate', 'WasOnTime', 'StepStatusTitle', 'ClassificationId',
  'Program', 'Airplane', 'ControlCode', 'Authority', 'InstallationPlan', 'Lab']
var params = {
  'Flow': '',
  'Step': '',
  'SubStep': '',
  'StepStatusId': '',
  'Emergent': '',
  'MainSourceSystem': '',
  'StepTitle': '',
  'Complete': '',
  'ProportionComplete': '',
  'SourceSystem': '',
  'IsCurrentOrLast': '',
  'IsOverdue': '',
  'IsOffPlan': '',
  'IsOnPlan': '',
  'WasLate': '',
  'WasOnTime': '',
  'StepStatusTitle': '',
  'Program': '',
  'Airplane': '',
  'ControlCode': '',
  'InstallationPlan': '',
  'Lab': ''
}

export default {
  namespaced: true,
  state: {
    partsLoaded: false,
    partsErrored: false,
    params: {},
    parts: [],
    partsKeys: partsKeys
  },
  getters: {
    getParts (state) {
      return state.parts
    },
    getPartsLoaded (state) {
      return state.partsLoaded
    },
    getPartsErrored (state) {
      return state.partsErrored
    },
    getParams (state) {
      return state.params
    },
    getPartsKeys (state) {
      var badKeys = [
        'SystemComment', 'StartedAt', 'MainSourceId', 'ItemId', 'ItemTitle', 'StepDescription',
        'ItemDescription', 'DueAt', 'CompletedAt', 'ClassificationId', 'Authority'
      ]
      var keys = Object.keys(state.parts[0]).filter(x => badKeys.indexOf(x) === -1)
      var keyDict = {}
      keys.forEach(key => {
        var uniqueValues = state.parts.map(x => x[`${key}`]).filter((v, i, a) => a.indexOf(v) === i)
        keyDict[`${key}`] = uniqueValues
        // keyList.push({key: uniqueValues})
      })
      console.log(keyDict)
      return keyDict
    }
  },
  mutations: {
    [LOAD_PARTS] (state, parts) {
      state.parts = parts
    },
    [CHANGE_PARTS_LOADED_STATE] (state, loaded) {
      state.partsLoaded = loaded
    },
    [CHANGE_PARTS_ERRORED_STATE] (state, errored) {
      state.partsErrored = errored
    },
    [CHANGE_PARTS_PARAMS] (state, payload) {
      state.params = payload
    }
  },
  actions: {
    initParams ({ commit, getters }) {
      console.log(params)
      commit(CHANGE_PARTS_PARAMS, params)
      console.log(getters.getParams)
    },
    resetParams ({ commit, getters }, payload) {
      commit(CHANGE_PARTS_PARAMS, payload)
      console.log(getters.getParams)
    },
    loadPartData ({ commit, state, rootGetters }, payload) {
      axios
        .get(rootGetters.getUrlPrefix + PARTS_API)
        .then(function (response) {
          console.log('#### parts ####')
          console.log(response)
          commit(LOAD_PARTS, response.data)
        })
        .catch(function (error) {
          console.log(error)
          commit(CHANGE_PARTS_ERRORED_STATE, true)
        })
        .finally(function () {
          console.log('parts finally')
          commit(CHANGE_PARTS_LOADED_STATE, true)
        })
    }
  }
}
