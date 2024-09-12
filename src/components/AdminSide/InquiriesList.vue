<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>LIST OF INQUIRIES</h2>
      </div>
      <div class="table-body">
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(repair, index) in ongoingRepairs" :key="repair.id">
              <td>{{ index + 1 }}</td>
              <td>{{ repair.first_name || 'N/A' }} {{ repair.last_name || 'N/A' }}</td>
              <td>{{ repair.email }}</td>
              <td>{{ repair.phone_number }}</td>
              <td>{{ repair.address }}</td>
              <td>{{ repair.status || 'PENDING' }}</td>
              <td class="actions">
                <button class="btn btn-success btn-sm me-1" @click="setOngoing(repair.id)" :disabled="repair.status !== 'pending'">
                  On-going
                </button>
                <button class="btn btn-danger btn-sm me-1" @click="confirmDelete(repair.id)">Delete</button>
              </td>
            </tr>
            <tr v-if="ongoingRepairs.length === 0">
              <td colspan="7"><strong>No pending inquiries found.</strong></td>
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

const ongoingRepairs = computed(() => {
  return repairs.value.filter(repair => repair.status === 'pending');
});

const setOngoing = async (id) => {
  try {
    await axios.put(`${BASE_URL}/customer-details/${id}`, { status: 'on-going' }, getHeaderConfig(authStore.access_token));
    fetchRepairs();
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Error updating repair status:', error);
    errors.value = error.response?.data?.message || 'Error updating repair status';
  }
};

const deleteRepair = async () => {
  try {
    await axios.delete(`${BASE_URL}/customer-details/${selectedRepairId.value}`, getHeaderConfig(authStore.access_token));
    fetchRepairs();
    showDeleteDialog.value = false;
  } catch (error) {
    console.error('Error deleting repair:', error);
    errors.value = error.response?.data?.message || 'Error deleting repair';
  }
};

const confirmDelete = (id) => {
  selectedRepairId.value = id;
  showDeleteDialog.value = true;
};

onMounted(() => {
  fetchRepairs();
});
</script>

<style>
</style>
