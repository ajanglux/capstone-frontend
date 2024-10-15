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
          <div class="bar-chart">
              <h1> Monthly Completed Repairs </h1>
              <div class="bar">
                  <BarChart :completedRepairsData="completedRepairsData" />
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

export default {
  name: 'AdminDashboard',
  components: { BarChart },
  data() {
    return {
      stats: [],
      completedRepairsData: Array(12).fill(0)
    };
  },
  mounted() {
    this.fetchDashboardStats();
    this.fetchMonthlyCompletedRepairs();
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
        const response = await axios.get(`${BASE_URL}/admin-dashboard-stats`, headers);
        this.stats = [
          { label: 'Total Number of Inquiries', value: response.data.pendingRepairs },
          { label: 'Total Number of On-going Repairs', value: response.data.ongoingRepairs },
          { label: 'Total Number of Services', value: response.data.totalServices },
          { label: 'Total Number of Clients', value: response.data.totalClients }
        ];
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    },
    async fetchMonthlyCompletedRepairs() {
      const authStore = useAuthStore();
      const token = authStore.access_token;

      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }

      try {
        const headers = getHeaderConfig(token);
        const response = await axios.get(`${BASE_URL}/admin-dashboard-stats/completed-repairs`, headers);
        this.completedRepairsData = response.data;
      } catch (error) {
        console.error('Error fetching monthly completed repairs data:', error);
        
        // Fallback data for testing
        this.completedRepairsData = [0, 5, 2, 7, 0, 4, 3, 6, 1, 8, 0, 0]; // Example data
      }
    }
  }
}
</script>


<style lang="scss" scoped>
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
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
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
        background-color: var(--light2);
        padding: 30px;
        width: 100%;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

        .pie {
            width: 50%;
            margin-inline: auto;
        }
    }

    .bar-chart {
        background-color: var(--light2);
        padding: 30px 100px;
        width: 100%;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

        .bar {
            width: 100%;
        }
    }
}

</style>