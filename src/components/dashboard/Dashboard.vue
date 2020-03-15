<template>
  <v-layout row wrap class="pa-3">
    <v-flex lg12>
      Dashboard
    </v-flex>
    <v-flex lg12>
      <v-row>
        <v-col cols="8">
          <PerMonth/>
        </v-col>
        <v-col cols="4">
          <PerGender/>
        </v-col>
        <v-col cols="7">
          <PerBloodType/>
        </v-col>
        <v-col cols="5">
          <RequestCounts/>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
import PerMonth from './analytics/Month'
import PerGender from './analytics/Gender'
import PerBloodType from './analytics/Transactions'
import RequestCounts from './analytics/BloodRequest'
export default {
  components: {
    PerMonth,
    PerGender,
    PerBloodType,
    RequestCounts
  },

}
</script>