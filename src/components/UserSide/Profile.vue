<template>
  <div class="modal-overlay" v-if="isModalOpen">
    <div class="modal-content">
      <div class="modal-head">
        <h2 class="modal-title">User Profile</h2>
        <button class="close-btn" @click="closeModal"><i class='bx bx-x'></i></button>
      </div>

      <form @submit.prevent="updateProfile">
        <div class="input-group">
          <div class="form-field">
            <label for="firstName">Firstname</label>
            <input v-model="userProfile.first_name" type="text" id="firstName" placeholder="Firstname" required />
          </div>
          <div class="form-field">
            <label for="lastName">Lastname</label>
            <input v-model="userProfile.last_name" type="text" id="lastName" placeholder="Lastname" required />
          </div>
        </div>

        <div class="input-group">
          <div class="form-field">
            <label for="email">Email</label>
            <input v-model="userProfile.email" type="email" id="email" placeholder="Email" required disabled />
          </div>
          <div class="form-field">
            <label for="phone">Phone</label>
            <input v-model="userProfile.phone_number" @input="validatePhoneNumber" type="text" id="phone" placeholder="09XXXXXXXXX" required />
          </div>
        </div>

        <div class="input-group">
          <div class="form-field">
            <label for="address">Birhday</label>
            <input v-model="userProfile.birthday" type="text" id="birthday" placeholder="Street, City, State, ZIP Code" required />
          </div>
          <div class="form-field">
            <label for="address">Age</label>
            <input v-model="userProfile.age" type="text" id="age" placeholder="Street, City, State, ZIP Code" required disabled/>
          </div>
          <div class="form-field">
            <label for="address">Address</label>
            <input v-model="userProfile.address" type="text" id="address" placeholder="Street, City, State, ZIP Code" required />
          </div>
        </div>

        <div class="button">
          <button type="submit" class="btn btn-primary" :disabled="isProfileUnchanged">Update Profile</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import { defineProps, defineEmits } from 'vue';
import Swal from 'sweetalert2';

const userProfile = ref({
  first_name: '',
  last_name: '',
  birthday: '',
  age: '',
  email: '',
  phone_number: '',
  address: ''
});

const originalProfile = ref({});

const authStore = useAuthStore();
const token = authStore.access_token;

defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['closeModal']);

const closeModal = () => emit('closeModal');

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

const fetchUserProfile = async () => {
  try {
    const headers = getHeaderConfig(token);
    const response = await axios.get(`${BASE_URL}/user/profile`, headers);
    userProfile.value = response.data.user;

    originalProfile.value = { ...response.data.user };
  } catch (error) {
    showToast("error", "Error fetching user profile");
  }
};

const updateProfile = async () => {
  try {
    const headers = getHeaderConfig(token);
    await axios.put(`${BASE_URL}/user/profile`, userProfile.value, headers);
    showToast("success", "Updated Successfully");

    originalProfile.value = { ...userProfile.value };
  } catch (error) {
    showToast("error", "Error updating profile");
  }
};

const isProfileUnchanged = computed(() => {
  return JSON.stringify(userProfile.value) === JSON.stringify(originalProfile.value);
});

const validatePhoneNumber = () => {
  userProfile.value.phone_number = userProfile.value.phone_number
    .replace(/\D/g, '') 
    .slice(0, 11);
};

onMounted(fetchUserProfile);
</script>

  
<style scoped>
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
  max-width: 500px;

  .modal-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    i {
      font-size: 30px;
      font-weight: 700;
    }
  }
}

.input-group {
  display: flex;
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
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;

  .btn {
    border: 2px solid var(--light);
    padding: 5px 10px;
    border-radius: 5px;
    color: var(--light);
    background-color: var(--header);
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
  }
}
</style>