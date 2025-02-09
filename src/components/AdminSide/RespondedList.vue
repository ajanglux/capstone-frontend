<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>RESPONDED LIST</h2>
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
              <th>Description</th>
              <th>Status</th>
              <!-- <th>Actions</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(repair, index) in paginatedRepairs" :key="repair.id">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ repair.user?.first_name || 'N/A' }} {{ repair.user?.last_name || 'N/A' }}</td>
              <td>{{ repair.user?.email }}</td>
              <td>{{ repair.user?.phone_number }}</td>
              <td>{{ repair.user?.address }}</td>
              <td>{{ repair.description }}</td>
              <td>{{ repair.status || 'PENDING' }}</td>
              <!-- <td class="actions">
                <button @click="openRespondModal(repair)"
                title="Unrepairable">
                  <i class='bx bxs-x-circle'></i>
                </button>
                <button 
                  class="btn"
                  @click="confirmStatusChange(repair)"
                  title="On-Going">
                  <i class="bx bx-show"></i>
                </button>
              </td> -->
            </tr>
            <tr v-if="paginatedRepairs.length === 0">
              <td colspan="7"><strong>No Responded found.</strong></td>
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
      @confirm="updateStatusToOnGoing"
      :message="confirmationMessage"
    />
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
import { BASE_URL } from '../../helpers/baseUrl';
import { getHeaderConfig } from '../../helpers/headerConfig';
import { useAuthStore } from '../../stores/useAuthStore';
import ConfirmationDialog from '../layouts/ConfirmationDialog.vue';
import { useToast } from 'vue-toastification'

const authStore = useAuthStore();
const repairs = ref([]);
const errors = ref(null);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const toast = useToast()
const isLoading = ref(false);
const showRespondModal = ref(false);
const commentText = ref('');
const existingComment = ref('');
const selectedRepair = ref(null);

const showConfirmationDialog = ref(false);
const confirmationMessage = ref('');

const fetchRepairs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customer-details`, getHeaderConfig(authStore.access_token));
    repairs.value = response.data.data;
    
    repairs.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    repairs.value.forEach(repair => {
      selectedActions.value[repair.id] = '';
    });
  } catch (error) {
    // toast.error('Failed to load Inquiries details. Please try again.', { timeout: 3000 });
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
  return repairs.value
    .filter(repair => repair.status === 'Responded')
    .filter(repair => {
      const searchText = searchQuery.value.toLowerCase();
      const fullName = `${repair.first_name || ''} ${repair.last_name || ''}`.toLowerCase();
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

.actions {
  display: flex;
}

button {
  color: var(--light);
  background-color: var(--main);
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
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

.submit, .cancel {
  color: var(--light);
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
