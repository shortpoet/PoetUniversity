<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/door">Door</router-link> |
      <router-link to="/battles">Battles</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
// import mgr from '@/services/security/oidc-bouncer.js'

export default {
  name: 'App',
  props: {
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    log: function (input) {
      if (input !== undefined) {
        console.log(input)
      } else {
        console.log(this)
      }
    }
  },
  mounted: function () {
    // this.log()
    // this.log(mgr)
    // this.log(mgr.getUser())
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
