<template>
  <div class="container">
    <div class="signup-card-wrapper">
      <div class="signup-card">
        <div class="header">
          <h3>Register</h3>
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

            <div class="terms-checkbox">
              <input type="checkbox" v-model="isTermsChecked" id="termsCheckbox" @input="validateTerms" />
                <a  
                  href="/terms-and-conditions" 
                  target="_blank" 
                  rel="noopener noreferrer">
                  Terms and Conditions
                </a>
                <a>&</a>
                <a  
                  href="/terms-and-conditions" 
                  target="_blank" 
                  rel="noopener noreferrer">
                  Privacy Policy
                </a>
            </div>

            <div class="form-group mb-3 text-center">
              <Spinner v-if="data.loading" />
              <button v-else type="submit" class="btn btn-dark btn-sm rounded-0 w-100">
                Submit
              </button> <br>
              <router-link to="/login">Login</router-link> <br>
              <router-link to="/">Go Back</router-link>
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
  import { ref, onUnmounted, reactive } from "vue"
  import router from '../../router'
  import { useAuthStore } from '../../stores/useAuthStore.js'
  import axios from 'axios'
  import { useToast } from "vue-toastification"
  import { BASE_URL } from '../../helpers/baseUrl'
  import Spinner from '../layouts/Spinner.vue'

  const toast = useToast()
  const store = useAuthStore()
  const isTermsChecked = ref(false);
  const termsError = ref(false);
  
  const validateTerms = () => {
    termsError.value = !isTermsChecked.value;
  };

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

    validateTerms();
    if (termsError.value) {
      toast.error('You must agree to the terms and conditions.');
      data.loading = false;
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/user/register`, data.user);
      data.loading = false;
      toast.success(response.data.message, {
        timeout: 3000
      })
      router.push('/login')
    } catch (error) {
      data.loading = false; 
      if (error.response?.status === 422) {
        store.setErrors(error.response.data.errors)
      }
      console.log(error);
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
.signup-card-wrapper {
  display: flex;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  width: 60%;
}

/* Login Card */
.signup-card {
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

  .terms-checkbox {
    display: flex;
    height: 50%;
    width: 20%;

    input[type="checkbox"]:checked {
      accent-color: var(--header);
      padding-bottom: -10px;
    }

    a {
      font-size: 10px;
      padding-left: 5px;
      padding-top: 9px;
      padding-bottom: 18px;
      color: var(--header);

      &:hover {
        text-decoration: underline;
      }
    }
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