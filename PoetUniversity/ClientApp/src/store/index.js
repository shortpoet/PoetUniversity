import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

import StoreDoor from '@/store/modules/StoreDoor'
import StoreAuth0 from '@/store/modules/StoreAuth0'
import StoreMoat from '@/store/modules/StoreMoat'
import StoreSentry from '@/store/modules/StoreSentry'
import StoreParts from '@/store/modules/StoreParts'

import {
  CHANGE_COOKIE,
  CHANGE_COOKIE_BOOLEAN,
  ERASE_COOKIE
} from '@/store/mutation-types'

import {
  endpoints
} from '@/store/api-endpoints'

Vue.use(Vuex)

export const rootGetters = {
  hasHasCookie (state) {
    return state.activeCookie !== null
  },
  getUrlPrefix (state) {
    return state.environment === 'production' ? endpoints.index.BACKEND_PREFIX_PROD : endpoints.index.BACKEND_PREFIX_DEV
  }
}

export default new Vuex.Store({
  modules: {
    parts: StoreParts,
    door: StoreDoor,
    moat: StoreMoat,
    sentry: StoreSentry,
    auth0: StoreAuth0
  },
  state: {
    environment: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    hasCookie: VueCookies.get('active-modules') !== null,
    activeCookie: VueCookies.get('active-modules') !== null ? VueCookies.get('active-modules') : null
  },
  getters: rootGetters,
  mutations: {
    [CHANGE_COOKIE] (state, array) {
      if (array.length === 0) {

      } else {
        console.log('#### change cookie ####')
        console.log(state.activeCookie)
        console.log(state.roles.roleModules)
        console.log(array)
        VueCookies.set('active-modules', array)
        state.activeCookie = VueCookies.get('active-modules')
        console.log(state.activeCookie)
      }
    },
    [CHANGE_COOKIE_BOOLEAN] (state, boolean) {
      state.hasCookie = boolean
    },
    [ERASE_COOKIE] (state) {
      console.log('erasing cookie')
      console.log(state.activeCookie)
      Vue.cookies.remove('active-modules')
      state.activeCookie = null
      console.log(state.activeCookie)
    }
  },
  actions: {
    setCookie ({ commit, state, dispatch }) {
      commit(CHANGE_COOKIE, state.roles.roleModules)
      commit(CHANGE_COOKIE_BOOLEAN, true)
      dispatch('modules/initActiveModules')
    },
    resetCookie ({ commit, state, getters, rootGetters, dispatch }) {
      console.log('#### CHECK COOKIE ACTION ####')
      if (getters.hasHasCookie === true) {
        console.log('#### RESET COOKIE ACTION ####')
        console.log(state.activeCookie)
        console.log(rootGetters['modules/getActiveModules'])
        commit(CHANGE_COOKIE, rootGetters['modules/getActiveModules'].map(x => x.Id))
        console.log(state.activeCookie)
      } else {
        console.log('#### NO COOKIE IN RESET ACTION ####')
      }
    },
    deleteCookie ({ commit, state, dispatch }) {
      commit(ERASE_COOKIE)
    }
  }
})
