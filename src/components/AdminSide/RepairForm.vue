<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>{{ isEditing ? 'Edit Repair' : 'Add Repair' }}</h2>
      </div>
      <div class="card-body">
        <ul v-if="errorList.length > 0" class="alert alert-warning">
          <li v-for="(error, index) in errorList" :key="index" class="mb-0 ms-3">
            <strong>{{ error }}</strong>
          </li>
        </ul>
        <!-- Customer Details -->
        <div class="input-group mb-3">
          <span class="input-group-text">First Name</span>
          <input v-model="model.first_name" type="text" class="form-control" :disabled="isEditing" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Last Name</span>
          <input v-model="model.last_name" type="text" class="form-control" :disabled="isEditing" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Tel. No.</span>
          <input v-model="model.phone_number" type="text" class="form-control" :disabled="isEditing" />
        </div>
        <div>
          <span class="input-group-text">Email</span>
          <input v-model="model.email" type="text" class="form-control" :disabled="isEditing" />
        </div>
        <div class="input-group mb-4">
          <span class="input-group-text">Address</span>
          <input v-model="model.address" type="text" class="form-control" :disabled="isEditing" />
        </div>

        <!-- Product Information -->
        <div class="buttons">
          <h2>Product Information</h2>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Brand</span>
          <input v-model="productInfo.brand" type="text" class="form-control" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Model</span>
          <input v-model="productInfo.model" type="text" class="form-control" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Serial Number</span>
          <input v-model="productInfo.serial_number" type="text" class="form-control" />
        </div>
        <div>
          <span class="input-group-text">Purchase Date</span>
          <input v-model="productInfo.purchase_date" type="date" class="form-control" />
        </div>

        <!-- Submit and Cancel Buttons -->
        <div class="buttons">
          <button @click="isEditing ? updateRepair() : saveRepair()" type="button" class="btn">Submit</button>
          <router-link to="/repair-list" class="btn">Cancel</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';

export default {
  name: 'RepairForm',
  props: ['id'],
  data() {
    return {
      errorList: [],
      model: {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        address: ''
      },
      productInfo: {
        brand: '',
        model: '',
        serial_number: '',
        purchase_date: ''
      },
      isEditing: false,
    };
  },
  mounted() {
    if (this.id) {
      this.isEditing = true;
      this.getRepairDetails();
    }
  },
  methods: {
    async getRepairDetails() {
      try {
        const authStore = useAuthStore();
        const response = await axios.get(`${BASE_URL}/customer-details/${this.id}`, getHeaderConfig(authStore.access_token));
        this.model = response.data.data.customer;
        this.productInfo = response.data.data.product;
      } catch (error) {
        console.error('Error fetching repair details:', error);
      }
    },
    async saveRepair() {
      try {
        const authStore = useAuthStore();
        const payload = {
          customer: this.model,
          product: this.productInfo
        };
        await axios.post(`${BASE_URL}/customer-details`, payload, getHeaderConfig(authStore.access_token));
        alert('Repair saved successfully!');
        this.$router.push({ name: 'repair-list' });
      } catch (error) {
        this.errorList = error.response.data.errors || [error.message];
      }
    },
    async updateRepair() {
      try {
        const authStore = useAuthStore();
        const payload = {
          customer: this.model,
          product: this.productInfo
        };
        await axios.put(`${BASE_URL}/customer-details/${this.id}`, payload, getHeaderConfig(authStore.access_token));
        alert('Repair updated successfully!');
        this.$router.push({ name: 'repair-list' });
      } catch (error) {
        this.errorList = error.response.data.errors || [error.message];
      }
    }
  }
};
</script>
