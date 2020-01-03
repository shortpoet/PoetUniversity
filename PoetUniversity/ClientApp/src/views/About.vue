<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="api">Api</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    // api: function () {
    //   var url = "http://localhost:5001/identity";

    //     var xhr = new XMLHttpRequest();
    //     xhr.open("GET", url);
    //     xhr.onload = function () {
    //         log(xhr.status, JSON.parse(xhr.responseText));
    //     }
    //     // xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
    //     xhr.send();
    // }
    api: function () {
      const url = 'https://localhost:5001/WeatherForecast'
      fetch(url)
        .then(response => response.text()
          // .json(), etc.
          // same as function(response) {return response.text();}
        ).then(
          html => console.log(html)
        )
    }
  }
}
</script>
