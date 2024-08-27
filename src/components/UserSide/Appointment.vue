<template>
  <div :class="['content', { 'content-expanded': !isSidebarVisible }]">
    <div class="container">
      <div class="card-header">
        <h2>CURRENT APPOINTMENTS</h2>
        <router-link class="button" to="/booking/create">
          <span class="text"> <i class='bx bxs-plus-square' ></i> ADD BOOKING</span>
        </router-link>
      </div>

      <div class="table-body">
        <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{{ success }}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Device Brand</th>
              <th>Details</th>
              <th>Booking Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th v-if="showActions">Actions</th>
            </tr>
          </thead>
          <tbody v-if="filteredBookings.length > 0">
            <tr v-for="(data, index) in filteredBookings" :key="index">
              <td>{{ data.meeting_title }}</td>
              <td>{{ data.description }}</td>
              <td>{{ data.booking_date }}</td>
              <td>{{ data.start_time }}</td>
              <td>{{ data.end_time }}</td>
              <td>
                <span :class="statusClass(data.status)">
                  {{ formatStatus(data.status) }}
                </span>
              </td>
              <td v-if="showActions" class="actions">
                <router-link 
                  v-if="data.status === 'pending'"
                  :to="{ name: 'EditBooking', params: { id: data.id }}" 
                  class="btn btn-warning me-2"
                >
                  Reschedule</router-link>
                
                <span 
                  v-else 
                  class="btn btn-warning me-2 disabled"
                  style="pointer-events: none; cursor: default;"
                >
                  Reschedule</span>
                
                <button 
                  @click="cancelBooking(data)" 
                  type="button" 
                  class="btn btn-secondary" 
                  :disabled="data.status !== 'pending'"
                >
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7"><strong>No bookings available.</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../../stores/useAuthStore'
import { isSidebarVisible } from '../../stores/store.js';

const store = useAuthStore()
const booking = ref([])
const success = ref('')
const showActions = ref(true)

const getBooking = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/booking', {
      headers: {
        Authorization: `Bearer ${store.access_token}`
      }
    })
    booking.value = response.data.data.data
  } catch (error) {
    console.error('Error fetching bookings:', error.response ? error.response.data : error.message)
  }
}

const cancelBooking = async (booking) => {
  if (confirm('Are you sure you want to cancel this booking?')) {
    try {
      const response = await axios.post(`http://localhost:8000/api/booking/${booking.id}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${store.access_token}`
        }
      })
      console.log('Booking cancelled successfully:', response.data)
      booking.status = 'cancelled' 
    } catch (error) {
      console.error('Error cancelling the booking:', error.response ? error.response.data : error.message)
      alert('Error cancelling the booking: ' + error.message)
    }
  }
}

const statusClass = (status) => {
  switch (status) {
    case 'approved':
      return 'badge bg-success'
    case 'pending':
      return 'badge bg-warning'
    default:
      return 'badge bg-secondary'
  }
}

const formatStatus = (status) => {
  switch (status) {
    case 'approved':
      return 'Approved'
    case 'pending':
      return 'Pending'
    default:
      return 'Unknown'
  }
}

const filteredBookings = computed(() => {
  return booking.value
    .filter(b => b.status === 'pending' || b.status === 'approved')
    .sort((a, b) => new Date(b.booking_date) - new Date(a.booking_date))
})

onMounted(() => {
  if (store.isAuthenticated) {
    getBooking()
  } else {
    // Handle redirection or show a message if the user is not authenticated
  }
})
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
