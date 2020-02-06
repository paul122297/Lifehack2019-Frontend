<template>
  <v-app>
    <v-snackbar
        v-model="snackbar"
        color="success"
        multi-line
        right
        :timeout="6000"
        top
      >
      <v-icon large left>check_circle</v-icon>
        <span> You have a new message. </span>
        <v-btn
          dark
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
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
    snackbar: false,
    users: []
  }),
    created() {
        // var userId = this.currentUser.id;
        // window.Echo.channel('Chat.'+ userId)
        //   .listen('BroadcastChat', (e) => {
        //       console.log(e);
        //       console.log('Success');   
        //       this.snackbar = true     
        //   })
      this.listenOnlineUsers();
    },
    methods: {
      listenOnlineUsers() {
        window.Echo.join('online-users')
          .here((user) => {
            this.users = user
            console.log(this.users)
          })
          .joining((user) => {
            this.users.push(user)
            console.log(user.name, 'JOINING')
            this.$store.dispatch('accountOnline', user.id);
          })
          .leaving((user) => {
            var index = this.users.findIndex(item => item.id === user.id)
            this.users.splice(index, 1)
            console.log(user.name, 'LEAVING')
            this.$store.dispatch('accountOffline', user.id);
          })

          window.Echo.private('update-user-status')
          .listen('UserOnline', (e) => {
            console.log(e)
            this.$store.commit('updateAccount', e.user);
            console.log(e.user.name, 'ONLINE')
          })
          .listen('UserOffline', (e) => {
            console.log(e)
            this.$store.commit('updateAccount', e.user);
            console.log(e.user.name, 'OFFLINE')
          });
      },
    },
  computed: {
      loggedIn(){
        return this.$store.getters.loggedIn
      },
      currentUser(){
        return JSON.parse(this.$store.state.auth.currentUser)
      }
    }
};
</script>
