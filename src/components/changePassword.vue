<template>
  <div class="change-password-component">
    <v-card
      flat
      class="transparent"
      :dark="isDark">
    <v-row
      v-if="titleEnabled"
      class="form-title justify-center pb-4"
      >
      {{$t('components.changePassword.changePassword')}}</v-row>
    <v-form ref="form" v-model="valid" @submit.prevent="onChangePassword">
      <!-- password  -->
      <div v-if="passwordEnabled" class="subtitle-2 input-placeholder-left pt-1">
        <v-icon v-if="solo && iconEnabled" medium color="darken-2" class="ml-3">mdi-lock</v-icon>
        <span v-if="solo">{{ passwordTitle}}</span>
        <v-text-field
          v-model="userPassword.password"
          autofocus
          tabindex="1"
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
          :hint="$t('components.changePassword.passwordValidation')"
          required
          dir="ltr"
          @click:prepend-inner="showPass = !showPass"
        ></v-text-field>
      </div>
      <!-- new password  -->
      <div v-if="newPasswordEnabled" class="subtitle-2 input-placeholder-left">
        <v-icon v-if="solo && iconEnabled" medium color="darken-2" class="ml-3">mdi-lock</v-icon>
        <span v-if="solo">{{ newPasswordTitle}}</span>
        <v-text-field
          ref="newPassword"
          v-model="userPassword.newPassword"
          tabindex="2"
          :solo="solo"
          :outlined="outlined"
          flat
          color="primary"
          class="mt-2"
          :prepend-inner-icon="showNewPass ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="newPasswordValidation"
          :label="this.newPasswordTitle"
          :placeholder="this.passwordPlaceholder"
          :prepend-icon="outlined && iconEnabled ? 'mdi-lock' : ''"
          name="newPassword"
          :type="showNewPass ? 'text' : 'password'"
          required
          dir="ltr"
          @click:prepend-inner="showNewPass = !showNewPass"
        ></v-text-field>
      </div>
      <!-- change password btn -->
      <v-row
        class="justify-center mx-0 my-3"
        >
        <v-btn
          tabindex="3"
          type="submit"
          :width="buttonWidth"
          :block="isButtonFullWidth"
          :x-large="isButtonLarge"
          :disabled="!valid"
          class="white--text"
          :color="changePasswordButtonColor">
          {{ changePasswordButtonTitle }}
        </v-btn>
      </v-row>
      <v-row
        class="justify-center mx-0"
        >
        <v-btn
          v-if="backButtonEnabled"
          :width="buttonWidth"
          :x-large="isButtonLarge"
          :to="backButtonRoute"
          :color="backLinkColor">
          {{$t('components.forgotPassword.back')}}
        </v-btn>
      </v-row>
    </v-form>
    </v-card>
  </div>
</template>
<script>
/**
 * @name change password component
 * @description change user  password
 * @version 1.0.0
 * @event changepassword
 * @property {Boolean} [isDark=false] - Specifies the form theme,
 * @property {String} [changePasswordButtonTitle] - Specifies the title of the registration button,
 * @property {String} [isButtonFullWidth] - Expands the button to 100% of available space,
 * @property {String} [changePasswordButtonColor='blue darken-2'] - Specifies the color of the registration button,
 * @property {Boolean} [newPasswordEnabled=true] - Specifies whether input exists in the form,
 * @property {Boolean} [passwordEnabled=true] - Specifies whether input exists in the form,
 * @property {String} [newPasswordTitle] - Specifies the input Title text,
 * @property {String} [passwordTitle] - Specifies the input Title text,
 * @property {String} [newPasswordPlaceholder] - Specifies the input placeholder text,
 * @property {String} [passwordPlaceholder] - Specifies the input placeholder text,
 * @property {Boolean} [newPasswordRequiredEnabled=true] - Specifies whether input is required,
 * @property {Boolean} [newPasswordRequiredEnabled=true] - Specifies whether input is required,
 * @property {String} [newPasswordRequiredMessage] - If the input value is empty, the text of the error message is displayed,
 * @property {String} [passwordRequiredMessage] - If the input value is empty, the text of the error message is displayed,
 * @property {Boolean} [newPasswordPatternEnabled=true]
 * @property {Boolean} [passwordPatternEnabled=true]
 * @property {String} [newPasswordPatternRegex] - validation regex
 * @property {String} [passwordPatternRegex] - validation regex
 * @property {String} [newPasswordPatternMessage] - validation regex message
 * @property {String} [passwordPatternMessage] - validation regex message
 * @property {Boolean} [solo=true] - input theme is solo
 * @property {Boolean} [outlined=false] - input theme is outlined
 * @property {Boolean} [iconEnabled=true]
 * @property {Boolean} [titleEnabled=true] - Specifies whether main title is displayed or not
 * @property {Boolean} [isButtonLarge=false] - Specifies Button is larger than usual or not
 * @property {Number} [buttonWidth=200] - button width
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
      default: false,
      required: false
    },
    backButtonRoute: {
      type: String,
      default: '/',
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
    changePasswordButtonTitle: {
      type: String,
      default () {
        return this.$t('components.changePassword.changePassword')
      },
      required: false
    },
    isButtonFullWidth: {
      type: Boolean,
      default: false,
      required: false
    },
    changePasswordButtonColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    newPasswordEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    newPasswordTitle: {
      type: String,
      default () {
        return this.$t('components.changePassword.repeatNewPassword')
      },
      required: false
    },
    newPasswordPlaceholder: {
      type: String,
      default () {
        return this.$t('components.changePassword.passwordPlaceholder')
      },
      required: false
    },
    newPasswordRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.changePassword.newPasswordRequired')
      },
      required: false
    },
    newPasswordPatternMessage: {
      type: String,
      default () {
        return this.$t('components.changePassword.newPasswordValidation')
      },
      required: false
    },
    newPasswordRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    newPasswordPatternEnabled: {
      type: Boolean,
      default: true,
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
        return this.$t('components.changePassword.newPassword')
      },
      required: false
    },
    passwordPlaceholder: {
      type: String,
      default () {
        return this.$t('components.changePassword.passwordPlaceholder')
      },
      required: false
    },
    passwordRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.changePassword.passwordRequired')
      },
      required: false
    },
    passwordPatternMessage: {
      type: String,
      default () {
        return this.$t('components.changePassword.passwordValidation')
      },
      required: false
    },
    passwordPatternRegex: {
      type: String,
      default: '/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9@$!%*?&]{8,})$/',
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
        password: '',
        newPassword: ''
      },
      showPass: false,
      showNewPass: false,
      passwordRules: {
        required: value => !!value || this.passwordRequiredMessage,
        pattern: value => RegExp(this.passwordPatternRegex.substring(1, this.passwordPatternRegex.length - 1)).test(value) || this.passwordPatternMessage
      },
      newPasswordRules: {
        required: value => !!value || this.newPasswordRequiredMessage,
        pattern: value => value === this.userPassword.password || this.newPasswordPatternMessage
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
    },
    newPasswordValidation () {
      if (this.newPasswordRequiredEnabled === true && this.newPasswordPatternEnabled === true) {
        return [this.newPasswordRules.required, this.newPasswordRules.pattern]
      } else if (this.newPasswordRequiredEnabled === true) {
        return [this.newPasswordRules.required]
      } else if (this.newPasswordPatternEnabled === true) {
        return [this.newPasswordRules.pattern]
      }
      return ''
    }
  },
  methods: {
    onChangePassword (event) {
      this.$emit('changepassword', {
        password: this.userPassword.password
      })
    }
  },
  watch: {
    'userPassword.password': function () {
      if (this.userPassword.newPassword) {
        this.$refs.newPassword.validate()
      }
    }
  }
}
</script>

<style lang="scss">
  .change-password-component {
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
