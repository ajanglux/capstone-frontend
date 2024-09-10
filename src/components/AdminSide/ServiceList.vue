<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>LIST OF SERVICES</h2>
        <router-link class="button" to="/service-form">
          <span class="text"> <i class='bx bxs-plus-square'></i> ADD SERVICE</span>
        </router-link>
      </div>
      <div class="table-body">
        <div v-if="errors" class="alert alert-danger">
          <strong>{{ errors }}</strong>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Number</th>
              <th>Date Created</th>
              <th>Service</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(service, index) in services" :key="service.id">
              <td>{{ index + 1 }}</td>
              <td>{{ formatDate(service.created_at) }}</td>
              <td>{{ service.service_title }}</td>
              <td>{{ service.description }}</td>
              <td class="actions">
                <router-link :to="{ name: 'ServiceForm', params: { id: service.id } }" class="btn btn-success btn-sm me-1">
                  View
                </router-link>
                <button class="btn btn-danger btn-sm me-1" @click="confirmDelete(service.id)">Delete</button>
              </td>
            </tr>
            <tr v-if="services.length === 0">
              <td colspan="5"><strong>No Service found.</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ConfirmationDialog
      :show="showDeleteDialog"
      @close="showDeleteDialog = false"
      @confirm="deleteService(selectedServiceId)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import ConfirmationDialog from '../layouts/ConfirmationDialog.vue'; // Adjust path as needed

const authStore = useAuthStore();
const services = ref([]); // Initialize as an array
const errors = ref(null);
const showDeleteDialog = ref(false);
const selectedServiceId = ref(null);

const fetchServices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/services`, getHeaderConfig(authStore.access_token));
    services.value = response.data.data; // Ensure accessing data correctly
  } catch (error) {
    console.error('Error fetching services:', error); // Add logging for debugging
    errors.value = error.response?.data?.message || 'Error fetching services';
  }
};

const deleteService = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/services/${id}`, getHeaderConfig(authStore.access_token));
    fetchServices(); // Refresh the service list
    showDeleteDialog.value = false; // Close dialog after deletion
  } catch (error) {
    console.error('Error deleting service:', error); // Add logging for debugging
    errors.value = error.response?.data?.message || 'Error deleting service';
  }
};

const confirmDelete = (id) => {
  selectedServiceId.value = id;
  showDeleteDialog.value = true;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

onMounted(() => {
  fetchServices();
});
</script>
