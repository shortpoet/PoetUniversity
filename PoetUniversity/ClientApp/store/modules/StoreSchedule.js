import axios from 'axios'
import {
  LOAD_DATES,
  CHANGE_DATES_LOADED_STATE,
  CHANGE_DATES_ERRORED_STATE
} from '@/store/mutation-types'
import {
  DATES_API
} from '@/store/api-endpoints'

export default {
  namespaced: true,
  state: {
    datesLoaded: false,
    datesErrored: false,
    dates: []
  },
  getters: {
    getDates (state) {
      return state.dates
    },
    getDatesLoaded (state) {
      return state.datesLoaded
    },
    getDatesErrored (state) {
      return state.datesErrored
    }
  },
  mutations: {
    [LOAD_DATES] (state, dates) {
      state.dates = dates
    },
    [CHANGE_DATES_LOADED_STATE] (state, loaded) {
      state.datesLoaded = loaded
    },
    [CHANGE_DATES_ERRORED_STATE] (state, errored) {
      state.datesErrored = errored
    }
  },
  actions: {
    loadDateData ({ commit, state, rootGetters }) {
      axios
        .get(rootGetters.getUrlPrefix + DATES_API)
        .then(function (response) {
          // console.log(response)
          commit(LOAD_DATES, response.data)
        })
        .catch(function (error) {
          console.log(error)
          commit(CHANGE_DATES_ERRORED_STATE, true)
        })
        .finally(function () {
          console.log('dates finally')
          commit(CHANGE_DATES_LOADED_STATE, true)
        })
    }
  }
}
