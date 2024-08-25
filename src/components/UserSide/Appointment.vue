<template>
    <div class="content">
      <div class="container">
        <div class="card-header">
          <h4>CURRENT APPOINTMENTS</h4>
          <router-link class="button" to="/booking/create">
            <!-- <span class="material-icons">home</span> -->
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
                    {{ data.status }}
                  </span>
                </td>
                <td v-if="showActions">
                  <!-- Reschedule button should be accessible unless status is 'cancelled' -->
                  <router-link 
                    :to="{ name: 'EditBooking', params: { id: data.id }}" 
                    class="btn btn-warning me-2" 
                    :disabled="data.status === 'cancelled'"
                  >
                    Reschedule
                  </router-link>
                  
                  <!-- Cancel button should be disabled if already cancelled -->
                  <button 
                    @click="cancelBooking(data)" 
                    type="button" 
                    class="btn btn-secondary" 
                    :disabled="data.status === 'cancelled'"
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
  const showActions = ref(true) // Show actions column based on conditions
  
  const getBooking = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/booking', {
        headers: {
          Authorization: `Bearer ${store.access_token}` // Include the token in the headers
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
            Authorization: `Bearer ${store.access_token}` // Include the token in the headers
          }
        })
        console.log('Booking cancelled successfully:', response.data)
        booking.status = 'cancelled' // Update status locally
      } catch (error) {
        console.error('Error cancelling the booking:', error.response ? error.response.data : error.message)
        alert('Error cancelling the booking: ' + error.message) // Display error to user
      }
    }
  }
  
  const statusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'badge bg-success'
      case 'cancelled':
        return 'badge bg-danger'
      default:
        return 'badge bg-secondary'
    }
  }
  
  // Filter bookings to exclude 'cancelled' status
  const filteredBookings = computed(() => {
    return booking.value.filter(b => b.status !== 'cancelled')
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
  
  </style>
  