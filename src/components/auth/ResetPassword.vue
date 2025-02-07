<template>
  <div class="reset-password-card-wrapper">
    <div class="header">
      <h3>Reset Password</h3>
    </div>
    <form @submit.prevent="resetPassword">
      <div class="form-group">
        <label for="token" style="display: flex;">Enter Code:</label>
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
        <label for="password" style="display: flex;">New Password</label>
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
        <label for="password_confirmation" style="display: flex;">Confirm Password</label>
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

    <button class="btn btn-secondary" @click="$emit('close')">Close</button>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { BASE_URL } from "../../helpers/baseUrl";
import Swal from "sweetalert2";

export default {
  props: {
    email: String, // Receive email from ForgotPassword.vue
  },
  setup(props, { emit }) {
    const token = ref("");
    const password = ref("");
    const passwordConfirmation = ref("");
    const message = ref("");
    const messageClass = ref("");

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

    const resetPassword = async () => {
      if (!token.value) {
        message.value = "Token is required";
        messageClass.value = "error";
        showToast("error", message.value);
        return;
      }

      if (password.value !== passwordConfirmation.value) {
        message.value = "Passwords do not match!";
        messageClass.value = "error";
        showToast("error", message.value);
        return;
      }

      if (password.value.length < 8) {
        message.value = "Password must be at least 8 characters long";
        messageClass.value = "error";
        showToast("error", message.value);
        return;
      }

      try {
        const response = await axios.post(`${BASE_URL}/user/reset-password`, {
          token: token.value,
          email: props.email, // Use passed email
          password: password.value,
          password_confirmation: passwordConfirmation.value,
        });

        message.value = response.data.message;
        messageClass.value = "success";
        showToast("success", message.value);

        emit("close"); // Close modal on success
      } catch (error) {
        message.value = error.response?.data?.error || "An error occurred";
        messageClass.value = "error";
        showToast("error", message.value);
      }
    };

    return {
      token,
      password,
      passwordConfirmation,
      message,
      messageClass,
      resetPassword,
    };
  },
};
</script>


<style scoped>
  .header h3 {
    text-align: center;
    color: var(--header);
  }
  .form-group {
    color: var(--header);
    margin-bottom: 20px;

  }
  input {
    padding: 12px;
    padding-right: 150px;
    border-radius: 8px;
    border: 1px solid var(--header);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    margin-left: 4px;
  }

  input::placeholder {
    color: var(--header);
    font-size: 14px;
  }

  input:focus {
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25) !important;
    border-color: #007bff !important;
  }

  .btn {
    letter-spacing: 1px;
    padding: 10px;
    border-radius: 8px;
    background-color: var(--main);
    color: white;
    transition: background-color 0.3s ease, transform 0.2s ease;
    border: none;
    margin: 3px;
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