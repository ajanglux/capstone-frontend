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
          <div class="timeline-container">
            <div class="timeline-item" :class="{ active: isActive('on-going') }">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <p class="timeline-location">Device Received</p>
                <p>Your Device status is: On-going</p>
                <p v-if="onGoingUpdatedAt">Updated on: {{ formattedOnGoingUpdatedAt }}</p>
              </div>
            </div>

            <div class="timeline-item" :class="{ active: isActive('finished') }">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <p class="timeline-location">Repair Finished</p>
                <!-- <p>Status: Finished</p> -->
                <p v-if="finishedUpdatedAt">Updated on: {{ formattedFinishedUpdatedAt }}: <br>Your device is Finished</p>
                <p v-else>Not Yet available</p>
              </div>
            </div>

            <div class="timeline-item" :class="{ active: isActive('ready-for-pickup') }">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <p class="timeline-location">Ready for Pickup</p>
                <!-- <p>Status: Ready for Pickup</p> -->
                <p v-if="readyForPickupUpdatedAt">Updated on: {{ formattedReadyForPickupUpdatedAt }}: <br>You can pickup your device at our shop anytime now.</p>
                <p v-else>Not Yet available</p>
              </div>
            </div>
            
            <div class="timeline-item" :class="{ active: isActive('completed') }">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <p class="timeline-location">Repair Completed</p>
                <!-- <p>Status: Completed</p> -->
                <p v-if="completedUpdatedAt">Updated on: {{ formattedCompletedUpdatedAt }}: <br>The process is Completed, Thank you for choosing Techfix!</p>
                <p v-else>Not Yet available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';

const code = ref('');
const status = ref(null);
const onGoingUpdatedAt = ref(null);
const finishedUpdatedAt = ref(null);
const readyForPickupUpdatedAt = ref(null);
const completedUpdatedAt = ref(null);
const errorMessage = ref('');
const isLoading = ref(false);

const fetchStatus = async () => {
  status.value = null;
  onGoingUpdatedAt.value = null;
  finishedUpdatedAt.value = null;
  readyForPickupUpdatedAt.value = null;
  completedUpdatedAt.value = null;
  errorMessage.value = '';
  isLoading.value = true;

  try {
    if (code.value) {
      const response = await axios.get(`${BASE_URL}/customer-details/status/${code.value}`);
      status.value = response.data.data.status;
      onGoingUpdatedAt.value = response.data.data.on_going_updated_at;
      finishedUpdatedAt.value = response.data.data.finished_updated_at;
      readyForPickupUpdatedAt.value = response.data.data.ready_for_pickup_updated_at;
      completedUpdatedAt.value = response.data.data.completed_updated_at;
    }
  } catch (error) {
    errorMessage.value = 'Invalid code or no status found.';
  } finally {
    isLoading.value = false;
  }
};

const formattedOnGoingUpdatedAt = computed(() => formatDate(onGoingUpdatedAt.value));
const formattedFinishedUpdatedAt = computed(() => formatDate(finishedUpdatedAt.value));
const formattedReadyForPickupUpdatedAt = computed(() => formatDate(readyForPickupUpdatedAt.value));
const formattedCompletedUpdatedAt = computed(() => formatDate(completedUpdatedAt.value));

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-US', options);
  }
  return '';
};

const isActive = (checkStatus) => {
  const order = ['on-going', 'finished', 'ready-for-pickup', 'completed'];
  const currentIndex = order.indexOf(status.value);
  const checkIndex = order.indexOf(checkStatus);
  return checkIndex <= currentIndex;
};
</script>

<style scoped>
.background-container {
  background: var(--header);
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.con-container {
  margin-top: 5pc;
  width: 70%;
}

.contact-info {
  background: var(--light);
  border-radius: 15px;
  padding: 25px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 13px;
  height: 35pc;

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .timeline-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }

  .timeline-item {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 40px;
    margin-bottom: 20px;

    &.active .timeline-dot {
      background-color: #4CAF50;
    }
  }

  .timeline-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #ccc;
    position: absolute;
    left: 0;
  }

  .timeline-content {
    p {
      margin: 0;
    }

    .timeline-location {
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
