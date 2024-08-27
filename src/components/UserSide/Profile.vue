<template>
    <div class="content">
        <div class="container">
            <div class="card-header">
                <h2>{{ isEditing ? 'Edit User Profile' : 'Create User Profile' }}</h2>
            </div>
            <div class="card-body">
                <ul v-if="errorList.length > 0" class="alert alert-warning">
                    <li v-for="(error, index) in errorList" :key="index" class="mb-0 ms-3">
                        <strong>{{ error[0] }}</strong>
                    </li>
                </ul>

                <div class="input-row">
                    <div class="input-group">
                        <span class="input-group-text">First Name</span>
                        <input v-model="userProfile.first_name" type="text" class="form-control" :disabled="!isEditing" />
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Last Name</span>
                        <input v-model="userProfile.last_name" type="text" class="form-control" :disabled="!isEditing" />
                    </div>
                </div>

                <div class="input-group">
                    <span class="input-group-text">Phone Number</span>
                    <input 
                        v-model="userProfile.phone_number" 
                        type="text" 
                        class="form-control" 
                        :disabled="!isEditing" 
                        maxlength="11" 
                        @input="validatePhoneNumber"
                    />
                </div>
                <div class="input-group">
                    <span class="input-group-text">Email</span>
                    <input v-model="userProfile.email" type="email" placeholder="<Optional>" class="form-control" :disabled="!isEditing" />
                </div>
                <div class="input-group">
                    <span class="input-group-text">Address</span>
                    <input v-model="userProfile.address" type="text" class="form-control" :disabled="!isEditing" />
                </div>

                <div v-if="!isEditing" @click="isEditing = true" class="buttons">
                    <button class="btn">Edit</button>
                </div>
                <div v-else class="buttons">
                    <button @click="saveProfile" type="submit" class="btn">Save</button>
                    <button @click="cancelEdit" type="button" class="btn">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../../stores/useAuthStore';

export default {
    data() {
        return {
            errorList: [],
            userProfile: {
                first_name: '',
                last_name: '',
                phone_number: '',
                email: '',
                address: '',
            },
            originalProfile: {}, // To store the original profile
            isEditing: false, // Default to false
        };
    },
    mounted() {
        this.fetchUserProfile();
    },
    methods: {
        fetchUserProfile() {
            const authStore = useAuthStore();
            axios.get('http://localhost:8000/api/user/profile', {
                headers: {
                    Authorization: `Bearer ${authStore.access_token}`,
                }
            })
            .then(response => {
                this.userProfile = response.data.data;
                this.originalProfile = { ...this.userProfile }; // Store a copy of the original profile
                this.isEditing = false; // Disable inputs by default if profile exists
            })
            .catch(error => {
                console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
            });
        },
        saveProfile() {
            // Validate phone number before saving
            if (!this.validatePhoneNumberFormat(this.userProfile.phone_number)) {
                this.errorList = [{ phone_number: ['Phone number must start with 09 and be 11 digits long'] }];
                return;
            }

            const authStore = useAuthStore();
            const url = 'http://localhost:8000/api/user/profile';

            axios.post(url, this.userProfile, {
                headers: {
                    Authorization: `Bearer ${authStore.access_token}`,
                }
            })
            .then(response => {
                this.userProfile = response.data.data;
                this.originalProfile = { ...this.userProfile }; // Update original profile after saving
                this.isEditing = false; // Disable inputs after successful save
            })
            .catch(error => {
                this.errorList = error.response?.data?.errors || [];
                console.error('Error during profile save:', error.response ? error.response.data : error.message);
            });
        },
        cancelEdit() {
            this.userProfile = { ...this.originalProfile }; // Restore the original profile
            this.isEditing = false; // Exit editing mode
        },
        validatePhoneNumber(event) {
            const input = event.target;
            // Remove non-numeric characters
            input.value = input.value.replace(/\D/g, '').slice(0, 11);
            // Ensure the phone number starts with '09'
            if (!input.value.startsWith('09')) {
                input.value = '09' + input.value.replace(/^09/, '');
            }
            // Update the model
            this.userProfile.phone_number = input.value;
        },
        validatePhoneNumberFormat(phoneNumber) {
            // Check if the phone number starts with '09' and has exactly 11 digits
            return /^09\d{9}$/.test(phoneNumber);
        }
    }
};
</script>

<style>
/* Add your styles here */
</style>
