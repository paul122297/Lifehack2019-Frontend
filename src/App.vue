<template>
  <v-app>
    <sidebar v-if="loggedIn"></sidebar>
    <toolbar v-if="loggedIn"></toolbar>
    <v-content class="mx-4 my-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/navigation/Toolbar'
import Sidebar from './components/navigation/Sidebar'
export default {
  name: 'App',
  components: {
    Toolbar,
    Sidebar
  },
  data: () => ({
    //
  }),
  computed: {
      loggedIn(){
          return this.$store.getters.loggedIn
        }
    }
};
</script>
