<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h2>BOOKING HISTORY (DECLINED AND CANCELLED)</h2>
      </div>
      <div class="table-body">
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
            </tr>
          </thead>
          <tbody v-if="cancelledBookings.length > 0">
            <tr v-for="(data, index) in cancelledBookings" :key="index">
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
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6"><strong>No bookings found.</strong></td>
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

const statusClass = (status) => {
  switch (status) {
    case 'declined':
      return 'badge bg-danger'
    case 'cancelled':
      return 'badge bg-dark'
    default:
      return 'badge bg-secondary'
  }
}

const formatStatus = (status) => {
  switch (status) {
    case 'declined':
      return 'Declined'
    case 'cancelled':
      return 'Cancelled'
    default:
      return 'Unknown'
  }
}

const cancelledBookings = computed(() => {
  return booking.value
    .filter(b => b.status === 'declined' || b.status === 'cancelled')
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
  width: 150px;
}
</style>
