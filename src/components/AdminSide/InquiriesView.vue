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
        <div class="whole">
          <div class="left" v-if="userRole !== 0">
            <div class="buttons">
              <h2>Customer Details</h2>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">First Name</span>
              <input v-model="model.first_name" type="text" class="form-control" :disabled="isEditing" style="text-transform: capitalize;" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Last Name</span>
              <input v-model="model.last_name" type="text" class="form-control" :disabled="isEditing || isViewing" style="text-transform: capitalize;" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Tel. No.</span>
              <input v-model="phoneNumber" @input="validatePhoneNumber" type="text" class="form-control" :disabled="isEditing || isViewing" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Email</span>
              <input v-model="model.email" type="email" class="form-control" :disabled="isEditing || isViewing" />
            </div>
            <div class="input-group mb-4">
              <span class="input-group-text">Address</span>
              <input v-model="model.address" type="text" class="form-control" :disabled="isEditing || isViewing" style="text-transform: capitalize;" />
            </div>
          </div>

          <!-- Product Information -->
          <div class="right">
            <div class="buttons">
              <h2>PRODUCT INFORMATION</h2>
            </div>
            <div>
              <span class="input-group-text">Device Type: </span>
              <select v-model="productInfo.device_type" disabled>
                  <option value="Laptop">Laptop</option>
                  <option value="Desktop">Desktop</option>
              </select>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Brand</span>
              <input v-model="productInfo.brand" type="text" class="form-control" :disabled="isEditing" style="text-transform: capitalize;" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Model</span>
              <input v-model="productInfo.model" type="text" class="form-control" :disabled="isEditing" style="text-transform: capitalize;" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Serial Number</span>
              <input
                v-model="productInfo.serial_number"
                @input="productInfo.serial_number = productInfo.serial_number.toUpperCase()"
                type="text"
                class="form-control"
                :disabled="isEditing"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Purchase Date</span>
              <input v-model="productInfo.purchase_date" type="date" class="form-control" :disabled="isEditing"/>
            </div>

          </div>
        </div>

        <div class="whole">
          <div class="left">
          </div>
        </div>

        <div class="buttons">
          <h2>Service: {{ model.description }}</h2>
        </div>
        <div><h3>Other Description</h3></div>
        <div class="input-group mb-4">
          <span class="input-group-text"></span>
          <textarea v-model="productInfo.description_of_repair" class="form-control" :disabled="isEditing"></textarea>
        </div>

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
        device_type: '',
        brand: '',
        model: '',
        serial_number: '',
        purchase_date: '',
        documentation: '',
        warranty_status: '',
        description_of_repair: '',
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
    handleQueryParams() {
      const queryParams = this.$route.query;
      if (queryParams.first_name) this.model.first_name = queryParams.first_name;
      if (queryParams.last_name) this.model.last_name = queryParams.last_name;
      if (queryParams.phone_number) this.phoneNumber = queryParams.phone_number;
      if (queryParams.email) this.model.email = queryParams.email;
      if (queryParams.address) this.model.address = queryParams.address;
    },
    async getRepairDetails() {
      try {
        const authStore = useAuthStore();
        const response = await axios.get(`${BASE_URL}/customer-details/${this.id}/with-product-info`, getHeaderConfig(authStore.access_token));
        const customerDetail = response.data;
        console.log(customerDetail.product_infos[0])
        this.model = customerDetail || {};
        this.model.first_name = customerDetail.user.first_name;
        this.model.last_name = customerDetail.user.last_name;
        this.model.address = customerDetail.user.address;
        this.model.email = customerDetail.user.email;
        this.model.user_id = customerDetail.user.id;
        this.productInfo = customerDetail.product_infos[0] || {};
        this.phoneNumber = this.model.user.phone_number;
      } catch (error) {
        const toast = this.toast();
        toast.error('Failed to load repair details. Please try again.', { timeout: 3000 });
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

<style lang="scss" scoped>
.whole-checklist {
  display: flex;
  gap: 30px; 

  .checklist {
    width: 100%;
  }

  .checklist:nth-child(2),
  .checklist:nth-child(3) {
    padding-top: 57px;
  }
}
.checklist {
  margin: 0;
  .mb3 {

    input {
      width: 15px;
      height: 15px;
      margin-left: 40px;
      margin-top: 10px;
    }
  }
}

.custom-checkboxes {
  display: flex;
  gap: 20px;
  margin-top: 6px;
  margin-bottom: 7px;
  
  .form-check {
    display: inline-flex;
    gap: 10px;

    .form-check-label {
      width: auto;
      left: 0;
    }
    .form-check-input {
      height: 20px;
      width: 20px;
    }
  }
}

.card-body select {
  font-family: "Poppins";
  width: 110px;
  height: 30px;
  padding-left: 5px;
  outline: none;
  border: 1px solid var(--header);
  border-radius: 5px;
  margin-top: 10px;
  margin-left: 5px;
}
</style>
