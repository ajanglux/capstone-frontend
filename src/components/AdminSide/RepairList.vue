<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>LIST OF REPAIRS</h2>
        <div class="left-card">
          <router-link class="button" to="/repair-history">
            <span class="text"><i class='bx bx-history'></i>History</span>
          </router-link>
          <router-link class="button" to="/repair-form">
            <span class="text"><i class='bx bxs-plus-square'></i> ADD REPAIR INFO</span>
          </router-link>
        </div>
      </div>
      <div class="table-body">
        <div class="table-header">
          <div class="searchbar">
            <i class='bx bx-search'></i>
            <input type="text" placeholder="Search..." v-model="searchQuery">
          </div>
          <div class="filters">
            <select v-model="selectedStatus">
              <option value="">All</option>
              <option value="on-going">On-going</option>
              <option value="finished">Finished</option>
              <option value="ready-for-pickup">Ready</option>
            </select>
          </div>
        </div>
        <div v-if="errors" class="alert alert-danger">
          <strong>{{ errors }}</strong>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Date Created</th>
              <th>Code</th>
              <th>Client</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(repair, index) in paginatedRepairs" :key="repair.id">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ formatDate(repair.created_at) }}</td>
              <td>{{ repair.code }}</td>
              <td>{{ repair.first_name || 'N/A' }} {{ repair.last_name || 'N/A' }}</td>
              <td>{{ repair.status || 'ON GOING' }}</td>
              <td class="actions">
                <div class="custom-select">
                  <select v-model="selectedActions[repair.id]" @change="handleActionChange(repair.id)">
                    <option value="">Select Action</option>
                    <option value="view">Edit / View</option>
                    <option value="cancelled" :disabled="repair.status === 'cancelled'">Cancel</option>
                    <option value="finished" :disabled="repair.status === 'finished' || repair.status === 'ready-for-pickup'">Finished</option>
                    <option value="ready-for-pickup" :disabled="repair.status === 'ready-for-pickup'">Ready For Pickup</option>
                    <option value="completed" :disabled="repair.status === 'finished'">Completed</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr v-if="paginatedRepairs.length === 0">
              <td colspan="6"><strong>No repairs found.</strong></td>
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
    <ConfirmationDialog
      :show="showDeleteDialog"
      @close="showDeleteDialog = false"
      @confirm="deleteRepair"
    />
    <SuccessModal
      v-if="showSuccessModal"
      :message="successMessage"
      @close="showSuccessModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import ConfirmationDialog from '../layouts/ConfirmationDialog.vue';
import SuccessModal from '../layouts/SuccessModal.vue';

const authStore = useAuthStore();
const router = useRouter();
const repairs = ref([]);
const errors = ref(null);
const showDeleteDialog = ref(false);
const showSuccessModal = ref(false);
const successMessage = ref('');
const selectedRepairId = ref(null);
const selectedActions = ref({});
const selectedStatus = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

const fetchRepairs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customer-details`, getHeaderConfig(authStore.access_token));
    repairs.value = response.data.data;

    repairs.value.sort((a, b) => new Date(a.status_updated_at) - new Date(b.status_updated_at));

    repairs.value.forEach(repair => {
      selectedActions.value[repair.id] = '';
    });
  } catch (error) {
    console.error('Error fetching repairs:', error);
    errors.value = error.response?.data?.message || 'Error fetching repairs';
  }
};

const filteredRepairs = computed(() => {
  return repairs.value.filter(repair => {
    let matchesStatus = true;

    if (selectedStatus.value === '') {
      matchesStatus = repair.status === 'on-going' || repair.status === 'finished' || repair.status === 'ready-for-pickup';
    } else {
      matchesStatus = repair.status === selectedStatus.value;
    }

    const searchText = searchQuery.value.toLowerCase();
    const fullName = `${repair.first_name || ''} ${repair.last_name || ''}`.toLowerCase().trim();
    const matchesSearch =
      repair.code.toLowerCase().includes(searchText) ||
      fullName.includes(searchText) ||
      (repair.first_name && repair.first_name.toLowerCase().includes(searchText)) ||
      (repair.last_name && repair.last_name.toLowerCase().includes(searchText));

    return matchesStatus && matchesSearch;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredRepairs.value.length / itemsPerPage.value);
});

const paginatedRepairs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredRepairs.value.slice(start, start + itemsPerPage.value);
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

const handleActionChange = (repairId) => {
  const action = selectedActions.value[repairId];
  if (action === 'view') {
    viewRepair(repairId);
  } else if (action === 'cancelled') {
    confirmStatus(repairId);
  } else if (action === 'finished') {
    markAsFinished(repairId);
  } else if (action === 'ready-for-pickup') {
    markAsReady(repairId);
  } else if (action === 'completed') {
    markAsCompleted(repairId);
  }
};

const viewRepair = (id) => {
  router.push({ name: 'repair-form', params: { id } });
};

// const deleteRepair = async () => {
//   try {
//     await axios.delete(`${BASE_URL}/customer-details/${selectedRepairId.value}`, getHeaderConfig(authStore.access_token));
//     fetchRepairs();
//     showDeleteDialog.value = false;
//     successMessage.value = 'Repair deleted successfully.';
//     showSuccessModal.value = true;
//   } catch (error) {
//     console.error('Error deleting repair:', error);
//     errors.value = error.response?.data?.message || 'Error deleting repair';
//   }
// };

// const confirmDelete = (id) => {
//   selectedRepairId.value = id;
//   showDeleteDialog.value = true;
// };

const updateStatus = async (id, status) => {
  try {
    await axios.patch(`${BASE_URL}/customer-details/${id}/status`, { status }, getHeaderConfig(authStore.access_token));
    fetchRepairs();
    showDeleteDialog.value = true;
    successMessage.value = `Repair marked as ${status} successfully.`;
    showSuccessModal.value = true;
  } catch (error) {
    console.error(`Error updating repair status to ${status}:`, error);
    errors.value = error.response?.data?.message || `Error updating repair status to ${status}`;
  }
};

const confirmStatus = (id) => {
  selectedRepairId.value = id;
  showDeleteDialog.value = true;
};

const markAsFinished = (id) => {
  updateStatus(id, 'finished');
};

const markAsReady = (id) => {
  updateStatus(id, 'ready-for-pickup');
};

const markAsCompleted = (id) => {
  updateStatus(id, 'completed');
};

const markAsCancelled = (id) => {
  updateStatus(id, 'cancelled');
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};

onMounted(() => {
  fetchRepairs();
});
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  display: inline-block;

  select {
    width: 100%;
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
