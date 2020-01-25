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
        <div>
          <h5>
            This is an extension of the code found in the <b-link target="_blank" :href="docsUrl">IdentityServer 4 docs</b-link> and <b-link target="_blank"  :href="repoUrl">quickstarts 4 repo</b-link>.
          </h5>
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
import config from '@/services/security/client-config.js'
// console.log(config.configIS4_JCS)

export default {
  name: 'JavaScriptClient',
  components: {
  },
  props: {
    msg: String
  },
  data () {
    return {
      repoUrl: 'https://github.com/IdentityServer/IdentityServer4/tree/master/samples/Quickstarts/4_JavaScriptClient',
      docsUrl: 'http://docs.identityserver.io/en/latest/quickstarts/4_javascript_client.html'
    }
  },
  computed: {
    mgr () {
      return new Oidc.UserManager(config.IS4_S)
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
        var lines = msg.split(',')
        lines.forEach(l => {
          document.getElementById('results').innerHTML += l + '<br />'
        })
        // document.getElementById('results').innerHTML += msg + '<br />' + 'Test'
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
      comp.writeDOM(JSON.stringify(response.data))
    }
  },
  created: function () {
    // console.log(this)
    this.authenticate()
  },
  mounted: function () {
    // this.log()
    // this.log(this.mgr)
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
