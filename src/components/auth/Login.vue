<template>
  <div class="container">
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
              <p><router-link class="primary" aria-current="page" to=""> Forgot Password? </router-link> </p>
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
  </div>
</template>
  
  <script setup>
  import { ref, onUnmounted, reactive } from 'vue'
  import router from '../../router'
  import { useAuthStore } from '../../stores/useAuthStore.js'
  import axios from 'axios'
  import { useToast } from 'vue-toastification'
  import { BASE_URL } from '../../helpers/baseUrl'
  import Spinner from '../layouts/Spinner.vue'
  
  const toast = useToast()
  const store = useAuthStore()
  const passwordVisible = ref(false);

  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
  };
  
  const data = reactive({
    loading: false,
    user: {
      email: '',
      password: ''
    }
  })
  
  const userAuth = async () => {
  store.clearErrors();
  data.loading = true;

  try {
    const response = await axios.post(`${BASE_URL}/user/login`, data.user);
    data.loading = false;

    if (response.data.error) {
      toast.error(response.data.error, { timeout: 3000 });
    } else {
      const user = response.data.user;
      const token = response.data.currentToken;

      if (user.role === 0) { 
        store.setToken(token);
        store.setUser(user);
        toast.success(response.data.message, { timeout: 3000 });
        router.push('/home');
      } else {
        toast.error("Access Denied", { timeout: 3000 });
        store.clearToken();
        store.clearUser();
      }
    }
  } catch (error) {
    data.loading = false;

    if (error.response?.status === 422) {
      store.setErrors(error.response.data.errors);
    } else if (error.response?.status === 401) {
      toast.error('Incorrect password. Please try again.', { timeout: 3000 });
    } else {
      toast.error('An unexpected error occurred. Please try again.', { timeout: 3000 });
    }

    console.error(error);
  }
}

  
  onUnmounted(() => store.clearErrors())
  </script>
  
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgb(12, 68, 110);
  padding: 30px;
}

.login-card-wrapper {
  display: flex;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  width: 60%;
}

.login-card {
  width: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background-color: var(--light);
  padding: 60px;
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
    margin-top: 18px;
    right: 15px;
  }

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