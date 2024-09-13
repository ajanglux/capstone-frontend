<template>
    <div class="content">
        <div class="cards">
            <div class="card" v-for="(card, index) in stats" :key="index">
                <div class="info">
                    <p> {{ card.label }} </p>
                    <h1> {{ card.value }} </h1>
                </div>
            </div>
        </div>

        <div class="charts">
            <div class="pie-chart">
                <h1> Total Repairs </h1>
                <div class="pie">
                    <PieChart />
                </div>
            </div>
            <div class="bar-chart">
                <h1> Total Repairs </h1>
                <div class="bar">
                    <BarChart />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import BarChart from '../layouts/BarChart.vue';
import PieChart from '../layouts/PieChart.vue';

export default {
  name: 'AdminDashboard',
  components: { BarChart, PieChart },
  data() {
    return {
      stats: []
    };
  },
  mounted() {
    this.fetchDashboardStats();
  },
  methods: {
    async fetchDashboardStats() {
      const authStore = useAuthStore();
      const token = authStore.access_token;

      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }

      try {
        const headers = getHeaderConfig(token); 
        console.log('Fetching stats with headers:', headers);

        const response = await axios.get(`${BASE_URL}/admin-dashboard-stats`, headers);
        this.stats = [
          { label: 'Total Number of Inquiries', value: response.data.pendingRepairs },
          { label: 'Total Number of Repairs', value: response.data.ongoingRepairs },
          { label: 'Total Number of Services', value: response.data.totalServices },
          { label: 'Total Number of Clients', value: response.data.totalClients }
        ];
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    }
  }
}
</script>


<style scoped>
.cards {
    display: flex;
    gap: 30px;
    width: 100%;
    align-items: stretch;
    transition: all 0.5s ease;

    .card {
        width: 100%;
        flex: 1;
        padding: 20px;
        border-radius: 5px;
        background-color: var(--grey);
        color: var(--light2);
        box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.322);
        transition: all 0.3s ease-in-out;
        display: flex;
        flex-direction: column;

        .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;

        }
    }
}

.charts {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    padding: 40px 0;
    gap: 15px;
    width: 100%;

    .pie-chart {
        background-color: var(--white);
        padding: 30px;
        width: 100%;
        border-radius: 10px;

        .pie {
            width: 50%;
            margin-inline: auto;
        }
    }

    .bar-chart {
        background-color: var(--white);
        padding: 30px;
        width: 100%;
        border-radius: 10px;

        .bar {
            width: 100%;
        }
    }
}

</style>