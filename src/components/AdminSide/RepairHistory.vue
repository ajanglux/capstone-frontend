<template>
<v-app>
    <div class="content">
        <div class="container">
            <div class="card-header">
                <h2>HISTORY</h2>
            </div>
            <div class="table-body">
                <div class="table-header">
                <div class="searchbar">
                    <i class="bx bx-search"></i>
                    <input type="text" placeholder="Search..." v-model="searchQuery" />
                </div>
                </div>
                
                <div v-if="errors" class="alert alert-danger">
                    <strong>{{ errors }}</strong>
                </div>
                
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Date Created</th>
                            <th>Code</th>
                            <th>Client</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(repair, index) in filteredRepairs" :key="repair.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ formatDate(repair.created_at) }}</td>
                            <td>{{ repair.code }}</td>
                            <td>{{ repair.first_name || 'N/A' }} {{ repair.last_name || 'N/A' }}</td>
                            <td>{{ repair.status || 'N/A' }}</td>
                        </tr>
                        <tr v-if="filteredRepairs.length === 0">
                            <td colspan="5"><strong>No completed repairs found.</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <v-pagination :length="1"></v-pagination>
        </div>
        <ConfirmationDialog
        :show="showDeleteDialog"
        @close="showDeleteDialog = false"
        @confirm="deleteRepair"
        />
    </div>
</v-app>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import ConfirmationDialog from '../layouts/ConfirmationDialog.vue';

const authStore = useAuthStore();
const repairs = ref([]);
const errors = ref(null);
const showDeleteDialog = ref(false);
const selectedRepairId = ref(null);

const searchQuery = ref('');

const fetchRepairs = async () => {
try {
    const response = await axios.get(
    `${BASE_URL}/customer-details`,
    getHeaderConfig(authStore.access_token)
    );
    repairs.value = response.data.data;
} catch (error) {
    console.error('Error fetching repairs:', error);
    errors.value = error.response?.data?.message || 'Error fetching repairs';
}
};

const filteredRepairs = computed(() => {
return repairs.value
    .filter((repair) => repair.status === 'completed')
    .filter((repair) => {
    const searchText = searchQuery.value.toLowerCase();
    return (
        repair.code.toLowerCase().includes(searchText) ||
        (repair.first_name && repair.first_name.toLowerCase().includes(searchText)) ||
        (repair.last_name && repair.last_name.toLowerCase().includes(searchText))
    );
    });
});

const deleteRepair = async () => {
try {
    await axios.delete(
    `${BASE_URL}/customer-details/${selectedRepairId.value}`,
    getHeaderConfig(authStore.access_token)
    );
    fetchRepairs();
    showDeleteDialog.value = false;
} catch (error) {
    console.error('Error deleting repair:', error);
    errors.value = error.response?.data?.message || 'Error deleting repair';
}
};

const confirmDelete = (id) => {
selectedRepairId.value = id;
showDeleteDialog.value = true;
};

const formatDate = (dateString) => {
const date = new Date(dateString);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
return `${year}-${month}-${day}`;
};

onMounted(() => {
fetchRepairs();
});
</script>
  
<style>
</style>
