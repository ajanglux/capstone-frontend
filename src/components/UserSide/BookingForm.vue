<template>
    <div class="card">
        <div class="card-header">
            <h4>
                {{ isEditing ? 'Edit Booking' : 'Add Booking' }}
            </h4>
        </div>
        <div class="card-body">
            <ul v-if="Object.keys(this.errorList).length > 0" class="alert alert-warning">
                <li v-for="(error, index) in this.errorList" :key="index" class="mb-0 ms-3">
                    <strong>{{ error[0] }}</strong>
                </li>
            </ul>
            <!-- Device Brand Field -->
            <div class="input-group mb-3">
                <span class="input-group-text">Device Brand</span>
                <input 
                    v-model="model.booking.meeting_title" 
                    type="text" 
                    class="form-control" 
                    :disabled="isEditing"
                >
            </div>
            <!-- Details Field -->
            <div class="input-group mb-4">
                <span class="input-group-text">Details</span>
                <textarea 
                    v-model="model.booking.description" 
                    class="form-control" 
                    :disabled="isEditing" 
                ></textarea>
            </div>
            <!-- Date Field -->
            <div class="input-group mb-3">
                <span class="input-group-text">Date</span>
                <input 
                    v-model="model.booking.booking_date" 
                    type="date" 
                    class="form-control"
                >
            </div>
            <!-- Start and End Time Fields -->
            <div class="input-group mb-3">
                <span class="input-group-text">Start time</span>
                <input 
                    v-model="model.booking.start_time" 
                    type="time" 
                    class="form-control"
                >
                <span class="input-group-text">End time</span>
                <input 
                    v-model="model.booking.end_time" 
                    type="time" 
                    class="form-control"
                >
            </div>
            <!-- Submit Button -->
            <div class="input-group mb-3">
               <button @click="isEditing ? updateBooking() : saveBooking()" type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../../stores/useAuthStore'; // Adjust the path as necessary

export default {
    name: 'BookingForm',
    props: ['id'],
    data() {
        return {
            errorList: '',
            model: {
                booking: {
                    meeting_title: '',
                    description: '',
                    booking_date: '',
                    start_time: '',
                    end_time: ''
                }
            },
            isEditing: false,
        }
    },
    mounted() {
        if (this.id) {
            this.isEditing = true;
            this.getBookingDetails();
        }
    },
    methods: {
        getBookingDetails() {
            const authStore = useAuthStore();
            axios.get(`http://localhost:8000/api/booking/${this.id}`, {
                headers: {
                    Authorization: `Bearer ${authStore.access_token}`,
                }
            })
            .then(response => {
                this.model.booking = response.data.data;
            })
            .catch(error => {
                console.error('Error fetching booking details:', error.response ? error.response.data : error.message);
            });
        },
        saveBooking() {
            const authStore = useAuthStore();
            axios.post('http://localhost:8000/api/booking', this.model.booking, {
                headers: {
                    Authorization: `Bearer ${authStore.access_token}`,
                }
            })
            .then(response => {
                alert(response.data.message);
                this.$router.push({ name: 'appointments' });
            })
            .catch(error => {
                if (error.response.status === 422) {
                    this.errorList = error.response.data.errors;
                } else {
                    this.errorList = [['Something went wrong']];
                }
            });
        },
        updateBooking() {
            const authStore = useAuthStore();
            axios.put(`http://localhost:8000/api/booking/${this.id}`, this.model.booking, {
                headers: {
                    Authorization: `Bearer ${authStore.access_token}`,
                }
            })
            .then(response => {
                alert(response.data.message);
                this.$router.push({ name: 'BookingList' });
            })
            .catch(error => {
                if (error.response.status === 422) {
                    this.errorList = error.response.data.errors;
                } else {
                    this.errorList = [['Something went wrong']];
                }
            });
        }
    }
}
</script>

<style scoped>
/* Add any scoped styles here */
</style>
