import axios from 'axios'

import {
  LOAD_PART_DATA,
  LOAD_PART_NUMBERS,
  CHANGE_PART_DATA_LOADED_STATE,
  CHANGE_PART_DATA_ERRORED_STATE,
  CHANGE_PART_NUMBERS_LOADED_STATE,
  CHANGE_PART_NUMBERS_ERRORED_STATE,
  LOAD_QUERIED_PART,
  CHANGE_QUERIED_PART_LOADED_STATE,
  CHANGE_QUERIED_PART_ERRORED_STATE,
  CLEAR_QUERIED_PART
} from '@/store/mutation-types'

import {
  endpoints
} from '@/store/api-endpoints'

export const state = {
  partNumbersLoaded: false,
  partNumbersErrored: false,
  partDataLoaded: false,
  partDataErrored: false,
  partData: [],
  partNumbers: [],
  queriedPart: null,
  queriedPartLoaded: false,
  queriedPartErrored: false,
  params: ['ItemTitle', 'ItemDescription', 'Airplane', 'Program', 'StartedAt', 'DueAt', 'CompleteStatus', 'CompletePercentage']
}

export const getters = {
  getPartData (state) {
    return state.partData
  },
  getPartNumbers (state) {
    return state.partNumbers
  },
  getPartDataLoaded (state) {
    return state.partDataLoaded
  },
  getPartDataErrored (state) {
    return state.partDataErrored
  },
  getPartNumbersLoaded (state) {
    return state.partNumbersLoaded
  },
  getPartNumbersErrored (state) {
    return state.partNumbersErrored
  },
  getQueriedPart (state) {
    return state.queriedPart
  },
  getQueriedPartLoaded (state) {
    return state.queriedPartLoaded
  },
  getQueriedPartErrored (state) {
    return state.queriedPartErrored
  },
  getQuerySteps (state) {
    // console.log(this.state.queriedPart.map(x => x.StepTitle))
    // console.log(new Set(this.state.queriedPart.map(x => x.StepTitle)))
    // console.log([...new Set(this.state.queriedPart.map(x => x.StepTitle))])
    return [
      // what is this set exactly
      ...new Set(this.state.queriedPart.map(x => x.StepTitle))
    ]
  },
  getGroupedQuery: (state, getters) => (grouping) => {
    var queriedParts = getters.getQueriedPart
    queriedParts.map((x, i) => { x.QueryId = i })
    // console.log(queriedParts)
    var queryDict = {}
    var groups = queriedParts.map(x => x[`${grouping}`]).filter((v, i, a) => a.indexOf(v) === i && v !== null)
    groups.forEach((group, i, a) => {
      queryDict[group] = queriedParts.filter(part => part[`${grouping}`] === group && part.ItemTitle !== null)
    })
    // console.log(queryDict)
    return queryDict
  },
  getGroups: (state, getters) => {
    var groups = {}
    state.params.map(x => { groups[`${x}`] = getters.getGroupedQuery(x) })
    // this.params.map(x => Object.assign({}, ))
    // console.log(groups)
    return groups
  },
  getAllGroupedQuery: (state, getters) => (grouping) => {
    // console.log(grouping)
    var queriedParts = getters.getPartData
    // console.log(queriedParts)
    var queryDict = {}
    var groups = queriedParts.map(x => x[`${grouping}`]).filter((v, i, a) => a.indexOf(v) === i && v !== null)
    // console.log(groups)
    queriedParts.forEach(part => {
      // console.log(part[`${grouping}`])
    })
    groups.forEach((group, i, a) => {
      queryDict[group] = queriedParts.filter(part => part[`${grouping}`] === group && part[`${grouping}`] !== null)
    })
    // console.log(queryDict)
    return queryDict
  },
  validateQuery: (state) => (query) => {
    // console.log(query)
    if (query !== null && query !== undefined) {
      return state.partNumbers.includes(query.toUpperCase())
    } else {
      return false
    }
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
    // console.log(keyDict)
    return keyDict
  }
}

export const mutations = {
  [LOAD_PART_NUMBERS] (state, partNumbers) {
    state.partNumbers = partNumbers
  },
  [CHANGE_PART_NUMBERS_LOADED_STATE] (state, loaded) {
    state.partNumbersLoaded = loaded
  },
  [CHANGE_PART_NUMBERS_ERRORED_STATE] (state, errored) {
    state.partNumbersErrored = errored
  },
  [LOAD_QUERIED_PART] (state, queriedPart) {
    state.queriedPart = queriedPart
  },
  [CHANGE_QUERIED_PART_LOADED_STATE] (state, loaded) {
    state.queriedPartLoaded = loaded
  },
  [CHANGE_QUERIED_PART_ERRORED_STATE] (state, errored) {
    state.queriedPartErrored = errored
  },
  [CLEAR_QUERIED_PART]: (state) => {
    state.queriedPart = null
  }
}

export const actions = {
  loadPartNumberData ({ commit, state, rootGetters }) {
    axios
      .get(rootGetters.getUrlPrefix + endpoints.parts.PART_NUMBERS_API)
      .then(function (response) {
        // console.log('#### part number data ####')
        // console.log(response)
        commit(LOAD_PART_NUMBERS, response.data.map(x => x.ItemTitle))
        // dispatch('loadPartData')
      })
      .catch(function (error) {
        console.log(error)
        commit(CHANGE_PART_NUMBERS_ERRORED_STATE, true)
      })
      .finally(function () {
        // console.log('parts number datafinally')
        // console.log(state.partNumbers)
        commit(CHANGE_PART_NUMBERS_LOADED_STATE, true)
        // dispatch('loadPartData')
      })
  },
  loadPartData ({ commit, state, rootGetters }, payload) {
    // console.log('loading part data')
    // console.log(rootGetters.getUrlPrefix + endpoints.parts.PART_DATA_API)
    axios
      .get(rootGetters.getUrlPrefix + endpoints.parts.PART_DATA_API)
      .then(function (response) {
        // console.log('#### part data ####')
        // console.log(response)
        commit(LOAD_PART_DATA, response.data)
      })
      .catch(function (error) {
        console.log(error)
        commit(CHANGE_PART_DATA_ERRORED_STATE, true)
      })
      .finally(function () {
        // console.log('parts DATA finally')
        // console.log(state.partData)
        commit(CHANGE_PART_DATA_LOADED_STATE, true)
      })
  },
  async loadQueriedPartData ({ commit, state, rootGetters }, payload) {
    // console.log(payload)
    this.isHidden = false
    try {
      // why not use query instead of refs
      await axios.get(rootGetters.getUrlPrefix + endpoints.parts.PART_QUERY_API + payload)
        .then(response => {
          // console.log('#### queried part ####')
          // console.log(response)
          commit(LOAD_QUERIED_PART, response.data)
        })
        .then(jsonData => {
          // console.log('#### changing queried loading state ####')
          commit(CHANGE_QUERIED_PART_LOADED_STATE, true)
        })
    } catch (e) {
      this.data = null
      this.error = e
    }
  },
  clearQueriedPartData: function ({ commit, state, rootGetters }) {
    commit(CHANGE_QUERIED_PART_LOADED_STATE, false)
    commit(CLEAR_QUERIED_PART)
  }
}

export default {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
}
