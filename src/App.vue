<template>
  <v-app>
    <toolbar v-if="loggedIn"></toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/navigation/Toolbar'
export default {
  name: 'App',
  components: {
    Toolbar
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
