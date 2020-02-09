<template>
    <v-row>
        <!-- <v-col cols="12">
            Map
        </v-col> -->
        <v-col cols="12">
            <google-map v-if="hospitals.length > 0" :hospitals="hospitals"></google-map>
        </v-col>
    </v-row>
</template>
<script>
import bus from '../../event_bus'
import GoogleMap from '../google-map/GoogleMap'
import { mapGetters } from 'vuex'
var moment = require('moment')
import _ from "lodash";
  export default {
    components: {
        GoogleMap
    },
    data () {
      return {
        moment:moment,
        snackbar: false,
        dialog: false,
        form: {},
        loading: false,
        search: '',
        pagination: {},
      }
    },
    watch: {
      pagination: {
        handler () {
          this.getDataFromApi()
        },
        deep: true
      },
      search: _.debounce(
        function() {
            this.getDataFromApi();
        },
        800,
        {
            leading: true,
            trailing: true
        }
      ),
    },
    mounted () {
        this.getDataFromApi()
    },
    methods: {
        getDataFromApi() {
            this.loading = true
        
            this.loading = true
            let params = {
                search: this.search,
                page: 1,
                per_page: '25',
                sort_by: 'id',
                sort_order: 'asc',
            }

            this.$store.dispatch('retrieveHospitals', params)
                .then(res => {
                    this.loading = false
                })
        }
    },
    computed:{
    ...mapGetters({
        hospitals:'retrieveHospitals',
        totalRows: 'retrieveTotalHospitals'
      }),
    },
  }
</script>