<template>
    <<div class="container">
        <div class="login-card-wrapper">
            <div class="login-card">
                <div class="header">
            <h3>Forgot Password</h3>
            </div>
            <form @submit.prevent="submitEmail">
            <div class="form-group">
                <label for="email">Enter Email Address to send code</label>
                <input
                v-model="email"
                type="email"
                id="email"
                class="form-control"
                placeholder="Enter your email"
                required
                />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <p v-if="message" :class="messageClass">{{ message }}</p>
            </form>

            <div class="forgot">
                <p><router-link class="primary" aria-current="page" to="/reset-password"> Reset Password </router-link> </p>
                <router-link class="secondary" to="/">Go Back</router-link>
                </div>
            </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import { BASE_URL } from '../../helpers/baseUrl';
  import { useRouter } from 'vue-router';

  
  export default {
    setup() {
      const toast = useToast();
      const email = ref('');
      const message = ref('');
      const messageClass = ref('');
      const router = useRouter();
  
      const submitEmail = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/user/forgot-password`, {
            email: email.value,
            });
            message.value = response.data.message;
            messageClass.value = 'success';
            toast.success(message.value, { timeout: 3000 });

            // Pass the email as a query parameter to the reset-password page
            router.push({ path: '/reset-password', query: { email: email.value } });
        } catch (error) {
            message.value = error.response?.data.error || 'An error occurred';
            messageClass.value = 'error';
            toast.error(message.value, { timeout: 3000 });
        }
        };

  
      return {
        email,
        message,
        messageClass,
        submitEmail,
      };
    },
  };
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
  </style>
  