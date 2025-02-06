<template>
  <div class="user-content">
    <div class="user-container">
      <div class="card-header">
        <h2>{{ isEditing ? 'EDIT' : isViewing ? 'VIEW' : 'Add Repair' }}</h2>
      </div>
      <div class="card-body">

        <!-- details in the form if the networking, and CCTV installation -->

        <!-- Customer Details -->
        <div class="whole" v-if="userRole !== 0">
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
              <input v-model="model.phone_number" type="text" class="form-control" :disabled="isEditing || isViewing" />
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
          <h2>Service Description</h2>
        </div>
        <div><h4>Service: {{ model.description }}</h4></div>
        <div class="input-group mb-4">
          <span class="input-group-text"></span>
          <textarea v-model="productInfo.description_of_repair" class="form-control" :disabled="isViewing"></textarea>
        </div>

        <!-- <div class="input-group mb-4">
          <span class="input-group-text">Address (Optional)</span>
          <input v-model="productInfo.address" type="text" class="form-control" :disabled="isEditing || isViewing" style="text-transform: capitalize;" />
        </div> -->


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
import Swal from 'sweetalert2'

export default {
  name: 'Form3',
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
        description_of_repair: '',
        address: '', // Add address field for optional address
      },
      isEditing: false,
    };
  },
  computed: {
    isViewing() {
      return this.view;
    }
  },
  watch: {
    isViewing(newValue) {
      if (newValue) {
      }
    }
  },
  mounted() {
    const userData = useAuthStore();
    this.userRole = userData.user ? userData.user.role : null; // Ensure userData is populated before accessing role
    this.handleQueryParams();
    this.fetchUserProfile();

    if (this.$route.query.service) {
    this.model.description = this.$route.query.service;
    }
    if (this.id) {
      this.isEditing = !this.isViewing;
      this.getRepairDetails();
    }
  },
  methods: {
    showToast (icon, title) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
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
        this.model.phone_number = customerDetail.user.phone_number;
        this.model.address = customerDetail.user.address;
        this.model.email = customerDetail.user.email;
        this.model.user_id = customerDetail.user.id;
        this.productInfo = customerDetail.product_infos[0] || {};
      } catch (error) {
        this.showToast("error", "Failed to load repair details. Please try again.")
      }
    },
    async fetchUserProfile() {
      try {
        const authStore = useAuthStore();
        const headers = getHeaderConfig(authStore.access_token); // Ensure token is correctly fetched

        if (!authStore.access_token) {
          this.showToast("error", "Authentication token missing.");
          return;
        }

        const response = await axios.get(`${BASE_URL}/user/profile`, headers);

        this.model = {
          ...this.model,
          user_id: response.data.user.id,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          phone_number: response.data.user.phone_number,
          email: response.data.user.email,
          address: response.data.user.address,
        };
      } catch (error) {
        this.showToast("error", `Error fetching user profile: ${error.response?.data?.message || error.message}`);
      }
    },
    async saveRepair() {
      try {
        const authStore = useAuthStore();

        const repairData = { 
          ...this.model, 
          status: 'Pending',
          user_id: this.model.user_id
        };

        // Exclude empty address
        if (!this.model.address || this.model.address.trim() === '') {
          delete repairData.address;
        }

        const customerResponse = await axios.post(
          `${BASE_URL}/customer-details`,
          repairData,
          getHeaderConfig(authStore.access_token)
        );

        const productData = { ...this.productInfo, customer_detail_id: customerResponse.data.data.id };

        // Exclude empty address from product info
        if (!this.productInfo.address || this.productInfo.address.trim() === '') {
          delete productData.address;
        }

        if (Object.values(productData).some(field => field)) {
          await axios.post(
            `${BASE_URL}/product-infos`,
            productData,
            getHeaderConfig(authStore.access_token)
          );
        }

        this.showToast("success", "Details saved successfully");
        setTimeout(() => this.$router.push({ name: 'home' }), 1500);
      } catch (error) {
        this.showToast("error", "Failed to save. There are missing details or an error occurred.");
      }
    },

    async updateRepair() {
      try {
        const authStore = useAuthStore();

        const updatedData = { ...this.model };

        // Exclude empty address
        if (!updatedData.address || updatedData.address.trim() === '') {
          delete updatedData.address;
        }

        await axios.put(
          `${BASE_URL}/customer-details/${this.id}`, 
          updatedData, 
          getHeaderConfig(authStore.access_token)
        );

        const productData = { ...this.productInfo, customer_detail_id: this.id };

        // Exclude empty address from product info
        if (!this.productInfo.address || this.productInfo.address.trim() === '') {
          delete productData.address;
        }

        if (this.productInfo.id) {
          await axios.put(
            `${BASE_URL}/product-infos/${this.productInfo.id}`, 
            productData, 
            getHeaderConfig(authStore.access_token)
          );
        } else {
          await axios.post(
            `${BASE_URL}/product-infos`, 
            productData, 
            getHeaderConfig(authStore.access_token)
          );
        }

        this.showToast("success", "Details updated successfully");
        setTimeout(() => this.$router.push({ name: 'home' }), 1500);
      } catch (error) {
        this.showToast("error", "Failed to update. There are missing details.");
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