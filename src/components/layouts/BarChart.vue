<template>
  <div id="chart-container">
    <Bar
      ref="myChart"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    completedRepairsData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        labels: [
          'January', 'February', 'March', 'April', 'May', 
          'June', 'July', 'August', 'September', 
          'October', 'November', 'December'
        ],
        datasets: [{
          label: 'Completed Repairs',
          data: this.completedRepairsData || [],
          backgroundColor: this.getBackgroundColors(),
        }]
      },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 10,
            ticks: {
              stepSize: 1,
              callback: function(value) {
                return Number.isInteger(value) ? value : '';
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          background: {
            color: '#f9f9f9'
          }
        }
      }
    };
  },
  methods: {
    getBackgroundColors() {
      const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#E57373', 
        '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56',
        '#4DD0E1', '#7E57C2', '#26C6DA', '#EF5350'
      ];
      return colors.slice(0, this.completedRepairsData.length); 
    },
    updateChart() {
      this.$nextTick(() => {
        if (this.$refs.myChart && this.$refs.myChart.chartInstance) {
          this.$refs.myChart.chartInstance.update();
        }
      });
    }
  },
  watch: {
    completedRepairsData: {
      immediate: true,
      handler(newData) {
        this.chartData.datasets[0].data = newData || [];
        this.chartData.datasets[0].backgroundColor = this.getBackgroundColors();
        this.updateChart();
      }
    }
  }
};
</script>


<style scoped>
#chart-container {
  max-width: 700px; 
  padding: 20px;
  margin-left: 15pc;
}
</style>
