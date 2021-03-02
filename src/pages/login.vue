<route>
{
  "name": "login",
  "meta": {
    "order": 5,
    "isVisible": true,
    "iconName": "mdi-email",
    "artwork": "/img/samples/auth-artwork.png"
  }
}
</route>
<template>
  <login
    forgot-password-route="forgotpass"
    register-route="register"
    :is-dark=true
    @login="onLogin" />
</template>
<script>
export default {
  layout: 'twoside',
  methods: {
    onLogin (payload) {
      console.log('Do Login ---------------- !!!!')
      console.log(payload.email)
      console.log(payload.password)
      console.log(payload.rememberMe)
    }
  }
}
</script>
