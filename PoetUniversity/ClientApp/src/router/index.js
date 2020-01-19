import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
// import Moat from '@/views/Moat.vue'
import Battles from '@/views/Battles.vue'
import store from '@/store/index'
import Callback from '@/components/Auth/Callback'
import Login from '@/components/Moat/Login'
import LoginCallback from '@/components/Moat/LoginCallback'
import Unauthorized from '@/components/Auth/Unauthorized'
// import PrivateBattles from '@/components/Battles/PrivateBattles'
import PublicBattles from '@/components/Battles/PublicBattles'
import BattlesCallback from '@/components/Battles/BattlesCallback'

import { requireAuth } from '@/utils/auth'
Vue.use(VueRouter)

const checkAuth = function (to, from, next) {
  let p = to.path.replace('/', '')
  let isAuthenticated = store.getters[`${p}/getAuthState`]
  console.log('#### before DOOR enter ####')
  console.log(isAuthenticated)
  if (isAuthenticated) {
    // already signed in, we can navigate anywhere
    next()
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(to)
    // debugger
    // authentication is required. Trigger the sign in process, including the return URI
    // TODO ? what is diff here ?
    // store.dispatch(`${p}/authenticate`, to.path).then(() => {
    console.log(to.fullPath)
    store.dispatch(`${p}/authenticate`, to.path).then(() => {
      console.log('authenticating a protected url:' + to.path)
      next()
    })
  } else {
    // No auth required. We can navigate
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
    // redirect: '/door'
  },
  {
    path: '/moat',
    name: 'moat',
    meta: {
      requiresAuth: true
    },
    beforeEnter: checkAuth,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "moat" */ '../views/Moat.vue')
  },
  { path: '/login', component: Login },
  { path: '/logincallback', component: LoginCallback },
  {
    path: '/door',
    name: 'door',
    meta: {
      requiresAuth: true
    },
    beforeEnter: checkAuth,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "door" */ '../views/Door.vue')
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback
  },
  {
    path: '/battles/',
    name: 'battles',
    // redirect: '/PartSearch',
    component: Battles,
    // component: () => import(/* webpackChunkName: "battles" */ '@/views/Battles.vue'),
    children: [
      {
        path: '/battles/private-battles',
        // component: () => import(/* webpackChunkName: "PrivateBattles" */ '@/components/Battles/PrivateBattles.vue'),
        component: PublicBattles,
        beforeEnter: requireAuth
      },
      {
        path: '/battles/battles-callback',
        // component: () => import(/* webpackChunkName: "battlesCallback" */ '../components/Battles/BattlesCallback.vue')
        component: BattlesCallback
      }
    ]
  }]

const router = new VueRouter({
  routes
})

export default router
