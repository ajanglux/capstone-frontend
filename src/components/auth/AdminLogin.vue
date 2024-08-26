<template>
    <div class="container">
      <div class="row my-5">
        <div class="col-md-6 mx-auto">
          <ValidationErrors :errors="store.errors" />
          <div class="card rounded-0 shadow-sm">
            <div class="card-header bg-white">
              <h5 class="text-center mt-2">ADMIN Login</h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="adminAuth">
                <div class="form-group mb-3">
                  <input
                    type="text"
                    v-model="data.user.email"
                    placeholder="Email"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group mb-3">
                  <input
                    type="password"
                    v-model="data.user.password"
                    placeholder="Password"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group mb-3">
                  <Spinner v-if="data.loading" />
                  <button v-else type="submit" class="btn btn-dark btn-sm rounded-0">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, onUnmounted } from 'vue'
  import { useAuthStore } from '../../stores/useAuthStore.js'
  import { useToast } from 'vue-toastification'
  import axios from 'axios'
  import router from '../../router'
  import ValidationErrors from '../layouts/ValidationErrors.vue'
  import Spinner from '../layouts/Spinner.vue'
  import { BASE_URL } from '../../helpers/baseUrl'
  
  const store = useAuthStore()
  const toast = useToast()
  
  const data = reactive({
    loading: false,
    user: {
      email: '',
      password: ''
    }
  })
  
  const adminAuth = async () => {
    store.clearErrors()
    data.loading = true
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, data.user)
      data.loading = false
  
      if (response.data.error) {
        toast.error(response.data.error, { timeout: 3000 })
      } else {
        // Check if the user is an admin
        if (response.data.user.role === 1) {
          store.setToken(response.data.currentToken)
          store.setUser(response.data.user)
          toast.success(response.data.message, { timeout: 3000 })
          router.push('/admin-dashboard')  // Admin dashboard
        } else {
          // Display message for non-admin users
          toast.error("You are not an admin", { timeout: 3000 })
          store.clearToken()  // Optional: clear any token if mistakenly set
          store.clearUser()   // Optional: clear user data
        }
      }
    } catch (error) {
      data.loading = false
      if (error.response && error.response.status === 422) {
        store.setErrors(error.response.data.errors)
      } else {
        toast.error('An unexpected error occurred. Please try again.', { timeout: 3000 })
      }
    }
  }
  
  onUnmounted(() => store.clearErrors())
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  