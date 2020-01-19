<template>
<div></div>
</template>
<script>
// import { setIdToken, setAccessToken } from '@/utils/auth'
import Oidc from 'oidc-client'
export default {
  name: '',
  mounted () {
    this.$nextTick(() => {
      console.log('battles callback')
      new Oidc.UserManager({ response_mode: 'query' }).signinRedirectCallback().then(function () {
        window.location = 'index.html'
      }).catch(function (e) {
        console.error(e)
      })
    })
  }
}
</script>
