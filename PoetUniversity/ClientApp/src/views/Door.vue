<template>
  <b-container class="door">
    <b-row>
      <b-col>
      <b-button @click='callApi'>Call Weather API</b-button>
      <b-button @click='api1'>Identity Api</b-button>
      <b-button @click='api2'>Weather Api</b-button>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col>
      <b-button :disabled="false" @click='login'>Login</b-button>
      <b-button :disabled="false" @click='logout'>Logout</b-button>
      <b-button :disabled="true" @click='api2'>Future</b-button>
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
          id="results"
        >
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import Oidc from 'oidc-client'
// import { mapGetters } from 'vuex'
import endpoints from '@/store/api-endpoints'
import TableComp from '@/components/TableComp'

var config = {
  authority: 'https://localhost:5003',
  client_id: 'poet',
  redirect_uri: 'http://localhost:8080/callback',
  response_type: 'code',
  scope: 'openid profile api1',
  post_logout_redirect_uri: 'http://localhost:8080/'
}

var mgr = new Oidc.UserManager(config)

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
      items: []
    }
  },
  methods: {
    log () {
      document.getElementById('results').innerText = ''
      Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
          msg = 'Error: ' + msg.message
        } else if (typeof msg !== 'string') {
          msg = JSON.stringify(msg, null, 2)
        }
        document.getElementById('results').innerHTML += msg + '\r\n'
      })
    },
    api1: function () {
      mgr.getUser().then(function (user) {
        var url = endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.IDENTITY_API
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = function () {
          this.log(xhr.status, JSON.parse(xhr.responseText))
        }
        xhr.setRequestHeader('Authorization', 'Bearer ' + user.access_token)
        xhr.send()
      })
    },
    api2: function () {
      var url = endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.WEATHER_API
      fetch(url)
        .then(response => response.text()
          // .json(), etc.
          // same as function(response) {return response.text();}
        ).then(
          html => console.log(html)
        )
    },
    async callApi () {
      try {
        const response = await axios.get(endpoints.index.BACKEND_PREFIX_DEV + endpoints.auth.WEATHER_API)
        console.log(response)
        this.weather = response.data
        this.weatherLoaded = true
        console.log('weather')
        console.log(this.weather)
      } catch (err) {
        this.weather.push('Ooops!' + err)
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
