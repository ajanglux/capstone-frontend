<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>LIST OF REPAIRS</h2>
        <router-link class="button" to="/repair-form">
          <span class="text"><i class='bx bxs-plus-square'></i> ADD REPAIR INFO</span>
        </router-link>
      </div>
      <div class="table-body">
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(repair, index) in ongoingRepairs" :key="repair.id">
              <td>{{ index + 1 }}</td>
              <td>{{ formatDate(repair.created_at) }}</td>
              <td>{{ repair.code }}</td>
              <td>{{ repair.first_name || 'N/A' }} {{ repair.last_name || 'N/A' }}</td>
              <td>{{ repair.status || 'ON GOING' }}</td>
              <td class="actions">
                <router-link :to="{ name: 'repair-form', params: { id: repair.id } }" class="btn btn-success btn-sm me-1">
                  View
                </router-link>
                <button class="btn btn-danger btn-sm me-1" @click="confirmDelete(repair.id)">Delete</button>
              </td>
            </tr>
            <tr v-if="ongoingRepairs.length === 0">
              <td colspan="6"><strong>No ongoing repairs found.</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ConfirmationDialog
      :show="showDeleteDialog"
      @close="showDeleteDialog = false"
      @confirm="deleteRepair"
    />
  </div>
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

const fetchRepairs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customer-details`, getHeaderConfig(authStore.access_token));
    repairs.value = response.data.data;
  } catch (error) {
    console.error('Error fetching repairs:', error);
    errors.value = error.response?.data?.message || 'Error fetching repairs';
  }
};

const ongoingRepairs = computed(() => {
  return repairs.value.filter(repair => repair.status === 'on-going');
});

const deleteRepair = async () => {
  try {
    await axios.delete(`${BASE_URL}/customer-details/${selectedRepairId.value}`, getHeaderConfig(authStore.access_token));
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  /* border-bottom: 1px solid var(--main); */

  .button {
    font-size: 16px;
    font-weight: 600;
    color: var(--light);
    background-color: var(--header);
    width: 170px;
    height: 35px;
    padding-left: 20px;
    text-align: center;
    align-content: space-evenly;
    margin-top: -10px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
    transition: .3s;

    i {
      position: absolute;
      margin-top: 4px;
      margin-left: -20px;
    }
  }

  .button:hover {
    box-shadow: 0px 8px 15px -10px rgb(125, 125, 125);
    box-shadow: none;
    background: var(--header);
    cursor: pointer;
    text-decoration: none;
  }
}

.table-body {
  width: 100%;
  padding: 10px;
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  background-color: var(--light);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  overflow-y: auto;

  table {
    border-collapse: collapse;
    width: 100%;
    color: black;

    th {
        background-color: var(--main);
        color: white;
        font-weight: 600;
        letter-spacing: 0.5px;
        font-size: 16px;
        padding-top: 5px;
    }

    th, td {
        font-family: 'Poppins';
        text-align: center;
        padding: 15px;
    }

    td { font-size: 14px; }
    tr { transition: all 0.3s ease; } 
    tr:hover { background-color: var(--light2); }

    .actions {
      display: flex;
      column-gap: 5px;
      justify-content: center;

      .btn-warning {
        background-color: var(--main);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
      }

      .btn-secondary {
        background-color: var(--grey);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
      }

      .btn-success {
        background-color: var(--main);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
      }

      .btn-danger {
        background-color: var(--redbtn);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
      }

      .btn-success {
        background-color: var(--main);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }
}
</style> 