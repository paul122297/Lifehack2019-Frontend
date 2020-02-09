<template>
  <v-row>
      <v-snackbar
        v-model="snackbar"
        :color="color"
        multi-line
        right
        :timeout="6000"
        top
      >
      <v-icon large left>check_circle</v-icon>
        <span> {{msg}} </span>
        <v-btn
          dark
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    <v-dialog v-model="dialog" scrollable persistent max-width="700px">
      <v-card>
        <v-card-title>
          Details
          <v-spacer></v-spacer>
          <v-btn small fab icon @click="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-progress-linear
            height="2"
            :active="loading"
            :indeterminate="loading"
        ></v-progress-linear>
        <v-divider></v-divider>
        <v-card-text>
          <v-container v-if="dialog">
              <v-row>
                  <v-col cols="12">
                      <p class="mb-n1 font-weight-bold">Company</p>
                      {{details.data.company.company_name}}
                  </v-col>
                  <v-col cols="12" class="mt-n4">
                      <p class="mb-n1 font-weight-bold">Company Address</p>
                      {{details.data.company.company_address}}
                  </v-col>
                  <v-col cols="12" class="mt-n4">
                      <p class="mb-n1 font-weight-bold">Hospital</p>
                      {{details.data.name}}
                  </v-col>
                  <v-col cols="12" class="mt-n4">
                      <p class="mb-n1 font-weight-bold">Hospital Address</p>
                      {{details.data.address}}
                  </v-col>
                  <v-col cols="12" class="mt-n4">
                      <p class="mb-n1 font-weight-bold">Transactions</p>
                      {{details.data.transactions_count}}
                  </v-col>
              </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import Vue from 'vue';
  import VeeValidate from 'vee-validate'
  import bus from '../../../event_bus'
  Vue.use(VeeValidate)

  export default {
    $_veeValidate: {
      validator: 'new',
    },
    data() {
        return {
            snackbar: false,
            msg: '',
            color: 'success',
            loading: false,
            pass1: false,
            pass2: false,
            birthday: false,
            year: new Date().getFullYear(),
            dialog: false,
            date: new Date().toISOString().substr(0, 10),
            time: null,
            details: {},
        }
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
        bus.$on('openDetail', (value) => {
        this.dialog = true
        this.details = value
      })
    },
    methods: {
      closeDialog() {
        this.dialog = false
        this.loading = false
        this.loading = false
        this.$validator.reset()
      },
    }
  }
</script>