<template>
  <b-container class="sentry">
    <hr />
    <b-row>
      <b-col>
      <b-button @click='servicesApi'>Services Api</b-button>
      <b-button @click='identityApi'>Identity Api</b-button>
      <b-button @click='weatherApi'>Weather Api</b-button>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col>
      <b-button :disabled="false" @click='login'>Login</b-button>
      <b-button :disabled="false" @click='logout'>Logout</b-button>
      <b-button :disabled="true">Future</b-button>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col>
        <div class="profile-link">
          <p v-if="isLoggedIn">User: <router-link to="/sentry/profile">{{ user.profile.name }}</router-link></p>
          <button @click="login" v-if="!isLoggedIn">Login</button>
          <button @click="logout" v-if="isLoggedIn">Logout</button>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div
          id="weather"
          v-if="weatherLoaded"
        >
          <TableComp
            :items="weather"
          />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div
          id="identity"
          v-if="identityLoaded"
        >
          <TableComp
            :items="identity"
          />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div
          id="services"
          v-if="servicesLoaded"
        >
          <TableComp
            :items="services"
          />
          <div v-for="(service,index) in services" :key="index">
            <p>
              <img :src="service.iconUri" />
              <a :href="service.uri">{{ service.name }}</a>
            </p>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div
          id="results"
        >
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import endpoints from '@/store/api-endpoints'
import TableComp from '@/components/TableComp'

export default {
  name: 'Sentry',
  props: {
    msg: String
  },
  components: {
    TableComp
  },
  data () {
    return {
      weather: ['no data yet'],
      weatherLoaded: false,
      identity: [],
      identityLoaded: false,
      services: [],
      servicesLoaded: false
    }
  },
  computed: {
    ...mapState('sentry', ['user']),
    ...mapGetters('sentry', ['getUser', 'getAuthState']),
    // mapactions seems to force the login/auth
    weatherUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.WEATHER_API },
    identityUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.IDENTITY_API },
    servicesUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.SERVICES_API },
    headers () {
      // console.log(this.getUser)
      return {
        'headers': {
          'Authorization': 'Bearer ' + this.getUser.access_token
        }
      }
    },
    isLoggedIn () { return this.getAuthState }
    // // showWeather () {},
    // // show () {},
    // // showWeather () {},
  },
  methods: {
    login: function () {
      this.$store.dispatch('sentry/login', 'sentry')
    },
    logout: function () {
      this.$store.dispatch('sentry/logout', 'sentry')
    },
    async weatherApi () {
      try {
        console.log('weather api')
        const response = await axios.get(this.weatherUrl)
        console.log(response)
        this.weather = response.data
        this.weatherLoaded = true
        console.log('weather')
        console.log(this.weather)
        this.weatherApi2()
      } catch (err) {
        this.weather.push('Ooops!' + err)
      }
    },
    weatherApi2: function () {
      fetch(this.weatherUrl)
        .then(response => response.text()
          // .json(), etc.
          // same as function(response) {return response.text();}
        ).then(
          html => console.log(html)
        )
    },
    async identityApi () {
      try {
        const response = await axios.get(this.identityUrl, this.headers)
        console.log(response)
        this.identity = response.data
        this.identityLoaded = true
        console.log('identity')
        console.log(this.identity)
      } catch (err) {
        this.identity.push('Ooops!' + err)
      }
    },
    async servicesApi () {
      try {
        const response = await axios.get(this.servicesUrl, this.headers)
        console.log(response)
        this.services = response.data
        this.servicesLoaded = true
        console.log('services')
        console.log(this.services)
      } catch (err) {
        this.services.push('Ooops!' + err)
      }
    }
  },
  mounted: function () {
    console.log(this.$store)
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
pre {
  width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #fff3cd;
  border-radius: 5px;
  text-align: left;
}
</style>
