<template>

        <v-row>
            <v-col cols="12" class="pa-12">
                <v-card>
                    <v-card-title>
                    Accounts
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
                    :items="accounts"
                    :search="search"
                    :loading="loading"
                    >
                    <template v-slot:item.active="{ item }">
                        <v-chip v-if="item.active" class="overline white--text green" small>Online</v-chip>
                        <v-chip v-else class="overline" small>Offline</v-chip>
                    </template>
                    <template v-slot:item.donor_gender="{ item }">
                        <v-chip class="overline" small :color="getColor(item)" dark>{{item.gender}}</v-chip>
                    </template>
                    <template v-slot:item.age="{ item }">
                        <v-chip class="overline" small>{{calculateAge(item.birthday)}}</v-chip>
                    </template>
                    <template v-slot:item.approved="{ item }">
                        <v-chip class="overline" :color="item.pivot.approved=='1'? 'green' : 'red'" small dark>{{item.pivot.approved=='1'? 'Yes' : 'No'}}</v-chip>
                    </template>
                    <template v-slot:item.points="{ item }">
                        {{item.points}}
                    </template>
                    <template v-slot:item.donation_count="{ item }">
                        {{item.my_donations.length}}
                    </template>
                     <template v-slot:item.request_count="{ item }">
                        {{item.my_requests.length}}
                    </template>
                     <template v-slot:item.joined_count="{ item }">
                        {{item.joinedevents.length}}
                    </template>
                    <template v-slot:item.joined_at="{ item }">
                        {{moment(item.created_at).format('LLL')}}
                    </template>
                        <!-- <template v-slot:item.action="{ item }">
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-btn :disabled="item.pivot.approved=='1'" @click="approveDonor(item)" color="green"  text small v-on="on">
                                        Approve
                                    </v-btn>
                                </template>
                                <span>Approve Donor</span>
                            </v-tooltip>
                        </template> -->
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
</template>
<script>
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
          { text: 'Status', value: 'active' },
          { text: 'Blood Type', value: 'blood_type' },
          { text: 'Gender', value: 'donor_gender' },
          { text: 'Age', value: 'age' },
          { text: 'Email', value: 'email' },
          { text: 'Modile Number', value: 'mobile_number' },
          { text: 'Total Donation', value: 'donation_count' },
          { text: 'Total Request', value: 'request_count' },
          { text: 'Total Joined Events', value: 'joined_count' },
          { text: 'Points', value: 'points' },
          { text: 'Joined At', value: 'joined_at' },
          { text: 'Action', value: 'action' },
        ],
      }
    },
    mounted () {
        this.getAccounts()
    },
    methods: {

        getColor(item) {
            if (item.gender == 'male') {
                return 'blue'
            } else {
                return 'pink'
            }
        },
        getAccounts(id) {
            this.loading = true
            this.$store.dispatch('retrieveAccounts', id)
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
        accounts:'retrieveAccounts'
      }),
    },
  }
</script>