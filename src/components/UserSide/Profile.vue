<template>
    <div class="profile-container mt-5">
      <h1 class="profile-title">User Profile</h1>
      
      <form class="profile-form" @submit.prevent="updateProfile">
        <div class="input-group">
          <div class="form-field">
            <label for="firstName">Firstname</label>
            <input v-model="userProfile.first_name" type="text" id="firstName" placeholder="Enter Firstname" required />
          </div>
          <div class="form-field">
            <label for="lastName">Last name</label>
            <input v-model="userProfile.last_name" type="text" id="lastName" placeholder="Enter Lastname" required />
          </div>
        </div>
  
        <div class="input-group">
          <div class="form-field">
            <label for="email">Email</label>
            <input v-model="userProfile.email" type="email" id="email" placeholder="Enter Email" required />
          </div>
          <div class="form-field">
            <label for="phone_number">Phone number</label>
            <input v-model="userProfile.phone_number" type="text" id="phone_number" placeholder="+63XXXXXXXXXX" required @input="validatePhoneNumber" />
          </div>
        </div>
  
        <div class="input-group">
          <div class="form-field">
            <label for="address">Address</label>
            <input v-model="userProfile.address" type="text" id="address" placeholder="Barangay / Street / City" required />
          </div>
        </div>
  
        <div class="button-container">
          <button type="submit" class="btn-submit" :disabled="isUpdating">Update Profile</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { BASE_URL } from '../../helpers/baseUrl';
  // import { ElMessage } from 'element-plus';
  import { useToast } from 'vue-toastification'; 
  import { useRoute } from 'vue-router';
  import { getHeaderConfig } from '../../helpers/headerConfig';
  import { useAuthStore } from '../../stores/useAuthStore';
  
  const userProfile = ref({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    address: ''
  });
  
  const authStore = useAuthStore();
  const token = authStore.access_token;
  
  const isUpdating = ref(false);
  
  const fetchUserProfile = async () => {
    try {
        const headers = getHeaderConfig(token);
        const response = await axios.get(`${BASE_URL}/user/profile`, headers);
          userProfile.value = response.data.user;
    } catch (error) {
      // ElMessage.error('Failed to fetch user data.');
    }
  };
  
  const updateProfile = async () => {
    isUpdating.value = true;
    try {
      const headers = getHeaderConfig(token);
      const response = await axios.put(`${BASE_URL}/user/profile`, userProfile.value, headers);
      console.log("update data:", response);
      // ElMessage.success('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile:", error.response ? error.response.data : error.message);
      // ElMessage.error(error.response?.data?.message || 'Error updating profile.');
    } finally {
      isUpdating.value = false;
    }
  };
  
  
  const validatePhoneNumber = (event) => {
    userProfile.value.phone_number = event.target.value.replace(/\D/g, '').slice(0, 11);
  };
  
  onMounted(
      fetchUserProfile
  );
  </script>
  
  <style lang="scss" scoped>
  .profile-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 30px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .profile-title {
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
  
  .profile-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .input-group {
    display: flex;
    gap: 20px;
  }
  
  .form-field {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  label {
    font-size: 16px;
    font-weight: 600;
    color: #555;
    margin-bottom: 5px;
  }
  
  input {
    font-size: 16px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: all 0.3s ease;
  }
  
  input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  .button-container {
    text-align: center;
  }
  
  .btn-submit {
    background-color: #007bff;
    color: #fff;
    font-size: 18px;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .btn-submit:hover {
    background-color: #0056b3;
  }
  
  @media (max-width: 768px) {
    .input-group {
      flex-direction: column;
    }
  }
  </style>
  