<template>
    <div class="container">
      <div class="reset-password-card-wrapper">
        <div class="header">
          <h3>Reset Password</h3>
        </div>
        <form @submit.prevent="resetPassword">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group">
            <label for="token">Enter Token</label>
            <input
              v-model="token"
              type="text"
              id="token"
              class="form-control"
              placeholder="Enter Token"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">New Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="form-control"
              placeholder="Enter new password"
              required
              minlength="8"
            />
          </div>
          <div class="form-group">
            <label for="password_confirmation">Confirm Password</label>
            <input
              v-model="passwordConfirmation"
              type="password"
              id="password_confirmation"
              class="form-control"
              placeholder="Confirm new password"
              required
              minlength="8"
            />
          </div>
          <button type="submit" class="btn btn-primary">Reset Password</button>
          <p v-if="message" :class="messageClass">{{ message }}</p>
        </form>
        <div class="forgot">
                <p><router-link class="primary" aria-current="page" to="/reset-password"> Reset Password </router-link> </p>
                <router-link class="secondary" to="/">Go Back</router-link>
                </div>
      </div>
    </div>
  </template>
  
  <script>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const toast = useToast();
    const email = ref(route.query.email || ''); // Fetch the email from query params
    const password = ref('');
    const passwordConfirmation = ref('');
    const message = ref('');
    const messageClass = ref('');
    const token = ref('');
    const router = useRouter();

    const resetPassword = async () => {
      if (!token.value) {
        message.value = 'Token is required';
        messageClass.value = 'error';
        toast.error(message.value, { timeout: 3000 });
        return;
      }

      if (!email.value) {
        message.value = 'Email is required';
        messageClass.value = 'error';
        toast.error(message.value, { timeout: 3000 });
        return;
      }

      if (password.value !== passwordConfirmation.value) {
        message.value = 'Passwords do not match!';
        messageClass.value = 'error';
        toast.error(message.value, { timeout: 3000 });
        return;
      }

      if (password.value.length < 8) {
        message.value = 'Password must be at least 8 characters long';
        messageClass.value = 'error';
        toast.error(message.value, { timeout: 3000 });
        return;
      }

      try {
        const response = await axios.post(`${BASE_URL}/user/reset-password`, {
          token: token.value,
          email: email.value,
          password: password.value,
          password_confirmation: passwordConfirmation.value,
        });

        message.value = response.data.message;
        messageClass.value = 'success';
        toast.success(message.value, { timeout: 3000 });
        router.push({ path: '/reset-password', query: { email: email.value } });
      } catch (error) {
        message.value = error.response?.data?.error || 'An error occurred';
        messageClass.value = 'error';
        toast.error(message.value, { timeout: 3000 });
      }
    };

    return {
      email,
      password,
      passwordConfirmation,
      message,
      messageClass,
      token,
      resetPassword,
    };
  },
};
</script>

   

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: rgb(12, 68, 110);
    padding: 30px;
  }
  .reset-password-card-wrapper {
    background: #f7f7f7;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .header h3 {
    text-align: center;
  }
  .form-group {
    margin-bottom: 20px;
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
    padding: 10px;
    border-radius: 10px;
    background-color: var(--main);
    color: white;
    transition: background-color 0.3s ease, transform 0.2s ease;
    border: none;
  }

  .btn:hover {
    background-color: var(--main-hover);
    transform: translateY(-2px);
  }
  p.success {
    color: green;
    text-align: center;
  }
  p.error {
    color: red;
    text-align: center;
  }
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
  </style>