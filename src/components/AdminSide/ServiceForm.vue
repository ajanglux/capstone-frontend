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
          <input v-model="model.service_title" type="text" class="form-control" :disabled="isEditing" />
        </div>

        <div class="input-group mb-4">
          <span class="input-group-text">Details</span>
          <textarea v-model="model.description" class="form-control" :disabled="isEditing"></textarea>
        </div>

        <!-- Image Preview -->
        <div class="mb-4">
          <label>Current Image:</label>
          <!-- Check if the image exists -->
          <div v-if="imagePreview">
            <img :src="imagePreview" alt="Service Image" class="img-thumbnail" style="max-width: 200px;" />
          </div>

          <!-- Display "No image available" if no image is set -->
          <div v-else>
            <p>No image available</p>
          </div>
        </div>

        <!-- Image Upload (disabled if editing) -->
        <div class="input-group mb-4" v-if="!isEditing">
          <span class="input-group-text">Upload Image</span>
          <input type="file" @change="handleFileUpload" class="form-control" />
        </div>

        <div class="buttons">
          <button @click="isEditing ? updateService() : saveService()" type="button" class="btn">Submit</button>
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
  image_url: '', // Existing image URL
});
const errorList = ref([]);
const showSuccessModal = ref(false);
const selectedFile = ref(null); // To hold the uploaded image file
const imagePreview = ref(''); // To preview the uploaded image

// Fetch service details if editing
const fetchServiceDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/services/${route.params.id}`, getHeaderConfig(authStore.access_token));
    model.value = response.data.data;

    // Ensure image preview uses the full URL returned from the backend
    imagePreview.value = model.value.image_url ? model.value.image_url : '';
  } catch (error) {
    errorList.value.push(error.response?.data?.message || 'Error fetching service details');
  }
};

// Handle file selection for image upload
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file); // Generate local preview URL
  }
};

// Save service (with image upload if any)
const saveService = async () => {
  const formData = new FormData();
  formData.append('service_title', model.value.service_title);
  formData.append('description', model.value.description);
  if (selectedFile.value) {
    formData.append('image', selectedFile.value); // Attach the selected image file
  }

  try {
    await axios.post(`${BASE_URL}/services`, formData, {
      headers: {
        ...getHeaderConfig(authStore.access_token).headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    showSuccessModal.value = true;
  } catch (error) {
    errorList.value.push(error.response?.data?.message || 'Error saving service');
  }
};

// Update service (with image upload if any)
const updateService = async () => {
  const formData = new FormData();
  formData.append('service_title', model.value.service_title);
  formData.append('description', model.value.description);
  if (selectedFile.value) {
    formData.append('image', selectedFile.value); // Attach the selected image file if updated
  }

  try {
    await axios.post(`${BASE_URL}/services/${route.params.id}`, formData, {
      headers: {
        ...getHeaderConfig(authStore.access_token).headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    showSuccessModal.value = true;
  } catch (error) {
    errorList.value.push(error.response?.data?.message || 'Error updating service');
  }
};

const handleSuccessClose = () => {
  showSuccessModal.value = false;
  router.push('/service-list');
};

onMounted(() => {
  if (isEditing.value) {
    fetchServiceDetails();
  }
});
</script>

<style scoped>
/* Add necessary styles */
</style>
