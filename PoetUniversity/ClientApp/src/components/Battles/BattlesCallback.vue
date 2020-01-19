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
  name: 'BattlesCallback',
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
      // debugger
      try {
        var result = await mgr.signinRedirectCallback()
        var returnToUrl = '/battles'
        if (result.state !== undefined) {
          console.log(result)
          // debugger
          returnToUrl = result.state
        }
        this.$router.push({ path: returnToUrl })
      } catch (e) {
        this.$router.push({ name: 'Unauthorized' })
      }
    }
  },
  created: function () {
    console.log(this)
    // debugger
    // this.redirect()
  }
}
</script>
