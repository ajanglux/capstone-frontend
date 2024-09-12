<template>
    <Pie
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  

  <script>
  import { Pie } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement )
  
  export default {
    name: 'PieChart',
    components: { Pie },
    data() {
      return {
        chartData: {
          labels: [ 'January', 'February', 'March', 'April' ],
          datasets: [{ 
            data: [40, 20, 12, 30],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E57373'],
          }]
        },
        chartOptions: {
          responsive: true
        }
      }
    }
  }
  </script>