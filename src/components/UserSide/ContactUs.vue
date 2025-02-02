<template>
  <div class="modal-overlay" v-if="isModalOpen">
    <div class="modal-content">
      <div class="modal-head">
        <h2 class="modal-title">Enter Inquiries: {{ serviceTitle }}</h2>
        <button class="close-btn" @click="closeModal"><i class='bx bx-x'></i></button>
      </div>

      <form @submit.prevent="saveCustomerDetail">
        <div class="input-group">
          <div class="form-field">
            <textarea v-model="customerDetail.description" class="form-control" placeholder="" required></textarea>
          </div>
          <div class="button">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../stores/useAuthStore';
import { defineProps, defineEmits } from 'vue';
import Swal from 'sweetalert2'
import { useRoute } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';

const authStore = useAuthStore();
const userProfile = authStore.user;

const customerDetail = ref({
  user_id: authStore.user.id,
  description: '',
});

const route = useRoute();
const descriptionError = ref(false);

defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  },
  serviceTitle: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['closeModal']);

const closeModal = () => emit('closeModal');

onMounted(() => {
  if (route.query.service) {
    customerDetail.value.description = route.query.service;
  }
});

const showToast = (icon, title) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

const saveCustomerDetail = async () => {
  descriptionError.value = !customerDetail.value.description.trim();

  if (!userProfile.first_name || !userProfile.last_name || !userProfile.address || !userProfile.phone_number) {
    showToast("error", "Please complete your profile information (First Name, Last Name, Address, Phone Number) before submitting.");
    return;
  }

  try {
    const response = await axios.get(`${BASE_URL}/customer-details/check-inquiries`, getHeaderConfig(authStore.access_token));
    if (response.data && response.data.hasPendingInquiry) {
      showToast("error", "You already have an ongoing inquiry that is not completed. Please wait until it is resolved.");
      return;
    }
  } catch (error) {
    showToast("error", "An error occurred while checking existing inquiries.");
    return;
  }

  if (descriptionError.value) {
    showToast("error", "Description is required.");
    return;
  }

  try {
    await axios.post(`${BASE_URL}/customer-details`, customerDetail.value);
   showToast("success", "Details saved successfully");
    resetForm();
  } catch (error) {
    showToast("error", "An error occurred while saving customer details.");
  }
};

const resetForm = () => {
  customerDetail.value = {
    description: ''
  };
  descriptionError.value = false;
};
</script>

  
<style scoped>
.modal-title {
  color: black;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;

  .modal-head {
    display: flex;
    justify-content: space-between;

    i {
      font-size: 30px;
      font-weight: 700;
    }
  }
}

.input-group {
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;

  .form-field {
    width: 100%;
    
    label {
      font-size: 12px;
    }

    input {
      font-family: 'Poppins';
      width: 100%;
      padding: 10px;
      outline: none;
      border-radius: 5px;
      border: 1px solid var(--header);
    }
  }
}

.button {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;

  button {
    background-color: var(--main);
    color: white;
    padding: 10px 15px;
    border-radius: 10px;
  }

  button:hover {
    background-color: var(--main-hover);
  }
}
textarea {
  font-family: 'Poppins';
  height: 155px;
  width: 100%;
  resize: none;
  border-radius: 10px;
  outline: none;
  border: none;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  background-color: var(--light2);
  margin-top: 1pc;
}
input:hover, textarea:hover {
    background-color: var(--light2);
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>