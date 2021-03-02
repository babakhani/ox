<route>
{
  "name": "register",
  "meta": {
    "order": 6,
    "isVisible": true,
    "iconName": "mdi-login",
    "artwork": "/img/samples/auth-artwork.png"
    }
}
</route>
<template>
  <registration
    login-route="login"
    :is-dark=true
    @register="onRegsiter"
  />
</template>
<script>
export default {
  layout: 'twoside',
  data () {
    return {

    }
  },
  methods: {
    onRegsiter (payload) {
      console.log('Do Regsiter ---------------- !!!!')
      console.log(payload.email)
      console.log(payload.name)
      console.log(payload.lastName)
      console.log(payload.password)
      console.log(payload.phoneNumber)
    }
  }
}
</script>
