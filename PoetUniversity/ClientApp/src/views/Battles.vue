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
    <!-- <PublicBattles /> -->
    <div>
    <BattleNav />
    <h3 class="text-center">Daily Startup Battles</h3>
    <hr/>
    <b-button @click="publicApi">Public Battles</b-button>
    <Battle
      v-if="publicLoaded"
      :battles="publicBattles"
    />
    <div class="col-sm-12">
      <div class="jumbotron text-center" v-if="hasAuth">
        <h2>View Private Startup Battles</h2>
        <router-link class="btn btn-lg btn-success" to="/private-battles">Private Startup Battles</router-link>
      </div>
      <div class="jumbotron text-center" v-else>
        <h2>Get Access to Private Startup Battles by Logging In</h2>
      </div>
    </div>
  </div>

  </b-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import endpoints from '@/store/api-endpoints'
// import PublicBattles from '@/components/Battles/PublicBattles'
import BattleNav from '@/components/Battles/BattleNav'
import Battle from '@/components/Battles/Battle'
// import TableComp from '@/components/TableComp'

export default {
  name: 'Battles',
  props: {
    msg: String
  },
  components: {
    BattleNav,
    Battle
  },
  data () {
    return {
      dzoneUrl: 'https://dzone.com/articles/vuejs-2-authentication-tutorial-part-3',
      publicBattles: ['no data yet'],
      publicLoaded: false,
      privateBattles: [],
      privateLoaded: false
    }
  },
  computed: {
    ...mapGetters('auth0', ['getUser']),
    publicUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.BATTLES_API },
    privateUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.PRIVATE_BATTLES_API },
    headers () {
      return {
        'headers': {
          'Authorization': 'Bearer ' + this.getUser.access_token
        }
      }
    },
    hasAuth () {
      return this.getUser !== null
    }
    // showWeather () {},
    // show () {},
    // showWeather () {},
  },
  methods: {
    async publicApi () {
      try {
        console.log('hitting public battles api')
        console.log(this.publicUrl)
        const response = await axios.get(this.publicUrl)
        console.log(response)
        console.log(this.publicUrl)
        this.publicBattles = response.data
        this.publicLoaded = true
        console.log('weather')
        console.log(this.publicBattles)
      } catch (err) {
        this.publicBattles.push('Ooops!' + err)
      }
    },
    async privateApi () {
      try {
        const response = await axios.get(this.privateUrl, this.headers)
        console.log(response)
        this.privateBattles = response.data
        this.privateLoaded = true
        console.log('identity')
        console.log(this.privateBattles)
      } catch (err) {
        this.privateBattles.push('Ooops!' + err)
      }
    },
    login () {
      this.$store.dispatch('auth/login')
    },
    logout () {
      this.$store.dispatch('auth/logout')
    }
  },
  beforeMount () {
    this.publicApi()
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
