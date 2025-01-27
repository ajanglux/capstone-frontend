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
                <!-- Unified Filter -->
                <label for="filterType">Select Filter Type:</label>
                <select id="filterType" v-model="filterType">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
  
                <label for="filterValue">Select Date/Week/Month:</label>
                <input 
                id="filterValue" 
                :type="inputType" 
                v-model="selectedFilterValue" 
                />

  
                <button @click="generateReport">Generate Report</button>
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
                  <td>{{ formatDate(repair.created_at) }}</td>
                  <td>{{ repair.user?.first_name || 'N/A' }} {{ repair.user?.last_name || 'N/A' }}</td>
                  <td>{{ repair.status || 'N/A' }}</td>
                  <td>
                    <router-link :to="{ name: 'repair-form', params: { id: repair.id, view: 'view' } }" class="btn">
                      View Details
                    </router-link>
                    <button 
                      class="btn"
                      @click="redirectToNewRepair(repair)"
                      v-if="repair.status === 'Completed' || repair.status === 'Cancelled'">
                      Create New Repair
                    </button>
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
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const authStore = useAuthStore();
  const repairs = ref([]);
  const errors = ref(null);
  const searchQuery = ref('');
  const filterType = ref('daily');
  const selectedFilterValue = ref('');
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
    return repairs.value.filter((repair) => {
      if (filterType.value === 'daily' && selectedFilterValue.value) {
        const repairDate = new Date(repair.created_at).toISOString().split('T')[0];
        return repairDate === selectedFilterValue.value;
      } else if (filterType.value === 'weekly' && selectedFilterValue.value) {
        const repairWeek = `${new Date(repair.created_at).getFullYear()}-W${String(
          Math.ceil(new Date(repair.created_at).getDate() / 7)
        ).padStart(2, '0')}`;
        return repairWeek === selectedFilterValue.value;
      } else if (filterType.value === 'monthly' && selectedFilterValue.value) {
        const repairMonth = new Date(repair.created_at).toISOString().slice(0, 7);
        return repairMonth === selectedFilterValue.value;
      }
      return true;
    });
  });
  
  const generateReport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${filterType.value.charAt(0).toUpperCase() + filterType.value.slice(1)} Report`);
  
    worksheet.addRow([`TECHFIX ${filterType.value.charAt(0).toUpperCase() + filterType.value.slice(1)} Report`]).font = { bold: true, size: 26 };
    worksheet.addRow(['Date Completed', 'Client', 'Status']).font = { bold: true };
  
    filteredRepairs.value.forEach((repair) => {
      worksheet.addRow([
        formatDate(repair.created_at),
        `${repair.user?.first_name || 'N/A'} ${repair.user?.last_name || 'N/A'}`,
        repair.status || 'N/A',
      ]);
    });
  
    worksheet.getColumn(1).width = 17; // Date Completed
    worksheet.getColumn(2).width = 20; // Client
    worksheet.getColumn(3).width = 10; // Status
  
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filterType.value.charAt(0).toUpperCase() + filterType.value.slice(1)}-Report-${selectedFilterValue.value}.xlsx`);
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

  const inputType = computed(() => {
  if (filterType.value === 'daily') return 'date';
  if (filterType.value === 'weekly') return 'week';
  if (filterType.value === 'monthly') return 'month';
  return 'text';
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
        margin-left: 5px;
    
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