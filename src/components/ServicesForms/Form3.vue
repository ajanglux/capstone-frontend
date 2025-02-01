<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>{{ isEditing ? 'EDIT' : isViewing ? 'VIEW' : 'Add Repair' }}</h2>
      </div>
      <div class="card-body">

        <!-- details in the form if the networking, and CCTV installation -->

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
        </div>

        <div class="buttons">
          <button v-if="isEditing" @click="updateRepair()" type="button" class="btn btn-primary">Update</button>
          <button v-else-if="!isViewing" @click="saveRepair()" type="button" class="btn btn-primary">{{ isEditing ? 'Update' : 'Submit' }}</button>
          <router-link to="/home" class="btn btn-secondary">Cancel</router-link>
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
  props: {
    id: {
      type: Number,
      default: null,
    },
    view: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      errorList: [],
      model: {
        user_id: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        address: '',
      },
      productInfo: {
        brand: '',
        model: '',
        serial_number: '',
        purchase_date: '',
        documentation: '',
        warranty_status: '',
        ac_adapter: '',
        vga_cable: '',
        dvi_cable: '',
        display_cable: '',
        bag_pn: '',
        hdd: '',
        ram_brand: '',
        ram_size_gb: '',
        power_cord_qty: '',
      },
      isEditing: false,
      phoneNumber: '',
      minDate: new Date().toISOString().split('T')[0],
    };
  },
  computed: {
    isViewing() {
      return this.view;
    }
  },
  watch: {
    phoneNumber(value) {
      this.model.phone_number = value;
    },
    isViewing(newValue) {
      if (newValue) {
      }
    }
  },
  mounted() {
    console.log('View prop in mounted:', this.view);
    this.handleQueryParams();
    if (this.id) {
      this.isEditing = !this.isViewing;
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

        const repairData = { 
        ...this.model, 
        status: 'On-Going',
        user_id: this.model.user_id
         };

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
        toast.success("Details saved successful", { timeout: 3000 })
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
        toast.success("Details updated successful", { timeout: 3000 })
        setTimeout(() => this.$router.push({ name: 'repair-list' }), 1500);
      } catch (error) {
        const toast = this.toast();
        toast.error('Failed to update. There are missing details.', { timeout: 3000 });
      }
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
}
</style>