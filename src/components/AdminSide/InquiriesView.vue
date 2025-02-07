<template>
  <div class="content">
    <div class="container">
      <div class="card-header" v-if="userRole !== 0">
        <h2>{{ isEditing ? 'Client Details' : 'Add Repair' }}</h2>
        <h2>Service: {{ model.description }}</h2>
      </div>
      <div class="card-header" v-else>
        <h2>Service: {{ model.description }}</h2>
      </div>
      <div class="card-body">

        <!-- Customer Details -->
        <div class="input-group mb-3" v-if="userRole !== 0">
          <span class="input-group-text">First Name</span>
          <input v-model="model.first_name" type="text" class="form-control" :disabled="isEditing" style="text-transform: capitalize;"/>
        </div>
        <div class="input-group mb-3" v-if="userRole !== 0">
          <span class="input-group-text">Last Name</span>
          <input v-model="model.last_name" type="text" class="form-control" :disabled="isEditing" style="text-transform: capitalize;"/>
        </div>
        <div class="input-group mb-3" v-if="userRole !== 0">
          <span class="input-group-text">Tel. No.</span>
          <input v-model="phoneNumber" @input="validatePhoneNumber" type="text" class="form-control" :disabled="isEditing" />
        </div>
        <div class="input-group mb-3" v-if="userRole !== 0">
          <span class="input-group-text">Email</span>
          <input v-model="model.email" type="email" class="form-control" :disabled="isEditing" />
        </div>
        <div class="input-group mb-4" v-if="userRole !== 0">
          <span class="input-group-text">Address</span>
          <input v-model="model.address" type="text" class="form-control" :disabled="isEditing" style="text-transform: capitalize;"/>
        </div>
        <div class="input-group mb-4">
          <span class="input-group-text">Inquiry:</span>
          <textarea v-model="productInfo.description_of_repair" class="form-control" :disabled="isEditing"></textarea>
        </div>

        <!-- <div class="input-group mb-4">
          <span class="input-group-text">Address ("optional address")</span>
          <input v-model="productInfo.address" type="text" class="form-control" :disabled="isEditing" style="text-transform: capitalize;"/>
        </div> -->

        <div class="buttons">
          <button v-if="isEditing" @click="goBack" class="btn">Back</button>
          <button v-if="isEditing && userRole !== 0" @click="setApprove" class="btn">Accept</button>
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
import { useToast } from 'vue-toastification';

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
        address: '',
        description: '',
      },
      productInfo: {
        brand: '',
        model: '',
        serial_number: '',
        purchase_date: '',
        description_of_repair: '',
        address: '',
      },
      isEditing: false,
      phoneNumber: '',
      minDate: new Date().toISOString().split('T')[0],
    };
  },
  mounted() {
    const userData = useAuthStore();
    this.userRole = userData.user ? userData.user.role : null; 

    if (this.id) {
      this.isEditing = true;
      this.getRepairDetails();
    }
  },
  methods: {
    toast() {
      return useToast();
    },
    async getRepairDetails() {
      try {
        const authStore = useAuthStore();
        const response = await axios.get(`${BASE_URL}/customer-details/${this.id}/with-product-info`, getHeaderConfig(authStore.access_token));
        const customerDetail = response.data;
        this.model = customerDetail || {};
        this.model.first_name = customerDetail.user.first_name;
        this.model.last_name = customerDetail.user.last_name;
        this.model.address = customerDetail.user.address;
        this.model.email = customerDetail.user.email;
        this.model = customerDetail || {};
        this.model = customerDetail || {};
        this.productInfo = customerDetail.product_infos[0] || {};
        this.phoneNumber = this.model.user.phone_number;
      } catch (error) {
        console.error('Error fetching repair details:', error);
        this.errorList = [error.response?.data?.message || error.message];
      }
    },
    async setApprove() {
      try {
        const authStore = useAuthStore();
        await axios.put(`${BASE_URL}/customer-details/${this.id}`, { status: 'On-Going' }, getHeaderConfig(authStore.access_token));
        const toast = this.toast();
        toast.success("Status updated successful", { timeout: 3000 })
        setTimeout(() => this.$router.push({ name: 'inquiries' }), 1500);
      } catch (error) {
        this.errorList = error.response?.data?.errors || [error.message];
      }
    },
    goBack() {
      this.$router.push({ name: 'inquiries' });
    },
    validatePhoneNumber(event) {
      const input = event.target;
      const value = input.value.replace(/\D/g, '');
      if (value.length > 11) {
        input.value = value.slice(0, 11);
      } else {
        input.value = value;
      }
      this.phoneNumber = input.value;
    },
  },
};
</script>
