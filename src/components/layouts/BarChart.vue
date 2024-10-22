<template>
  <div class="chartdes">
    <Bar
      :chart-id="'completed-repairs-bar-chart'"
      :dataset-id="'completed-repairs-dataset'"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import {  
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  completedRepairsData: Array,
});

const chartData = ref({
  labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  datasets: [
    {
      label: 'Completed Repairs',
      backgroundColor: ['#0F4C7BFF','#D77B28',],
      data: props.completedRepairsData,
    },
  ],
});

watch(props, (newProps) => {
  chartData.value.datasets[0].data = newProps.completedRepairsData;
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<style lang="scss" scoped>
canvas {
  height: 480px;
}
</style>