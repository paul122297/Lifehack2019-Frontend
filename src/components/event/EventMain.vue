<template>
<v-layout wrap>
    <v-flex lg12>
          <v-layout>
            <v-flex lg9 class="ma-3">
              Event Management
            </v-flex>
          </v-layout>

  <v-card>
    <v-card-title>
        <create-brand class="ml-2"></create-brand>
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
      :items="retrieveEvents"
      :loading="loading"
      class="elevation-1"
    >
        <template v-slot:item.count="{ item }">
            {{item.products.length}}
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn @click="viewEvent(item)" color="green"  text fab small dark v-on="on">
                        <v-icon small>mdi-eye</v-icon>
                    </v-btn>
                </template>
                <span>View Event</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn @click="updateEvent(item)" color="blue"  text fab small dark v-on="on">
                        <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                </template>
                <span>Edit Event</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn @click="deleteEvent(item)" color="red"  text fab small dark v-on="on">
                        <v-icon small>delete</v-icon>
                    </v-btn>
                </template>
                <span>Delete Event</span>
            </v-tooltip>
        </template>
            <template v-slot:item.status="{ item }">
                <v-chip small :color="getColor(item)" dark>{{item.status}}</v-chip>
            </template>
            <template v-slot:item.count="{ item }">
                <v-chip small >{{item.users.length}}</v-chip>
            </template>
            <template v-slot:item.created_at="{ item }">
                {{moment(item.created_at).format('LLL')}}
            </template>
            <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
            </v-alert>
        </template>
        </v-data-table>
    </v-card>
    </v-flex>
    <update-brand></update-brand>
    <delete-brand></delete-brand>
    <ViewEvent/>
  </v-layout>
</template>
<script>
/* eslint-disable */
import CreateBrand from './options/Create'
import UpdateBrand from './options/Update'
import DeleteBrand from './options/Delete'
import ViewEvent from './options/View'
import bus from '../../event_bus.js'
import { mapGetters } from 'vuex'
var moment = require('moment')
  export default {
    components: {
        CreateBrand,
        UpdateBrand,
        DeleteBrand,
        ViewEvent
      },
    data () {
      return {
        moment:moment,
        group_by: 'All',
        search: '',
        totalRows: 0,
        items: [
            { title: 'Edit' },
            { title: 'Delete' }
        ],
        loading: true,
        pagination: {},
        headers: [
          // { text: 'Media', value: 'media', align: 'center'},
          { text: 'Title', value: 'title', align: 'center'},
          { text: 'Address', value: 'address', align: 'center'},
          { text: 'Start', value: 'start', align: 'center'},
          { text: 'End', value: 'end', align: 'center'},
          { text: 'Donor Count', value: 'count', align: 'center'},
          { text: 'Actions', value: 'action', align: 'center', sortable: false}
        ],
        rowsPerPageItems: [5, 10, 20, 50, 100],
      }
    },
    watch: {
      pagination: {
        handler () {
          this.getDataFromApi()
        },
        deep: true
      },
      search: {
        handler () {
          this.getDataFromApi()
        },
        deep: true
      },
      group_by: {
        handler () {
          this.getDataFromApi()
        },
        deep: true
      }
    },
    mounted () {
      this.getDataFromApi()
    },
    methods: {
      viewEvent(item) {
        bus.$emit('viewEvent', item)
      },
      updateEvent(item) {
          bus.$emit('editEvent', item)
      },
      deleteEvent(item) {
          bus.$emit('EventDelete', item)
      },
      getColor(item) {
          if (item.status == 'active') {
              return 'success'
          } else {
              return 'red'
          }
      },
      getDataFromApi () {
          this.loading = true
          this.$store.dispatch('retrieveEvents')
              .then((response) => {
                this.loading = false
              })
        },
    },
    computed:{
    ...mapGetters({
        retrieveEvents:'retrieveEvents'
      }),
    },
  }
</script>

