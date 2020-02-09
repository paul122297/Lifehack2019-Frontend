<template>
    <v-row>
        <v-col cols="12">
            Company Management
        </v-col>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                <v-btn @click="create" rounded outlined small color="primary">
                    <v-icon left>mdi-plus</v-icon>
                    Create New Company
                </v-btn>
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
                :items="companies"
                :search="search"
                :loading="loading"
                :footer-props="{ 'items-per-page-options': [15, 25, 50, 100]}"
                :server-items-length="totalRows"
                :options.sync="pagination"
                >
                <template v-slot:item.created_at="{ item }">
                    {{moment(item.created_at).format('LLL')}}
                </template>
                <template v-slot:item.action="{ item }">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn @click="update(item)" color="green" rounded outlined x-small v-on="on">
                                <v-icon small>mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <span>Edit Company</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn class="ml-1" @click="remove(item)" color="primary" rounded outlined x-small v-on="on">
                                <v-icon small>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Delete Company</span>
                    </v-tooltip>
                </template>
                </v-data-table>
            </v-card>
        </v-col>
        <Create/>
        <Update/>
        <Delete/>
    </v-row>
</template>
<script>
import bus from '../../event_bus'
import Create from './options/Create'
import Update from './options/Update'
import Delete from './options/Delete'
import { mapGetters } from 'vuex'
var moment = require('moment')
import _ from "lodash";
  export default {
    components: {
        Create,
        Update,
        Delete
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
        rowsPerPageItems: [5, 10, 20, 50, 100],
        headers: [
          { text: 'Company Name', value: 'company_name' },
          { text: 'Company Address', value: 'company_address' },
          { text: 'Accounts', value: 'users_count' },
          { text: 'Hospitals', value: 'hospitals_count' },
          { text: 'Created At', value: 'created_at' },
          { text: 'Action', value: 'action' },
        ],
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
        create() {
            bus.$emit('createCompany')
        },
        update(item) {
            bus.$emit('updateCompany', item)
        },
        remove(item) {
            bus.$emit('deleteCompany', item)
        },
        getDataFromApi() {
            this.loading = true
            const { sortBy, descending, page, itemsPerPage } = this.pagination
        
            this.loading = true
            let params = {
                search: this.search,
                page: this.pagination.page,
                per_page: this.pagination.itemsPerPage,
                sort_by: this.pagination.sortBy[0],
                sort_order: this.pagination.sortDesc[0]? 'desc' : 'asc',
            }

            this.$store.dispatch('retrieveCompanies', params)
                .then(res => {
                    this.loading = false
                })
        }
    },
    computed:{
    ...mapGetters({
        companies:'retrieveCompanies',
        totalRows: 'retrieveTotalCompanies'
      }),
    },
  }
</script>