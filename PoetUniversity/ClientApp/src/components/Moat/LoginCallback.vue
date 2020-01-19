<template>
  <div>
    <h1>Processing login...</h1>
  </div>
</template>

<script>
import AuthService from '@/services/security/oidc-moat.js'
import { mapMutations } from 'vuex'
import {
  SET_MOAT_USER
} from '@/store/mutation-types'

export default {
  name: 'LoginCallback',
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
      const authService = new AuthService(() => true, '/logincallback')
      authService.signInCallback().then(user => {
        if (!user.isAuthenticated) return

        this.SET_MOAT_USER(user)
        console.info('Ran through Identity Server and logged in: ', user.name, user.bemsId)

        let returnPath
        try {
          returnPath = this.$route.query.returnTo || '/'
        } catch (e) {
          returnPath = '/'
        }
        this.$router.push(returnPath)
      })
    }
  },
  mounted () {
    this.login()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
