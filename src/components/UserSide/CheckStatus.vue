<template>
  <div class="background-container">
    <div class="con-container">
      <div class="contact-info">
        <h2>Enter Code: </h2>
        <input type="text" v-model="code" placeholder="Code" @input="fetchStatus" />

        <div v-if="isLoading">
          <p>Loading status...</p>
        </div>

        <div v-if="errorMessage" class="error">
          <p>{{ errorMessage }}</p>
        </div>

        <div v-if="status">
          <div class="info" v-if="status === 'on-going'">
            <p>Progress Status: On-going</p>
            <h1>Your device is being worked on.</h1>
          </div>

          <div class="info" v-if="status === 'finished'">
            <p>Progress Status: Finished</p>
            <h1>Your device repair is finished.</h1>
          </div>

          <div class="info" v-if="status === 'ready-for-pickup'">
            <p>Progress Status: Ready for Pick up</p>
            <h1>Your device is ready for pickup.</h1>
          </div>

          <div class="info" v-if="status === 'completed'">
            <p>Progress Status: Completed</p>
            <h1>Your repair has been successfully completed.</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';

const code = ref('');
const status = ref(null);
const errorMessage = ref('');
const isLoading = ref(false);

const fetchStatus = async () => {

  status.value = null;
  errorMessage.value = '';
  isLoading.value = true;

  try {
    if (code.value) {
      const response = await axios.get(`${BASE_URL}/customer-details/status/${code.value}`);
      status.value = response.data.data.status;
    }
  } catch (error) {
    errorMessage.value = 'Invalid code or no status found.';
  } finally {
    isLoading.value = false;
  }
};
</script>
  
<style scoped>
.background-container {
  position: relative;
  background: var(--header);
  background-size: cover;
  height: 100vh;
  width: 100%; 
  justify-content: center;
  align-items: center;
  padding: 0;
  z-index: 1;
}

.con-container {
  display: flex;
  margin-top: 10pc;
  height: 65%;

  .contact-info {
    margin: 0 15pc 0 15pc;
    background: var(--light);
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    padding: 25px;
    /* padding-bottom: 20pc; */
    width: 100%;

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 5px;
      
      p {
        font-size: 16px;
        padding-top: 7px;
      }

      h1 {
        font-size: 16px;
      }
    }

  }
}
</style>