<template>
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-head">
          <h3 v-if="!showResetForm">Enter Email</h3>
          <h3 v-else>Change Password</h3>
          <button class="close-btn" @click="closeReset"><i class='bx bx-x'></i></button>
        </div>

        <form v-if="!showResetForm" @submit.prevent="submitEmail">
          <div class="form-group">
            <label for="email">Enter Email Address to send code</label>
            <input v-model="email" type="email" id="email" class="form-control" placeholder="Enter your email" required />
          </div>
          <button type="submit" class="btn">Submit</button>
        </form>

        <form v-if="showResetForm" @submit.prevent="resetPassword">
          <div class="form-group">
            <label for="token">Enter Code:</label>
            <input v-model="token" type="text" id="token" class="form-control" placeholder="Enter Code" required />
          </div>
          <div class="form-group">
            <label for="password">New Password</label>
            <input v-model="password" type="password" id="password" class="form-control" placeholder="Enter new password" required minlength="8" />
          </div>
          <div class="form-group">
            <label for="password_confirmation">Confirm Password</label>
            <input v-model="passwordConfirmation" type="password" id="password_confirmation" class="form-control" placeholder="Confirm new password" required minlength="8" />
          </div>
          <button type="submit" class="btn btn-primary">Change Password</button>
        </form>
      </div>
    </div>
</template>
  
<script>
import axios from "axios";
import { ref } from "vue";
import { BASE_URL } from "../../helpers/baseUrl";
import Swal from "sweetalert2";

export default {
    props: {
        isModalOpen: Boolean,
    },
    emits: ["closeModal"],  

    setup(props, { emit }) {
        const email = ref("");
        const token = ref("");
        const password = ref("");
        const passwordConfirmation = ref("");
        const message = ref("");
        const messageClass = ref("");
        const showResetForm = ref(false);

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
            Swal.fire({
                title: 'Sending...',
                text: 'Please wait while we send the code.',
                icon: 'info',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            try {
                const response = await axios.post(`${BASE_URL}/user/forgot-password`, { email: email.value });
                Swal.close();
                message.value = response.data.message;
                messageClass.value = "success";
                showToast("success", message.value);
                
                showResetForm.value = true;
            } catch (error) {
                Swal.close();
                message.value = error.response?.data.error || "No Email Found";
                messageClass.value = "error";
                showToast("error", message.value);
            }
        };

        const resetPassword = async () => {
            if (password.value !== passwordConfirmation.value) {
                showToast("error", "Passwords do not match!");
                return;
            }
            if (password.value.length < 8) {
                showToast("error", "Password must be at least 8 characters long");
                return;
            }
            try {
                await axios.post(`${BASE_URL}/user/reset-password`, {
                token: token.value,
                password: password.value,
                password_confirmation: passwordConfirmation.value,
                });
                showToast("success", "Password reset successfully");
                closeReset();
            } catch (error) {
                showToast("error", error.response?.data?.error || "An error occurred");
            }
        };

        const closeReset = () => {
            email.value = "";
            token.value = "";
            password.value = "";
            passwordConfirmation.value = "";
            showResetForm.value = false;
            emit("closeModal");
        };

        return {
            email,
            token,
            password,
            passwordConfirmation,
            message,
            messageClass,
            showResetForm,
            submitEmail,
            resetPassword,
            closeReset,
        };
    },
};
</script>
    
  
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;

    .modal-head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;

        i {
            font-size: 30px;
            font-weight: 700;
        }
    }
}

h3 {
    text-align: center;
    color: var(--header);
}

.form-group {
    color: var(--header);
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;

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
    </style>