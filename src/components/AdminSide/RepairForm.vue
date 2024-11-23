<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>{{ isEditing ? 'EDIT' : isViewing ? 'VIEW' : 'Add Repair' }}</h2>
      </div>
      <div class="card-body">

        <!-- Customer Details -->
        <div class="whole">
          <div class="left">
            <div class="buttons">
              <h2>Customer Details</h2>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">First Name</span>
              <input v-model="model.first_name" type="text" class="form-control" :disabled="isEditing || isViewing" style="text-transform: capitalize;" />
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
            <div class="input-group mb-3">
              <span class="input-group-text">Brand</span>
              <input v-model="productInfo.brand" type="text" class="form-control" :disabled="isViewing" style="text-transform: capitalize;" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Model</span>
              <input v-model="productInfo.model" type="text" class="form-control" :disabled="isViewing" style="text-transform: capitalize;" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Serial Number</span>
              <input
                v-model="productInfo.serial_number"
                @input="productInfo.serial_number = productInfo.serial_number.toUpperCase()"
                type="text"
                class="form-control"
                :disabled="isViewing"
              />
            </div>
          </div>
        </div>

        <div class="whole">
          <div class="left">
            <div class="buttons">
              <h2>WARRANTY STATUS</h2>
            </div>
            <div class="custom-checkboxes">
              <div class="form-check">
                <input class="form-check-input" type="radio" id="warranty" value="warranty" v-model="productInfo.warranty_status" :disabled="isViewing" />
                <label class="form-check-label" for="warranty">Warranty</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="outOfWarranty" value="out_of_warranty" v-model="productInfo.warranty_status" :disabled="isViewing" />
                <label class="form-check-label" for="outOfWarranty">Out Of Warranty</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="chargeable" value="chargeable" v-model="productInfo.warranty_status" :disabled="isViewing" />
                <label class="form-check-label" for="chargeable">Chargeable</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Purchase Date</span>
              <input v-model="productInfo.purchase_date" type="date" class="form-control" :disabled="isViewing"/>
            </div>
          </div>

          <div class="right">
            <div class="buttons">
              <h2>Device Issue Description</h2>
            </div>
            <div class="input-group mb-4">
              <span class="input-group-text"></span>
              <textarea v-model="model.description" class="form-control" :disabled="isViewing"></textarea>
            </div>
          </div>
        </div>

        <div class="buttons">
          <h2>NOTE FROM THE ADMIN</h2>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Step by Step Repair Documentation</span>
          <textarea v-model="productInfo.documentation" class="form-control" :disabled="isViewing"></textarea>
        </div>

        <div class="buttons">
          <button v-if="isEditing" @click="updateRepair()" type="button" class="btn btn-primary">Update</button>
          <button v-else-if="!isViewing" @click="saveRepair()" type="button" class="btn btn-primary">{{ isEditing ? 'Update' : 'Submit' }}</button>
          <router-link to="/repair-list" class="btn btn-secondary">Cancel</router-link>
          <button v-if="isEditing" @click="generateInvoice" type="button" class="btn btn-success">Generate Receipt</button>
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
import html2pdf from 'html2pdf.js';

export default {
  name: 'RepairForm',
  props: ['id', 'view'],
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
      isViewing: this.view,
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
      this.isEditing = !this.isViewing;
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
        this.productInfo = customerDetail.product_infos[0] || {};
        this.phoneNumber = this.model.phone_number;
      } catch (error) {
        const toast = this.toast();
        toast.error('Failed to load repair details. Please try again.', { timeout: 3000 });
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

        const isProductInfoComplete = this.productInfo.brand && this.productInfo.model && this.productInfo.serial_number && this.productInfo.purchase_date;

        if (!isProductInfoComplete) {
          const toast = this.toast();
          toast.error('Failed to save. Incomplete details.', { timeout: 3000 });
          return;
        }

        const repairData = { ...this.model, status: 'On-Going' };

        const customerResponse = await axios.post(
          `${BASE_URL}/customer-details`,
          repairData,
          getHeaderConfig(authStore.access_token)
        );

        if (Object.values(this.productInfo).some(field => field)) {
          await axios.post(
            `${BASE_URL}/product-infos`,
            { ...this.productInfo, customer_detail_id: customerResponse.data.data.id },
            getHeaderConfig(authStore.access_token)
          );
        }
        const toast = this.toast();
        toast.success("Details save successful", { timeout: 3000 })
        setTimeout(() => this.$router.push({ name: 'repair-list' }), 1500);
      } catch (error) {
        const toast = this.toast();
        toast.error('Failed to save. There are missing details or an error occurred.', { timeout: 3000 });
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
        const toast = this.toast();
        toast.success("Details update successful", { timeout: 3000 })
        setTimeout(() => this.$router.push({ name: 'repair-list' }), 1500);
      } catch (error) {
        const toast = this.toast();
        toast.error('Failed to update. There are missing details.', { timeout: 3000 });
      }
    },
    generateInvoice() {
      const warrantyStatusCheckboxes = {
        'warranty': this.productInfo.warranty_status === 'warranty' ? '☑ Warranty' : '☐ Warranty',
        'out_of_warranty': this.productInfo.warranty_status === 'out_of_warranty' ? '☑ Out Of Warranty' : '☐ Out Of Warranty',
        'chargeable': this.productInfo.warranty_status === 'chargeable' ? '☑ Chargeable' : '☐ Chargeable'
      };

      const invoiceContent = `
        <div style="font-family: 'Poppins'; padding: 20px;">
          <h1 style="margin-bottom: 20px; margin-top: 30px;">RECEIPT</h1>
          
          <div style="display: flex; justify-content: space-between; width: 100%; max-width: 600px; margin: auto;">
            <div style="flex: 1; margin-right: 10px; margin-bottom: 20px;">
              <h3 style="margin-bottom: 10px;">Customer Details</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${this.model.first_name} ${this.model.last_name}</p>
              <p style="margin: 5px 0;"><strong>Phone Number:</strong> ${this.model.phone_number}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${this.model.email}</p>
              <p style="margin: 5px 0;"><strong>Address:</strong> ${this.model.address}</p>
            </div>

            <div style="flex: 1; margin-bottom: 20px;">
              <h3 style="margin-bottom: 10px;">Product Information</h3>
              <p style="margin: 5px 0;"><strong>Brand:</strong> ${this.productInfo.brand}</p>
              <p style="margin: 5px 0;"><strong>Model:</strong> ${this.productInfo.model}</p>
              <p style="margin: 5px 0;"><strong>Serial Number:</strong> ${this.productInfo.serial_number}</p>
              <p style="margin: 5px 0;"><strong>Purchase Date:</strong> ${this.productInfo.purchase_date}</p>
            </div>
          </div>

          <h3 style="margin-top: 30px; margin-bottom: 10px;">Warranty Status</h3>
          <p style="margin: 5px 0;">${warrantyStatusCheckboxes.warranty}</p>
          <p style="margin: 5px 0;">${warrantyStatusCheckboxes.out_of_warranty}</p>
          <p style="margin: 5px 0;">${warrantyStatusCheckboxes.chargeable}</p>

          <h3 style="margin-top: 30px; margin-bottom: 10px;">CHECKLIST</h3>
          <p style="margin: 5px 0;">☐ Warranty</p>
          <p style="margin: 5px 0;">☐ Warranty</p>
          <p style="margin: 5px 0;">☐ Warranty</p>
          <p style="margin: 5px 0;">☐ Warranty</p>

          <p style="margin-top: 30px;"><strong>Detailed Customer Problem/Error:</strong> ${this.model.description}</p>
        </div>
      `;

      const element = document.createElement('div');
      element.innerHTML = invoiceContent;
      const fileName = `${this.model.last_name}_${this.model.first_name}.pdf`;

      html2pdf()
      .from(element)
      .save(fileName); 
    },
  },
};
</script>

<style lang="scss">
h2 {
  text-transform: uppercase;
}
  
.form-check-input {
  width: 15px;
  height: 15px;
}

.card-body {
  .whole {
    display: flex;
    gap: 20px;

    .left {
      width: 100%;
    }

    .right {
      width: 100%;
    }
  }

  .custom-checkboxes {
    display: flex;
    gap: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
    
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
}
</style>
