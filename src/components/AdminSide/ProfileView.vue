<template>
    <div class="content">
      <div class="container">
        <div class="card-header">
          <h2>{{ isEditing ? 'Edit User Profile' : 'View User Profile' }}</h2>
        </div>
        <div class="card-body">
          <ul v-if="errorList.length > 0" class="alert alert-warning">
            <li v-for="(error, index) in errorList" :key="index" class="mb-0 ms-3">
              <strong>{{ error[0] }}</strong>
            </li>
          </ul>
  
          <div class="input-row">
            <div class="input-group mb-3">
              <span class="input-group-text">First Name</span>
              <input v-model="userProfile.first_name" type="text" class="form-control" :disabled="!isEditing" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Last Name</span>
              <input v-model="userProfile.last_name" type="text" class="form-control" :disabled="!isEditing" />
            </div>
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Phone Number</span>
            <input v-model="userProfile.phone_number" type="text" class="form-control" :disabled="!isEditing" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Email</span>
            <input v-model="userProfile.email" type="email" placeholder="Optional" class="form-control" :disabled="!isEditing" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Address</span>
            <input v-model="userProfile.address" type="text" class="form-control" :disabled="!isEditing" />
          </div>
  
          <div v-if="!isEditing" class="buttons">
            <button @click="isEditing = true" class="btn btn-primary">Edit</button>
          </div>
          <div v-else class="buttons">
            <button @click="saveProfile" type="button" class="btn btn-success">Save</button>
            <button @click="cancelEdit" type="button" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useAuthStore } from '../../stores/useAuthStore'
  import { useRoute } from 'vue-router'
  
  const authStore = useAuthStore()
  const route = useRoute()
  
  const userProfile = ref({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    address: '',
  })
  const originalProfile = ref({})
  const isEditing = ref(false)
  const errorList = ref([])
  
  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/profile/${route.params.userId}`, {
        headers: {
          Authorization: `Bearer ${authStore.access_token}`,
        },
      })
      userProfile.value = response.data.data
      originalProfile.value = { ...userProfile.value }
      isEditing.value = false
    } catch (error) {
      console.error('Error fetching user profile:', error.response ? error.response.data : error.message)
    }
  }
  
  // Save the updated profile
  const saveProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/user/profile/${route.params.userId}`, userProfile.value, {
        headers: {
          Authorization: `Bearer ${authStore.access_token}`,
        },
      })
      userProfile.value = response.data.data
      originalProfile.value = { ...userProfile.value }
      isEditing.value = false
    } catch (error) {
      errorList.value = error.response?.data?.errors || []
      console.error('Error during profile save:', error.response ? error.response.data : error.message)
    }
  }
  
  // Cancel edit mode
  const cancelEdit = () => {
    userProfile.value = { ...originalProfile.value }
    isEditing.value = false
  }
  
  onMounted(() => {
    fetchUserProfile()
  })
  </script>
  
  <style scoped>
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  </style>
  