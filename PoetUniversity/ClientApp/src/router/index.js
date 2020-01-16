import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store/index'
import Callback from '@/components/Auth/Callback'
Vue.use(VueRouter)

const auth = store.getters['auth/getAuthState']

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/door'
  },
  {
    path: '/door',
    name: 'door',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "door" */ '../views/Door.vue'),
    beforeEnter: (to, from, next) => {
      console.log('#### before DOOR enter ####')
      if (auth.isAuthenticated) {
        // already signed in, we can navigate anywhere
        next()
      } else if (to.matched.some(record => record.meta.requiresAuth)) {
        // authentication is required. Trigger the sign in process, including the return URI
        store.dispatch('auth/authenticate', to.path).then(() => {
          console.log('authenticating a protected url:' + to.path)
          next()
        })
      } else {
        // No auth required. We can navigate
        next()
      }
    }
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback
  }
]

const router = new VueRouter({
  routes
})

export default router
