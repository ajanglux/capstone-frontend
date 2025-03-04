<template>
  <div class="container">
    <div class="login-card-wrapper">
      <div class="login-card">
        <div class="header">
          <h3>Find your account</h3>
        </div>
        <form @submit.prevent="submitEmail">
          <div class="form-group">
            <label class="label" for="email">Enter Email Address to send code</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" class="btn">Submit</button>
          <p v-if="message" :class="messageClass">{{ message }}</p>
        </form>

        <div class="forgot">
          <router-link class="secondary" to="/login">Go Back</router-link>
        </div>
      </div>
    </div>

    <!-- Reset Password Modal -->
    <div v-if="showResetModal" class="modal-overlay">
      <div class="modal">
        <ResetPassword :email="email" @close="showResetModal = false" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { BASE_URL } from "../../helpers/baseUrl";
import Swal from "sweetalert2";
import ResetPassword from "./ResetPassword.vue"; // Import ResetPassword as a modal

export default {
  components: {
    ResetPassword,
  },
  setup() {
    const email = ref("");
    const message = ref("");
    const messageClass = ref("");
    const showResetModal = ref(false); // Control modal visibility

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

    const submitEmail = async () => {
      // Show SweetAlert loading before the request is sent
      Swal.fire({
        title: 'Sending...',
        text: 'Please wait while we send the code.',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        const response = await axios.post(`${BASE_URL}/user/forgot-password`, {
          email: email.value,
        });

        // Hide the loading SweetAlert
        Swal.close();

        message.value = response.data.message;
        messageClass.value = "success";
        showToast("success", message.value);

        // Show Reset Password Modal after successful email submission
        showResetModal.value = true;
      } catch (error) {
        // Close the loading SweetAlert if an error occurs
        Swal.close();

        message.value = error.response?.data.error || "No Email Found";
        messageClass.value = "error";
        showToast("error", message.value);
      }
    };

    return {
      email,
      message,
      messageClass,
      showResetModal,
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
  background-color: var(--light);
  padding: 30px;
}

// .login-card-wrapper {
//   display: flex;
//   border-radius: 12px;
//   box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
//   width: 60%;
// }

.login-card {
  // width: 100%;
  // border-radius: 10px;
  // box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  // background-color: var(--light);
  // padding: 60px;
  // transition: transform 0.3s ease, box-shadow 0.3s ease;
  // display: flex;
  // flex-direction: column;

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

    .secondary {
      text-decoration: none;
      color: var(--header);

      &:hover {
        text-decoration: underline;
        color:var(--header);
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
    margin-bottom: 20px;
    margin-right: 0px;
    margin-left: 0px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  label {
    color: var(--header);
    font-size: 14px;
    padding-bottom: 10px;
  }

  .header h3 {
    font-weight: 700;
    font-size: 50px;
    letter-spacing: 0.5px;
    margin-bottom: 40px;
    color: var(--header);
    text-align: center;
    font-family: 'Poppins';
  }

  .text-center {
    text-align: center;
  }

  input {
    margin: 0 100px;
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

  input, textarea {
    font-size: 16px;
    touch-action: manipulation;
  }

  .btn {
    letter-spacing: 1px;
    padding: 6px;
    font-size: 14px;
    border-radius: 10px;
    background-color: var(--main);
    color: var(--light);
    width: 20%;
    transition: background-color 0.3s ease, transform 0.2s ease;
    border: none;
  }

  .btn:hover {
    background-color: var(--main-hover);
    transform: translateY(-2px);
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 20px;
  padding-left: 30px;
  border-radius: 10px;
  width: 400px;
}

@media (max-width: 550px) {
  .login-card .header h3{
    font-size: 30px;
  }

  .login-card .btn{
    width: 28%;
  }
}
</style>
  