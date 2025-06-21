<template>
  <v-app>
    <div class="content">
      <div class="container">
        <div class="card-header">
          <h2>HISTORY</h2>
        </div>

        <div class="table-body">
          <div class="table-header">
            <div class="left">
              <div class="searchbar">
                <i class="bx bx-search"></i>
                <input type="text" placeholder="Search..." v-model="searchQuery" />
              </div>

              <div class="filters">
                <select v-model="selectedStatus">
                  <option value="">All</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Unrepairable">Unrepairable</option>
                </select>
              </div>
            </div>

            <div class="filters">
              <label for="filterType">Select Type:</label>
              <select id="filterType" v-model="filterType">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>

              <label for="filterValue">Select Date:</label>
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
                <th>Date & Time</th>
                <th>Client</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(repair, index) in paginatedRepairs" :key="repair.id">
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td>{{ formatDate(repair.status_updated_at || repair.created_at) }}</td>
                <td>{{ repair.user?.first_name || 'N/A' }} {{ repair.user?.last_name || 'N/A' }}</td>
                <td>{{ repair.status || 'N/A' }}</td>
                <td>
                  <router-link :to="{ name: 'repair-form', params: { id: repair.id, view: 'view' } }" class="btn"
                  title="View Details">
                  <i class='bx bx-detail' ></i>
                  </router-link>
                  <button 
                    class="btn"
                      @click="confirmStatusChange(repair)"
                    v-if="repair.status === 'Unrepairable'"
                    title="Update to On-Going">
                    <i class='bx bx-revision'></i>
                  </button>
                  <button class="btn" @click="openNoteModal(repair.cancel_reason)" title="Reason for Cancellation" > 
                    <i class='bx bx-message-alt-error'></i>
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
    <ConfirmationDialog
      :show="showConfirmationDialog"
      @close="showConfirmationDialog = false"
      @confirm="updateStatusToOnGoing"
      :message="confirmationMessage"
    />
    <div v-if="showNoteModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Reason for Cancellation</h3>
        <p>{{ selectedNote || "No reason provided" }}</p>
        <div class="modal-actions">
          <button @click="showNoteModal = false">Close</button>
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
import { useToast } from 'vue-toastification'
import ConfirmationDialog from '../layouts/ConfirmationDialog.vue';

const authStore = useAuthStore();
const repairs = ref([]);
const errors = ref(null);
const searchQuery = ref('');
const filterType = ref('daily');
const selectedFilterValue = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const isLoading = ref(false);
const toast = useToast()
const selectedRepair = ref(null);

const showConfirmationDialog = ref(false);
const confirmationMessage = ref('');

const selectedStatus = ref('');

const showNoteModal = ref(false);
const selectedNote = ref("");

const openNoteModal = (note) => {
  selectedNote.value = note;
  showNoteModal.value = true;
};

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

const confirmStatusChange = (repair) => {
confirmationMessage.value = `Are you sure you want to update the status of this repair to On-Going?`;
showConfirmationDialog.value = true;
selectedRepair.value = repair;
};

const updateStatusToOnGoing = async () => {
if (!selectedRepair.value) return;

isLoading.value = true;
try {
  await axios.patch(`${BASE_URL}/customer-details/${selectedRepair.value.id}/status`, { status: 'On-Going' }, getHeaderConfig(authStore.access_token));
  
  const repair = repairs.value.find(r => r.id === selectedRepair.value.id);
  if (repair) repair.status = 'On-Going';

  toast.success('Status updated successfully', { timeout: 3000 });
} catch (error) {
  console.error(`Error updating repair status to On-Going:`, error);
  const errorMessage = error.response?.data?.message || 'Error updating repair status';
  toast.error(errorMessage, { timeout: 4700 });
} finally {
  isLoading.value = false;
  showConfirmationDialog.value = false;
}
};

const filteredRepairs = computed(() => {
  return repairs.value.filter(repair => {
    let matchesStatus = true;

    if (selectedStatus.value === '') {
      matchesStatus = repair.status === 'Completed' || repair.status === 'Cancelled' || repair.status === 'Unrepairable' ;
    } else {
      matchesStatus = repair.status === selectedStatus.value;
    }

    return matchesStatus;
    })
    .filter(repair => {
      if (!selectedFilterValue.value) return true;

      const repairDate = new Date(repair.created_at);
      const filterValue = new Date(selectedFilterValue.value);

      if (filterType.value === 'daily') {
        return repairDate.toDateString() === filterValue.toDateString();
      } else if (filterType.value === 'weekly') {
        const weekStart = new Date(filterValue);
        weekStart.setDate(weekStart.getDate() - (weekStart.getDay() === 0 ? 6 : weekStart.getDay() - 1));

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        return repairDate >= weekStart && repairDate <= weekEnd;
      } else if (filterType.value === 'monthly') {
        return (
          repairDate.getFullYear() === filterValue.getFullYear() &&
          repairDate.getMonth() === filterValue.getMonth()
        );
      }
      return false;
    })
    .filter(repair => {
      const searchText = searchQuery.value.toLowerCase();
      const fullName = `${repair.user?.first_name || ''} ${repair.user?.last_name || ''}`.toLowerCase().trim();
      return (
        repair.code?.toLowerCase().includes(searchText) ||
        fullName.includes(searchText)
      );
    })
    .sort((a, b) => new Date(b.status_updated_at) - new Date(a.status_updated_at));
});



const generateReport = async () => {
  if (filteredRepairs.value.length === 0) {
    toast.warning("No records found for the selected period", { timeout: 3000 });
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(`${filterType.value.charAt(0).toUpperCase() + filterType.value.slice(1)} Report`);

  worksheet.addRow([`TECHFIX ${filterType.value.charAt(0).toUpperCase() + filterType.value.slice(1)} Report`]).font = { bold: true, size: 20 };
  worksheet.addRow([]);
  worksheet.addRow(['Date Completed', 'Client', 'Status']).font = { bold: true };

  filteredRepairs.value.forEach((repair) => {
    worksheet.addRow([
      formatDate(repair.created_at),
      `${repair.user?.first_name || 'N/A'} ${repair.user?.last_name || 'N/A'}`,
      repair.status || 'N/A',
    ]);
  });

  worksheet.columns.forEach(column => {
    column.width = 20; 
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  
  let fileName = `${filterType.value.charAt(0).toUpperCase() + filterType.value.slice(1)}-Report`;

  if (filterType.value === 'weekly') {
    const startOfWeek = new Date(selectedFilterValue.value);
    startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    fileName += `-${formatDate(startOfWeek)}_to_${formatDate(endOfWeek)}`;
  } else {
    fileName += `-${selectedFilterValue.value}`;
  }

  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${fileName}.xlsx`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success("Report generated successfully!", { timeout: 3000 });
};

const formatDate = (dateString) => {
if (dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleString('en-US', options);
}
return '';
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

  .left {
    display: flex;
    gap: 5px;
  }

  .filters {
    color: #333;
    display: flex;
    align-items: center;
    gap: 5px;

    input {
      margin-left: 5px;
      padding: 6px;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    padding-bottom: 20px;
    font-weight: 500px;
  }

  p {
    padding-bottom: 20px;
  }

  button {
    color: white;
    background-color: var(--header);
    padding: 10px;
    border-radius: 5px;
  }
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}
</style>