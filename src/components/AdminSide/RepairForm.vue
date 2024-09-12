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
        <div class="input-group mb-3">
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
          <input v-model="productInfo.brand" type="text" class="form-control" :disabled="isEditing" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Model</span>
          <input v-model="productInfo.model" type="text" class="form-control" :disabled="isEditing" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Serial Number</span>
          <input v-model="productInfo.serial_number" type="text" class="form-control" :disabled="isEditing" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Purchase Date</span>
          <input v-model="productInfo.purchase_date" type="date" class="form-control" :disabled="isEditing" />
        </div>

        <!-- Submit and Cancel Buttons -->
        <div class="buttons">
          <button @click="isEditing ? updateRepair() : saveRepair()" type="button" class="btn btn-primary">
            {{ isEditing ? 'Update' : 'Submit' }}
          </button>
          <router-link to="/repair-list" class="btn btn-secondary">Cancel</router-link>
        </div>
      </div>
    </div>
    <SuccessModal
      v-if="showSuccessModal"
      @close="showSuccessModal = false"
    />
  </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import SuccessModal from '../layouts/SuccessModal.vue';

export default {
  name: 'RepairForm',
  props: ['id'],
  components: {
    SuccessModal
  },
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
      showSuccessModal: false
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
        const [customerResponse, productResponse] = await Promise.all([
          axios.get(`${BASE_URL}/customer-details/${this.id}`, getHeaderConfig(authStore.access_token)),
          axios.get(`${BASE_URL}/product-infos/${this.id}`, getHeaderConfig(authStore.access_token))
        ]);

        this.model = customerResponse.data.data || {};
        this.productInfo = productResponse.data || {};
      } catch (error) {
        console.error('Error fetching repair details:', error);
        this.errorList = [error.response?.data?.message || error.message];
      }
    },
    async saveRepair() {
      try {
        const authStore = useAuthStore();
        
        const repairData = { ...this.model, status: 'on-going' };
        
        const customerResponse = await axios.post(`${BASE_URL}/customer-details`, repairData, getHeaderConfig(authStore.access_token));
        await axios.post(`${BASE_URL}/product-infos`, { ...this.productInfo, customer_detail_id: customerResponse.data.data.id }, getHeaderConfig(authStore.access_token));
        
        this.showSuccessModal = true;
        setTimeout(() => this.$router.push({ name: 'repair-list' }), 1500);
      } catch (error) {
        this.errorList = error.response?.data?.errors || [error.message];
      }
    },
    async updateRepair() {
      try {
        const authStore = useAuthStore();
        await axios.put(`${BASE_URL}/customer-details/${this.id}`, this.model, getHeaderConfig(authStore.access_token));
        await axios.put(`${BASE_URL}/product-infos/${this.id}`, this.productInfo, getHeaderConfig(authStore.access_token));
        
        this.showSuccessModal = true;
        setTimeout(() => this.$router.push({ name: 'repair-list' }), 1500);
      } catch (error) {
        this.errorList = error.response?.data?.errors || [error.message];
      }
    }
  }
};
</script>

<style>
</style>
