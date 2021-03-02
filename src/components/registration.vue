<template>
  <div class="register-component">
    <v-card
      flat
      class="transparent mx-auto"
      style="max-width: 320px;"
      :dark="isDark"
    >
      <v-row
        v-if="titleEnabled"
        class="justify-center form-title pb-4"
      > {{ $t('components.register.title') }} </v-row>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="register"
      >
        <!-- fullname -->
        <div
          v-if="fullnameEnabled"
          class="subtitle-2"
        >
          <v-text-field
            v-model="userInfo.fullname"
            tabindex="2"
            :outlined="outlined"
            flat
            class="text-subtitle-2"
            dir="rtl"
            color="primary"
            :label="fullnameTitle"
            :rules="fullnameRequiredEnabled ? [fullnameRules.required, fullnameRules.pattern] : [] "
            name="fullname"
            type="text"
            required
          ></v-text-field>
        </div>
        <template v-else>
          <!-- name -->
          <div
            v-if="nameEnabled"
            class="subtitle-2"
          >
            <v-text-field
              v-model="userInfo.name"
              tabindex="2"
              :outlined="outlined"
              flat
              class="text-subtitle-2"
              dir="rtl"
              color="primary"
              :label="nameTitle"
              :rules="nameRequiredEnabled ? [nameRules.required, nameRules.pattern] : [] "
              name="name"
              type="text"
              required
            ></v-text-field>
          </div>
          <!-- last name -->
          <div
            v-if="lastNameEnabled"
            class="subtitle-2"
          >
            <v-text-field
              v-model="userInfo.lastName"
              tabindex="3"
              :outlined="outlined"
              flat
              class="text-subtitle-2"
              dir="rtl"
              color="primary"
              :label="lastNameTitle"
              :rules="lastNameRequiredEnabled ? [lastNameRules.required, lastNameRules.pattern] : [] "
              name="lastName"
              type="text"
              required
            ></v-text-field>
          </div>
        </template>
        <!-- email -->
        <div
          v-if="emailEnabled"
          class="subtitle-2 input-placeholder-left"
        >
          <v-text-field
            v-model="userInfo.email"
            autofocus
            tabindex="1"
            :outlined="outlined"
            class="text-subtitle-2"
            dir="ltr"
            flat
            color="primary"
            :label="emailTitle"
            :rules="emailValidation"
            name="email"
            :hint="$t('components.register.emailStatus')"
            type="text"
            required
          ></v-text-field>
        </div>
        <!-- password  -->
        <div
          v-if="passwordEnabled"
          class="subtitle-2 input-placeholder-left"
        >
          <v-text-field
            v-model="userInfo.password"
            tabindex="4"
            :outlined="outlined"
            flat
            class="text-subtitle-2"
            dir="ltr"
            color="primary"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordValidation"
            :label="passwordTitle"
            name="password"
            :type="showPass ? 'text' : 'password'"
            :hint="$t('components.register.passwordValidation')"
            required
            @click:append="showPass = !showPass"
          ></v-text-field>
        </div>
        <!-- phone number -->
        <div
          v-if="phoneNumberEnabled"
          class="subtitle-2 input-placeholder-left"
        >
          <v-text-field
            :value="userInfo.phoneNumber"
            tabindex="5"
            :outlined="outlined"
            flat
            class="text-subtitle-2"
            dir="ltr"
            color="primary"
            :rules="phoneNumberValidation"
            :label="phoneNumberTitle"
            name="phoneNumber"
            type="text"
            required
            @input="onPhoneNumberChange"
          ></v-text-field>
        </div>
        <!-- role -->
        <v-row
          class='justify-center my-3'
        >
          <span
            class="text-caption terms-agreement primary--text"
            style="max-width: 240px; text-align: center; cursor: pointer;"
            @click="onOpenTermsAndConditions"
          > {{ $t('components.register.rules') }} </span>
        </v-row>
        <!-- register btn -->
        <v-row
          class="justify-center mx-0 pt-2"
        >
          <v-btn
            tabindex="6"
            type="submit"
            :width="buttonWidth"
            :block="isButtonFullWidth"
            :x-large="isButtonLarge"
            :disabled="!valid"
            :loading="isLoading"
            class="white--text"
            :color="registerButtonColor"
          > {{ registerButtonTitle }} </v-btn>
        </v-row>
        <!-- login link -->
        <v-row
          class="justify-center py-4 subtitle-2"
        >
          <span
            class="my-2"
          > {{ $t('components.register.haveAccount') }} </span>
          <v-btn
            class="primary--text text-caption px-0"
            text
            @click="$router.push({ name: loginRoute })"
          > {{ loginLinkTitle }} </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>
<script>
/**
 * @name registration component
 * @description when added to a page or layout, creates a form for new users to submit their
 profile information on the web site. On the front end of your web site, the default sign up form
 prompts new users to your app to enter their name, password,phone number, and email.
 * @version 1.0.0
 * @event register - return name , email, password, phone number
 * @property {String} [registerButtonTitle] - Specifies the title of the registration button,
 * @property {String} [isButtonFullWidth] -Specifies that Expands the button to 100% of available space,
 * @property {String} [registerButtonColor='blue darken-2'] - Specifies the color of the registration button,
 * @property {String} [loginLinkColor='blue darken-2'] - Specifies the color of the login link,
 * @property {String} [loginLinkTitle] - Specifies the title of the login link,
 * @property {String} [loginRoute='login'] - Specifies the URL of the login page,
 * @property {String} [termsAndConditionsRoute] - Specifies the URL of the termsAndConditions page,
 * @property {Boolean} [isDark=false]
 * @property {Boolean} [emailEnabled]
 * @property {String} [emailTitle]
 * @property {String} [emailPlaceholder]
 * @property {String} [emailRequiredMessage]
 * @property {String} [emailPatternRegex]
 * @property {String} [emailPatternMessage]
 * @property {Boolean} [emailRequiredEnabled=true]
 * @property {Boolean} [emailPatternEnabled=true]
 * @property {Boolean} [fullnameEnabled]
 * @property {String} [fullnameTitle]
 * @property {String} [fullnameRequiredMessage]
 * @property {Boolean} [fullnameRequiredEnabled=true]
 * @property {Boolean} [nameEnabled]
 * @property {String} [nameTitle]
 * @property {String} [namePlaceholder]
 * @property {String} [nameRequiredMessage]
 * @property {Boolean} [nameRequiredEnabled=true]
 * @property {Boolean} [nameEnabled]
 * @property {String} [lastNameTitle]
 * @property {String} [lastNamePlaceholder]
 * @property {String} [lastNameRequiredMessage]
 * @property {Boolean} [lastNameRequiredEnabled=true]
 * @property {Boolean} [lastNameEnabled]
 * @property {String} [passwordTitle]
 * @property {String} [passwordPlaceholder]
 * @property {String} [passwordRequiredMessage]
 * @property {String} [passwordPatternRegex]
 * @property {String} [passwordPatternMessage]
 * @property {Boolean} [passwordRequiredEnabled=true]
 * @property {Boolean} [passwordPatternEnabled=true]
 * @property {Boolean} [phoneNumberEnabled]
 * @property {String} [phoneNumberTitle]
 * @property {String} [phoneNumberPlaceholder]
 * @property {String} [phoneNumberRequiredMessage]
 * @property {String} [phoneNumberPatternRegex]
 * @property {String} [phoneNumberPatternMessage]
 * @property {Boolean} [phoneNumberRequiredEnabled=true]
 * @property {Boolean} [phoneNumberPatternEnabled=true]
 * @property {Boolean} [solo=true] - input theme is solo
 * @property {Boolean} [outlined=true] - input theme is outlined
 * @property {Boolean} [iconEnabled=true]
 * @property {Boolean} [titleEnabled=true] - Specifies whether main title is displayed or not
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
    registerButtonTitle: {
      type: String,
      default () {
        return this.$t('components.register.register')
      },
      required: false
    },
    isButtonFullWidth: {
      type: Boolean,
      default: false,
      required: false
    },
    loginLinkTitle: {
      type: String,
      default () {
        return this.$t('components.register.login')
      },
      required: false
    },
    registerButtonColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    checkBoxColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    loginRoute: {
      type: String,
      default: 'login',
      required: true
    },
    loginLinkColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    emailEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    emailTitle: {
      type: String,
      default () {
        return this.$t('components.register.email')
      },
      required: false
    },
    emailPlaceholder: {
      type: String,
      default () {
        return this.$t('components.register.emailPlaceholder')
      },
      required: false
    },
    emailRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.emailRequired')
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
        return this.$t('components.register.emailValidation')
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
        return this.$t('components.register.password')
      },
      required: false
    },
    passwordPlaceholder: {
      type: String,
      default () {
        return this.$t('components.register.passwordPlaceholder')
      },
      required: false
    },
    passwordRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.passwordRequired')
      },
      required: false
    },
    passwordPatternMessage: {
      type: String,
      default () {
        return this.$t('components.register.passwordValidation')
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
    phoneNumberEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    phoneNumberTitle: {
      type: String,
      default () {
        return this.$t('components.register.phoneNumber')
      },
      required: false
    },
    phoneNumberPlaceholder: {
      type: String,
      default () {
        return this.$t('components.register.phoneNumberPlaceholder')
      },
      required: false
    },
    phoneNumberRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.phoneNumberRequired')
      },
      required: false
    },
    phoneNumberPatternMessage: {
      type: String,
      default () {
        return this.$t('components.register.phoneNumberValidation')
      },
      required: false
    },
    phoneNumberPatternRegex: {
      type: String,
      default: '/09[0-9]{9,9}/',
      required: false
    },
    phoneNumberRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    phoneNumberPatternEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    fullnameEnabled: {
      type: Boolean,
      default: false,
      required: false
    },
    fullnameTitle: {
      type: String,
      default () {
        return this.$t('components.register.fullname')
      },
      required: false
    },
    fullnameRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.fullnameRequired')
      },
      required: false
    },
    fullnamePatternRegex: {
      type: String,
      default: '/^[\u0600-\u06FF\u0020]+$/',
      required: false
    },
    fullnamePatternMessage: {
      type: String,
      default () {
        return this.$t('components.register.fullnameValidation')
      },
      required: false
    },
    fullnameRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    nameEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    nameTitle: {
      type: String,
      default () {
        return this.$t('components.register.name')
      },
      required: false
    },
    namePlaceholder: {
      type: String,
      default () {
        return this.$t('components.register.name')
      },
      required: false
    },
    nameRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.nameRequired')
      },
      required: false
    },
    namePatternRegex: {
      type: String,
      default: '/^[\u0600-\u06FF\u0020]+$/',
      required: false
    },
    namePatternMessage: {
      type: String,
      default () {
        return this.$t('components.register.nameValidation')
      },
      required: false
    },
    nameRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    lastNameEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    lastNameTitle: {
      type: String,
      default () {
        return this.$t('components.register.lastName')
      },
      required: false
    },
    lastNamePlaceholder: {
      type: String,
      default () {
        return this.$t('components.register.lastName')
      },
      required: false
    },
    lastNameRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.lastNameRequired')
      },
      required: false
    },
    lastNameRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    lastNamePatternRegex: {
      type: String,
      default: '/^[\u0600-\u06FF\u0020]+$/',
      required: false
    },
    lastNamePatternMessage: {
      type: String,
      default () {
        return this.$t('components.register.lastNameValidation')
      },
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
    },
    termsAndConditionsRoute: {
      type: String,
      default: '',
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
        phoneNumber: '',
        fullname: '',
        name: '',
        lastName: '',
        email: '',
        agreeRules: false
      },
      showPass: false,
      passwordRules: {
        required: value => !!value || this.passwordRequiredMessage,
        pattern: value => RegExp(this.passwordPatternRegex.substring(1, this.passwordPatternRegex.length - 1)).test(value) || this.passwordPatternMessage
      },
      phoneNumberRules: {
        required: value => !!value || this.phoneNumberRequiredMessage,
        pattern: value => RegExp(this.phoneNumberPatternRegex.substring(1, this.phoneNumberPatternRegex.length - 1)).test(value) || this.phoneNumberPatternMessage,
        counter: value => value.length === 11 || this.$t('components.register.phoneNumberCountValidation')
      },
      fullnameRules: {
        required: value => !!value || this.fullnameRequiredMessage,
        pattern: value => RegExp(this.fullnamePatternRegex.substring(1, this.fullnamePatternRegex.length - 1)).test(value) || this.fullnamePatternMessage
      },
      nameRules: {
        required: value => !!value || this.nameRequiredMessage,
        pattern: value => RegExp(this.namePatternRegex.substring(1, this.namePatternRegex.length - 1)).test(value) || this.namePatternMessage
      },
      lastNameRules: {
        required: value => !!value || this.lastNameRequiredMessage,
        pattern: value => RegExp(this.lastNamePatternRegex.substring(1, this.lastNamePatternRegex.length - 1)).test(value) || this.lastNamePatternMessage
      },
      emailRules: {
        required: value => !!value || this.emailRequiredMessage,
        pattern: value => RegExp(this.emailPatternRegex.substring(1, this.emailPatternRegex.length - 1)).test(value) || this.emailPatternMessage
      },
      agreeRulesRules: {
        required: value => !!value
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
    },
    phoneNumberValidation () {
      if (this.phoneNumberRequiredEnabled === true && this.phoneNumberPatternEnabled === true) {
        return [this.phoneNumberRules.required, this.phoneNumberRules.pattern, this.phoneNumberRules.counter]
      } else if (this.phoneNumberRequiredEnabled === true) {
        return [this.phoneNumberRules.required, this.phoneNumberRules.counter]
      } else if (this.phoneNumberPatternEnabled === true) {
        return [this.phoneNumberRules.pattern, this.phoneNumberRules.counter]
      }
      return ''
    }
  },
  methods: {
    onOpenTermsAndConditions () {
      // TODO: target="_blank" does not work inside the checkbox template, temporarily used the
      // click method and manually opened the link path in a new tab (should fixed and target
      // attribute should be used instead)

      const routeUrl = this.$router.resolve({
        name: this.termsAndConditionsRoute
      })
      window.open(routeUrl.href, '_blank')
    },
    register (event) {
      this.$emit('register', this.userInfo)
    },
    isNumber (evt) {
      evt = (evt) || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    onPhoneNumberChange (e) {
      String.prototype.toEnglishDigits = function () {
        return this.replace(/[۰-۹]/g, function (chr) {
          var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
          return persian.indexOf(chr)
        })
      }
      if (e) {
        e = e.toEnglishDigits()
      }
      this.userInfo.phoneNumber = e
    }
  }
}
</script>
