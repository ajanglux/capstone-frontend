<template>
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-head">
          <h3>Change Password</h3>
          <button class="close-btn" @click="closeReset"><i class='bx bx-x'></i></button>
        </div>

        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label for="current_password">Current Password</label>
            <input v-model="currentPassword" type="password" id="current_password" class="form-control" placeholder="Enter current password" required />
          </div>
          <div class="form-group">
            <label for="new_password">New Password</label>
            <input v-model="newPassword" type="password" id="new_password" class="form-control" placeholder="Enter new password" required minlength="8" />
          </div>
          <div class="form-group">
            <label for="password_confirmation">Confirm New Password</label>
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
import { getHeaderConfig } from "../../helpers/headerConfig";  
import Swal from "sweetalert2";
import { useAuthStore } from "../../stores/useAuthStore"; 

export default {
    props: {
        isModalOpen: Boolean,
    },
    emits: ["closeModal"],  

    setup(props, { emit }) {
        const authStore = useAuthStore();
        const currentPassword = ref("");
        const newPassword = ref("");
        const passwordConfirmation = ref("");

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

        const changePassword = async () => {
            if (newPassword.value !== passwordConfirmation.value) {
                showToast("error", "Passwords do not match!");
                return;
            }
            if (newPassword.value.length < 8) {
                showToast("error", "Password must be at least 8 characters long");
                return;
            }

            try {
                const token = authStore.access_token; 
                const response = await axios.put(`${BASE_URL}/user/change-password`, {
                    current_password: currentPassword.value,
                    new_password: newPassword.value,
                    new_password_confirmation: passwordConfirmation.value,
                }, getHeaderConfig(token));  

                showToast("success", response.data.message || "Password changed successfully");
                closeReset();
            } catch (error) {
                showToast("error", error.response?.data?.error || "An error occurred");
            }
        };

        const closeReset = () => {
            currentPassword.value = "";
            newPassword.value = "";
            passwordConfirmation.value = "";
            emit("closeModal");
        };

        return {
            currentPassword,
            newPassword,
            passwordConfirmation,
            changePassword,
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
    background-color: white;
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