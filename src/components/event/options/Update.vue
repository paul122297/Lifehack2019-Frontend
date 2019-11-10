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
        <span> Brand Successfully Updated </span>
        <v-btn
          dark
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Brand</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="form.name"
                        v-validate="'required'"
                        :error-messages="errors.collect('name')"
                        label="Brand Name"
                        data-vv-name="name"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n10">
                    <v-radio-group v-model="form.status">
                        <v-radio label="Active" value="active"></v-radio>
                        <v-radio label="Inactive" value="inactive"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions v-if="!loading">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeDialog">Close</v-btn>
          <v-btn color="primary" :disabled="validated" @click="submitBrand">Save</v-btn>
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
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import bus from '../../../event_bus'
  Vue.use(VeeValidate)
  export default {
    components: {
        
    },
    $_veeValidate: {
      validator: 'new',
    },
    data() {
        return {
            snackbar: false,
            loading: false,
            dialog: false,
            form: {
                id: '',
                name: '',
                status: 'active'
            },
            dictionary: {
                attributes: {
                    name: 'Brand Name',
                    status: 'Brand Status'
                },
            },
        }
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)
      var vm = this
        bus.$on('editEvent', function (value) {
        vm.dialog = true
        vm.form.id = value.id
        vm.form.name = value.name
        vm.form.status = value.status
      })
    },
    methods: {
      closeDialog() {
        this.dialog = false
        this.loading = false
        this.form.id = ''
        this.form.name = ''
        this.form.status = ''

      },
        submitBrand(){
          this.loading = true
            this.$store.dispatch('updateBrand', this.form)
                .then((response) => {
                    this.snackbar = true
                    this.dialog = false
                    this.loading = false
                    this.form.id = ''
                    this.form.name = ''
                    this.form.status = ''
                    console.log(response, 'success')
                }).catch(error => {
                    console.log(error)
                })
        },
    },
      computed: {
        validated(){
          if (this.form.name != ''&&this.form.status != ''&&!Object.keys(this.fields).some(key => this.fields[key].invalid)) return false
          else return true
        },
      },
  }
</script>