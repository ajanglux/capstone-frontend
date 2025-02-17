<template>
  <div class="login-container">
    <Transition name="slide-in" appear>
      <div class="login-card-wrapper">
        <div class="login-card">
          <div class="header">
            <h3>LOGIN</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="userAuth">
              <div class="form-group mb-3">
                <input
                  type="text"
                  v-model="data.user.email"
                  placeholder="Email"
                  class="form-control rounded-0"
                  required
                />
              </div>
              <div class="form-group mb-3 position-relative">
                <input 
                  :type="passwordVisible ? 'text' : 'password'" 
                  v-model="data.user.password"
                  placeholder="Password" 
                  class="form-control rounded-0"
                  required>
                <i 
                id="show-hide"
                  class="bx" 
                  :class="passwordVisible ? 'bx-show' : 'bx-hide'" 
                  @click="togglePasswordVisibility" 
                  ></i>
              </div>
              <div class="forgot">
                <p><router-link class="primary" aria-current="page" to="/forgot-password"> Forgot Password? </router-link> </p>
              </div>
              <div class="form-group mb-3 text-center">
                <Spinner v-if="data.loading" />
                <button v-else type="submit" class="btn">
                  Login
                </button>
              </div>
            </form>
            <div class="down">
              <p> Create an account? <router-link class="primary" aria-current="page" to="/register"> Register </router-link> </p>
              <router-link class="secondary" to="/">Go Back</router-link>
            </div>
          </div>
        </div>
        <div class="logo">
          <img src="/src/assets/techfix.png" >
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useAuthStore } from '../../stores/useAuthStore.js'
import axios from 'axios'
import { BASE_URL } from '../../helpers/baseUrl'
import Spinner from '../layouts/Spinner.vue'
import { useRoute } from 'vue-router'
import router from '../../router'
import Swal from 'sweetalert2'

const store = useAuthStore()
const passwordVisible = ref(false)
const route = useRoute();

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

const data = reactive({
  loading: false,
  user: {
    email: '',
    password: ''
  }
})

const showToast = (icon, title) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

const verifyEmailToken = async () => {
  const verificationUrl = route.query.url; // Ensure the URL contains the proper parameters

  if (verificationUrl) {
    data.loading = true;
    try {
      // Send the URL to the backend for verification
      const response = await axios.get(verificationUrl);
      
      if (response.data.success) {
        showToast("success", "Email successfully verified!")
        router.push('/login')
      } else {
        showToast("error", "Email verification failed. Please try again.")
      }
    } catch (error) {
      showToast("error", "An error occurred during email verification. Please try again.")
      console.error(error);
    } finally {
      data.loading = false;
    }
  }
};

const userAuth = async () => {
  data.loading = true;

  try {
    const response = await axios.post(`${BASE_URL}/user/login`, data.user);
    data.loading = false;

    if (response.data.error) {
      showToast("error", response.data.error);
    } else {
      const user = response.data.user;
      const token = response.data.currentToken;

      if (user.role === 0) {
        store.setToken(token);
        store.setUser(user);
        showToast("success", response.data.message);
        router.push("/home");
      } else {
        showToast("error", "Access Denied");
        store.clearToken();
        store.clearUser();
      }
    }
  } catch (error) {
    data.loading = false;

    if (error.response?.status === 404) {
      showToast("error", "No account found with this email.");
    } else if (error.response?.status === 401) {
      showToast("error", "Incorrect password. Please try again.");
    } else if (error.response?.status === 422) {
      store.setErrors(error.response.data.errors);
    } else {
      showToast("error", "An unexpected error occurred. Please try again.");
    }

    console.error(error);
  }
};

onMounted(() => {
  verifyEmailToken()
})
</script>


<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card-wrapper {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
}

.login-card {
  flex-basis: 50%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 0 130px;
  align-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  .forgot {
    padding: 0;
    font-size: 13px;
    margin-bottom: 30px;
    text-align: right;
    
    .primary {
      color: var(--header);

      &:hover {
        text-decoration: underline;
      }
    }
  }

  i { 
    color: black; 
  }

  .card-body {
    position: relative;
  }

  #show-hide {
    position: absolute;
    margin-top: 14px;
    right: 15px;
  }

  .form-control {
    padding: 12px;
    font-size: 15px;
    border-radius: 8px;
    margin-bottom: 22px;
    width: 100%;
    border: 1px solid var(--header);
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
    border: 1px solid var(--header);
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

  input, textarea {
    font-size: 16px;
    touch-action: manipulation;
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
  flex-basis: 90%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--main);
  border-top-right-radius: 12%;
  border-bottom-right-radius: 12%;

  img {
    width: 70%;
  }
}

.slide-in-enter-active {
  transition: transform 0.8s ease-out, opacity 0.8s ease-out;
}

.slide-in-enter-from {
  transform: translateX(-100px); 
  opacity: 0;
}

.slide-in-enter-to {
  transform: translateX(0);
  opacity: 1;
}

@media (max-width: 500px) {
  .container {
  padding: 10px;
}
  .login-card-wrapper {
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  width: 80%;
}

.login-card {
  padding: 30px 30px 20px 30px;
  flex-basis: 100%;

  .header h3 {
    font-size: 30px;
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

  .terms-checkbox {
    display: flex;
    padding-bottom: 10px;
    margin-top: -15px;

    input[type="checkbox"] {
      width: 15px;
    }

    input[type="checkbox"]:checked {
      accent-color: var(--header);
    }

    p {
      font-size: 12px;
      color: black;
      margin-top: 15.5px;
      padding-left: 3px;
    }

    a {
      font-size: 12px;
      color: var(--header);

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.logo {
  display: none;
}
}
</style>