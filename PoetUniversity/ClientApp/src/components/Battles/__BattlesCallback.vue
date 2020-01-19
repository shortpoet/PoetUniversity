<template>
<div></div>
</template>
<script>
import { setIdToken, setAccessToken } from '@/utils/auth'
export default {
  name: '',
  mounted () {
    this.$nextTick(() => {
      console.log('battles callback')
      debugger

      setAccessToken()
      setIdToken()
      window.location.href = '/'
    })
  }
}
</script>
