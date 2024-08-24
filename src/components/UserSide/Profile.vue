<template>
    <div class="card">
        <div class="card-header">
            <h4>{{ isEditing ? 'Edit User Profile' : 'Create User Profile' }}</h4>
        </div>
        <div class="card-body">
            <ul v-if="errorList.length > 0" class="alert alert-warning">
                <li v-for="(error, index) in errorList" :key="index" class="mb-0 ms-3">
                    <strong>{{ error[0] }}</strong>
                </li>
            </ul>

            <div class="input-group mb-3">
                <span class="input-group-text">First Name</span>
                <input v-model="userProfile.first_name" type="text" class="form-control" :disabled="!isEditing" />
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Last Name</span>
                <input v-model="userProfile.last_name" type="text" class="form-control" :disabled="!isEditing" />
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Phone Number</span>
                <input v-model="userProfile.phone_number" type="text" class="form-control" :disabled="!isEditing" />
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Email</span>
                <input v-model="userProfile.email" type="text" placeholder="<Optional>" class="form-control" :disabled="!isEditing" />
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Address</span>
                <input v-model="userProfile.address" type="text" class="form-control" :disabled="!isEditing" />
            </div>

            <div class="input-group mb-3">
                <button v-if="!isEditing" @click="isEditing = true" class="btn btn-secondary">Edit</button>
                <button v-else @click="saveProfile" type="submit" class="btn btn-primary">Save</button>
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
            isEditing: false, // Default to false
        }
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
                if (this.userProfile) {
                    this.isEditing = false; // Disable inputs by default if profile exists
                } else {
                    this.isEditing = true; // Enable inputs if no profile exists
                }
            })
            .catch(error => {
                console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
            });
        },
        saveProfile() {
            const authStore = useAuthStore();
            const url = 'http://localhost:8000/api/user/profile';

            axios.post(url, this.userProfile, {
                headers: {
                    Authorization: `Bearer ${authStore.access_token}`,
                }
            })
            .then(response => {
                this.userProfile = response.data.data;
                this.isEditing = false; // Disable inputs after successful save
            })
            .catch(error => {
                this.errorList = error.response?.data?.errors || [];
                console.error('Error during profile save:', error.response ? error.response.data : error.message);
            });
        }
    }
}
</script>
