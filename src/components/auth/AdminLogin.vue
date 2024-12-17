<template>
  <div class="container">
    <div class="login-card-wrapper">
      <div class="login-card">
        <div class="header">
          <h3>ADMIN LOGIN</h3>
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
              <button v-else type="submit" class="btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="logo">
        <img src="/src/assets/techfix.png" >
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
        toast.error(response.data.error, { timeout: 2500 })
      } else {
        // Check if the user is an admin
        if (response.data.user.role === 1) {
          store.setToken(response.data.currentToken)
          store.setUser(response.data.user)
          toast.success(response.data.message, { timeout: 2500 })
          router.push('/admin-dashboard')
        } else {
          // Display message for non-admin users
          toast.error("You are not an admin", { timeout: 2500 })
          store.clearToken()
          store.clearUser()
        }
      }
    } catch (error) {
      data.loading = false
      if (error.response && error.response.status === 422) {
        store.setErrors(error.response.data.errors)
      } else {
        toast.error('An unexpected error occurred. Please try again.', { timeout: 2500 })
      }
    }
  }
  
  onUnmounted(() => store.clearErrors())
  </script>
  
<style lang="scss" scoped>
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
  display: flex;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  width: 60%;
}

/* Login Card */
.login-card {
  width: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background-color: var(--light);
  padding: 60px;
  align-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  .form-control {
    padding: 12px;
    font-size: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  .header h3 {
    font-weight: 700;
    font-size: 50px;
    letter-spacing: 0.5px;
    margin-bottom: 30px;
    color: var(--main);
    text-align: center;
    font-family: 'Poppins';
  }

  .text-center {
    text-align: center;
  }

  input {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  input::placeholder {
    color: #999;
    font-size: 14px;
  }

  input:focus {
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25) !important;
    border-color: #007bff !important;
  }

  .btn {
    letter-spacing: 1px;
    padding: 12px;
    font-size: 16px;
    border-radius: 50px;
    background-color: var(--main);
    color: white;
    width: 50%;
    transition: background-color 0.3s ease, transform 0.2s ease;
    border: none;
  }

  .btn:hover {
    background-color: var(--main-hover);
    transform: translateY(-2px);
  }
}

.logo {
  width: 100%;
  height: auto;
  background-color: var(--main);
  align-content: space-evenly;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  img {
    width: 100%;
  }
}
</style>