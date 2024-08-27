<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h4>CURRENT APPOINTMENTS</h4>
        <router-link class="button" to="/booking/create">
          <span class="text">ADD BOOKING</span>
        </router-link>
      </div>
      <div class="card-body">
        <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{{ success }}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <table class="table table-bordered">
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
              <td v-if="showActions">
                <router-link 
                  v-if="data.status === 'pending'"
                  :to="{ name: 'EditBooking', params: { id: data.id }}" 
                  class="btn btn-warning me-2"
                >
                  Reschedule
                </router-link>
                
                <span 
                  v-else 
                  class="btn btn-warning me-2 disabled"
                  style="pointer-events: none; cursor: default;"
                >
                  Reschedule
                </span>
                
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

<style scoped>
.input-group-text {
  width: 300px;
}
</style>
