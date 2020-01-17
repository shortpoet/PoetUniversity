<template>
  <div class="javascript-client">
    <b-row>
      <b-col>
        <div>
          <h3>
            {{ msg }}
          </h3>
        </div>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col>
        <b-button :disabled="false" @click='login'>Login</b-button>
        <b-button :disabled="false" @click='logout'>Logout</b-button>
        <b-button :disabled="false" @click='callApi'>Api</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div id="results"></div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import mgr from '@/services/security/oidc-bouncer.js'
import Oidc from 'oidc-client'
import axios from 'axios'

export default {
  name: 'JavaScriptClient',
  components: {
  },
  props: {
    msg: String
  },
  data () {
    return {
      config: {
        authority: 'https://localhost:5003',
        client_id: 'poet',
        redirect_uri: 'https://localhost:8080/callback.html',
        response_type: 'code',
        scope: 'openid profile api1',
        post_logout_redirect_uri: 'http://localhost:8080/'
      }
    }
  },
  computed: {
    mgr () {
      return new Oidc.UserManager(this.config)
    }
  },
  methods: {
    log: function (input) {
      if (input !== undefined) {
        console.log(input)
      } else {
        console.log(this)
      }
    },
    writeDOM () {
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
    authenticate () {
      var comp = this
      console.log('start authenticate')
      try {
        comp.mgr.getUser().then(function (user) {
          if (user) {
            comp.writeDOM('User logged in', user.profile)
            console.log('User logged in', user.profile)
          } else {
            comp.writeDOM('User not logged in')
            console.log('User not logged in')
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    login () {
      this.mgr.signinRedirect()
    },
    logout () {
      this.mgr.signoutRedirect()
    },
    api () {
      var comp = this
      comp.mgr.getUser().then(function (user) {
        var url = 'https://localhost:5001/identity'

        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = function () {
          comp.log(xhr.responseText)
          comp.writeDOM(xhr.status, JSON.parse(xhr.responseText))
        }
        xhr.setRequestHeader('Authorization', 'Bearer ' + user.access_token)
        comp.log(xhr)
        xhr.send()
      })
    },
    async callApi () {
      var comp = this
      var user = await comp.mgr.getUser()
      var url = 'https://localhost:5001/identity'
      var headers = {
        'headers': {
          'Authorization': 'Bearer ' + user.access_token
        }
      }
      var response = await axios.get(url, headers)
      comp.log(response)
    }
  },
  created: function () {
    console.log(this)
    this.authenticate()
  },
  mounted: function () {
    this.log()
    this.log(this.mgr)
    this.log(this.mgr.getUser())
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
