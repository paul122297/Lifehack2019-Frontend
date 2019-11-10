<template>
    <section class="charts">
        <vue-highcharts :options="pieOptions" ref="pieChart"></vue-highcharts>
    </section>
</template>
<script>
import VueHighcharts from "vue2-highcharts";

const PieData = {
  chart: {
    type: "pie",
    options3d: {
      enabled: true,
      alpha: 45
    }
  },
  title: {
    text: "Gender Count"
  },
  subtitle: {
    text: ""
  },
  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45
    }
  },
  series: [
    {
      name: "Count",
      data: [
        ["Male", 8],
        ["Female", 3]
      ]
    }
  ]
};

export default {
  components: {
    VueHighcharts
  },
  data() {
    return {
      pieOptions: PieData
    };
  },
  mounted() {},
  methods: {}
};
</script>