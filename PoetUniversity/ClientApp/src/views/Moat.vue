<template>
  <b-container class="moat">
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
      <b-button :disabled="false" @click='_login'>Login</b-button>
      <b-button :disabled="false" @click='logout'>Logout</b-button>
      <b-button :disabled="true">Future</b-button>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col>
        <p>You found your way to the moat. Great job.</p>
        <pre>
          Authenticated: {{ user.isAuthenticated }}
          Email Address: {{ user.email }}
          User Name: {{ user.userName }}
          Name: {{ user.name }}
        </pre>
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
import { mapState, mapGetters, mapActions } from 'vuex'
import endpoints from '@/store/api-endpoints'
import TableComp from '@/components/TableComp'

export default {
  name: 'Moat',
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
      servicesLoaded: false,
      docsUrl: 'https://www.richard-banks.org/2018/11/securing-vue-with-identityserver-part1.html'
    }
  },
  computed: {
    ...mapState('moat', ['user']),
    ...mapGetters('moat', ['getUser']),
    ...mapActions('moat', ['login', 'logout']),
    weatherUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.WEATHER_API },
    identityUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.IDENTITY_API },
    servicesUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.SERVICES_API },
    headers () {
      console.log(this.getUser)
      return {
        'headers': {
          'Authorization': 'Bearer ' + this.getUser.access_token
        }
      }
    }
    // showWeather () {},
    // show () {},
    // showWeather () {},
  },
  methods: {
    _login: function () {
      this.$store.dispatch('moat/login', 'moat')
    },
    async weatherApi () {
      try {
        const response = await axios.get(this.weatherUrl, this.headers)
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
        console.log('hit id api from moat')
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
