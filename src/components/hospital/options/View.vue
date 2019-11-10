<template>
  <v-row justify="center">
      <v-snackbar
        v-model="snackbar"
        color="success"
        multi-line
        right
        :timeout="6000"
        top
      >
      <v-icon large left>check_circle</v-icon>
        <span> Donor Successfully Approved </span>
        <v-btn
          dark
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{form.name}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-row>
            <v-col cols="12" class="pa-12">
                <v-card>
                    <v-card-title>
                    Transactions
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="transactions"
                    :search="search"
                    :loading="loading"
                    >
                    <template v-slot:item.donor_name="{ item }">
                        {{item.donor? item.donor.name : 'Finding'}}
                    </template>
                    <template v-slot:item.donor_mobile_number="{ item }">
                        {{item.donor? item.donor.mobile_number : 'N/A'}}
                    </template>
                    <template v-slot:item.donor_points="{ item }">
                        <v-chip class="overline" small >{{item.donor? item.donor.points : 'N/A'}}</v-chip>
                    </template>
                    <template v-slot:item.donor_gender="{ item }">
                        <v-chip v-if="item.donor" class="overline" small :color="getColor(item.donor)" dark>{{item.donor.gender}}</v-chip>
                        <v-chip v-else class="overline" small >N/A</v-chip>
                    </template>
                    <template v-slot:item.donor_age="{ item }">
                        <v-chip v-if="item.donor" class="overline" small>{{calculateAge(item.donor.birthday)}}</v-chip>
                        <v-chip v-else class="overline" small>N/A</v-chip>
                    </template>
            

                    <template v-slot:item.requestor_name="{ item }">
                        {{item.requestor.name}}
                    </template>
                    <template v-slot:item.requestor_mobile_number="{ item }">
                        {{item.requestor.mobile_number}}
                    </template>
                    <template v-slot:item.requestor_points="{ item }">
                        <v-chip class="overline" small >{{item.requestor.points}}</v-chip>
                    </template>
                    <template v-slot:item.requestor_gender="{ item }">
                        <v-chip class="overline" small :color="getColor(item.requestor)" dark>{{item.requestor.gender}}</v-chip>
                    </template>
                    <template v-slot:item.requestor_age="{ item }">
                        <v-chip class="overline" small>{{calculateAge(item.requestor.birthday)}}</v-chip>
                    </template>

                    <template v-slot:item.blood_type="{ item }">
                        <v-chip class="overline" small>{{item.requestor.blood_type}}</v-chip>
                    </template>

                    <template v-slot:item.status="{ item }">
                        <v-chip class="overline" :color="item.status=='1'? 'green' : 'red'" small dark>{{item.status=='1'? 'Finished' : 'Pending'}}</v-chip>
                    </template>
                    <template v-slot:item.created_at="{ item }">
                        {{moment(item.joined_at).format('LLL')}}
                    </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
            
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import bus from '../../../event_bus'
import { mapGetters } from 'vuex'
var moment = require('moment')
  export default {
    data () {
      return {
        moment:moment,
        snackbar: false,
        search: '',
        dialog: false,
        form: {},
        loading: false,
        headers: [
          { text: 'Requestor Name', value: 'requestor_name' },
          { text: 'Requestor Gender', value: 'requestor_gender' },
          { text: 'Requestor Age', value: 'requestor_age' },
          { text: 'Requestor Points', value: 'requestor_points' },
          { text: 'Requestor Modile Number', value: 'requestor_mobile_number' },

          { text: 'Donor Name', value: 'donor_name' },
          { text: 'Donor Gender', value: 'donor_gender' },
          { text: 'Donor Age', value: 'donor_age' },
          { text: 'Donor Points', value: 'donor_points' },
          { text: 'Donor Modile Number', value: 'donor_mobile_number' },

          { text: 'Blood Type', value: 'blood_type' },
          { text: 'Status', value: 'status' },
          { text: 'Requested At', value: 'created_at' }
        ],
      }
    },
    mounted () {
      var vm = this
        bus.$on('viewHospital', function (value) {
        vm.dialog = true
        vm.form = value
        vm.getHospitals(value.id)
      })
    },
    methods: {
        getColor(item) {
            if (item.gender == 'male') {
                return 'blue'
            } else {
                return 'pink'
            }
        },
        getHospitals(id) {
            this.loading = true
            this.$store.dispatch('retrieveHospitalTransactions', id)
                .then(res => {
                    this.loading = false
                })
        },
        calculateAge(birthday) { // birthday is a date
            var today = new Date();
            var birthDate = new Date(birthday);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
            {
                age--;
            }
            return age;
        }
    },
    computed:{
    ...mapGetters({
        transactions:'retrieveHospitalTransactions'
      }),
    },
  }
</script>