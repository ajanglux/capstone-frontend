<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>LIST OF REPAIRS</h2>
        <div class="left-card">
          <router-link class="button" to="/repair-history">
            <span class="text"><i class='bx bx-history'></i>History</span>
          </router-link>
          <router-link class="button" to="/repair-form">
            <span class="text"><i class='bx bxs-plus-square'></i> ADD REPAIR INFO</span>
          </router-link>
        </div>
      </div>
      <div class="table-body">
        <div class="table-header">
          <div class="searchbar">
            <i class='bx bx-search'></i>
            <input type="text" placeholder="Search..." v-model="searchQuery">
          </div>
          <div class="filters">
            <select v-model="selectedStatus">
              <option value="">All</option>
              <option value="Incomplete">Incomplete</option>
              <option value="On-Going">On-going</option>
              <option value="Finished">Finished</option>
              <option value="Ready-for-Pickup">Ready</option>
            </select>
          </div>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>Date & Time</th>
              <th>Code</th>
              <th>Client</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(repair, index) in paginatedRepairs" :key="repair.id">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ formatDate(repair.created_at) }}</td>
              <td>{{ repair.code }}</td>
               <td>{{ repair.user?.first_name || 'N/A' }} {{ repair.user?.last_name || 'N/A' }}</td>
              <td>{{ repair.status || 'ON GOING' }}</td>
              <td class="actions">
                <div class="custom-select">
                  <select v-model="selectedActions[repair.id]" @change="handleActionChange(repair.id)">
                    <option value="">Select Action</option>
                    <option value="edit">Edit</option>
                    <option value="Note">Note</option>
                    <option value="">Print Statement</option>
                    <!-- <option value="Cancelled" :disabled="repair.status === 'Cancelled' || repair.status === 'Finished' || repair.status === 'On-Going' || repair.status === 'Ready-for-Pickup' || repair.status === 'Completed'">Cancel</option> -->
                  </select>
                </div>
              </td>
              <td class="actions">
                <div class="custom-select">
                  <select v-model="selectedActions[repair.id]" @change="handleActionChange(repair.id)">
                    <option value="">Select Status</option>
                    <option value="Unrepairable" :disabled="repair.status === 'Cancelled' || repair.status === 'Finished' || repair.status === 'Ready-for-Pickup' || repair.status === 'Completed'">Unrepairable</option>
                    <option value="On-Going" :disabled="repair.status === 'On-Going' || repair.status === 'Cancelled' || repair.status === 'Finished' || repair.status === 'Ready-for-Pickup' || repair.status === 'Completed'">On-Going</option>
                    <option value="Finished" :disabled="repair.status === 'Finished' || repair.status === 'Ready-for-Pickup' || repair.status === 'Cancelled' || repair.status === 'Completed'">Finished</option>
                    <option value="Ready-for-Pickup" :disabled="repair.status === 'Ready-for-Pickup' || repair.status === 'Cancelled' || repair.status === 'Incomplete' || repair.status === 'On-Going'">Ready For Pickup</option>
                    <option value="Completed" :disabled="repair.status === 'Incomplete' || repair.status === 'On-Going' || repair.status === 'Finished' ">Completed</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr v-if="paginatedRepairs.length === 0">
              <td colspan="7"><strong>No repairs found.</strong></td>
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

  <div v-if="showCommentModal" class="modal-overlay">
    <div class="modal-content">
      <h3>{{ existingComment ? 'Edit Comment' : 'Add Comment' }}</h3>
      <textarea v-model="commentText" placeholder="Enter your comment..."></textarea>
      <div class="modal-actions">
        <button @click="submitComment">{{ existingComment ? 'Update' : 'Submit' }}</button>
        <button @click="showCommentModal = false">Cancel</button>
      </div>
    </div>
  </div>

  <div v-if="showNoteModal" class="modal-overlay">
    <div class="modal-content">
      <h3>{{ existingComment ? 'Edit Comment' : 'Add Comment' }}</h3>
      <textarea v-model="commentText" placeholder="Enter your comment..."></textarea>
      <div class="modal-actions">
        <button @click="submitNote">{{ existingComment ? 'Update' : 'Submit' }}</button>
        <button @click="showCommentModal = false">Cancel</button>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import ConfirmationDialog from '../layouts/ConfirmationDialog.vue';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const router = useRouter();
const repairs = ref([]);
const errors = ref(null);
const showConfirmationDialog = ref(false);
const confirmationMessage = ref('');
const selectedRepairId = ref(null);
const selectedActions = ref({});
const selectedStatus = ref('');
const selectedStatusAction = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const toast = useToast();
const selectedRepair = ref(null);
const showCommentModal = ref(false);
const showNoteModal = ref(false);
const commentText = ref('');
const existingComment = ref('');
const isLoading = ref(false); // Added isLoading state

const openCommentModal = (repair) => {
  if (!repair || !repair.id) {
    toast.error('Invalid repair object!');
    return;
  }

  selectedRepair.value = repair;
  existingComment.value = repair.comment || '';  // Store existing comment if available
  commentText.value = repair.comment || '';  // Populate the textarea with existing comment
  showCommentModal.value = true;
};

const openNoteModal = (repair) => {
  if (!repair || !repair.id) {
    toast.error('Invalid repair object!');
    return;
  }

  selectedRepair.value = repair;
  existingComment.value = repair.comment || '';  // Store existing comment if available
  commentText.value = repair.comment || '';  // Populate the textarea with existing comment
  showNoteModal.value = true;
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

const submitNote = async () => {
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

      toast.success('Note Updated');
      selectedRepair.value.comment = commentText.value;
      showNoteModal.value = false;
      fetchRepairs();
    } else {
      toast.error('Repair ID not found!');
    }
  } catch (error) {
    toast.error('Failed to update comment & status.');
  }
};

const fetchRepairs = async () => {
  isLoading.value = true; // Start loading
  try {
    const response = await axios.get(`${BASE_URL}/customer-details`, getHeaderConfig(authStore.access_token));
    repairs.value = response.data.data.map(repair => ({
      ...repair,
      user: repair.user || { first_name: 'N/A', last_name: 'N/A' }
    }));

    repairs.value.sort((a, b) => new Date(a.status_updated_at) - new Date(b.status_updated_at));

    repairs.value.forEach(repair => {
      selectedActions.value[repair.id] = '';
    });
  } catch (error) {
    console.error('Error fetching repairs:', error);
    errors.value = error.response?.data?.message || 'Error fetching repairs';
  } finally {
    isLoading.value = false; // Stop loading
  }
};

const filteredRepairs = computed(() => {
  return repairs.value.filter(repair => {
    let matchesStatus = true;

    if (selectedStatus.value === '') {
      matchesStatus = repair.status === 'On-Going' || repair.status === 'Finished' || repair.status === 'Ready-for-Pickup' || repair.status === 'Unrepairable' || repair.status === 'Responded';
    } else {
      matchesStatus = repair.status === selectedStatus.value;
    }

    const searchText = searchQuery.value.toLowerCase();
    const fullName = `${repair.user?.first_name || ''} ${repair.user?.last_name || ''}`.toLowerCase().trim();
    const matchesSearch = 
      repair.code.toLowerCase().includes(searchText) ||
      fullName.includes(searchText);

    return matchesStatus && matchesSearch;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredRepairs.value.length / itemsPerPage.value);
});

const paginatedRepairs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredRepairs.value.slice(start, start + itemsPerPage.value);
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
  if (action === 'edit') {
    router.push({ name: 'repair-form', params: { id: repairId, view: 'edit' } });
  } else if (action === 'Responded') {
    const repair = repairs.value.find(r => r.id === repairId);
    openCommentModal(repair);
  } else if (action === 'Note') {
    const repair = repairs.value.find(r => r.id === repairId);
    openNoteModal(repair);
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
  if (selectedStatusAction.value === 'Cancelled') {
    markAsCancelled(selectedRepairId.value);
  } else if (selectedStatusAction.value === 'On-Going') {
    markAsOngoing(selectedRepairId.value);
  } else if (selectedStatusAction.value === 'Finished') {
    markAsFinished(selectedRepairId.value);
  } else if (selectedStatusAction.value === 'Ready-for-Pickup') {
    markAsReady(selectedRepairId.value);
  } else if (selectedStatusAction.value === 'Completed') {
    markAsCompleted(selectedRepairId.value);
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

const markAsFinished = (id) => {
  updateStatus(id, 'Finished');
};

const markAsReady = (id) => {
  updateStatus(id, 'Ready-for-Pickup');
};

const markAsCompleted = (id) => {
  updateStatus(id, 'Completed');
};

const markAsCancelled = (id) => {
  updateStatus(id, 'Cancelled');
};

const markAsOngoing = (id) => {
  updateStatus(id, 'On-Going');
};

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-US', options);
  }
  return '';
};

onMounted(() => {
  fetchRepairs();
});
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  display: inline-block;

  select {
    width: 100%;
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
  color: var(--main);
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
