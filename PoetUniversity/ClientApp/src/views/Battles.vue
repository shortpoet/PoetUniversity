<template>
  <b-container class="door">
    <b-row>
      <b-col>
        <div>
          <h5>
            This is an extension of the code found in Richard Bank's fine <b-link target="_blank" :href="docsUrl">Blog Post Series</b-link> on securing a vue app with IdentityServer.
          </h5>
        </div>
      </b-col>
    </b-row>
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
import { mapGetters } from 'vuex'
import endpoints from '@/store/api-endpoints'
import TableComp from '@/components/TableComp'

export default {
  name: 'HelloWorld',
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
    ...mapGetters('auth', ['getUser']),
    weatherUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.WEATHER_API },
    identityUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.IDENTITY_API },
    servicesUrl () { return endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.SERVICES_API },
    headers () {
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
    },
    login () {
      this.$store.dispatch('auth/login')
    },
    logout () {
      this.$store.dispatch('auth/logout')
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
</style>
