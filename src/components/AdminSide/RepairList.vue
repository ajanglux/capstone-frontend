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
            <input type="text" placeholder="Search..." >
          </div>
          <div class="filters">
            <select name="" id="">
              <option value="">On-going</option>
              <option value="">Doned</option>
              <option value="">Completed</option>
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
            <tr v-for="(repair, index) in filteredRepairs" :key="repair.id">
              <td>{{ index + 1 }}</td>
              <td>{{ formatDate(repair.created_at) }}</td>
              <td>{{ repair.code }}</td>
              <td>{{ repair.first_name || 'N/A' }} {{ repair.last_name || 'N/A' }}</td>
              <td>{{ repair.status || 'ON GOING' }}</td>
              <td class="actions">
                <router-link :to="{ name: 'repair-form', params: { id: repair.id } }" class="btn btn-success btn-sm me-1">
                  View
                </router-link>
                <button class="btn btn-danger btn-sm me-1" @click="confirmDelete(repair.id)">Delete</button>
                <button class="btn btn-warning btn-sm me-1" @click="markAsFinished(repair.id)">Finished</button>
                <button class="btn btn-danger btn-sm me-1" @click="markAsCompleted(repair.id)">Completed</button>
              </td>
            </tr>
            <tr v-if="filteredRepairs.length === 0">
              <td colspan="6"><strong>No repairs found.</strong></td>
            </tr>
          </tbody>
        </table>
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
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import ConfirmationDialog from '../layouts/ConfirmationDialog.vue';
import SuccessModal from '../layouts/SuccessModal.vue';

const authStore = useAuthStore();
const repairs = ref([]);
const errors = ref(null);
const showDeleteDialog = ref(false);
const showSuccessModal = ref(false);
const successMessage = ref('');
const selectedRepairId = ref(null);

const fetchRepairs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customer-details`, getHeaderConfig(authStore.access_token));
    repairs.value = response.data.data;
  } catch (error) {
    console.error('Error fetching repairs:', error);
    errors.value = error.response?.data?.message || 'Error fetching repairs';
  }
};

const filteredRepairs = computed(() => {
  return repairs.value.filter(repair => 
    repair.status === 'on-going' || repair.status === 'finished'
  );
});

const deleteRepair = async () => {
  try {
    await axios.delete(`${BASE_URL}/customer-details/${selectedRepairId.value}`, getHeaderConfig(authStore.access_token));
    fetchRepairs();
    showDeleteDialog.value = false;
    successMessage.value = 'Repair deleted successfully.';
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Error deleting repair:', error);
    errors.value = error.response?.data?.message || 'Error deleting repair';
  }
};

const confirmDelete = (id) => {
  selectedRepairId.value = id;
  showDeleteDialog.value = true;
};

const updateStatus = async (id, status) => {
  try {
    await axios.patch(`${BASE_URL}/customer-details/${id}/status`, { status }, getHeaderConfig(authStore.access_token));
    fetchRepairs();
    successMessage.value = `Repair marked as ${status} successfully.`;
    showSuccessModal.value = true;
  } catch (error) {
    console.error(`Error updating repair status to ${status}:`, error);
    errors.value = error.response?.data?.message || `Error updating repair status to ${status}`;
  }
};

const markAsFinished = (id) => {
  updateStatus(id, 'finished');
};

const markAsCompleted = (id) => {
  updateStatus(id, 'completed');
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

onMounted(() => {
  fetchRepairs();
});
</script>

<style>


</style> 