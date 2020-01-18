<template>
  <b-container class="battles">
    <b-row>
      <b-col>
        <div>
          <h5>
            This is an extension of the code found in DZone's fine <b-link target="_blank" :href="dzoneUrl">Blog Post Series</b-link> on securing a vue app with IdentityServer.
          </h5>
        </div>
      </b-col>
    </b-row>
    <hr />
    <PublicBattles />
  </b-container>
</template>

<script>
// import axios from 'axios'
// import { mapGetters } from 'vuex'
// import endpoints from '@/store/api-endpoints'
import PublicBattles from '@/components/Battles/PublicBattles'

export default {
  name: 'Battles',
  props: {
    msg: String
  },
  components: {
    PublicBattles
  },
  data () {
    return {
      dzoneUrl: 'https://dzone.com/articles/vuejs-2-authentication-tutorial-part-3'
    }
  },
  computed: {
    // ...mapGetters('auth', ['getUser']),
    // weatherUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.WEATHER_API },
    // identityUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.IDENTITY_API },
    // servicesUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.SERVICES_API },
    // headers () {
    //   return {
    //     'headers': {
    //       'Authorization': 'Bearer ' + this.getUser.access_token
    //     }
    //   }
    // }
    // showWeather () {},
    // show () {},
    // showWeather () {},
  },
  methods: {
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
