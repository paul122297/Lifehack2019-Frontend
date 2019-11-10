<template>
  <v-layout row wrap class="pa-3">
    <v-flex lg12>
      Dashboard
    </v-flex>
    <v-flex lg12>
      <v-row>
        <v-col cols="6">
          <BarChart/>
        </v-col>
        <v-col cols="6">
          <PieChart/>
        </v-col>
        <v-col cols="12">
          <ChatApp/>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
import BarChart from './charts/BarChart'
import PieChart from './charts/PieChart'
import ChatApp from './chat/ChatApp'
export default {
  components: {
    BarChart,
    PieChart,
    ChatApp
  },
  // created() {//User_id.Reciever_id
  //     window.Echo.channel('Chat.1.3')
  //       .listen('BroadcastChat', (e) => {
  //           console.log(e);
  //           console.log('Success');
  //       })

  //     window.Echo.channel('blood-request.1.1')
  //       .listen('ApprovedRequest', (e) => {
  //           console.log(e);
  //           console.log('Success');
  //       })
        
  // }
}
</script>