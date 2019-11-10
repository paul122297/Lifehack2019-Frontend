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
          <v-toolbar-title>{{form.title}}</v-toolbar-title>
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
                    Donors
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
                    :items="donors"
                    :search="search"
                    :loading="loading"
                    >
                    <template v-slot:item.donor_gender="{ item }">
                        <v-chip class="overline" small :color="getColor(item)" dark>{{item.gender}}</v-chip>
                    </template>
                    <template v-slot:item.age="{ item }">
                        <v-chip class="overline" small>{{calculateAge(item.birthday)}}</v-chip>
                    </template>
                    <template v-slot:item.approved="{ item }">
                        <v-chip class="overline" :color="item.pivot.approved=='1'? 'green' : 'red'" small dark>{{item.pivot.approved=='1'? 'Yes' : 'No'}}</v-chip>
                    </template>
                    <template v-slot:item.joined_at="{ item }">
                        {{moment(item.joined_at).format('LLL')}}
                    </template>
                        <template v-slot:item.action="{ item }">
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-btn :disabled="item.pivot.approved=='1'" @click="approveDonor(item)" color="green"  text small v-on="on">
                                        Approve
                                    </v-btn>
                                </template>
                                <span>Approve Donor</span>
                            </v-tooltip>
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
          { text: 'Name', value: 'name' },
          { text: 'Blood Type', value: 'blood_type' },
          { text: 'Gender', value: 'donor_gender' },
          { text: 'Age', value: 'age' },
          { text: 'Email', value: 'email' },
          { text: 'Modile Number', value: 'mobile_number' },
          { text: 'Approved', value: 'approved' },
          { text: 'Joined At', value: 'joined_at' },
          { text: 'Action', value: 'action' },
        ],
      }
    },
    mounted () {
      var vm = this
        bus.$on('viewEvent', function (value) {
        vm.dialog = true
        vm.form = value
        vm.getDonors(value.id)
      })
    },
    methods: {
        approveDonor(item) {
            var param = {
                user_id: item.id,
                event_id: this.form.id
            }
            this.loading = true
            this.$store.dispatch('approveDonor', param)
                .then(res => {
                    this.loading = false
                    this.snackbar = true
                })
        },
        getColor(item) {
            if (item.gender == 'male') {
                return 'blue'
            } else {
                return 'pink'
            }
        },
        getDonors(id) {
            this.loading = true
            this.$store.dispatch('retrieveEventDonors', id)
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
        donors:'retrieveEventDonors'
      }),
    },
  }
</script>