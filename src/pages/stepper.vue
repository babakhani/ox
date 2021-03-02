<route>
{
  "name": "stepper",
  "meta": {
    "order": 3.1,
    "isVisible": true,
    "iconName": "mdi-pen"
  }
}
</route>
<template>
  <div>
    <page-title
      :title="$t('pages.stepper.title')"
    ></page-title>
    <v-stepper
      v-model="stepper.current"
      alt-labels
    >
      <v-stepper-header>
        <template v-for="n in stepper.steps">
          <v-stepper-step
            :key="`${n}-step`"
            :step="n"
            :rules="[() => n !== 2 ? true : stepper.current === n ? stepper.step2.isValid : true]"
            :complete="stepper.current > n"
          >
            {{ $t('pages.stepper.step' + n) }}
          </v-stepper-step>
          <v-divider
            v-if="n !== stepper.steps"
            :key="n"
          ></v-divider>
        </template>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content
          step="1"
        >
          <v-card
            class="d-flex flex-column justify-center align-center mb-2 px-5 rounded-lg"
            height="auto"
            outlined
          >
            <v-img
              class="mt-10"
              src="/img/samples/create-campaign-artwork.png"
            >
            </v-img>
            <p class="text-center col-md-6 col-sm-8 col-xs-10 my-5">
              {{ faker.lorem.paragraphs() }}
            </p>
            <v-btn
              class="mb-12"
              color="primary"
              width="160px"
              @click="goStep(2)"
            >
              {{ $t('pages.stepper.startButtonText') }}
            </v-btn>
          </v-card>
        </v-stepper-content>
        <v-stepper-content
          step="2"
        >
          <v-form
            ref="form"
            v-model="stepper.step2.isValid"
            class="form-horizontal"
          >
            <form-item
              v-model="stepper.step2.name"
              type="textbox"
              :rules="nameRules"
              icon="mdi-form-textbox"
              :label="$t('pages.stepper.formNameLabel')"
              :placeholder="$t('pages.stepper.formNamePlaceholder')"
            ></form-item>
            <form-item
              v-model="stepper.step2.desc"
              type="textarea"
              rows="4"
              icon="mdi-form-textarea"
              :label="$t('pages.stepper.formDescLabel')"
              :placeholder="$t('pages.stepper.formDescPlaceholder')"
            ></form-item>
            <form-item
              v-model="stepper.step2.agree"
              type="checkbox"
              :rules="[v => !!v || $t('pages.stepper.formAgreementRuleRequired')]"
              icon="mdi-checkbox-marked"
              :label="$t('pages.stepper.formAgreeLabel')"
            ></form-item>
            <form-action>
              <v-btn
                color="primary"
                depressed
                @click="proceedIfValid"
              >
                {{ $t('pages.stepper.nextButtonText') }}
              </v-btn>
              <v-btn
                color="secondary"
                depressed
                outlined
                @click="goStep(1)"
              >
                {{ $t('pages.stepper.previousButtonText') }}
              </v-btn>
            </form-action>
          </v-form>
        </v-stepper-content>
        <v-stepper-content
          step="3"
        >
          <v-data-table
            class="report-table"
            :headers="headers"
            :items="stepper.step3.influencers"
            disable-sort
          >
            <template v-slot:item.select="{ item }">
              <v-btn
                class="float-left"
                color="primary"
                depressed
                outlined
                @click="selectInfluencer(item.id)"
              >
                {{ $t('pages.stepper.selectPage') }}
              </v-btn>
            </template>
          </v-data-table>
          <div class="mt-5">
            <v-btn
              class="ml-3"
              color="primary"
              @click="onCreateCampaign"
            >
              {{ $t('pages.stepper.finishButtonText') }}
            </v-btn>
            <v-btn
              color="secondary"
              depressed
              outlined
              @click="goStep(2)"
            >
              {{ $t('pages.stepper.previousButtonText') }}
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data: () => ({
    stepper: {
      current: 1,
      steps: 3,
      step2: {
        isValid: true,
        name: '',
        desc: '',
        agree: false
      },
      step3: {
        influencers: [],
        selectedInfluencers: []
      }
    }
  }),
  computed: {
    headers () {
      return [
        {
          text: this.$t('pages.stepper.tableHeader.name'),
          value: 'name'
        },
        {
          text: this.$t('pages.stepper.tableHeader.cost'),
          value: 'cost'
        },
        {
          text: this.$t('pages.stepper.tableHeader.followers'),
          value: 'followers'
        },
        {
          text: this.$t('pages.stepper.tableHeader.userEngagement'),
          value: 'userEngagement'
        },
        {
          text: this.$t('pages.stepper.tableHeader.select'),
          value: 'select'
        }
      ]
    },
    nameRules () {
      return [
        v => !!v || this.$t('pages.stepper.formNameRuleRequired'),
        v => (v && v.length <= 10) || this.$t('pages.stepper.formNameRuleMaxLength')
      ]
    }
  },
  methods: {
    goStep (n) {
      this.stepper.current = n
    },
    proceedIfValid () {
      this.$refs.form.validate()
      this.$nextTick(() => {
        if (this.stepper.step2.isValid) this.goStep(3)
      })
    },
    onCreateCampaign () {
      const selectedInfluencers = [...this.stepper.step3.selectedInfluencers]
      const { isValid, ...formData } = this.stepper.step2
      const payload = { ...formData, selectedInfluencers }
      console.log('on create campaign clicked!', payload)
    },
    randomInfluencerGenerator (count) {
      return [...Array(count)].map((_, index) => ({
        id: index,
        name: this.faker.name.firstName(),
        cost: this.faker.finance.amount(),
        followers: this.faker.random.number(),
        userEngagement: Math.floor(Math.random() * 100) + 1 + '%'
      }))
    },
    selectInfluencer (id) {
      if (!this.stepper.step3.selectedInfluencers.includes(id)) {
        this.stepper.step3.selectedInfluencers.push(id)
      }
    }
  },
  created () {
    this.stepper.step3.influencers = this.randomInfluencerGenerator(8)
  }
}
</script>
