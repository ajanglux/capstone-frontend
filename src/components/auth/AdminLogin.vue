<template>
  <div class="container">
    <div class="login-card-wrapper">
      <div class="login-card">
        <div class="card-header text-center bg-white">
          <h3 class="mt-2">ADMIN LOGIN</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="adminAuth">
            <div class="form-group mb-3">
              <input
                type="text"
                v-model="data.user.email"
                placeholder="Email"
                class="form-control rounded-0"
                required
              />
            </div>
            <div class="form-group mb-3">
              <input
                type="password"
                v-model="data.user.password"
                placeholder="Password"
                class="form-control rounded-0"
                required
              />
            </div>
            <div class="form-group mb-3 text-center">
              <Spinner v-if="data.loading" />
              <button v-else type="submit" class="btn btn-dark btn-sm rounded-0 w-100">
                Login
              </button>
            </div>
          </form>
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
          router.push('/admin-dashboard')
        } else {
          // Display message for non-admin users
          toast.error("You are not an admin", { timeout: 3000 })
          store.clearToken()
          store.clearUser()
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
  
<style scoped>
/* Container */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgb(12, 68, 110);
  padding: 30px;
}

/* Login Card Wrapper */
.login-card-wrapper {
  background-color: var(--grey);
  padding: 60px;
  border-radius: 12px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px; /* Widen the overall wrapper */
  width: 100%;
}

/* Login Card */
.login-card {
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background-color: var(--light);
  padding: 60px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  h3 {
    color: var(--main);
  }
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.15);
}

/* Input Fields */
input::placeholder {
  color: #999;
  font-size: 14px;
}

input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.25) !important;
  border-color: #007bff !important;
}

/* Button Styling */
.btn {
  letter-spacing: 1px;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #333;
  color: white;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
}

.btn:hover {
  background-color: #555;
  transform: translateY(-2px);
}

.form-control {
  padding: 12px;
  font-size: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

/* Title Styling */
.card-header h3 {
  font-weight: bold;
  font-size: 3.5rem; /* Double the original size */
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}

/* Center Text */
.text-center {
  text-align: center;
}

/* Animation for the Form */
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-card {
  animation: slideIn 0.6s ease-out;
}
</style>