<template>
    <div class="content">
      <div class="container">
        <div class="card-header">
          <h4>ALL BOOKINGS</h4>
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
                    {{ data.status }}
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

// Fetch bookings from the server
const getBookings = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/booking', {
      headers: {
        Authorization: `Bearer ${store.access_token}` // Include the token in the headers
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
    case 'cancelled':
      return 'badge bg-danger'
    case 'completed':
      return 'badge bg-success'
    default:
      return 'badge bg-secondary'
  }
}

// Filter bookings to only show pending ones
const filteredBookings = computed(() => {
  return bookings.value.filter(booking => booking.status === 'pending')
})

onMounted(() => {
  if (store.isAuthenticated) {
    getBookings()
  } else {
    // Handle redirection or show a message if the user is not authenticated
  }
})
</script>
