<template>
  <div class="container">
    <div class="card-header">
      <h3>History</h3>
        <div v-if="isLoading">Loading...</div>
    </div>
      <div class="history">
        <div class="table-header">  
        </div>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <table class="table table-bordered">
          <div v-if="descriptions.length > 0">
              <ul>
                <li v-for="(description, index) in descriptions" :key="index">
                  {{ description.description || description.desc }}
                </li>
              </ul>
          </div>
        </table>
      </div>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '../../stores/useAuthStore';
  import { BASE_URL } from '../../helpers/baseUrl';
  import { getHeaderConfig } from '../../helpers/headerConfig';
  
  const descriptions = ref([]); 
  const errorMessage = ref('');  
  const isLoading = ref(false);  
  
  const authStore = useAuthStore();
  const token = authStore.access_token;

  const fetchDescriptions = async () => {
    isLoading.value = true;
    errorMessage.value = '';  
  
    try {
      const headers = getHeaderConfig(token);
      const response = await axios.get(`${BASE_URL}/customer-details/show-description`, headers);
  
      if (response.data && response.data.data) {
        descriptions.value = response.data.data; 
      } else {
        errorMessage.value = 'No descriptions found.';
      }
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'Failed to fetch descriptions.';
    } finally {
      isLoading.value = false;
    }
  };
  
  onMounted(fetchDescriptions);
  </script>
  

<style lang="scss" scoped>
.container {
  font-family: 'Poppins';
  overflow-x: hidden;
  margin-top: 9pc;
  width: 60%;
  margin-left: 19pc;
  background-color: var(--header);
  border-radius: 10px;

  .history {
    padding: inherit;
    background-color: var(--light);
    color: black;
    border-radius: 10px;
    padding-left: 55px;

    li {
      margin-bottom: 30px;
    }

  }
}

@media (max-width: 1200px) {
  .container {
    margin-left: 15pc;
  }
}

@media (max-width: 850px) {
  .container {
    margin-left: 10pc;
  }
}

@media (max-width: 710px) {
  .container {
    margin-left: 8pc;
  }
}

@media (max-width: 500px) {
  .container {
    margin-left: 5pc;
  }
}

@media (max-width: 40px) {
  .container {
    margin-left: 2pc;
  }
}
</style>
  