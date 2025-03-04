<template>
    <div class="content">
        <div class="container">
            <div class="card-header">
                <h2 v-if="!loading">Service: {{ model.description }}</h2>
                <div v-else class="skeleton skeleton-text"></div>
            </div>
            <div class="card-body">
                <div class="whole">
                    <div class="right">
                        <div class="buttons">
                            <h2>PRODUCT INFORMATION</h2>
                        </div>
                        <div v-if="!loading">
                            <span class="input-group-text">Device Type: </span>
                            <select v-model="productInfo.device_type" disabled>
                                <option value="Laptop">Laptop</option>
                                <option value="Desktop">Desktop</option>
                            </select>
                        </div>
                        <div v-else class="skeleton skeleton-input"></div>
                        
                        <div v-for="(field, index) in fields" :key="index" class="input-group mb-3">
                            <span class="input-group-text">{{ field.label }}</span>
                            <input v-if="!loading" v-model="productInfo[field.model]" type="text" class="form-control" disabled style="text-transform: capitalize;" />
                            <div v-else class="skeleton skeleton-input"></div>
                        </div>
                    </div>
                </div>
  
                <div class="buttons">
                    <h2>Other Description</h2>
                </div>
                <div class="input-group mb-4">
                    <span class="input-group-text"></span>
                    <textarea v-if="!loading" v-model="productInfo.description_of_repair" class="form-control" disabled></textarea>
                    <div v-else class="skeleton skeleton-textarea"></div>
                </div>
                
                <div class="buttons">
                    <router-link to="/user-history" class="btn btn-secondary" :class="{ 'disabled': loading }">Cancel</router-link>
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
            loading: true,
            model: {},
            productInfo: {},
            fields: [
                { label: 'Brand', model: 'brand' },
                { label: 'Model', model: 'model' },
                { label: 'Serial Number', model: 'serial_number' },
                { label: 'Purchase Date', model: 'purchase_date' }
            ]
        };
    },
    mounted() {
        this.getRepairDetails();
    },
    methods: {
        async getRepairDetails() {
            try {
                const authStore = useAuthStore();
                const response = await axios.get(`${BASE_URL}/customer-details/${this.id}/with-product-info`, getHeaderConfig(authStore.access_token));
                this.model = response.data;
                this.productInfo = response.data.product_infos[0] || {};
            } catch (error) {
                useToast().error('Failed to load repair details. Please try again.', { timeout: 3000 });
            } finally {
                this.loading = false;
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

.skeleton {
    background: #e0e0e0;
    border-radius: 4px;
    margin-bottom: 10px;
    width: 100%;
}
.skeleton-text { height: 30px; width: 50%; }
.skeleton-input { height: 35px; }
.skeleton-textarea { height: 80px; }
.disabled { pointer-events: none; opacity: 0.5; }

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