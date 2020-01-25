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
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('sentry', ['user']),
    userName () { return this.user.profile.name },
    userEmail () { return this.user.profile.email },
    userPhoto () { return this.user.profile.picture }
  },
  methods: {
  },
  mounted () {
    console.log(this.$store)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
