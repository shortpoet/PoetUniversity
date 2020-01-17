<template>
    <b-row>
      <b-col>
        <div>
          <p>You do not have permissions or your sign in failed</p>
        </div>
      </b-col>
    </b-row>
</template>

<script>
// import { mapGetters } from 'vuex'
// import mgr from '@/services/security/oidc-bouncer.js'

export default {
  name: 'Unauthorized',
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
    console.log(this)
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
