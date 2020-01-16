import axios from 'axios'
import {
  LOAD_TABLE_DATA,
  CHANGE_TABLE_DATA_LOADED_STATE,
  CHANGE_TABLE_DATA_ERRORED_STATE,
  CHANGE_TABLE_CHOICE,
  CHANGE_CHOSEN_TABLE,
  CHANGE_CHOSEN_TABLE_LOADED_STATE
} from '@/store/mutation-types'

export default {
  namespaced: true,
  state: {
    tablesLoaded: false,
    tablesErrored: false,
    tables: [],
    tableChoice: null,
    chosenTable: null,
    chosenTableLoaded: false
  },
  getters: {
    tables (state) {
      return state.tables
    },
    tableTypes (getters) {
      var types = []
      getters.tables.forEach(x => {
        types.push({
          title: x.Title,
          id: x.Id
        })
      })
      return types
    },
    getTablesLoaded (state) {
      return state.tablesLoaded
    },
    getTablesErrored (state) {
      return state.tablesErrored
    },
    getTableChoice (state) {
      return state.tableChoice
    },
    getSingleData (state, getters) {
      // console.log(state.tables)
      // console.log(state.tables.filter(x => x.Id === getters.getTableChoice)[0])
      return state.tables.filter(x => x.Id === getters.getTableChoice)[0]
    },
    getChosenTable (state) {
      return state.chosenTable
    },
    getChosenTableLoaded (state) {
      return state.chosenTableLoaded
    }
  },
  mutations: {
    [LOAD_TABLE_DATA] (state, tables) {
      // console.log(state.tables)
      state.tables = tables
      // console.log(state.tables)
    },
    [CHANGE_TABLE_DATA_LOADED_STATE] (state, loaded) {
      state.tablesLoaded = loaded
    },
    [CHANGE_TABLE_DATA_ERRORED_STATE] (state, errored) {
      state.tablesErrored = errored
    },
    [CHANGE_TABLE_CHOICE] (state, payload) {
      // console.log(payload)
      // console.log(state.tableChoice)
      state.tableChoice = payload
      // console.log(state.tableChoice)
    },
    [CHANGE_CHOSEN_TABLE] (state, payload) {
      state.chosenTable = payload
    },
    [CHANGE_CHOSEN_TABLE_LOADED_STATE] (state, loaded) {
      state.chosenTableLoaded = loaded
    }
  },
  actions: {
    async loadTableData ({ commit, dispatch, state, rootGetters }, payload) {
      // console.log(payload)
      let tables
      try {
        tables = await rootGetters['modules/getModules'].map(x => x.Table)
        commit(LOAD_TABLE_DATA, tables)
        // console.log(tables)
      } catch (error) {
        commit(CHANGE_TABLE_DATA_ERRORED_STATE, true)
        // console.log(error)
      } finally {
        // console.log(tables)
        commit(CHANGE_TABLE_DATA_LOADED_STATE, true)
        dispatch('resetTableChoice', payload)
      }
    },
    resetTableChoice ({ commit, state, dispatch }, payload) {
      // console.log(payload)
      commit(CHANGE_TABLE_CHOICE, payload)
      dispatch('loadChosenTable')
    },
    loadChosenTable ({ commit, getters, rootGetters }) {
      console.log('#### loading chosen table from store ####')
      // console.log(getters.tables)
      axios
      // #### TODO #### ADD '/Get' TO MODULES TABLE
        .get(rootGetters.getUrlPrefix + getters.getSingleData.ApiUrl + '/Get')
        .then(function (response) {
          // console.log(response.data)
          commit(CHANGE_CHOSEN_TABLE, response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
          commit(CHANGE_CHOSEN_TABLE_LOADED_STATE, true)
        })
    }
  }
}
