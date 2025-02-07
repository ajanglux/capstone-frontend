<template>
  <div class="background-container">
    <div class="con-container">
      <div class="contact-info">
        <h2>Enter Code: </h2>
        <input type="text" v-model="code" placeholder="Code" />
        <button @click="fetchStatus">Show Status</button>

        <div v-if="isLoading">
          <p>Loading status...</p>
        </div>

        <div v-if="errorMessage" class="error">
          <p>{{ errorMessage }}</p>
        </div>

        <div v-if="status">
          <div class="timeline-container">
            <div class="timeline-item" :class="{ active: isActive('On-Going') }">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <p class="timeline-location">Device Received</p>
                <p v-if="onGoingUpdatedAt">Updated on: {{ formattedOnGoingUpdatedAt }} <br>Your repair status is: On-going</p>
                <p v-else>Not Yet available</p>
              </div>
            </div>

            <div class="timeline-item" :class="{ active: isActive('Finished') }">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <p class="timeline-location">Repair Finished</p>
                <p v-if="finishedUpdatedAt || finishedStatusAvailable">Updated on: {{ formattedFinishedUpdatedAt }}: <br>Your device has been successfully repaired.</p>
                <p v-else>Not Yet available</p>
              </div>
            </div>

            <div class="timeline-item" :class="{ active: isActive('Ready-for-Pickup') }">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <p class="timeline-location">Ready for Pickup</p>
                <p v-if="readyForPickupUpdatedAt">Updated on: {{ formattedReadyForPickupUpdatedAt }}: <br>Our shop is open from 9 AM to 5 PM.<br> You can pick up your device from our shop at any time now.</p>
                <p v-else>Not Yet available</p>
              </div>
            </div>

            <div class="timeline-item" :class="{ active: isActive('Completed') }">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <p class="timeline-location">Repair Completed</p>
                <p v-if="completedUpdatedAt">Updated on: {{ formattedCompletedUpdatedAt }}: <br>The device has been successfully returned, and the process is now complete.</p>
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
const finishedStatusAvailable = ref(false); // New reactive variable

const fetchStatus = async () => {
  status.value = null;
  onGoingUpdatedAt.value = null;
  finishedUpdatedAt.value = null;
  readyForPickupUpdatedAt.value = null;
  completedUpdatedAt.value = null;
  errorMessage.value = '';
  isLoading.value = true;
  finishedStatusAvailable.value = false; // Reset on each fetch

  try {
    if (code.value) {
      const response = await axios.get(`${BASE_URL}/customer-details/status/${code.value}`);
      status.value = response.data.data.status;
      onGoingUpdatedAt.value = response.data.data.on_going_updated_at;
      finishedUpdatedAt.value = response.data.data.finished_updated_at;
      readyForPickupUpdatedAt.value = response.data.data.ready_for_pickup_updated_at;
      completedUpdatedAt.value = response.data.data.completed_updated_at;

      if (status.value === 'Ready-for-Pickup' && !finishedUpdatedAt.value) {
        finishedStatusAvailable.value = true; // Set to available if condition met
      }
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
  const order = ['On-Going', 'Finished', 'Ready-for-Pickup', 'Completed'];
  const currentIndex = order.indexOf(status.value);
  const checkIndex = order.indexOf(checkStatus);
  return checkIndex <= currentIndex;
};
</script>

<style lang="scss" scoped>
.background-container {
  background: var(--header);
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  // align-items: center;
  padding-bottom: 20px;
}
h2 {
  color: var(--header);
}

.con-container {
  margin-top: 8pc;
  width: auto;
  transition: all 0.3s ease-out;
}

.contact-info {
  background: var(--light);
  padding: 30px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 13px;
  // height: 35pc;

  button {
    background-color: var(--main);
    color: white;
    border: none;
    border-radius: 3px;
    margin-left: 10px;
    padding: 1px 8px;
    font-size: 16px;
    cursor: pointer;
  }

  input {
    font-family: 'Poppins';
    width: 400px;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;

    &:focus {
      border: 1px solid var(--header);
    }
  }

  .timeline-container {
    display: flex;
    flex-direction: column;
    gap: 0px;
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

@media (max-width: 780px) {
  .con-container {
   margin: 8pc 3pc 3pc 3pc;
  }
}

@media (max-width: 535px) {
  .background-container {
    display: flex;
    padding-bottom: 40px;
    align-items: unset;
  }

  .con-container {
   margin: 8pc 2pc 3pc 2pc;
  }

  .contact-info {
    height: auto;
  }
}

@media (max-width: 500px) {
  .background-container {
    display: flex;
    padding-bottom: 40px;
    align-items: unset;
  }

  .con-container {
    margin-top: 110px;
    width: 90%;
  }

  .contact-info {
    height: auto;
    padding: 25px;
    h2 { font-size: 20px; }
    p { font-size: 14px; }

    input {
      width: 100%;
    }

    button {
      margin-left: 0px;
    }

    .timeline-content {
      .timeline-location {
        font-size: 16px;
      }
    }
  }
}
</style>
