<template>
  <div class="global-snackbar-component">
    <v-snackbar
      v-model="show"
      :timeout="timeout"
      :top="true"
      :color="color"
      content-class="text-center"
      >
      {{ message }}
      <template 
        v-if="closable"
        v-slot:action="{ attrs }"
        >
        <v-btn
          text
          icon
          v-bind="attrs"
          @click="show = false"
          >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
/**
 * @name globalSnackbar
 * @description global vuetify snackbar for showing messages
 * @version 1.0.0
 */
export default {
  data () {
    return {
      show: false,
      message: '',
      color: '',
      timeout: 4000,
      closable: true
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.color = state.snackbar.color
        this.message = state.snackbar.content
        this.show = true
        this.closable = state.snackbar.closable
        this.timeout = state.snackbar.timeout
      }
    })
  }
}
</script>
