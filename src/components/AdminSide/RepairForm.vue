<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>{{ isEditing ? 'EDIT' : 'Add Repair' }}</h2>
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
          <input v-model="model.first_name" type="text" class="form-control" :disabled="isEditing" style="text-transform: capitalize;" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Last Name</span>
          <input v-model="model.last_name" type="text" class="form-control" :disabled="isEditing" style="text-transform: capitalize;" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Tel. No.</span>
          <input v-model="phoneNumber" @input="validatePhoneNumber" type="text" class="form-control" :disabled="isEditing" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Email</span>
          <input v-model="model.email" type="email" class="form-control" :disabled="isEditing" />
        </div>
        <div class="input-group mb-4">
          <span class="input-group-text">Address</span>
          <input v-model="model.address" type="text" class="form-control" :disabled="isEditing" style="text-transform: capitalize;" />
        </div>

        <!-- Product Information -->
        <div class="buttons">
          <h2>PRODUCT INFORMATION</h2>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Brand</span>
          <input v-model="productInfo.brand" type="text" class="form-control" style="text-transform: capitalize;" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Model</span>
          <input v-model="productInfo.model" type="text" class="form-control" style="text-transform: capitalize;" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Serial Number</span>
          <input
            v-model="productInfo.serial_number"
            @input="productInfo.serial_number = productInfo.serial_number.toUpperCase()"
            type="text"
            class="form-control"
          />
        </div>

        <div class="buttons">
          <h2>WARRANTY STATUS</h2>
        </div>
        <div class="custom-checkboxes">
          <div class="form-check">
            <input class="form-check-input" type="radio" id="warranty" value="warranty" v-model="productInfo.warranty_status" />
            <label class="form-check-label" for="warranty">Warranty</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="outOfWarranty" value="out_of_warranty" v-model="productInfo.warranty_status" />
            <label class="form-check-label" for="outOfWarranty">Out Of Warranty</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" id="chargeable" value="chargeable" v-model="productInfo.warranty_status" />
            <label class="form-check-label" for="chargeable">Chargeable</label>
          </div>
        </div>

        <div class="buttons">
          <h2></h2>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Purchase Date</span>
          <input v-model="productInfo.purchase_date" type="date" class="form-control"/>
        </div>

        <div class="buttons">
          <h2>Device Issue Description</h2>
        </div>
        <div class="input-group mb-4">
          <span class="input-group-text"></span>
          <textarea v-model="model.description" class="form-control" :disabled="isEditing"></textarea>
        </div>

        <div class="buttons">
          <h2>NOTE FROM THE ADMIN</h2>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Step by Step Repair Documentation</span>
          <textarea v-model="productInfo.documentation" class="form-control"></textarea>
        </div>

        <div class="buttons">
          <button @click="isEditing ? updateRepair() : saveRepair()" type="button" class="btn btn-primary">
            {{ isEditing ? 'Update' : 'Submit' }}
          </button>
          <router-link to="/repair-list" class="btn btn-secondary">Cancel</router-link>
          <button v-if="isEditing" @click="generateInvoice" type="button" class="btn btn-success">Generate Receipt</button>
        </div>
      </div>
    </div>
    <SuccessModal v-if="showSuccessModal" @close="showSuccessModal = false" />
  </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import SuccessModal from '../layouts/SuccessModal.vue';
import html2pdf from 'html2pdf.js';

export default {
  name: 'RepairForm',
  props: ['id'],
  components: {
    SuccessModal,
  },
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
        documentation: '',
        warranty_status: '',
      },
      isEditing: false,
      showSuccessModal: false,
      phoneNumber: '',
      minDate: new Date().toISOString().split('T')[0],
    };
  },
  watch: {
    phoneNumber(value) {
      this.model.phone_number = value;
    },
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
        const response = await axios.get(`${BASE_URL}/customer-details/${this.id}/with-product-info`, getHeaderConfig(authStore.access_token));
        const customerDetail = response.data;
        this.model = customerDetail || {};
        this.productInfo = customerDetail.product_infos[0] || {};
        this.phoneNumber = this.model.phone_number;
      } catch (error) {
        console.error('Error fetching repair details:', error);
        this.errorList = [error.response?.data?.message || error.message];
      }
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
    async saveRepair() {
      try {
        const authStore = useAuthStore();

        const repairData = { ...this.model, status: 'on-going' };
        const customerResponse = await axios.post(
          `${BASE_URL}/customer-details`,
          repairData,
          getHeaderConfig(authStore.access_token)
        );

        const hasProductInfo = Object.values(this.productInfo).some(field => field);
        if (hasProductInfo) {
          await axios.post(
            `${BASE_URL}/product-infos`,
            { ...this.productInfo, customer_detail_id: customerResponse.data.data.id },
            getHeaderConfig(authStore.access_token)
          );
        }

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
        if (this.productInfo.id) {
          await axios.put(`${BASE_URL}/product-infos/${this.productInfo.id}`, this.productInfo, getHeaderConfig(authStore.access_token));
        } else {
          await axios.post(`${BASE_URL}/product-infos`, { ...this.productInfo, customer_detail_id: this.id }, getHeaderConfig(authStore.access_token));
        }
        this.showSuccessModal = true;
        setTimeout(() => this.$router.push({ name: 'repair-list' }), 1500);
      } catch (error) {
        this.errorList = error.response?.data?.errors || [error.message];
      }
    },
    generateInvoice() {
      const invoiceContent = `
        <div style="font-family: 'Poppins'; padding: 20px;">
          <h1 style="margin-bottom: 20px; margin-top: 30px;">RECEIPT</h1>
          <h3>Customer Details</h3>
          <p>Name: ${this.model.first_name} ${this.model.last_name}</p>
          <p>Phone Number: ${this.model.phone_number}</p>
          <p>Email: ${this.model.email}</p>
          <p>Address: ${this.model.address}</p>

          <h3 style="margin-top: 30px;">Product Information</h3>
          <p>Brand: ${this.productInfo.brand}</p>
          <p>Model: ${this.productInfo.model}</p>
          <p>Serial Number: ${this.productInfo.serial_number}</p>
          <p>Purchase Date: ${this.productInfo.purchase_date}</p>

          <p>Detailed Customer Problem/Error: ${this.model.description}</p>

          <p style="margin-top: 30px;>"Total Cost:</p>

          <p style="margin-top: 30px;">Person Incharge:</p>
        </div>
      `;

      const element = document.createElement('div');
      element.innerHTML = invoiceContent;
      const fileName = `${this.model.last_name}.pdf`;

      html2pdf()
      .from(element)
      .save(fileName); 
    },
  },
};
</script>

<style lang="scss">
.form-check-input {
  width: 15px;
  height: 15px;
}
</style>
