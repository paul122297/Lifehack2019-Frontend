<template>
    <v-app-bar class="primary" dense clipped-left app>
      <v-app-bar-nav-icon text color="white"
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="drawerOpen"
      >
      <v-icon>menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
          CS Barrera
      </v-toolbar-title>
        <!-- <v-toolbar-title v-else>
          <v-img class="drawer-logo mt-2" width="150" src="../img/Expee-Logo-Reversed.png"/>
      </v-toolbar-title> -->
        <v-spacer></v-spacer>
        <v-btn color="white" text small fab @click="$vuetify.theme.dark = !$vuetify.theme.dark"><v-icon small>brightness_medium</v-icon> </v-btn>
        <v-btn color="white" text small fab @click="logout"> <v-icon small>power_settings_new</v-icon> </v-btn>
    </v-app-bar>
</template>
<script>
/* eslint-disable */
import bus from '../../event_bus.js'
export default {
    data() {
        return {
            darkMode: false,
            primaryDrawer: {
                model: null,
                type: 'default (no property)',
                clipped: false,
                floating: false,
                mini: false
            },
        }
    },
    methods: {
        drawerOpen(){
            bus.$emit('drawerOpen', true)
        },
         logout(){
            this.$store.dispatch('destroyToken')
              .then(response => {
                  this.$router.push({path: '/'});
              });
      }
    },
    watch: {
        darkMode: function (darkMode) {
            bus.$emit('darkMode', darkMode)
        }
    },
    computed: {
      currentUser(){
          return JSON.parse(this.$store.state.auth.currentUser)
        }
    }
}
</script>
<style scoped>
.v-application .accent--text {
    color: #2196f3 !important;
    caret-color: #2196f3 !important;
}
</style>
