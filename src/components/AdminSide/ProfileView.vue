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
            <input v-model="userProfile.email" type="email" placeholder="<Optional>" class="form-control" :disabled="!isEditing" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Address</span>
            <input v-model="userProfile.address" type="text" class="form-control" :disabled="!isEditing" />
          </div>
  
          <div v-if="!isEditing" @click="isEditing = true" class="buttons">
            <button class="btn btn-primary">Edit</button>
          </div>
          <div v-else class="buttons">
            <button @click="saveProfile" type="submit" class="btn btn-success">Save</button>
            <button @click="cancelEdit" type="button" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useAuthStore } from '../../stores/useAuthStore';
  
  export default {
    props: ['userId'],
    data() {
      return {
        errorList: [],
        userProfile: {
          first_name: '',
          last_name: '',
          phone_number: '',
          email: '',
          address: '',
        },
        originalProfile: {},
        isEditing: false,
      };
    },
    mounted() {
      this.fetchUserProfile();
    },
    methods: {
      fetchUserProfile() {
        const authStore = useAuthStore();
        axios.get(`http://localhost:8000/api/user/profile/${this.userId}`, {
          headers: {
            Authorization: `Bearer ${authStore.access_token}`,
          },
        })
        .then(response => {
          this.userProfile = response.data.data;
          this.originalProfile = { ...this.userProfile };
          this.isEditing = false;
        })
        .catch(error => {
          console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
        });
      },
      saveProfile() {
        const authStore = useAuthStore();
        axios.post(`http://localhost:8000/api/user/profile/${this.userId}`, this.userProfile, {
          headers: {
            Authorization: `Bearer ${authStore.access_token}`,
          },
        })
        .then(response => {
          this.userProfile = response.data.data;
          this.originalProfile = { ...this.userProfile };
          this.isEditing = false;
        })
        .catch(error => {
          this.errorList = error.response?.data?.errors || [];
          console.error('Error during profile save:', error.response ? error.response.data : error.message);
        });
      },
      cancelEdit() {
        this.userProfile = { ...this.originalProfile };
        this.isEditing = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  </style>
  