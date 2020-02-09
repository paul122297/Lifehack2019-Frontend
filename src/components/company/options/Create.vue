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
          Create New Company
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
          <v-container>
            <v-row>
                <v-col cols="12">
                    <p class="mb-n1 font-weight-bold">Company Name</p>
                    <v-text-field
                        solo
                        v-model="form.company_name"
                        v-validate="'required'"
                        :error-messages="errors.collect('name')"
                        label="Enter Company Name"
                        data-vv-name="name"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <p class="mb-n1 font-weight-bold">Company Address</p>    
                  <div class="v-input theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed">
                      <div class="v-input__control">
                          <div class="v-input__slot">
                            <div class="v-text-field__slot">
                              <gmap-autocomplete
                                      class='autocomplete'
                                      @place_changed="getPlace"
                              >
                              </gmap-autocomplete>
                            </div>
                            <div class="v-input__append-inner"><div class="v-input__icon v-input__icon--append"><i aria-hidden="true" class="v-icon notranslate material-icons theme--light">search</i></div></div>
                        </div>
                      </div>
                  </div>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" :loading="loading" block outlined rounded small @click="submit">Save Company</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import Vue from 'vue';
  import VeeValidate from 'vee-validate'
  import bus from '../../../event_bus'
  Vue.use(VeeValidate)
  import { VTextField } from 'vuetify/lib';
  Vue.component('v-text-field', VTextField);
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
            dialog: false,
            form: {
              company_name: '',
              company_address: '',
              lat: 0,
              long: 0
            },
        }
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
        bus.$on('createCompany', (value) => {
        this.dialog = true
      })
    },
    methods: {
      getPlace(place) {
        let center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
          if (this.form.company_name == '') {
            this.form.company_name = place.name
          }
          this.form.company_address = place.formatted_address
          this.form.lat = center.lat
          this.form.long = center.lng
          console.log(this.form)
      },
      closeDialog() {
        this.dialog = false
        this.loading = false
        this.loading = false
        this.form = {}
        this.$validator.reset()
      },
        submit() {
          this.$validator.validateAll()
            .then(res => {
              if (res) {
                if (this.form.company_address == '') {
                  this.snackbar = true
                  this.msg = 'Please enter a location'
                  this.color = 'error'
                } else {
                  this.submitCompany()
                }
              }
            })
        },
        submitCompany(){
          this.loading = true
            this.$store.dispatch('storeCompany', this.form)
                .then((response) => {
                    this.snackbar = true
                    this.msg = 'Company Successfully Created'
                    this.color = 'success'
                    this.closeDialog()
                }).catch(error => {
                    console.log(error)
                    this.snackbar = true
                    this.msg = 'Something went wrong :('
                    this.color = 'error'
                    this.loading = false
                })
        },
    }
  }
</script>