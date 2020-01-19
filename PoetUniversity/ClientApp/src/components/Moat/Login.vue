<template>
  <div>
    <h1>Logging in...</h1>
  </div>
</template>

<script>
import AuthService from '@/services/security/oidc-moat.js'
import { mapMutations } from 'vuex'
import {
  SET_MOAT_USER
} from '@/store/mutation-types'

export default {
  name: 'Login',
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapMutations('moat', [SET_MOAT_USER])
  },
  methods: {
    login () {
      console.log('starting login process from login.vue')
      const authService = new AuthService(() => true, '/logincallback')
      authService.login(this.$route.query.returnTo)
        .then(user => {
          // Will return immediately on our way to OAuth
          if (!user.isAuthenticated) return

          this.SET_MOAT_USER(user)
          console.info('Grabbed login info from local data: ', user.name, user.userName)

          let returnPath
          try {
            returnPath = this.$route.query.returnTo || '/'
          } catch (e) {
            returnPath = '/'
          }
          this.$router.push(returnPath)
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
