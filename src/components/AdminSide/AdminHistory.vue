<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h4>BOOKINGS</h4>
      </div>
      <div class="card-body">
        <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>{{ success }}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Meeting Title</th>
              <th>Details</th>
              <th>Booking Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>User</th> 
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
              <td>{{ data.user.name }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7"><strong>No bookings found.</strong></td>
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
const bookings = ref([])
const success = ref('')

const getBookings = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/booking', {
      headers: {
        Authorization: `Bearer ${store.access_token}` 
      }
    })
    bookings.value = response.data.data.data
  } catch (error) {
    console.error('Error fetching bookings:', error.response ? error.response.data : error.message)
  }
}

// Determine the CSS class for booking status
const statusClass = (status) => {
  switch (status) {
    case 'approved':
      return 'badge bg-success'
    case 'declined':
      return 'badge bg-danger'
    case 'cancelled':
      return 'badge bg-dark'
    default:
      return 'badge bg-secondary'
  }
}

// Format the status for display
const formatStatus = (status) => {
  switch (status) {
    case 'approved':
      return 'Approved'
    case 'declined':
      return 'Declined'
    case 'cancelled':
      return 'Cancelled'
    default:
      return 'Unknown'
  }
}

const filteredBookings = computed(() => {
  return bookings.value
    .filter(booking => ['approved', 'declined', 'cancelled'].includes(booking.status))
    .sort((a, b) => new Date(b.booking_date) - new Date(a.booking_date)) 
})

onMounted(() => {
  if (store.isAuthenticated) {
    getBookings()
  } else {
    // Handle redirection or show a message if the user is not authenticated
  }
})
</script>
