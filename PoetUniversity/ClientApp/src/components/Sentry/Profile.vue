<template>
  <div class="user-profile">
    <div class="profile-card">
      <h1 class="profile-card__title">{{ userName }}</h1>
      <p class="profile-card__subtitle">{{ userEmail }}</p>
      <img class="profile-card__avatar" :src="userPhoto" />
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/security/oidc-sentry.js'
import { mapMutations } from 'vuex'
import {
  SET_MOAT_USER
} from '@/store/mutation-types'

export default {
  name: 'Profile',
  components: {
  },
  props: {
  },
  data () {
    return {
      userName: '',
      userEmail: '',
      userPhoto: ''
    }
  },
  computed: {
    ...mapMutations('moat', [SET_MOAT_USER])
  },
  methods: {
    login () {
      console.log('starting login process from login.vue')
      const authService = new AuthService()
      authService.getUser()
        .then(user => {
          // Will return immediately on our way to OAuth

          console.info('Grabbed login info from local data: ', user.name, user.userName)
          try {
            this.userName = user.profile.name
            this.userEmail = user.profile.email
            this.userPhoto = user.profile.picture
          } catch (e) {
            console.warn('This Broke')
            console.error(e)
          }
        })
        .catch(er => {
          console.warn('This Broke')
          console.error(er)
        })
    }
  },
  mounted () {
    console.log('#### mount from login.vue ####')
    this.login()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
