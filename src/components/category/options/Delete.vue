<template>
  <v-layout justify-center>
      <v-snackbar
        v-model="snackbar"
        color="success"
        multi-line
        right
        :timeout="6000"
        top
      >
      <v-icon large left>check_circle</v-icon>
        <span> {{ text }} </span>
        <v-btn
          dark
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    <v-dialog v-model="deleteDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="subtitle-1">Are you sure you want to delete this Category? </v-card-title>
        <v-divider></v-divider>
        <v-card-actions v-if="!isLoading">
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="deleteCategory">Yes</v-btn>
          <v-btn color="red" text @click="closeDialog">No</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
            <v-progress-linear
                color="primary"
                indeterminate
                rounded
                height="3"
            ></v-progress-linear>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import bus from '../../../event_bus.js'
  export default {
    data () {
      return {
        deleteDialog: false,
        id: '',
        isLoading: false,
        snackbar: false,
        text: ''
      }
    },

    created () {
        var vm = this
        bus.$on('deleteCategory', function (value) {
            vm.deleteDialog = true
            vm.id = value.id
            console.log(value)
      })
    },
    methods: {
        closeDialog(){
            this.deleteDialog= false
        },
        deleteCategory() {
            this.isLoading = true
            this.$store.dispatch('deleteCategory', this.id)
              .then((response) => {
                this.isLoading = false
                this.deleteDialog = false
                this.snackbar = true
                this.text = response.data.message
              })
        }
    }
  }
</script>