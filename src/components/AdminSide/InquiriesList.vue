<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>LIST OF INQUIRIES</h2>
        <div class="left-card">
          <router-link class="button" to="/responded-list">
            <span class="text"><i class='bx bx-history'></i>Responded</span>
          </router-link>
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
              <th>Email</th>
              <th>Contact No.</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(repair, index) in paginatedRepairs" :key="repair.id">
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td>{{ repair.user?.first_name || 'N/A' }} {{ repair.user?.last_name || 'N/A' }}</td>
                <td>{{ repair.user?.email || 'N/A' }}</td>
                <td>{{ repair.user?.phone_number || 'N/A' }}</td>
                <td>{{ repair.user?.address || 'N/A' }}</td>
                <td>{{ repair.status || 'PENDING' }}</td>
                <td class="actions">
                  <div class="custom-select">
                    <div class="select-icon">
                      <select v-model="selectedActions[repair.id]" @change="handleActionChange(repair.id)">
                        <option value="">Select</option>
                        <option value="view">View</option>
                        <option value="Incomplete">Add to Repair</option>
                        <option value="Responded">Responded</option>
                        <option value="delete">Delete</option>
                      </select>
                      <button @click="openCommentModal(repair)">Comment</button>
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

    <ConfirmationDialog :show="showDeleteDialog" @close="showDeleteDialog = false" @confirm="deleteRepair"/>
  </div>

  <div v-if="showCommentModal" class="modal-overlay" @click.self="showCommentModal = false">
  <div class="modal-content">
    <h3>{{ existingComment ? 'Edit Comment' : 'Add Comment' }}</h3>
    <textarea v-model="commentText" placeholder="Enter your comment..."></textarea>
    <div class="modal-actions">
      <button @click="submitComment">{{ existingComment ? 'Update' : 'Submit' }}</button>
      <button @click="showCommentModal = false">Cancel</button>
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
const showDeleteDialog = ref(false);
const selectedRepairId = ref(null);
const selectedActions = ref({});
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const toast = useToast()
const selectedRepair = ref(null);
const showCommentModal = ref(false);
const commentText = ref('');
const existingComment = ref('');

const openCommentModal = (repair) => {
  selectedRepair.value = repair;
  existingComment.value = repair.comment || '';  // Store existing comment if available
  commentText.value = repair.comment || '';  // Populate the textarea with existing comment
  console.log(repair.comment)
  showCommentModal.value = true;
};

const submitComment = async () => {
  if (!commentText.value.trim()) {
    toast.error('Comment cannot be empty.');
    return;
  }

  try {
    await axios.put(`${BASE_URL}/customer-details/comment/${selectedRepair.value.id}`, 
      { comment: commentText.value },
      getHeaderConfig(authStore.access_token)
    );

    toast.success(existingComment.value ? 'Comment updated successfully' : 'Comment added successfully');
    selectedRepair.value.comment = commentText.value;  // Update local data
    showCommentModal.value = false;
  } catch (error) {
    console.error('Error updating comment:', error);
    toast.error('Failed to update comment. Please try again.');
  }
};

const fetchRepairs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customer-details`, getHeaderConfig(authStore.access_token));
    repairs.value = response.data.data.map(repair => ({
      ...repair,
      user: repair.user || { first_name: 'N/A', last_name: 'N/A', email: 'N/A', phone_number: 'N/A', address: 'N/A' }
    }));

    repairs.value.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    repairs.value.forEach(repair => {
      selectedActions.value[repair.id] = '';
    });
  } catch (error) {
    toast.error('Failed to load Inquiries details. Please try again.', { timeout: 3000 });
  }
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
  if (action === 'Incomplete') {
    setApproved(repairId);
  } else if (action === 'Responded') {
    setResponded(repairId);
  } else if (action === 'delete') {
    confirmDelete(repairId);
  } else if (action === 'view') {
    viewRepair(repairId);
  }
};

const setApproved = async (id) => {
  try {
    await axios.put(`${BASE_URL}/customer-details/${id}`, { status: 'Incomplete' }, getHeaderConfig(authStore.access_token));
    fetchRepairs();
    toast.success("Status update successful", { timeout: 3000 })
  } catch (error) {
    const toast = this.toast();
    toast.error('Error updating status. Please try again.', { timeout: 3000 });
  }
};

const setResponded = async (id) => {
  try {
    await axios.put(`${BASE_URL}/customer-details/${id}`, { status: 'Responded' }, getHeaderConfig(authStore.access_token));
    fetchRepairs();
    toast.success("Status update successful", { timeout: 3000 })
  } catch (error) {
    const toast = this.toast();
    toast.error('Error updating status. Please try again.', { timeout: 3000 });
  }
};

const viewRepair = (id) => {
  router.push({ name: 'inquiries-view', params: { id } });
};

const deleteRepair = async () => {
  try {
    await axios.delete(`${BASE_URL}/customer-details/${selectedRepairId.value}`, getHeaderConfig(authStore.access_token));
    fetchRepairs();
    showDeleteDialog.value = false;
    toast.success("Deleted successful", { timeout: 3000 })
  } catch (error) {
    const toast = this.toast();
    toast.error('Error deleting details. Please try again.', { timeout: 3000 });
  }
};

const confirmDelete = (id) => {
  selectedRepairId.value = id;
  showDeleteDialog.value = true;
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
}

.modal-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
