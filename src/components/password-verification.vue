<template>
  <div class="verify-password-component">
    <v-card
      flat
      class="transparent"
      :dark="isDark">
    <v-row
      v-if="titleEnabled"
      class="form-title pb-4 justify-center"
    >
      {{$t('components.passwordVerification.title')}}</v-row>
    <v-form ref="form" v-model="valid" @submit.prevent="onVerifyPassword">
      <!-- password  -->
      <div v-if="passwordEnabled" class="subtitle-2 input-placeholder-left pt-1">
        <v-icon v-if="solo && iconEnabled" medium color="darken-2" class="ml-3">mdi-lock</v-icon>
        <span v-if="solo">{{ passwordTitle}}</span>
        <v-text-field
          v-model="userPassword.password"
          :solo="solo"
          :outlined="outlined"
          flat
          color="primary"
          class="mt-2"
          :prepend-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordValidation"
          :label="this.passwordTitle"
          :placeholder="this.passwordPlaceholder"
          :prepend-icon="outlined && iconEnabled ? 'mdi-lock' : ''"
          name="password"
          :type="showPass ? 'text' : 'password'"
          required
          dir="ltr"
          @click:prepend-inner="showPass = !showPass"
        ></v-text-field>
      </div>
      <!-- verify password btn -->

      <v-row
        class="justify-center mx-0 my-3"
      >
        <v-btn
          type="submit"
          :width="buttonWidth"
          :block="isButtonFullWidth"
          :x-large="isButtonLarge"
          :disabled="!valid"
          class="white--text"
          :color="verifyPasswordButtonColor">
          {{ verifyPasswordButtonTitle }}
        </v-btn>
      </v-row>
      <v-row
        class="justify-center mx-0"
      >
        <v-btn
          v-if="backButtonEnabled"
          :width="buttonWidth"
          :x-large="isButtonLarge"
          :color="backLinkColor"
          @click="cancelButtonClicked"
        >
          {{$t('components.forgotPassword.back')}}
        </v-btn>
      </v-row>
    </v-form>
    </v-card>
  </div>
</template>
<script>
/**
 * @name verify password component
 * @description verify user password
 * @version 1.0.0
 * @event verifypassword
 * @property {Boolean} [isDark=false] - Specifies the form theme,
 * @property {String} [verifyPasswordButtonTitle] - Specifies the title of the registration button,
 * @property {String} [isButtonFullWidth] - Expands the button to 100% of available space,
 * @property {String} [verifyPasswordButtonColor='blue darken-2'] - Specifies the color of the registration button,
 * @property {Boolean} [passwordEnabled=true] - Specifies whether input exists in the form,
 * @property {String} [passwordTitle] - Specifies the input Title text,
 * @property {String} [passwordPlaceholder] - Specifies the input placeholder text,
 * @property {String} [passwordRequiredMessage] - If the input value is empty, the text of the error message is displayed,
 * @property {Boolean} [passwordPatternEnabled=true]
 * @property {String} [passwordPatternRegex] - validation regex
 * @property {String} [passwordPatternMessage] - validation regex message
 * @property {Boolean} [solo=true] - input theme is solo
 * @property {Boolean} [outlined=false] - input theme is outlined
 * @property {Boolean} [iconEnabled=true]
 * @property {Boolean} [titleEnabled=true] - Specifies whether main title is displayed or not
 * @property {Boolean} [isButtonLarge=false] - Specifies Button is larger than usual or not
 * @property {Boolean} [backButtonEnabled=false] - Specifies whether main back button is displayed or not
 * @property {String} [backLinkColor=''] - Specifies back button color
 */
export default {
  props: {
    buttonWidth: {
      type: Number,
      default: 200,
      required: false
    },
    backButtonEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    backLinkColor: {
      type: String,
      default: 'rgba(25, 118, 210, 0.2)',
      required: false
    },
    iconEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    solo: {
      type: Boolean,
      default: true,
      required: false
    },
    outlined: {
      type: Boolean,
      default: false,
      required: false
    },
    isDark: {
      type: Boolean,
      default: false,
      required: false
    },
    verifyPasswordButtonTitle: {
      type: String,
      default () {
        return this.$t('components.passwordVerification.buttonTitle')
      },
      required: false
    },
    isButtonFullWidth: {
      type: Boolean,
      default: false,
      required: false
    },
    verifyPasswordButtonColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    passwordEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    passwordTitle: {
      type: String,
      default () {
        return this.$t('components.passwordVerification.password')
      },
      required: false
    },
    passwordPlaceholder: {
      type: String,
      default () {
        return this.$t('components.passwordVerification.passwordPlaceholder')
      },
      required: false
    },
    passwordRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.passwordVerification.passwordRequired')
      },
      required: false
    },
    passwordPatternMessage: {
      type: String,
      default () {
        return this.$t('components.passwordVerification.passwordValidation')
      },
      required: false
    },
    passwordPatternRegex: {
      type: String,
      default: '/^(?=.*).{8,}/',
      required: false
    },
    passwordRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    passwordPatternEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    titleEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    isButtonLarge: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      valid: true,
      userPassword: {
        password: ''
      },
      showPass: false,
      passwordRules: {
        required: value => !!value || this.passwordRequiredMessage,
        pattern: value => RegExp(this.passwordPatternRegex.substring(1, this.passwordPatternRegex.length - 1)).test(value) || this.passwordPatternMessage
      }
    }
  },
  computed: {
    passwordValidation () {
      if (this.passwordRequiredEnabled === true && this.passwordPatternEnabled === true) {
        return [this.passwordRules.required, this.passwordRules.pattern]
      } else if (this.passwordRequiredEnabled === true) {
        return [this.passwordRules.required]
      } else if (this.passwordPatternEnabled === true) {
        return [this.passwordRules.pattern]
      }
      return ''
    }
  },
  methods: {
    cancelButtonClicked (e) {
      this.$router.go(-1)
    },
    onVerifyPassword (event) {
      this.$emit('verifypassword', {
        password: this.userPassword.password
      })
    }
  }
}
</script>

<style lang="scss">
  .verify-password-component {
    $active-color : #26a69a;
    $input-text-color : #424242;
    $placeholder-text : #a3a3a3;
    $text-color-dark : #9c9c9c;
    $error-text : #cc4b4b;
    $input-color : #F3F7F9;

    .v-text-field .v-input__slot {
      background: $input-color !important;
    }
    .v-input input::placeholder {
      color: $placeholder-text !important;
    }
    .v-input input {
      color: $input-text-color !important;
    }

    .form-title {
      font-size : 20px;
    }
    .v-btn {
      letter-spacing: 0;
    }
    .theme--dark {
      &.v-card {
        color: $text-color-dark;
        i {
           color: $text-color-dark;
        }
      }
      .v-icon {
        color: $text-color-dark;
      }
      .form-title {
        color : white;
      }
    }
    .theme--light {
      .v-text-field .v-input__slot {
        background: #F3F7F9 !important;
      }
      .v-input input {
        color: $input-text-color;
      }
    }
    .v-text-field--placeholder{
      font-size: 12px;
    }
    .input-placeholder-left{
      input {
        text-align: left;
      }
    }
    .v-text-field--solo {
      &.error--text {
        .v-input__slot{
          border: 2px solid !important;
        }
      }
    }
    .v-text-field .v-input__slot {
      border-radius: 5px !important;
    }
    .v-application--is-rtl .v-input--selection-controls__input {
      margin-left: 15px !important;
    }

    .v-messages {
      min-height: 18px !important;
    }

    .v-text-field__details {
      padding: 0 !important;
      .error--text {
        display: flex;
        align-items: center;
        &:before {
          content: "\F0026";
          font: normal normal normal 24px/1 "Material Design Icons";
          font-size: 18px;
          padding-left : .5rem;
        }
      }
    }
  }
</style>
