<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h3>History</h3>
        <div v-if="isLoading">Loading...</div>
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
              <th>Code</th>
              <th>Date & Time</th>
              <th>Description</th>
              <th>Status</th>
              <th>View</th>
              <!-- <th v-if="showCancelledColumn">Note</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(repair, index) in paginatedRepairs" :key="repair.id">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ repair?.code || 'N/A' }}</td>
              <td>{{ formatDate(repair.created_at) }}</td>
              <td>{{ repair.description || 'No description available' }}</td>
              <td>
                <span :class="statusClass(repair.status)">
                  {{ repair.status || 'Pending' }}
                </span>
              </td>
              <td>
                <button 
                  v-if="repair.status.toLowerCase()" 
                  @click="openNoteModal(repair.comment)" 
                  class="btn-note"
                  title="View note from admin"
                >
                <i class='bx bx-note'></i>
                </button>

                <button 
                  class="btn-note"
                  @click="confirmStatusChange(repair)"
                  :disabled="repair.status === 'On-Going' || status === 'Finished' || status === 'Ready-for-Pickup' || status === 'Completed' || status === 'Unrepairable'"
                  title="Cancel Repair Request"
                >
                <i class='bx bxs-x-circle'></i>
                </button>

                <button 
                @click="viewRepair(repair)" class="btn btn-note"
                title="View Details"
                >
                  <i class="bx bx-show"></i>
                </button>
              </td>
              <!-- <td v-if="repair.status.toLowerCase() === 'cancelled'">
                <button @click="openNoteModal(repair.comment)" class="btn btn-note">
                  <i class="bx bx-message-square-detail"></i> View Note
                </button>
              </td> -->
            </tr>
            <tr v-if="paginatedRepairs.length === 0">
              <td colspan="7"><strong>No records found.</strong></td>
            </tr>
          </tbody>
        </table>

        <!-- <div class="pagination-controls">
          <span class="page-indicator">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button @click="previousPage" :disabled="currentPage === 1" class="prev-btn">Previous</button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="next-btn">Next</button>
        </div> -->
      </div>
    </div>
  </div>

  <ConfirmationDialog
    :show="showConfirmationDialog"
    @close="showConfirmationDialog = false"
    @confirm="updateStatusToOnGoing"
    :message="confirmationMessage"
  />

  <!-- Modal for Viewing Note -->
  <div v-if="showNoteModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Note From Admin</h3>
      <p>{{ selectedNote || "No reason provided" }}</p>
      <div class="modal-actions">
        <button @click="showNoteModal = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import Swal from 'sweetalert2'
import ConfirmationDialog from '../layouts/ConfirmationDialog.vue';

const authStore = useAuthStore();
const router = useRouter();
const repairs = ref([]);
const errors = ref(null);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showNoteModal = ref(false);
const selectedNote = ref("");

const selectedRepair = ref(null);
const showConfirmationDialog = ref(false);
const confirmationMessage = ref('');
const isLoading = ref(false);

const showToast = (icon, title) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

// Fetch Repairs for User
const fetchRepairs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customer-details/my-list/repair`, getHeaderConfig(authStore.access_token));
    repairs.value = response.data.data.map(repair => ({
      ...repair,
      user: repair.user || { first_name: 'N/A', last_name: 'N/A' },
      description: repair.description || 'No description available',
    }));

    repairs.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    showToast("error", "Failed to load records. Please try again.");
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
    await axios.patch(`${BASE_URL}/customer-details/${selectedRepair.value.id}/status`, { status: 'Cancelled' }, getHeaderConfig(authStore.access_token));
    
    const repair = repairs.value.find(r => r.id === selectedRepair.value.id);
    if (repair) repair.status = 'Cancelled';

    showToast("success", "Cancelled successfully");
  } catch (error) {
    console.error(`Error updating repair status to Cancelled:`, error);
    const errorMessage = error.response?.data?.message || 'Error updating repair status';
    showToast("error", errorMessage);
  } finally {
    isLoading.value = false;
    showConfirmationDialog.value = false;
  }
};

// Format Date
const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-US', options);
  }
  return 'N/A';
};

// Open Note Modal
const openNoteModal = (note) => {
  selectedNote.value = note;
  showNoteModal.value = true;
};

// Filtered Repairs
const filteredRepairs = computed(() => {
  return repairs.value.filter(repair => {
    const searchText = searchQuery.value.toLowerCase();
    const fullName = `${repair.user?.first_name || ''} ${repair.user?.last_name || ''}`.toLowerCase();
    return fullName.includes(searchText);
  });
});

// Paginated Repairs
const paginatedRepairs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredRepairs.value.slice(start, start + itemsPerPage.value);
});

// Total Pages
const totalPages = computed(() => {
  return Math.ceil(filteredRepairs.value.length / itemsPerPage.value);
});

// Navigate Pages
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const viewRepair = (repair) => {
  const description = repair.description.toLowerCase();
  
  if (description.includes("networking") || description.includes("cctv installation")) {
    router.push({ name: 'user-inquiries-view', params: { id: repair.id } });
  } else {
    router.push({ name: 'user-form', params: { id: repair.id, view: 'view' } });
  }
};

// Show "Note" Column only if at least one repair is Cancelled
const showCancelledColumn = computed(() => {
  return repairs.value.some(repair => repair.status.toLowerCase() === 'cancelled');
});

// Status Styling
const statusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'badge badge-pending';
    case 'completed':
      return 'badge badge-completed';
    case 'in progress':
      return 'badge badge-progress';
    case 'cancelled':
      return 'badge badge-canceled';
    default:
      return 'badge badge-default';
  }
};

onMounted(() => {
  fetchRepairs();
});
</script>

<style lang="scss" scoped>
.content {
    padding: 110px 40px 40px 40px;
}

.table-body {
  margin-top: 10px;
}

.badge {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 5px;
  font-weight: bold;
  display: inline-block;
  text-transform: uppercase;
}

.badge-pending {
  background-color: #CBA135;
  color: white;
}

.badge-completed {
  background-color: #2B5B3F;
  color: white;
}

.badge-progress {
  background-color: var(--header);
  color: white;
}

.badge-canceled {
  background-color: #6A040F;
  color: white;
}

.badge-default {
  background-color: #6c757d;
  color: white;
}

.btn-note {
  background-color: var(--header);
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 2px;
}

.btn-note:disabled {
  background-color: #ccc; /* Gray out the background */
  color: #666; /* Lighter text color */
  cursor: not-allowed; /* Show not-allowed cursor */
  opacity: 0.6; /* Reduce opacity */
}

.btn-note {
  background-color: var(--header);
}

.btn-note:hover {
  background-color: var(--main);
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
  }
  .modal-actions {
    padding: 6px;
    border-radius: 10px;
    background-color: var(--main);
    color: white;
    transition: background-color 0.3s ease, transform 0.2s ease;
    border: none;
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
