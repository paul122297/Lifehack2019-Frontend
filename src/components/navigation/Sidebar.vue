<template>
    <v-navigation-drawer
      v-model="model"
      overflow
      fixed
      clipped
      app
      :expand-on-hover="mini"
      stateless
    >

      <v-list class="mt-n1">
        <v-list-item two-line>
            <!-- <v-list-item-avatar>
              <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460">
            </v-list-item-avatar> -->
            <v-list-item-avatar color="primary">
                <span class="white--text headline">{{currentUser.name.charAt(0)}}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{currentUser.name}}</v-list-item-title>
              <v-list-item-subtitle>Super Admin</v-list-item-subtitle>
            </v-list-item-content>
            <!-- <v-list-item-action >
                <v-btn icon @click.stop="minimize">
                <v-icon>chevron_left</v-icon>
                </v-btn>
          </v-list-item-action> -->
          </v-list-item>
      </v-list>

    <v-list class="mt-n5" dense
        nav>
    <!-- dashboard menu -->
    <template v-for="(item, i) in navigations" >
      <!-- <v-divider :key="item.name"></v-divider> -->
      <v-list-item :to="item.route" router :key="i">
        <v-list-item-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{item.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <!-- <v-divider></v-divider> -->
    </v-list>

    </v-navigation-drawer>
</template>
<script>
import bus from '../../event_bus.js'
export default {
    data() {
        return {
            active: false,
            model: true,
            mini: false,
            navigations: [
                {name: 'Dashboard', icon: 'dashboard', route: 'dashboard'},
                {name: 'Accounts', icon: 'people', route: 'accounts'},
                {name: 'Events', icon: 'mdi-calendar-multiple-check', route: 'events'},
                {name: 'Hospital', icon: 'mdi-hospital-building', route: 'hospitals'},
            ],
        }
    },
    created () {
      var vm = this
      bus.$on('drawerOpen', function (value) {
          if (!vm.mini) {
              vm.mini = value
          } else {
              vm.mini = false
          } 
      })
    },
    methods: {
      minimize(){
        this.mini = true
        this.active = false
      }
    },
    computed: {
        currentUser(){
          return JSON.parse(this.$store.state.auth.currentUser)
        }
    }
}
</script>

