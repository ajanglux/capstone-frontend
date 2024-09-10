<template>
    <div class="content">
        <div class="container">
            <div class="card-header">
                <h2>{{ isEditing ? 'Edit Booking' : 'Add Service' }}</h2>
            </div>
            <div class="card-body">
                <ul v-if="errorList.length > 0" class="alert alert-warning">
                    <li v-for="(error, index) in errorList" :key="index" class="mb-0 ms-3">
                        <strong>{{ error }}</strong>
                    </li>
                </ul>
                <div class="input-group mb-3">
                    <span class="input-group-text">Service:</span>
                    <input v-model="model.booking.meeting_title" type="text" class="form-control" :disabled="isEditing" />
                </div>
                <div class="input-group mb-4">
                    <span class="input-group-text">Details</span>
                    <textarea v-model="model.booking.description" class="form-control" :disabled="isEditing"></textarea>
                </div>
                <div class="buttons">
                    <button @click="isEditing ? updateBooking() : saveBooking()" type="submit" class="btn">Submit</button>
                    <router-link to="/service-list" class="btn">Cancel</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookingForm',
    props: ['id'],
    data() {
        return {
            errorList: [],
            model: {
                booking: {
                    meeting_title: '',
                    description: '',
                    booking_date: '',
                    start_time: '',
                    end_time: '',
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
            // Simulated booking details for demonstration
            const mockBookingDetails = {
                meeting_title: 'Example Device',
                description: 'Example description',
                booking_date: '2024-09-10',
                start_time: '10:00',
                end_time: '11:00',
            };

            // Simulate a delay for fetching booking details
            setTimeout(() => {
                this.model.booking = mockBookingDetails;
            }, 500);
        },
        saveBooking() {
            // Simulate saving booking
            setTimeout(() => {
                alert('Booking saved successfully!');
                this.$router.push({ name: 'appointments' });
            }, 500);
        },
        updateBooking() {
            // Simulate updating booking
            setTimeout(() => {
                alert('Booking updated successfully!');
                this.$router.push({ name: 'appointments' });
            }, 500);
        }
    }
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>
