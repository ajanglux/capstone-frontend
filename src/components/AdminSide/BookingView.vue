<template>
  <div class="content">
    <div class="container">
      <div class="card-header">
        <h4>Booking Details</h4>
      </div>
      <div class="card-body">
        <div v-if="error" class="alert alert-danger" role="alert">
          <strong>{{ error }}</strong>
        </div>

        <div v-if="booking">
          <div class="input-group mb-3">
            <span class="input-group-text">Meeting Title</span>
            <input v-model="booking.meeting_title" type="text" class="form-control" disabled />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Description</span>
            <textarea v-model="booking.description" class="form-control" disabled></textarea>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Booking Date</span>
            <input v-model="booking.booking_date" type="date" class="form-control" disabled />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Start Time</span>
            <input v-model="booking.start_time" type="text" class="form-control" disabled />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">End Time</span>
            <input v-model="booking.end_time" type="text" class="form-control" disabled />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Status</span>
            <input v-model="booking.status" type="text" class="form-control" disabled />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">User</span>
            <input v-model="booking.user.name" type="text" class="form-control" disabled />
          </div>
        </div>
        <div v-else>
          <p>No booking details available.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../stores/useAuthStore';

export default {
  props: {
    bookingId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const authStore = useAuthStore();
    const booking = ref(null);
    const error = ref('');

    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/booking/${props.bookingId}`, {
          headers: {
            Authorization: `Bearer ${authStore.access_token}`,
          },
        });
        booking.value = response.data.data;
      } catch (err) {
        error.value = err.response?.data?.error || err.message;
      }
    };

    onMounted(() => {
      fetchBookingDetails();
    });

    return { booking, error };
  },
}
</script>

<style scoped>
.input-group-text {
  width: 150px;
}
</style>
