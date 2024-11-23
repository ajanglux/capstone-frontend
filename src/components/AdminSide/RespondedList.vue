<template>
    <div class="content">
      <div class="container">
        <div class="card-header">
          <h2>RESPONDED LIST</h2>
        </div>
        <div class="table-body">
          <div class="table-header">
            <div class="searchbar">
              <i class="bx bx-search"></i>
              <input type="text" placeholder="Search..." v-model="searchQuery" />
            </div>
          </div>
  
          <div v-if="errors" class="alert alert-danger">
            <strong>{{ errors }}</strong>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Client</th>
                <th>Email</th>
                <th>Contact No.</th>
                <th>Address</th>
                <th>Status</th>
                <!-- <th>Actions</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(repair, index) in paginatedRepairs" :key="repair.id">
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td>{{ repair.first_name || 'N/A' }} {{ repair.last_name || 'N/A' }}</td>
                <td>{{ repair.email }}</td>
                <td>{{ repair.phone_number }}</td>
                <td>{{ repair.address }}</td>
                <td>{{ repair.status || 'PENDING' }}</td>
                <!-- <td class="actions">
                  <div class="custom-select">
                    <div class="select-icon">
                      <select v-model="selectedActions[repair.id]" @change="handleActionChange(repair.id)">
                        <option value="">Select</option>
                        <option value="view">View</option>
                        <option value="Incomplete" :disabled="repair.status !== 'pending'">Add to Repair</option>
                        <option value="Responded">Responded</option>
                        <option value="delete">Delete</option>
                      </select>
                    </div>
                  </div>
                </td> -->
              </tr>
              <tr v-if="paginatedRepairs.length === 0">
                <td colspan="7"><strong>No Responded found.</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="pagination-controls">
          <span class="page-indicator">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button @click="previousPage" :disabled="currentPage === 1" class="prev-btn">Previous</button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="next-btn">Next</button>
        </div>
      </div>
  
      <ConfirmationDialog :show="showDeleteDialog" @close="showDeleteDialog = false" @confirm="deleteRepair"/>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { BASE_URL } from '../../helpers/baseUrl';
  import { getHeaderConfig } from '../../helpers/headerConfig';
  import { useAuthStore } from '../../stores/useAuthStore';
  import ConfirmationDialog from '../layouts/ConfirmationDialog.vue';
  import { useToast } from 'vue-toastification'
  
  const authStore = useAuthStore();
  const router = useRouter();
  const repairs = ref([]);
  const errors = ref(null);
  const showDeleteDialog = ref(false);
  const selectedRepairId = ref(null);
  const selectedActions = ref({});
  const searchQuery = ref('');
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const toast = useToast()
  
  const fetchRepairs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/customer-details`, getHeaderConfig(authStore.access_token));
      repairs.value = response.data.data;
      
      repairs.value.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  
      repairs.value.forEach(repair => {
        selectedActions.value[repair.id] = '';
      });
    } catch (error) {
      const toast = this.toast();
      toast.error('Failed to load Inquiries details. Please try again.', { timeout: 3000 });
    }
  };
  
  const filteredRepairs = computed(() => {
    return repairs.value
      .filter(repair => repair.status === 'Responded')
      .filter(repair => {
        const searchText = searchQuery.value.toLowerCase();
        const fullName = `${repair.first_name || ''} ${repair.last_name || ''}`.toLowerCase();
        return fullName.includes(searchText);
      });
  });
  
  const paginatedRepairs = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredRepairs.value.slice(start, end);
  });
  
  const totalPages = computed(() => {
    return Math.ceil(filteredRepairs.value.length / itemsPerPage.value);
  });
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  onMounted(() => {
    fetchRepairs();
  });
  </script>
  
  
  <style lang="scss" scoped>
  .custom-select {
    position: relative;
    display: inline-block;
    width: 100%;
  
    select {
      width: 100%;
      cursor: pointer;
    }
  }
  
  .pagination-controls {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-top: 20px;
    gap: 8px;
  
    button:hover {
      background-color: var(--main-hover);
    }
  
    .prev-btn,
    .next-btn {
      background-color: var(--main);
      color: white;
      border: none;
      padding: 3px 10px;
      font-size: 16px;
      cursor: pointer;
    }
  
    .prev-btn[disabled],
    .next-btn[disabled] {
      background-color: #ccc;
      cursor: not-allowed;
    }
  
    .page-indicator {
      font-size: 16px;
      color: #333;
    }
  }
  </style>
  