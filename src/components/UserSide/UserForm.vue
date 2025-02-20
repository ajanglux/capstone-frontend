<template>
    <div class="content">
        <div class="container">
            <div class="card-header">
                <h2>Service: {{ model.description }}</h2>
            </div>
            <div class="card-body">
                <div class="whole">
                    <div class="left" v-if="userRole !== 0">
                    </div>
                    
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
                            <input v-model="productInfo.brand" type="text" class="form-control" disabled style="text-transform: capitalize;" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Model</span>
                            <input v-model="productInfo.model" type="text" class="form-control" disabled style="text-transform: capitalize;" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Serial Number</span>
                            <input
                            v-model="productInfo.serial_number"
                            @input="productInfo.serial_number = productInfo.serial_number.toUpperCase()"
                            type="text"
                            class="form-control"
                            disabled
                            />
                        </div>
  
                        <!-- <div class="buttons">
                            <h2>WARRANTY STATUS</h2>
                        </div>
                        <div class="custom-checkboxes">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="warranty" value="warranty" v-model="productInfo.warranty_status" disabled />
                                <label class="form-check-label" for="warranty">Warranty</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="outOfWarranty" value="out_of_warranty" v-model="productInfo.warranty_status" disabled />
                                <label class="form-check-label" for="outOfWarranty">Out Of Warranty</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="chargeable" value="chargeable" v-model="productInfo.warranty_status" disabled />
                                <label class="form-check-label" for="chargeable">Chargeable</label>
                            </div>
                        </div> -->

                        <div class="input-group mb-3">
                            <span class="input-group-text">Purchase Date</span>
                            <input v-model="productInfo.purchase_date" type="date" class="form-control" disabled/>
                        </div>
            
                    </div>
                </div>
  
                <div class="whole">
                    <div class="left">
                    </div>
                </div>
  
                <div class="buttons">
                    <h2>Other Description</h2>
                </div>
                <div class="input-group mb-4">
                    <span class="input-group-text"></span>
                    <textarea v-model="productInfo.description_of_repair" class="form-control" disabled></textarea>
                </div>
          
                <div class="buttons">
                    <h2>NOTE</h2>
                </div>
                <div class="input-group mb-3">
                    <textarea v-model="productInfo.documentation" class="form-control" disabled></textarea>
                </div>
        
                <div class="buttons">
                    <router-link to="/user-history" class="btn btn-secondary">Cancel</router-link>
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
    name: 'UserForm',
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
            device_type: '',
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
        const userData = useAuthStore();
        this.userRole = userData.user ? userData.user.role : null; // Ensure userData is populated before accessing role

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
    },
};
</script>
  
<style lang="scss" scoped>
.content {
    padding: 110px 40px 40px 40px;
    display: flex;
    justify-content: center;
}

.container {
    width: 70%;
}

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

    select {
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
}

    .whole-checklist {
    width: 100%;

    .checkbox {
        display: flex;
        flex-direction: column;
        gap: 23px;
        width: 100%;
        padding-top: 3px;
    }

    .checkbox:nth-child(2) {
        padding-top: 82px;
    }

    .accessory {
        margin-bottom: 10px;
        height: 50px;
        width: 100%;
        border-radius: 10px;
        outline: none;
        border: none;
        padding: 10px;
        transition: all 0.3s ease-in-out;
        background-color: var(--light);
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        justify-content: flex-end;

        &:hover {
            background-color: var(--light2);
        }

        .input-group-text {
            font-size: 14px;
            color: black;
            padding: 10px;
        }

        .form-control {
            font-family: 'Poppins';
            width: 20px;
        }
    }

    .small {
        font-size: 22px;
    }
}

@media (max-width: 1020px) {
    .container{
        width: 90%;
    }
}

@media (max-width: 665px) {
    .container{
        width: 95%;
    }
}

@media (max-width: 560px) {
    .container{
        width: 100%;
    }
    .card-body .whole-checklist{
        display: flex;
        flex-direction: column;
        .checkbox {
            padding-top: 0px;
        }
    }

    .card-body .whole-checklist .checklist:nth-child(3) {
        padding-top: 0px;
    }
}

@media (max-width: 520px) {
    .card-body .custom-checkboxes[data-v-2926ddd2][data-v-2926ddd2] {
        display: flex;
        flex-direction: column;
    }
}
</style>  