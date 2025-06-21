<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>LIST OF USERS</h2>
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
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in paginatedUsers" :key="user.id">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ user.first_name || 'N/A' }} {{ user.last_name || 'N/A' }}</td>
              <td>{{ user.email || 'N/A' }}</td>
              <td>{{ user.phone_number || 'N/A' }}</td>
            </tr>
            <tr v-if="paginatedUsers.length === 0">
              <td colspan="4"><strong>No users found.</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination-controls">
        <span class="page-indicator">Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="previousPage" :disabled="currentPage === 1" class="prev-btn">Previous</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="next-btn">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { BASE_URL } from '../../helpers/baseUrl'
import { getHeaderConfig } from '../../helpers/headerConfig'
import { useAuthStore } from '../../stores/useAuthStore'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const toast = useToast()

const users = ref([])
const errors = ref(null)
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/list`, getHeaderConfig(authStore.access_token))
    users.value = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } catch (error) {
    console.error(error)
    errors.value = 'Failed to fetch users.'
    toast.error(errors.value)
  }
}

const filteredUsers = computed(() => {
  const search = searchQuery.value.toLowerCase()
  return users.value.filter(user => {
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase()
    return fullName.includes(search)
  })
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredUsers.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

onMounted(() => {
  fetchUsers()
})
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
