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
        </div>

        <div class="whole">
          <div class="left">
          </div>
        </div>

        <div class="buttons">
              <h2>Device Issue Description</h2>
            </div>
            <div class="input-group mb-4">
              <span class="input-group-text"></span>
              <textarea v-model="model.description" class="form-control" :disabled="isViewing"></textarea>
            </div>

        <div class="whole-checklist">
          <div class="checklist">
            <div class="buttons">
              <h2>Accessories Checklist</h2>
            </div>

            <div class="mb3">
              <span class="input-group-text">AC Adapter</span>
              <input v-model="productInfo.ac_adapter" type="radio" id="ac_adapter" value="ac_adapter" class="form-control" :disabled="isViewing" style="text-transform: capitalize;" />
            </div>

            <div class="mb3">
              <span class="input-group-text">VGA Cable</span>
              <input v-model="productInfo.vga_cable" type="radio" id="vga_cable" value="vga_cable" class="form-control" :disabled="isViewing" style="text-transform: capitalize;" />
            </div>

            <div class="mb3">
              <span class="input-group-text">DVI Cable</span>
              <input v-model="productInfo.dvi_cable" type="radio" id="dvi_cable" value="dvi_cable" class="form-control" :disabled="isViewing" style="text-transform: capitalize;" />
            </div>
          </div> 
          <div class="checklist">
            <div class="mb3">
              <span class="input-group-text">Display Cable</span>
              <input v-model="productInfo.display_cable" type="radio" id="display_cable" value="display_cable" class="form-control" :disabled="isViewing" style="text-transform: capitalize;" />
            </div>

            <div class="mb3">
              <span class="input-group-text">Bag (PN)</span>
              <input v-model="productInfo.bag_pn" type="radio" id="bag" value="bag" class="form-control" :disabled="isViewing" style="text-transform: capitalize;" />
            </div>

            <div class="mb3">
              <span class="input-group-text">HDD</span>
              <input v-model="productInfo.hdd" type="radio" id="hdd" value="hdd" class="form-control" :disabled="isViewing" style="text-transform: capitalize;" />
            </div>
          </div>

          <div class="checklist">
            <div class="input-group mb-3">
              <span class="input-group-text">RAM Brand</span>
              <input v-model="productInfo.ram_brand" type="text" class="form-control" :disabled="isViewing" style="text-transform: capitalize;" />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">RAM Size (GB)</span>
              <input v-model="productInfo.ram_size_gb" type="text" class="form-control" :disabled="isViewing" style="text-transform: capitalize;" />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Power Cord Quantity</span>
              <input v-model="productInfo.power_cord_qty" type="text" class="form-control" :disabled="isViewing" style="text-transform: capitalize;" />
            </div>
          </div>
        </div>
        
        <div class="buttons">
          <h2>NOTE</h2>
        </div>
        <div class="input-group mb-3">
          <textarea v-model="productInfo.documentation" class="form-control" :disabled="isViewing"></textarea>
        </div>

        <div class="buttons">
          <button v-if="isEditing" @click="updateRepair()" type="button" class="btn btn-primary">Update</button>
          <button v-else-if="!isViewing" @click="saveRepair()" type="button" class="btn btn-primary">{{ isEditing ? 'Update' : 'Submit' }}</button>
          <router-link to="/repair-list" class="btn btn-secondary">Cancel</router-link>
          <button v-if="isViewing" @click="generateInvoice" type="button" class="btn btn-success">Generate Statement</button>
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
        description: '',
      },
      productInfo: {
        brand: '',
        model: '',
        serial_number: '',
        purchase_date: '',
        documentation: '',
        warranty_status: '',
        ac_adapter: '',
        battery_pack: '',
        lithium_battery: '',
        vga_cable: '',
        dvi_cable: '',
        display_cable: '',
        bag_pn: '',
        swivel_base: '',
        hdd: '',
        ram_brand: '',
        ram_size_gb: '',
        power_cord_qty: '',
        printer_cable_qty: '',
        usb_cable_qty: '',
        paper_tray_qty: '',
        screw_qty: '',
        jack_cable_qty: '',
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
    generateInvoice() {

      const displayValue = (value) => value !== null && value !== undefined ? value : '';

      const warrantyStatusCheckboxes = {
        'warranty': this.productInfo.warranty_status === 'warranty' ? '☑ Warranty' : '☐ Warranty',
        'out_of_warranty': this.productInfo.warranty_status === 'out_of_warranty' ? '☑ Out Of Warranty' : '☐ Out Of Warranty',
        'chargeable': this.productInfo.warranty_status === 'chargeable' ? '☑ Chargeable' : '☐ Chargeable'
      };

      const invoiceContent = `
       <div style="font-family: 'Poppins', sans-serif; padding: 0; width: 100%; margin: 10px; max-width: 210mm;">
        <h1 style="margin-bottom: 10px; text-align: center; font-size: 18px;">RECEIPT</h1>

        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <div style="width: 48%;">
            <h3 style="font-size: 14px; margin-bottom: 5px;">Customer Details</h3>
            <p style="margin: 2px 0; font-size: 12px;"><strong>Name:</strong> ${displayValue(this.model.first_name)} ${displayValue(this.model.last_name)}</p>
            <p style="margin: 2px 0; font-size: 12px;"><strong>Phone:</strong> ${displayValue(this.model.phone_number)}</p>
            <p style="margin: 2px 0; font-size: 12px;"><strong>Email:</strong> ${displayValue(this.model.email)}</p>
            <p style="margin: 2px 0; font-size: 12px;"><strong>Address:</strong> ${displayValue(this.model.address)}</p>
          </div>
          <div style="width: 48%;">
            <h3 style="font-size: 14px; margin-bottom: 5px;">Product Information</h3>
            <p style="margin: 2px 0; font-size: 12px;"><strong>Brand:</strong> ${displayValue(this.productInfo.brand)}</p>
            <p style="margin: 2px 0; font-size: 12px;"><strong>Model:</strong> ${displayValue(this.productInfo.model)}</p>
            <p style="margin: 2px 0; font-size: 12px;"><strong>Serial:</strong> ${displayValue(this.productInfo.serial_number)}</p>
            <p style="margin: 2px 0; font-size: 12px;"><strong>Date:</strong> ${displayValue(this.productInfo.purchase_date)}</p>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <div style="width: 48%;">
            <h3 style="font-size: 14px; margin-bottom: 5px;">Warranty Status</h3>
            <p style="margin: 2px 0; font-size: 12px;">${warrantyStatusCheckboxes.warranty}</p>
            <p style="margin: 2px 0; font-size: 12px;">${warrantyStatusCheckboxes.out_of_warranty}</p>
            <p style="margin: 2px 0; font-size: 12px;">${warrantyStatusCheckboxes.chargeable}</p>
          </div>
          <div style="width: 48%;">
            <h3 style="font-size: 14px; margin-bottom: 5px;">Detailed Customer Problem/Error</h3>
            <p style="margin: 2px 0; font-size: 12px;">${displayValue(this.model.description)}</p>
          </div>
        </div>

        <div style="margin-bottom: 5px;">
          <h3 style="font-size: 14px; margin-bottom: 5px;">Checklist</h3>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; font-size: 12px;">
            <p style="margin: 2px 0;"><strong>AC Adapter:</strong> ${displayValue(this.productInfo.ac_adapter)}</p>
            <p style="margin: 2px 0;"><strong>VGA Cable:</strong> ${displayValue(this.productInfo.vga_cable)}</p>
            <p style="margin: 2px 0;"><strong>DVI Cable:</strong> ${displayValue(this.productInfo.dvi_cable)}</p>
            <p style="margin: 2px 0;"><strong>Display Cable:</strong> ${displayValue(this.productInfo.display_cable)}</p>
            <p style="margin: 2px 0;"><strong>Bag (PN):</strong> ${displayValue(this.productInfo.bag_pn)}</p>
            <p style="margin: 2px 0;"><strong>HDD:</strong> ${displayValue(this.productInfo.hdd)}</p>
            <p style="margin: 2px 0;"><strong>RAM Brand:</strong> ${displayValue(this.productInfo.ram_brand)}</p>
            <p style="margin: 2px 0;"><strong>RAM Size (GB):</strong> ${displayValue(this.productInfo.ram_size_gb)}</p>
            <p style="margin: 2px 0;"><strong>Power Cord Quantity:</strong> ${displayValue(this.productInfo.power_cord_qty)}</p>
          </div>
        </div>
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
