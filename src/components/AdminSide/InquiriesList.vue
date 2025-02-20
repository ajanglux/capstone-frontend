<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>LIST OF INQUIRIES</h2>
        <div class="left-card">
        </div>
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
              <th>Client</th>
              <th>Date & Time</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(repair, index) in paginatedRepairs" :key="repair.id">
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td>{{ repair.user?.first_name || 'N/A' }} {{ repair.user?.last_name || 'N/A' }}</td>
                <td>{{ formatDate(repair.created_at) }}</td>
                <td>{{ repair.description || 'No description available' }}</td>
                <td>{{ repair.status || 'PENDING' }}</td>
                <td class="actions">
                  <div class="custom-select">
                    <div class="select-icon">
                      <select v-model="selectedActions[repair.id]" @change="handleActionChange(repair.id)">
                        <option value="">Select</option>
                        <option value="view">View Details</option>
                        <option value="Accept">Accept</option>
                        <option value="Unrepairable">Service Not Possible</option>
                        <!-- <option value="Responded">Respond</option> -->
                      </select>
                    </div>
                  </div>
                </td>
              </tr>
            <tr v-if="paginatedRepairs.length === 0">
              <td colspan="7"><strong>No pending inquiries found.</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination-controls">
        <span class="page-indicator">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button @click="previousPage" :disabled="currentPage === 1" class="prev-btn">Previous</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="next-btn">Next</button>
      </div>
    </div>

    <ConfirmationDialog
      :show="showConfirmationDialog"
      @close="showConfirmationDialog = false"
      @confirm="confirmStatusChange"
      :message="confirmationMessage"
    />
  </div>

  <div v-if="showCommentModal" class="modal-overlay" @click.self="showCommentModal = false">
    <div class="modal-content">
      <h3>{{ existingComment ? 'Edit Respond' : 'Add Respond' }}</h3>
      <div class="user-inqui">
        <p class="description-text">
          <strong>Customer Inquiry:</strong> {{ selectedRepair?.description || 'No description available.' }}
        </p>
      </div>
      <textarea v-model="commentText" placeholder="Enter your respond..."></textarea>
      <div class="modal-actions">
        <button class="submit" @click="submitComment">{{ existingComment ? 'Update' : 'Submit' }}</button>
        <button class="cancel" @click="showCommentModal = false">Cancel</button>
      </div>
    </div>
  </div>

  <div v-if="showRespondModal" class="modal-overlay" @click.self="showRespondModal = false">
    <div class="modal-content">
      <h3>{{ existingComment ? 'Edit Comment' : 'Add Comment' }}</h3>
      <textarea v-model="commentText" placeholder="Enter your comment..."></textarea>
      <div class="modal-actions">
        <button class="submit" @click="submitRespond">{{ existingComment ? 'Update' : 'Submit' }}</button>
        <button class="cancel" @click="showRespondModal = false">Cancel</button>
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
import ConfirmationDialog from '../layouts/ConfirmationDialog.vue';
import { useToast } from 'vue-toastification'

const authStore = useAuthStore();
const router = useRouter();
const repairs = ref([]);
const errors = ref(null);
const showConfirmationDialog = ref(false);
const confirmationMessage = ref('');
const selectedRepairId = ref(null);
const selectedActions = ref({});
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const toast = useToast()
const selectedRepair = ref(null);
const showCommentModal = ref(false);
const showRespondModal = ref(false);
const commentText = ref('');
const existingComment = ref('');
const selectedStatusAction = ref(false);
const isLoading = ref(false); 

const openCommentModal = (repair) => {
  if (!repair || !repair.id) {
    toast.error('Invalid repair object!');
    return;
  }

  selectedRepair.value = repair;
  existingComment.value = repair.comment || ''; 
  commentText.value = repair.comment || ''; 
  showCommentModal.value = true;
};

const submitComment = async () => {
  if (!commentText.value.trim()) {
    toast.error('Comment cannot be empty.');
    return;
  }

  try {
    if (selectedRepair.value && selectedRepair.value.id) {
      await axios.put(`${BASE_URL}/customer-details/comment/${selectedRepair.value.id}`, 
        { comment: commentText.value },
        getHeaderConfig(authStore.access_token)
      );

      await axios.patch(`${BASE_URL}/customer-details/${selectedRepair.value.id}/status`, 
        { status: 'Unrepairable' }, 
        getHeaderConfig(authStore.access_token)
      );

      toast.success('Comment added & status updated.');
      selectedRepair.value.comment = commentText.value;
      selectedRepair.value.status = 'Unrepairable';
      showCommentModal.value = false;
      fetchRepairs();
    } else {
      toast.error('Repair ID not found!');
    }
  } catch (error) {
    toast.error('Failed to update comment & status.');
  }
};

const openRespondModal = (repair) => {
  if (!repair || !repair.id) {
    toast.error('Invalid repair object!');
    return;
  }

  selectedRepair.value = repair;
  existingComment.value = repair.comment || ''; 
  commentText.value = repair.comment || '';
  showRespondModal.value = true;
};

const submitRespond = async () => {
  if (!commentText.value.trim()) {
    toast.error('Comment cannot be empty.');
    return;
  }

  try {
    if (selectedRepair.value && selectedRepair.value.id) {
      await axios.put(`${BASE_URL}/customer-details/comment/${selectedRepair.value.id}`, 
        { comment: commentText.value },
        getHeaderConfig(authStore.access_token)
      );

      await axios.patch(`${BASE_URL}/customer-details/${selectedRepair.value.id}/status`, 
        { status: 'Responded' }, 
        getHeaderConfig(authStore.access_token)
      );

      toast.success('Comment added & status updated.');
      selectedRepair.value.comment = commentText.value;
      selectedRepair.value.status = 'Responded';
      showCommentModal.value = false;
      fetchRepairs();
    } else {
      toast.error('Repair ID not found!');
    }
  } catch (error) {
    toast.error('Failed to update comment & status.');
  }
};

const fetchRepairs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customer-details`, getHeaderConfig(authStore.access_token));
    repairs.value = response.data.data.map(repair => ({
      ...repair,
      user: repair.user || { first_name: 'N/A', last_name: 'N/A', email: 'N/A', phone_number: 'N/A', address: 'N/A' },
      description: repair.description || 'No description available'
    }));

    repairs.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    repairs.value.forEach(repair => {
      selectedActions.value[repair.id] = '';
    });
  } catch (error) {
    toast.error('Failed to load Inquiries details. Please try again.', { timeout: 3000 });
  }
};

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-US', options);
  }
  return '';
};


const filteredRepairs = computed(() => {
  return repairs.value
    .filter(repair => repair.status === 'Pending')
    .filter(repair => {
      const searchText = searchQuery.value.toLowerCase();
      const fullName = `${repair.user?.first_name || ''} ${repair.user?.last_name || ''}`.toLowerCase();
      return fullName.includes(searchText);
    });
});

const paginatedRepairs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredRepairs.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredRepairs.value.length / itemsPerPage.value);
});

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

const handleActionChange = (repairId) => {
  const action = selectedActions.value[repairId];
  if (action === 'Responded') {
    const repair = repairs.value.find(r => r.id === repairId);
    if (repair) {
      selectedRepair.value = repair;
      showRespondModal.value = true;
    }
  } else if (action === 'delete') {
    confirmDelete(repairId);
  } else if (action === 'view') {
    viewRepair(repairId);
  } else if ( action === 'Unrepairable' ){
    const repair = repairs.value.find(r => r.id === repairId);
    if (repair) {
      selectedRepair.value = repair;
      showCommentModal.value = true;
    }
  } else {
    selectedRepairId.value = repairId;
    selectedStatusAction.value = action;
    confirmationMessage.value = `Are you sure you want to mark this repair as ${action}?`;
    showConfirmationDialog.value = true;
  }
};

const confirmStatusChange = () => {
  if (selectedStatusAction.value === 'Accept') {
    markAsAccept(selectedRepairId.value);
  }
  showConfirmationDialog.value = false;
};

const updateStatus = async (id, status) => {
  isLoading.value = true; // Start loading
  try {
    await axios.patch(`${BASE_URL}/customer-details/${id}/status`, { status }, getHeaderConfig(authStore.access_token));
    fetchRepairs();
    toast.success("Status updated successfully", { timeout: 3000 });
  } catch (error) {
    console.error(`Error updating repair status to ${status}:`, error);
    const errorMessage = error.response?.data?.message || `Error updating repair status to ${status}`;
    toast.error(errorMessage, { timeout: 4700 });
  } finally {
    isLoading.value = false; // Stop loading
  }
};

const markAsAccept = (id) => {
  updateStatus(id, 'On-Going');
};

const viewRepair = (id) => {
  router.push({ name: 'inquiries-view', params: { id } });
};

onMounted(() => {
  fetchRepairs();
});
</script>



<style lang="scss" scoped>
.custom-select {
  position: relative;
  display: inline-block;
  width: 100%;

  select {
    width: 100%;
    cursor: pointer;
  }
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
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}

textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
  outline: none;
  border-radius: 5px;
  font-family: 'Poppins';
}

.modal-actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.description-text {
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}
.description-text strong {
  color: #333;
}

button {
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.submit {
  background: var(--main);
}

.submit:hover {
  background: var(--main-hover);
}

.cancel {
  background: var(--table);
}

.cancel:hover {
  background: var(--grey);
}
</style>
