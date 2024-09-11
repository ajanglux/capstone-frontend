<template>
  <div class="container">
    <div class="signup-card-wrapper">
      <div class="signup-card">
        <div class="card-header text-center bg-white">
          <h3 class="mt-2">Register</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="registerUser">
            <div class="form-group mb-3">
              <input 
                type="text" 
                v-model="data.user.name"
                placeholder="Username" 
                class="form-control rounded-0"
                required>
            </div>
            <div class="form-group mb-3">
              <input 
                type="email" 
                v-model="data.user.email"
                placeholder="Email" 
                class="form-control rounded-0"
                required>
            </div>
            <div class="form-group mb-3">
              <input 
                type="password" 
                v-model="data.user.password"
                placeholder="Password" 
                class="form-control rounded-0"
                required>
            </div>
            <div class="form-group mb-3 text-center">
              <Spinner v-if="data.loading" />
              <button v-else type="submit" class="btn btn-dark btn-sm rounded-0 w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
  import { onUnmounted, reactive } from "vue"
  import router from '../../router'
  import { useAuthStore } from '../../stores/useAuthStore.js'
  import axios from 'axios'
  import { useToast } from "vue-toastification"
  import { BASE_URL } from '../../helpers/baseUrl'
  import ValidationErrors from '../layouts/ValidationErrors.vue'
  import Spinner from '../layouts/Spinner.vue'

  const toast = useToast()
  
  const store = useAuthStore()
  
  const data = reactive({
    loading: false,
    user: {
        name: '',
        email: '',
        password: ''
    }
  })

  const registerUser = async () => {
    store.clearErrors()
    data.loading = true
    try {
      const response = await axios.post(`${BASE_URL}/user/register`, data.user);
      data.loading = false
      toast.success(response.data.message, {
        timeout: 3000
      })
      router.push('/admin-login')
    } catch (error) {
      data.loading = false
      if(error.response.status === 422) {
        store.setErrors(error.response.data.errors)
      }
      console.log(error);
    }
  }

  onUnmounted(() => store.clearErrors())

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgb(12, 68, 110); /* Blue background */
  padding: 30px;
}

.signup-card-wrapper {
  background-color: #f0f4f8; /* Light blue-gray background behind the card */
  padding: 60px;
  border-radius: 12px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px; /* Widen the overall wrapper */
  width: 100%;
}

.signup-card {
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 60px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.signup-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.15);
}

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

.card-header h3 {
  font-weight: bold;
  font-size: 3.5rem; /* Double the original size */
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}

.text-center {
  text-align: center;
}

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

.signup-card {
  animation: slideIn 0.6s ease-out;
}
</style>