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
              <th>Actions</th>
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
              <td>
                <button class="btn btn-success btn-sm me-1" @click="approveBooking(data.id)">Approve</button>
                <button class="btn btn-danger btn-sm me-1" @click="declineBooking(data.id)">Decline</button>
                <button class="btn btn-primary btn-sm me-1" @click="viewUserProfile(data.user.id)">View User Profile</button>
                <button class="btn btn-secondary btn-sm" @click="viewBookingDetails(data.id)">View Booking Details</button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="8"><strong>No bookings found.</strong></td>
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
import { useRouter } from 'vue-router'

const store = useAuthStore()
const bookings = ref([])
const success = ref('')
const router = useRouter()

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

// Convert booking date and time to a Date object
const toDateTime = (booking) => {
  const dateTimeString = `${booking.booking_date}T${booking.start_time}` // Combine date and time
  return new Date(dateTimeString)
}

// Filter and sort bookings
const filteredBookings = computed(() => {
  return bookings.value
    .filter(booking => booking.status === 'pending') // Filter based on status
    .sort((a, b) => toDateTime(a) - toDateTime(b)) // Sort by combined date and time (earliest to latest)
})

// Action functions
const approveBooking = async (id) => {
  try {
    await axios.put(`http://localhost:8000/api/booking/${id}/approve`, {}, {
      headers: {
        Authorization: `Bearer ${store.access_token}`
      }
    })
    success.value = 'Booking approved successfully'
    getBookings()
  } catch (error) {
    console.error('Error approving booking:', error.response ? error.response.data : error.message)
  }
}

const declineBooking = async (id) => {
  try {
    await axios.put(`http://localhost:8000/api/booking/${id}/decline`, {}, {
      headers: {
        Authorization: `Bearer ${store.access_token}`
      }
    })
    success.value = 'Booking declined successfully'
    getBookings()
  } catch (error) {
    console.error('Error declining booking:', error.response ? error.response.data : error.message)
  }
}

const viewUserProfile = (userId) => {
  // Redirect to the user profile page for admin viewing
  router.push({ name: 'AdminUserProfile', params: { userId: userId } })
}

const viewBookingDetails = (bookingId) => {
  router.push({ name: 'BookingDetails', params: { id: bookingId } })
}

onMounted(() => {
  if (store.isAuthenticated) {
    getBookings()
  } else {
    // Handle redirection or show a message if the user is not authenticated
  }
})
</script>



