<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>{{ isEditing ? 'Edit Service' : 'Add Service' }}</h2>
      </div>
      <div class="card-body">
        <ul v-if="errorList.length > 0" class="alert alert-warning">
          <li v-for="(error, index) in errorList" :key="index" class="mb-0 ms-3">
            <strong>{{ error }}</strong>
          </li>
        </ul>
        <div class="input-group mb-3">
          <span class="input-group-text">Service:</span>
          <input v-model="model.service_title" type="text" class="form-control" />
        </div>
        <div class="input-group mb-4">
          <span class="input-group-text">Details</span>
          <textarea v-model="model.description" class="form-control"></textarea>
        </div>
        <div class="buttons">
          <button @click="isEditing ? updateService() : saveService()" type="submit" class="btn">Submit</button>
          <router-link to="/service-list" class="btn">Cancel</router-link>
        </div>
      </div>
    </div>
  
    <!-- Success Modal -->
    <SuccessModal v-if="showSuccessModal" @close="handleSuccessClose" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import { useRoute, useRouter } from 'vue-router';
import SuccessModal from '../layouts/SuccessModal.vue';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const isEditing = ref(!!route.params.id);
const model = ref({
  service_title: '',
  description: '',
});
const errorList = ref([]);
const showSuccessModal = ref(false);

const fetchServiceDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/services/${route.params.id}`, getHeaderConfig(authStore.access_token));
    model.value = response.data.data;
  } catch (error) {
    errorList.value.push(error.response?.data?.message || 'Error fetching service details');
  }
};

const saveService = async () => {
  try {
    await axios.post(`${BASE_URL}/services`, model.value, getHeaderConfig(authStore.access_token));
    showSuccessModal.value = true;
  } catch (error) {
    errorList.value.push(error.response?.data?.message || 'Error saving service');
  }
};

const updateService = async () => {
  try {
    await axios.put(`${BASE_URL}/services/${route.params.id}`, model.value, getHeaderConfig(authStore.access_token));
    showSuccessModal.value = true;
  } catch (error) {
    errorList.value.push(error.response?.data?.message || 'Error updating service');
  }
};

const handleSuccessClose = () => {
  showSuccessModal.value = false;
  router.push('/service-list');
};

if (isEditing.value) {
  fetchServiceDetails();
}
</script>

<style scoped>
/* Add necessary styles */
</style>
