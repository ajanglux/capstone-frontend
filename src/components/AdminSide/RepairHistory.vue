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
  
                    <div class="filters">
                        <label for="startMonth">Select Month:</label>
                        <input type="month" id="startMonth" v-model="selectedMonth" />
                        <button @click="generateMonthlyReport">Generate Monthly Report</button>
                    </div>
                </div>
  
                <div v-if="errors" class="alert alert-danger">
                    <strong>{{ errors }}</strong>
                </div>
  
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Date</th>
                            <th>Client</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(repair, index) in paginatedRepairs" :key="repair.id">
                            <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                            <td>{{ repair.status === 'Completed' || repair.status === 'Cancelled' ? formatDate(repair.status_updated_at) : formatDate(repair.created_at) }}</td>
                            <td>{{ repair.first_name || 'N/A' }} {{ repair.last_name || 'N/A' }}</td>
                            <td>{{ repair.status || 'N/A' }}</td>
                            <td>
                                <router-link :to="{ name: 'repair-form', params: { id: repair.id, view: 'view' } }" class="btn">
                                    View Details
                                </router-link>
                            </td>
                        </tr>
                        <tr v-if="paginatedRepairs.length === 0">
                            <td colspan="5"><strong>No completed repairs found.</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="pagination-controls">
                <span class="page-indicator">
                    Page {{ currentPage }} of {{ totalPages }}
                </span>
                <button @click="goToPreviousPage" :disabled="currentPage === 1" class="prev-btn">Previous</button>
                <button @click="goToNextPage" :disabled="currentPage === totalPages" class="next-btn">Next</button>
            </div>
        </div>
    </div>
</v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import ExcelJS from 'exceljs';

const authStore = useAuthStore();
const repairs = ref([]);
const errors = ref(null);
const searchQuery = ref('');
const selectedMonth = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

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
        .filter((repair) => {
            if (selectedMonth.value) {
                const repairMonth = new Date(repair.created_at).toISOString().slice(0, 7);
                return repairMonth === selectedMonth.value && repair.status === 'Completed' || repair.status === 'Cancelled';
            }
            return repair.status === 'Completed' || repair.status === 'Cancelled';
        })
        .filter((repair) => {
            const searchText = searchQuery.value.toLowerCase();
            const fullName = `${repair.first_name || ''} ${repair.last_name || ''}`.toLowerCase().trim();
            return (
                repair.code.toLowerCase().includes(searchText) ||
                fullName.includes(searchText) ||
                (repair.first_name && repair.first_name.toLowerCase().includes(searchText)) ||
                (repair.last_name && repair.last_name.toLowerCase().includes(searchText))
            );
        })
        .sort((a, b) => new Date(b.status_updated_at) - new Date(a.status_updated_at));
});

const paginatedRepairs = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredRepairs.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(filteredRepairs.value.length / itemsPerPage);
});

const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const goToPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const formatMonthYear = (monthValue) => {
    const date = new Date(monthValue + '-01');
    const options = { month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const generateMonthlyReport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Monthly Report');
    const formattedMonthYear = formatMonthYear(selectedMonth.value); 

    worksheet.addRow([`TECHFIX ${formattedMonthYear} Report`]).font = { bold: true, size: 26 };
    worksheet.addRow(['Date Completed', 'Client', 'Status']).font = { bold: true };

    filteredRepairs.value.forEach(repair => {
        worksheet.addRow([
            formatDate(repair.status_updated_at),
            `${repair.first_name || 'N/A'} ${repair.last_name || 'N/A'}`,
            repair.status || 'N/A'
        ]);
    });

    worksheet.getColumn(1).width = 17; // Date Created
    worksheet.getColumn(2).width = 20; // Client
    worksheet.getColumn(3).width = 10; // Status

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `Monthly-Report-${formattedMonthYear}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
};

onMounted(() => {
    fetchRepairs();
});
</script>
  
<style lang="scss" scoped>
.table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;

    .filters {
        color: #333;

        input {
          margin-left: 5px;
            padding: 6px;
            // border: none;
            border-radius: 5px;
        }

        button {
            background-color: var(--main);
            color: white;
            border: none;
            border-radius: 5px;
            padding: 7px;
            margin-left: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: var(--main-hover);
        }

    }
}

.btn {
    color: white;
    padding: 7px;
    background-color: var(--main);
    border-radius: 5px;

}

.pagination-controls {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-top: 20px;
    gap: 8px;

    button:hover {
        background-color: var(--main-hover);
    }

    .prev-btn,
    .next-btn {
        background-color: var(--main);
        color: white;
        border: none;
        padding: 3px 10px;
        font-size: 16px;
        cursor: pointer;
    }

    .prev-btn[disabled],
    .next-btn[disabled] {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .page-indicator {
        font-size: 16px;
        color: #333;
    }
}
</style>