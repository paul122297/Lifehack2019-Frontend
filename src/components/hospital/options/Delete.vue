<template>
  <v-row justify="center">
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
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>Are you sure?</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              Are you sure you want to delete this hospital? If you delete this hospital all the data and transactions under this hospital will be deleted.
            </v-col>
            <v-col cols="12" class="mt-n4">
              <v-text-field
                  solo
                  dense
                  v-model="name"
                  v-validate="'required'"
                  :error-messages="errors.collect('hospital name')"
                  label="Enter hospital name to confirm"
                  data-vv-name="hospital name"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="mt-n10">
          <div class="flex-grow-1"></div>

          <v-btn
            color="green darken-1"
            text
            @click="submit"
            :loading="loading"
          >
            Yes
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
/* eslint-disable */
import bus from '../../../event_bus'
export default {
    data () {
      return {
        name_data: '',
        name: '',
        snackbar: false,
        dialog: false,
        id: 0,
        loading: false,
        msg: '',
        color: 'success'
      }
    },
    created() {
        var vm = this
        bus.$on('deleteHospital', function (value) {
            vm.dialog = true
            vm.id = value.id
            vm.name_data = value.name
        })
    },
    methods: {
      submit() {
          this.$validator.validateAll()
            .then(res => {
              if (res) {
                
                if (this.name_data == this.name) {
                  this.deleteHospital()
                } else {
                  this.snackbar = true
                  this.msg = 'Hospital name does not match'
                  this.color = 'error'
                }
              }
            })
        },
        deleteHospital() {
          this.loading = true
            this.$store.dispatch('deleteHospital', this.id).then((res) => {
                this.dialog = false
                this.msg = 'Hospital Successfully Deleted'
                this.color = 'success'
                this.snackbar = true
                this.loading = false
            })
            .catch(error => {
                this.loading = false
                this.msg = 'Something went wrong :('
                this.color = 'error'
                this.snackbar = true
            })
        }
    }
}
</script>