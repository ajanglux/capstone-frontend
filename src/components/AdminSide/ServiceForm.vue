<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>{{ isEditing ? 'View Service' : 'Add Service' }}</h2>
      </div>
      <div class="card-body">
        <div class="input-group mb-3">
          <span class="input-group-text">Service:</span>
          <input v-model="model.service_title" type="text" class="form-control" :disabled="isEditing" />
        </div>

        <div class="input-group mb-4">
          <span class="input-group-text">Details</span>
          <textarea v-model="model.description" class="form-control" :disabled="isEditing"></textarea>
        </div>

        <div class="mb-4">
          <label>Current Image:</label>
          <div v-if="imagePreview">
            <img :src="imagePreview" alt="Service Image" class="img-thumbnail" style="max-width: 200px;" />
          </div>
          <div v-else>
            <p>No image available</p>
          </div>
        </div>

        <div class="input-group mb-4" v-if="!isEditing">
          <span class="input-group-text">Upload Image</span>
          <input type="file" @change="handleFileUpload" class="form-control" />
        </div>

        <div class="buttons" v-if="!isEditing">
          <button @click="isEditing ? updateService() : saveService()" type="button" class="btn">Submit</button>
          <router-link to="/service-list" class="btn">Cancel</router-link>
        </div>

        <div class="buttons">
          <router-link v-if="isEditing" to="/service-list" class="btn">Back</router-link>
        </div>
      </div>
    </div>

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
import { useToast } from 'vue-toastification'; 

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const isEditing = ref(!!route.params.id);
const model = ref({
  service_title: '',
  description: '',
  image_url: '',
});
const errorList = ref([]);
const showSuccessModal = ref(false);
const selectedFile = ref(null);
const imagePreview = ref('');

const fetchServiceDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/services/${route.params.id}`, getHeaderConfig(authStore.access_token));
    model.value = response.data.data;

    imagePreview.value = model.value.image_url ? model.value.image_url : '';
  } catch (error) {
    errorList.value.push(error.response?.data?.message || 'Error fetching service details');
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const saveService = async () => {
  errorList.value = [];
  
  if (!selectedFile.value) {
    errorList.value.push("Image upload is required.");
    toast.error("Failed to save. There are missing details.");
    return;
  }

  const formData = new FormData();
  formData.append('service_title', model.value.service_title);
  formData.append('description', model.value.description);
  formData.append('image', selectedFile.value);

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
    toast.error(error.response?.data?.message || 'Error saving service');
  }
};

const updateService = async () => {
  errorList.value = [];

  if (!selectedFile.value && !model.value.image_url) {
    errorList.value.push("Image upload is required.");
    toast.error("Failed to save. There are missing details.");
    return;
  }

  const formData = new FormData();
  formData.append('service_title', model.value.service_title);
  formData.append('description', model.value.description);
  if (selectedFile.value) {
    formData.append('image', selectedFile.value);
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
    toast.error(error.response?.data?.message || 'Error updating service');
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

<style lang="scss" scoped>
</style>
