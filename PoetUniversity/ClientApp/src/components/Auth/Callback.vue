<template>
    <b-row>
      <b-col>
        <div>
          <p>Sign-in in progress</p>
        </div>
      </b-col>
    </b-row>
</template>

<script>
// import { mapGetters } from 'vuex'
import mgr from '@/services/security/oidc-bouncer.js'

export default {
  name: 'Callback',
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    async redirect () {
      try {
        var result = await mgr.signinRedirectCallback()
        var returnToUrl = '/'
        if (result.state !== undefined) {
          returnToUrl = result.state
        }
        this.$router.push({ path: returnToUrl })
      } catch (e) {
        this.$router.push({ name: 'Unauthorized' })
      }
    }
  }
}
</script>
