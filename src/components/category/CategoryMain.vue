<template>
<v-layout wrap>
    <v-flex lg12>
          <v-layout>
            <v-flex lg9 class="ma-3">
              Category Management
            </v-flex>
          </v-layout>

  <v-card>
    <v-card-title>
        <create class="ml-2"></create>
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
      :items="retrieveCategory"
      :loading="loading"
      :items-per-page-options="rowsPerPageItems"
      :server-items-length="totalRows"
      :options.sync="pagination"
      class="elevation-1"
    >
        <template v-slot:item.count="{ item }">
            {{item.products.length}}
        </template>
        <template v-slot:item.action="{ item }">
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn @click="updateCategory(item)" color="primary"  text fab small dark v-on="on">
                        <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                </template>
                <span>Edit Category</span>
            </v-tooltip>
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn @click="deleteCategory(item)" color="red"  text fab small dark v-on="on">
                        <v-icon small>delete</v-icon>
                    </v-btn>
                </template>
                <span>Delete Category</span>
            </v-tooltip>
        </template>
            <template v-slot:item.status="{ item }">
                <v-chip small :color="getColor(item)" dark>{{item.status}}</v-chip>
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
    <update @clicked="updateCategory"></update>
    <delete @clicked="deleteCategory"></delete>
  </v-layout>
</template>
<script>
/* eslint-disable */
import Create from './options/Create'
import Update from './options/Update'
import Delete from './options/Delete'
import bus from '../../event_bus.js'
import { mapGetters } from 'vuex'
var moment = require('moment')
  export default {
    components: {
        Create,
        Update,
        Delete
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
          { text: 'Category Name', value: 'name', align: 'center'},
          { text: 'Category Status', value: 'status', align: 'center'},
          { text: 'Product Count', value: 'count', align: 'center'},
          { text: 'Created At', value: 'created_at', align: 'center'},
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
    updateCategory(item) {
        bus.$emit('editCategory', item)
    },
    deleteCategory(item) {
        bus.$emit('deleteCategory', item)
    },
    getColor(item) {
        if (item.status == 'active') {
            return 'success'
        } else {
            return 'red'
        }
    },
      getDataFromApi () {
        const { sortBy, descending, page, itemsPerPage } = this.pagination
        //this.page.current_page = this.pagination.page
        
          this.loading = true
          let params = {
            group_by: this.group_by,
            search: this.search,
            current_page: this.pagination.page,
            per_page: this.pagination.itemsPerPage,
            sortBy: this.pagination.sortBy,
            descending: this.pagination.descending,
          }
          this.$store.dispatch('retrieveCategory', params)
              .then((response) => {
                this.loading = false
                this.totalRows = response.data.data.total
              })
          
        },
    },
    computed:{
    ...mapGetters({
        retrieveCategory:'retrieveCategory'
      }),
    },
  }
</script>

