<template>
  <section class="charts">
        <vue-highcharts :options="options" ref="barChart"></vue-highcharts>
    </section>
</template>
<script>
import VueHighcharts from "vue2-highcharts";
import Highcharts from "highcharts";

const data = {
  chart: {
    type: "bar"
  },
  title: {
    text: "Blood Donation per Blood Type"
  },
  subtitle: {
    text:
      ''
  },
  xAxis: {
    categories: ['A+' ,'A-','B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: "Counts",
      align: "high"
    },
    labels: {
      overflow: "justify"
    }
  },
  tooltip: {
    valueSuffix: " Transactions"
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true
      }
    }
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "top",
    x: -40,
    y: 80,
    floating: true,
    borderWidth: 2,
    backgroundColor:
      (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || "#FFFFFF",
    shadow: true
  },
  credits: {
    enabled: false
  },
  series: [
    {
      name: "Count",
      data: [107, 31, 635, 203, 2, 635, 203, 54]
    },
  ]
};
export default {
  components: {
    VueHighcharts
  },
  data() {
    return {
      options: data
    };
  }
};
</script>
