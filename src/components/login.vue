<template>
  <div class="login-component">
    <v-card
      flat
      class="transparent mx-auto"
      style="max-width: 320px;"
      :dark="isDark"
    >
      <v-row
        v-if="titleEnabled"
        class="justify-center form-title pb-4"
      >
        {{ $t('components.login.login') }}
      </v-row>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="onLogin"
      >
        <!-- email -->
        <div
          v-if="emailEnabled"
          class="subtitle-2 input-placeholder-left pt-1"
        >
          <v-text-field
            v-model="userInfo.email"
            autofocus
            tabindex="1"
            :outlined="outlined"
            class="mb-1 text-subtitle-2"
            dir="ltr"
            flat
            color="primary"
            :label="emailTitle"
            :rules="emailValidation"
            name="email"
            type="text"
            required
          ></v-text-field>
        </div>
        <!-- password  -->
        <div
          v-if="passwordEnabled"
          class="w-100 subtitle-2 input-placeholder-left"
        >
          <v-text-field
            v-model="userInfo.password"
            tabindex="2"
            :outlined="outlined"
            class="text-subtitle-2"
            dir="ltr"
            flat
            color="primary"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordValidation"
            :label="passwordTitle"
            name="password"
            :type="showPass ? 'text' : 'password'"
            required
            @click:append="showPass = !showPass"
          ></v-text-field>
        </div>
        <!------------>
        <div class="d-flex flex-column flex-sm-row justify-space-between align-start">
          <v-checkbox
            v-if="rememberMeEnabled"
            v-model="userInfo.rememberMe"
            tabindex="3"
            class="mt-0"
            :color="checkBoxColor"
            hide-details
            required
          >
            <template v-slot:label>
              <span
                class="text-no-wrap text-truncate text-caption"
              > {{ $t('components.login.rememberMe') }} </span>
            </template>
          </v-checkbox>
          <v-btn
            class="px-0 forgot-password text-caption"
            :color="forgotPasswordColor"
            text
            @click="$router.push({ name: forgotPasswordRoute })"
          > {{ forgotPassLinkTitle }} </v-btn>
        </div>
        <!-- login btn -->
        <v-row
          class="justify-center py-3 py-sm-5 py-md-8 mx-0"
        >
          <v-btn
            tabindex="4"
            type="submit"
            :width="buttonWidth"
            :block="isButtonFullWidth"
            :x-large="isButtonLarge"
            :disabled="!valid"
            :loading="isLoading"
            class="white--text"
            :color="loginButtonColor"
          > {{ loginButtonTitle }} </v-btn>
        </v-row>
        <!-- register link -->
        <v-row
          v-if="registerLinkEnabled"
          class="justify-center pt-3 subtitle-2"
        >
          <span
            class="mt-2"
          > {{ $t('components.login.notRegister') }} </span>
          <v-btn
            text
            class="link-button primary--text text-caption"
            @click="$router.push({ name: registerRoute })"
          > {{ $t('components.login.register') }} </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>
<script>
/**
 * @name login component
 * @description login to site
 * @version 1.0.1
 * @event login - return email and password
 * @property {Boolean} [isDark=false] - Specifies the form theme,
 * @property {String} [loginButtonTitle] - Specifies the title of the login button,
 * @property {String} [isButtonFullWidth] - Expands the login button to 100% of available space,
 * @property {String} [loginButtonColor='blue darken-2'] - Specifies the color of the login button,
 * @property {String} [forgotPasswordColor='orange lighten-1'] - Specifies the color of the login button,
 * @property {String} [registerLinkColor='blue darken-2'] - Specifies the color of the registration link,
 * @property {String} [checkBoxColor='blue darken-2'] - Specifies the color of the checkbox,
 * @property {String} [registerRoute='login'] - Specifies the URL of the login page,
 * @property {String} [forgotPasswordRoute='forgotPassword'] - Specifies the URL of the
 * @property {String} [forgotPassLinkTitle] - Specifies the forgot pass link  title
 * @property {Boolean} [emailEnabled=true] - Specifies whether input exists in the form,
 * @property {String} [emailTitle] - Specifies the input Title text,
 * @property {String} [emailPlaceholder] - Specifies the input placeholder text,
 * @property {Boolean} [emailRequiredEnabled=true] - Specifies whether input is required,
 * @property {String} [emailRequiredMessage] - If the input value is empty, the text of the error message is displayed,
 * @property {Boolean} [emailPatternEnabled=true] - if value is false , regex validation disable
 * @property {String} [emailPatternRegex] - validation regex
 * @property {String} [emailPatternMessage] - validation regex message
 * @property {Boolean} [passwordEnabled=true] - Specifies whether input exists in the form,
 * @property {String} [passwordTitle] - Specifies the input Title text,
 * @property {String} [passwordPlaceholder] - Specifies the input placeholder text,
 * @property {Boolean} [passwordRequiredEnabled=true] - Specifies whether input is required,
 * @property {String} [passwordRequiredMessage] - If the input value is empty, the text of the error message is displayed,
 * @property {Boolean} [passwordPatternEnabled=true] - if value is false , regex validation disable
 * @property {String} [passwordPatternRegex] - validation regex
 * @property {String} [passwordPatternMessage] - validation regex message
 * @property {Boolean} [solo=true] - input theme is solo
 * @property {Boolean} [outlined=true] - input theme is outlined
 * @property {Boolean} [iconEnabled=true]
 * @property {Boolean} [passwordPatternEnabled=true] - if value is false , regex validation disable,
 * @property {String} [passwordPatternRegex] - validation regex,
 * @property {String} [passwordPatternMessage] - validation regex message,
 * @property {Boolean} [titleEnabled=true] - Specifies whether main title is displayed or not,
 * @property {Boolean} [registerLinkEnabled=true] - Specifies Registeration page link visibility,
 * @property {Boolean} [isButtonLarge=false] - Specifies Button is larger than usual or not
 * @property {Number} [buttonWidth=200] - button width
 * @property {Boolean} [isLoading=false] - button loading state

 */
export default {
  props: {
    buttonWidth: {
      type: Number,
      default: 200,
      required: false
    },
    rememberMeEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    forgotPasswordEnabled: {
      type: Boolean,
      default: true,
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
      default: true,
      required: false
    },
    isDark: {
      type: Boolean,
      default: false,
      required: false
    },
    loginButtonTitle: {
      type: String,
      default () {
        return this.$t('components.login.login')
      },
      required: false
    },
    isButtonFullWidth: {
      type: Boolean,
      default: false,
      required: false
    },
    forgotPassLinkTitle: {
      type: String,
      default () {
        return this.$t('components.login.forgotPassword')
      },
      required: false
    },
    forgotPasswordColor: {
      type: String,
      default: 'orange lighten-1',
      required: false
    },
    loginButtonColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    registerLinkColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    checkBoxColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    registerRoute: {
      type: String,
      default: 'register',
      required: true
    },
    forgotPasswordRoute: {
      type: String,
      default: 'forgotpassword',
      required: true
    },
    emailEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    emailTitle: {
      type: String,
      default () {
        return this.$t('components.login.email')
      },
      required: false
    },
    emailPlaceholder: {
      type: String,
      default () {
        return this.$t('components.login.emailPlaceholder')
      },
      required: false
    },
    emailRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.login.emailRequired')
      },
      required: false
    },
    emailPatternRegex: {
      type: String,
      default: '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$/',
      required: false
    },
    emailPatternMessage: {
      type: String,
      default () {
        return this.$t('components.login.emailValidation')
      },
      required: false
    },
    emailRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    emailPatternEnabled: {
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
        return this.$t('components.login.password')
      },
      required: false
    },
    passwordPlaceholder: {
      type: String,
      default () {
        return this.$t('components.login.passwordPlaceholder')
      },
      required: false
    },
    passwordRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.login.passwordRequired')
      },
      required: false
    },
    passwordPatternMessage: {
      type: String,
      default () {
        return this.$t('components.login.passwordValidation')
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
    registerLinkEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    isButtonLarge: {
      type: Boolean,
      default: false,
      required: false
    },
    isLoading: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      valid: true,
      userInfo: {
        password: '',
        email: '',
        rememberMe: false
      },
      showPass: false,
      passwordRules: {
        required: value => !!value || this.passwordRequiredMessage,
        pattern: value => RegExp(this.passwordPatternRegex.substring(1, this.passwordPatternRegex.length - 1)).test(value) || this.passwordPatternMessage
      },
      emailRules: {
        required: value => !!value || this.emailRequiredMessage,
        pattern: value => RegExp(this.emailPatternRegex.substring(1, this.emailPatternRegex.length - 1)).test(value) || this.emailPatternMessage
      }
    }
  },
  computed: {
    emailValidation () {
      if (this.emailRequiredEnabled === true && this.emailPatternEnabled === true) {
        return [this.emailRules.required, this.emailRules.pattern]
      } else if (this.emailRequiredEnabled === true) {
        return [this.emailRules.required]
      } else if (this.emailPatternEnabled === true) {
        return [this.emailRules.pattern]
      }
      return ''
    },
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
    onLogin (event) {
      this.$emit('login', this.userInfo)
    }
  }
}
</script>
