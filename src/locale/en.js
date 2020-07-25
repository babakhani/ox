import { en } from 'vuetify/lib/locale'

export default {
  ...en,

  components: {
    login: {
      email: 'Email',
      password: 'Password',
      login: 'Login',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      notRegister: 'Not regestered?',
      register: 'Register',
      emailPlaceholder: 'email@example.com',
      passwordPlaceholder: '********',
      passwordRequired: 'Password is required',
      emailRequired: 'Email is required',
      passwordValidation: 'Passwords must be at least 8 characters long',
      emailValidation: 'Email is not valid'
    },
    register: {
      title: 'Register',
      password: 'Password',
      register: 'Sign Up',
      login: 'Login',
      haveAccount: 'Have account?',
      legalPerson: 'Legal person',
      realPerson: 'Real person',
      phoneNumber: 'Phone number',
      email: 'Email',
      emailPlaceholder: 'email@example.com',
      name: 'Name',
      nameRequired: 'Name is required',
      lastName: 'Last name',
      lastNameRequired: 'Last name is required',
      rules: 'I agree the rules',
      rulesRequired: 'Acceptance of the rules is necessary',
      passwordInvalid: 'Passwords must be at least 8 characters long',
      passwordPlaceholder: '********',
      phoneNumberPlaceholder: '**** *** **09',
      passwordRequired: 'Password is required',
      phoneNumberRequired: 'Phone number is required',
      emailRequired: 'Email is required',
      passwordValidation: 'Passwords must be at least 8 characters long',
      emailValidation: 'Email is not valid',
      emailStatus: 'Your Email is your username and cannot be changed',
      phoneNumberValidation: 'Phone number format is not valid'
    },
    forgotPassword: {
      title: 'Forgot password',
      email: 'Email',
      passwordRecovery: 'Password recovery',
      notRegister: 'Not regestered yet?',
      register: 'Register',
      emailPlaceholder: 'email@example.com',
      passwordRecoveryDetails: 'A password recovery link has been sent to your email. To change the password, please pay attention to the description in the e-mail.',
      changePassword: 'Change password',
      newPassword: 'New password',
      repeatNewPassword: 'Confirm new password',
      passwordPlaceholder: '********',
      emailRequired: 'Email is required',
      emailValidation: 'Email is not valid'
    },
    changePassword: {
      title: 'Change password',
      changePassword: 'Change password',
      newPassword: 'New password',
      repeatNewPassword: 'Confirm new password',
      passwordPlaceholder: '********',
      passwordRequired: 'Password is required',
      newPasswordRequired: 'Confirm new password is required',
      passwordValidation: 'Passwords must be at least 8 characters long',
      newPasswordValidation: 'Password is not the same as repeating password'
    },
    filterBox: {
      fromDate: 'From date',
      toDate: 'To date',
      buttonText: 'Filter'
    }
  },
  pages: {
    stepper: {
      title: 'Stepper',
      formNameLabel: 'Campaign name',
      formNamePlaceholder: 'Name',
      formNameRuleRequired: 'Name is required',
      formNameRuleMaxLength: 'The maximum number of characters allowed is 10',
      formDescLabel: 'Compaign description',
      formDescPlaceholder: 'Description',
      formAgreeLabel: 'Agree',
      formAgreementRuleRequired: 'Agreement is required',
      startButtonText: 'Submit campaign',
      nextButtonText: 'Continue',
      previousButtonText: 'Previous',
      finishButtonText: 'Campaign registration',
      step1: 'Step 1',
      step2: 'Complete specifications',
      step3: 'Last step',
      tableHeader: {
        name: 'Page name',
        cost: 'Cost',
        followers: 'Followers',
        userEngagement: 'User engagement',
        select: ''
      },
      selectPage: 'Select page'
    },
    profile: {
      title: 'Profile'
    },
    logout: {
      title: 'Log out'
    },
    reports: {
      title: 'reports',
      tableHeader: {
        name: 'Name',
        email: 'Email',
        amount: 'Amount',
        phone: 'Phone',
        startDate: 'Start date',
        endDate: 'End date',
        actions: 'Actions',
        show: ''
      },
      campaignTypes: {
        type1: 'Type 1',
        type2: 'Type 2',
        type3: 'Type 3'
      },
      show: 'Show details',
      campaignTypePlaceholder: 'Campaign type',
      genderPlaceholder: 'Gender',
      ageRangePlaceholder: 'Age range',
      female: 'Female',
      male: 'Male'
    },
    about: {
      title: 'About us'
    },
    changes: {
      title: 'Changes'
    },
    dashboard: {
      title: 'Dashboard'
    },
    datepicker: {
      title: 'Date picker'
    },
    forgotpass: {
      title: 'Forgot password'
    },
    index: {
      title: 'Home'
    },
    login: {
      title: 'Login'
    },
    register: {
      title: 'Register'
    },
    changePassword: {
      title: 'Change password'
    },
    starter: {
      title: 'Starter'
    },
    forms: {
      title: 'Forms',
      typeSelectLabel: 'Forms type',
      nameTextLabel: 'v-text-field',
      nameTextPlaceholder: 'Name',
      nameTextRuleRequired: 'Name is required',
      nameTextRuleMaxLength: 'The maximum number of characters allowed is 10',
      mailTextLabel: 'v-text-field (ltr)',
      mailTextPlaceholder: 'email',
      mailTextSlotLabel: 'v-text-field (slot)',
      shebaTextLabel: 'v-text-field (suffix)',
      shebaTextPlaceholder: '** **** **** **** **** **** **',
      shebaSuffix: 'IR',
      shebaRuleLength: 'The sheba number must be exactly 24 digits',
      shebaRuleOnlyNumber: 'The Sheba number must be a numeric value',
      descTextareaLabel: 'v-textarea',
      descTextareaPlaceholder: 'Description',
      itemSelectLabel: 'v-select',
      itemSelectPlaceholder: 'Select',
      itemSelectRuleRequired: 'Item selection is required',
      itemSelectMultipleLabel: 'v-select (multiple)',
      itemSelectMultiplePlaceholder: 'Sekect (multi)',
      itemMultiselectLabel: 'Multiselect',
      itemMultiselectPlaceholder: 'Select items',
      datePickerLabel: 'date-picker',
      datetimePickerLabel: 'datetime-picker',
      timePickerLabel: 'time-picker',
      counterSliderLabel: 'v-slider',
      agreeCheckboxLabel: 'v-checkbox',
      agreeCheckboxRuleRequired: 'You must accept to continue',
      agreeSwitchLabel: 'v-switch',
      agreeSwitchRuleRequired: 'Please enable to continue',
      genderRadioLabel: 'v-radio',
      genderRadioOptionMale: 'Male',
      genderRadioOptionFemale: 'Female',
      genderRadioRuleRequired: 'Please select your gender',
      docFileLabel: 'v-file-input',
      docFilePlaceholder: 'Image select',
      submitButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      removeButtonText: 'Remove',
      sendButtonText: 'Send',
      returnButtonText: 'Return'
    },
    forgotPass: {
      title: 'Forgot password',
      email: 'Email',
      submit: 'Submit',
      cancel: 'Cancel'
    },
    authenticationDetails: {
      title: 'Messages',
      registerTitle: 'Your information was successfully registered',
      registerDescription: 'A confirmation message has been sent to your email',
      registerDetails: 'Verification steps:',
      registerDetails1: '1. Login to your email address that you registered at the time of registration',
      registerDetails2: '2. Open the confirmation message you received from us.',
      registerDetails3: '3. Click on the link.',
      changePasswordTitle: 'Change password',
      changePasswordDescription: 'Your password was changed successfully',
      login: 'Login'
    }
  }
}