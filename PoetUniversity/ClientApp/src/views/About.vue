<template>
  <b-container class="about">
    <b-row>
      <b-col>
      <b-button @click='callApi'>Call Weather API</b-button>
      <b-button @click='api1'>Identity Api</b-button>
      <b-button @click='api2'>Weather Api</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          responsive
          striped
          hover
          selectable
          select-mode="single"
          :items="items"
          :fields="fields"
          @row-selected="onRowSelected"
        >
        </b-table>
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

var config = {
  authority: 'https://localhost:5003',
  client_id: 'js',
  redirect_uri: 'https://localhost:5004/callback.html',
  response_type: 'code',
  scope: 'openid profile api1',
  post_logout_redirect_uri: 'https://localhost:5004/index.html'
}

var mgr = new Oidc.UserManager(config)

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      weather: ['no data yet'],
      items: [],
      fields: []
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
        var url = 'http://localhost:5001/identity'
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
      const url = 'https://localhost:5001/WeatherForecast'
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
        const response = await axios.get('https://localhost:5001/WeatherForecast')
        console.log(response)
        this.fields = this.parseFields(response.data[0])
        this.items = response.data
        console.log(this.fields)
        console.log(this.items)
      } catch (err) {
        this.weather.push('Ooops!' + err)
      }
    },
    parseFields (datum, casing, sortable) {
      // make sure to leave quotes off regex
      var regex = new RegExp(/([A-Z][a-z])/g)
      var replacement = ' $1'
      var recase = (field) => {
        return field.replace(regex, replacement).replace('/^./', s => s.toUpperCase())
      }
      var sort = []
      if (sortable == null) {
        sort = Object.keys(datum).map(x => true)
      } else {
        sort = sortable
      }
      if (typeof datum === 'object' && datum !== null) {
        return Object.keys(datum).map((x, i) => ({
          'key': x,
          'label': recase(x),
          'sortable': sort[i]
        }))
      } else {
        throw new TypeError('This function is for an object')
      }
    },
    onRowSelected: function (items) {
      if (items[0] !== undefined) {
        var keys = this.fields.map((x, i) => { return x.key })
        var _keys = this.fields.map((x, i) => { return { key: x.key, index: i } })
        var labels = this.fields.map((x, i) => { return { index: i, key: x.label } })
        console.log(keys)
        console.log(_keys)
        console.log(labels)
        Object.entries(items[0]).forEach(([k, v], i) => {
          if (keys.includes(k)) {
            var index = _keys.filter(_k => _k.key === k)[0].index
            var label = labels.filter(l => l.index === index)[0]
            console.log(index)
            console.log(k)
            console.log(`${label.key}: ${v}`)
          }
        })
      }
    },
    logContent: function () {
      var keys = this.fields.map((x, i) => { return x.key })
      var _keys = this.fields.map((x, i) => { return { key: x.key, index: i } })
      var labels = this.fields.map((x, i) => { return { index: i, key: x.label } })
      console.log(keys)
      console.log(_keys)
      console.log(labels)
      Object.entries(this.stepGroup[0]).forEach(([k, v], i) => {
        if (keys.includes(k)) {
          var index = _keys.filter(_k => _k.key === k)[0].index
          var label = labels.filter(l => l.index === index)[0]
          console.log(index)
          console.log(k)
          console.log(`${label.key}: ${v}`)
        }
      })
    },
    logContent2: function () {
      var keys = this.fields.map((x, i) => { return x.key })
      var _keys = this.fields.map((x, i) => { return { key: x.key, index: i } })
      var labels = this.fields.map((x, i) => { return { index: i, key: x.label } })
      console.log(keys)
      console.log(_keys)
      console.log(labels)
      Object.entries(this.stepGroup[0]).forEach(([k, v], i) => {
        if (keys.includes(k)) {
          var index = _keys.filter(_k => _k.key === k)[0].index
          var label = labels.filter(l => l.index === index)[0]
          console.log(index)
          console.log(k)
          console.log(`${label.key}: ${v}`)
        }
      })
    }
  }
}
</script>
