<template>
  <v-row>
      <v-snackbar
        v-model="snackbar"
        color="success"
        multi-line
        right
        :timeout="6000"
        top
      >
      <v-icon large left>check_circle</v-icon>
        <span> Hospital Successfully Created </span>
        <v-btn
          dark
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    <v-dialog v-model="dialog" scrollable persistent max-width="700px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add New Hospital</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create New Hospital</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="form.name"
                        v-validate="'required'"
                        :error-messages="errors.collect('title')"
                        label="Event Title"
                        data-vv-name="title"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <vuetify-google-autocomplete
                        ref="address"
                        id="map"
                        classname="form-control"
                        placeholder="Hospital Address"
                        v-on:placechanged="getAddressData"
                        country="ph"
                    >
                    </vuetify-google-autocomplete>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions v-if="!loading">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeDialog">Close</v-btn>
          <v-btn color="primary" :disabled="validated" @click="submit">Save</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-progress-linear
            v-if="loading"
            rounded
            indeterminate
            color="primary"
          ></v-progress-linear>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  import Vue from 'vue';
  import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
  import VeeValidate from 'vee-validate'
  import bus from '../../../event_bus'
  import { VTextField } from 'vuetify/lib';
  Vue.component('v-text-field', VTextField);
  Vue.use(VeeValidate)
  Vue.use(VuetifyGoogleAutocomplete, {
    apiKey: 'AIzaSyBsEpe2srTqmzw9pSLJap0WXJY6t70oZR8', // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
  })
  export default {
    components: {
        VTextField
    },
    $_veeValidate: {
      validator: 'new',
    },
    data() {
        return {
            snackbar: false,
            loading: false,
            dialog: false,
            date: new Date().toISOString().substr(0, 10),
            time: null,
            form: {
              long: 0,
              lat: 0,
              address: ''
            },

        }
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
      //this.$refs.address.focus();
    },

    methods: {

    getAddressData: function (addressData, placeResultData, id) {
        //this.address = addressData;
        if (placeResultData&&addressData) {
          this.form.lat = addressData.latitude
          this.form.long = addressData.longitude
          this.form.address = placeResultData.formatted_address
      }
        
    },

      closeDialog() {
        this.dialog = false
        this.loading = false
        this.form.name = ''
        this.form.status = ''

      },
        submit() {
          this.$validator.validateAll()
            .then(res => {
              if (res) {
                this.submitEvent()
              }
            })
        },
        submitEvent(){
          this.loading = true
            this.$store.dispatch('addHospital', this.form)
                .then((response) => {
                    this.snackbar = true
                    this.dialog = false
                    this.loading = false
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
        },
    },
      computed: {
        validated(){
          if (this.form.name != ''&&this.form.address != ''&&!Object.keys(this.fields).some(key => this.fields[key].invalid)) return false
          else return true
        },
      },
  }
</script>