<template>
    <b-row>
      <b-col>
        <div>
          <div class="home">
            <img alt="Vue logo" src="../assets/logo.png">
            <JavaScriptClient msg="Welcome to Your Javascript Client"/>
          </div>
        </div>
      </b-col>
    </b-row>
</template>

<script>
// import { mapGetters } from 'vuex'
// import mgr from '@/services/security/oidc-bouncer.js'
import JavaScriptClient from '@/components/JavaScriptClient'

export default {
  name: 'Home',
  components: {
    JavaScriptClient
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  created: function () {
    // console.log(this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
