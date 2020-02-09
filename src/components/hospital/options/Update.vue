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
          Update Hospital
          <v-switch v-model="changeAddress" class="mx-2" label="Change Address"></v-switch>
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
                  <p class="mb-n1 font-weight-bold">Company</p>
                  <v-autocomplete
                      :loading="companyLoading"
                      solo
                      v-model="form.company_id"
                      v-validate="'required'"
                      :error-messages="errors.collect('company')"
                      label="Select a Company"
                      data-vv-name="company"
                      required
                      :items="companies"
                      item-text="name"
                      item-value="id"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                    <p class="mb-n1 font-weight-bold">Hospital Name</p>
                    <v-text-field
                        solo
                        v-model="form.name"
                        v-validate="'required'"
                        :error-messages="errors.collect('name')"
                        label="Enter Hospital Name"
                        data-vv-name="name"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n5" v-if="changeAddress">
                  <p class="mb-n1 font-weight-bold">New Hospital Address</p>    
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
                <v-col cols="12" class="mt-n5" v-else>
                  <p class="mb-n1 font-weight-bold">Hospital Address <span class="overline">(Read only)</span> </p>
                    <v-text-field
                        solo
                        v-model="form.address"
                        readonly
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" :loading="loading" block outlined rounded small @click="submit">Save Hospital</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import Vue from 'vue';
  import VeeValidate from 'vee-validate'
  import bus from '../../../event_bus'
  import { mapGetters } from 'vuex'
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
            dialog: false,
            time: null,
            companyLoading: false,
            form: {
              company_id: 0,
              name: '',
              address: '',
              lat: 0,
              long: 0
            },
            changeAddress: false
        }
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
      bus.$on('updateHospital', (value) => {
        this.dialog = true
        this.getHospital(value)
        this.getCompanies()
      })
    },
    methods: {
      getCompanies() {
        this.companyLoading = true
        this.$store.dispatch('retrieveAllCompanies')
          .then(res => {
            this.companyLoading = false
          })
      },
      getPlace(place) {
        let center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
          if (this.form.name == '') {
            this.form.name = place.name
          }
          this.form.address = place.formatted_address
          this.form.lat = center.lat
          this.form.long = center.lng
          console.log(this.form)
      },
      getHospital(item) {
        this.loading = true
        this.$store.dispatch('retrieveHospital', item.id)
          .then(response => {
            this.form = response
            this.loading = false
          })
      },
      closeDialog() {
        this.dialog = false
        this.loading = false
        this.loading = false
        this.form = {}
        this.$validator.reset()
        this.changeAddress = false
      },
        submit() {
          this.$validator.validateAll()
            .then(res => {
              if (res) {
                if (this.form.address == ''&&this.changeAddress) {
                  this.snackbar = true
                  this.msg = 'Please enter a location'
                  this.color = 'error'
                } else {
                  this.submitHospital()
                }
              }
            })
        },
        submitHospital(){
          this.loading = true
            this.$store.dispatch('updateHospital', this.form)
                .then((response) => {
                    this.snackbar = true
                    this.msg = 'Company Successfully Updated'
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
    },
    computed:{
    ...mapGetters({
        companies:'retrieveAllCompanies'
      }),
    },
  }
</script>