<template>
  <div class="signup-container">
    <Transition name="slide-in" appear>
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
                  v-model="data.user.first_name"
                  placeholder="First Name" 
                  class="form-control rounded-0"
                  required>
              </div>
              <div class="form-group mb-3">
                <input 
                  type="text" 
                  v-model="data.user.last_name"
                  placeholder="Last Name" 
                  class="form-control rounded-0"
                  required>
              </div>
              <div class="form-group mb-3">
                <label>Birthdate</label>
                <input 
                  type="date" 
                  v-model="data.user.birthday"
                  placeholder="Birthday" 
                  class="form-control rounded-0"
                  title="Birthday"
                  required>
                <p v-if="birthdayError" class="text-danger">{{ birthdayError }}</p>
              </div>
              <div class="form-group mb-3">
                <input 
                  type="text" 
                  v-model="data.user.phone_number"
                  @input="validatePhoneNumber"
                  placeholder="Phone Number" 
                  class="form-control rounded-0"
                  required>
              </div>
              <div class="form-group mb-3">
                <input 
                  type="text" 
                  v-model="data.user.address"
                  placeholder="Address" 
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
                  <p v-if="passwordError" class="text-danger">{{ passwordError }}</p>
              </div>
              <div class="form-group mb-3 position-relative">
                <input 
                  :type="confirmPasswordVisible ? 'text' : 'password'" 
                  v-model="data.user.password_confirmation"
                  placeholder="Confirm Password" 
                  class="form-control rounded-0"
                  required>
                <i 
                id="show-hide"
                  class="bx" 
                  :class="confirmPasswordVisible ? 'bx-show' : 'bx-hide'" 
                  @click="toggleConfirmPasswordVisibility" 
                  ></i>
              </div>

              <div class="terms-checkbox">
                <input type="checkbox" v-model="isTermsChecked" id="termsCheckbox" @input="validateTerms" required />
                  <p> I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer"> Terms and Conditions </a> &
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"> Privacy Policy </a>
                  </p>
              </div>

              <div class="text-center">
                <Spinner v-if="data.loading" />
                <button v-else type="submit" class="btn btn-dark btn-sm rounded-0 w-100">
                  Submit
                </button> <br>
                <div class="down">
                  <p> Already have an account?  <router-link class="primary" to="/login">Login</router-link></p>
                  <router-link class="secondary" to="/">Go Back</router-link>
                </div>
              </div>
            </form>
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
import { ref, reactive, watch, computed } from "vue"
import router from '../../router'
import { useAuthStore } from '../../stores/useAuthStore.js'
import axios from 'axios'
import { BASE_URL } from '../../helpers/baseUrl'
import Spinner from '../layouts/Spinner.vue'
import Swal from 'sweetalert2'

const store = useAuthStore()
const isTermsChecked = ref(false);
const termsError = ref(false);
const phoneError = ref(false);
const passwordError = ref("");
const passwordVisible = ref(false); 
const confirmPasswordVisible = ref(false);
const ageError = ref("");
const birthdayError = ref("");

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const toggleConfirmPasswordVisibility = () => {
  confirmPasswordVisible.value = !confirmPasswordVisible.value; 
};

const validateTerms = () => {
  termsError.value = !isTermsChecked.value;
};

const data = reactive({
  loading: false,
  user: {
      first_name: '',
      last_name: '',
      birthday: '',
      phone_number: '',
      address: '',
      email: '',
      password: '',
      password_confirmation:''
  },
})

// Validate Birthday (Age Restriction)
const computedAge = computed(() => {
  if (!data.user.birthday) return null;

  const birthDate = new Date(data.user.birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

const validateBirthday = () => {
  if (!data.user.birthday) {
    birthdayError.value = "Please enter your birthday.";
    return false;
  }

  const age = computedAge.value;

  if (age < 11) {
    birthdayError.value = "Users below 11 years old are not allowed to register.";
    return false;
  } else if (age >= 12 && age <= 17) {
    birthdayError.value = "Please use a parent's email to register.";
  } else {
    birthdayError.value = "";
  }

  return true;
};

watch(() => data.user.first_name, (newVal) => {
  if (newVal) {
    data.user.first_name = newVal.charAt(0).toUpperCase() + newVal.slice(1);
  }
});

watch(() => data.user.last_name, (newVal) => {
  if (newVal) {
    data.user.last_name = newVal.charAt(0).toUpperCase() + newVal.slice(1);
  }
});

watch(() => data.user.address, (newVal) => {
  if (newVal) {
    data.user.address = newVal.charAt(0).toUpperCase() + newVal.slice(1);
  }
});

watch(() => data.user.age, (newAge) => {
  const age = parseInt(newAge, 10);

  if (isNaN(age) || age < 1) {
    ageError.value = "Please enter a valid age.";
  } else if (age <= 16) {
    ageError.value = "Users who are 11 years old or younger are not allowed to register.";
  } else if (age >= 12 && age <= 17) {
    ageError.value = "Children aged 12 to 17 are advised to use their parent's email..";
  } else {
    ageError.value = "";
  }
});

watch(() => data.user.password, (newPassword) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:]).+$/;

  if (!newPassword) {
    passwordError.value = "Password is required.";
  } else if (newPassword.length < 8) {
    passwordError.value = "Password must be at least 8 characters long.";
  } else if (!passwordRegex.test(newPassword)) {
    passwordError.value = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
  } else {
    passwordError.value = "";
  }
});

const validatePhoneNumber = () => {
  data.user.phone_number = data.user.phone_number.replace(/\D/g, "").slice(0, 11);
  phoneError.value = data.user.phone_number.length !== 11;
};

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

const validatePassword = () => {
  const password = data.user.password;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:]).+$/;

  if (!passwordRegex.test(password)) {
    showToast("error", "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
    return false;
  }
  return true;
};

const registerUser = async () => {
  data.loading = true;

  if (!validateBirthday()) {
    data.loading = false;
    return;
  }

  // const age = parseInt(data.user.age, 10);

  // if (isNaN(age) || age < 1) {
  //   showToast("error", "Please enter a valid age.");
  //   data.loading = false;
  //   return;
  // }

  // if (age <= 11) {
  //   showToast("error", "Users who are 11 years old or younger are not allowed to register.");
  //   data.loading = false;
  //   return;
  // }

  // if (age >= 12 && age <= 17) {
  //   showToast("info", "Please use a parent's email to register.");
  // }

  if (!validatePassword()) {
    data.loading = false;
    return;
  }

  if (data.user.password.length < 8) {
    showToast("error", "Password must be at least 8 characters long.");
    data.loading = false;
    return;
  }

  if (data.user.phone_number.length < 11) {
    showToast("error", "Phone number must be at least 11 numbers long.");
    data.loading = false;
    return;
  }

  if (data.user.password !== data.user.password_confirmation) {
    showToast("error", "Passwords do not match.");
    data.loading = false;
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}/user/register`, data.user);
    data.loading = false;

    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      html: '<strong>PLEASE READ:</strong> <br>If you do not see the message in your inbox, check your spam folder and mark the email as "Not Spam" before verifying.',
      confirmButtonColor: '#0C3C61FF',
      confirmButtonText: 'Okay',
    });

    router.push('/login');
  } catch (error) {
    data.loading = false;
    if (error.response?.status === 422) {
      store.setErrors(error.response.data.errors);
    }
    console.log(error);
  }
};

</script>


<style lang="scss" scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-card-wrapper {
  display: flex;
  flex-direction: row;
  align-self: stretch;
  width: 100%;
}

.signup-card {
  flex-basis: 50%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 30px 130px;
  align-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

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
    margin-bottom: 15px;
    width: 100%;
    border: 1px solid var(--header);
  }

  .header h3 {
    font-weight: 700;
    font-size: 50px;
    letter-spacing: 0.5px;
    margin-bottom: 15px;
    color: var(--main);
    text-align: center;
    font-family: 'Poppins';
    
  }

  .text-center {
    text-align: center;

  }

  input {
    font-family: "Poppins";
    padding: 10px;
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

  .terms-checkbox {
    display: flex;
    padding-bottom: 10px;
    margin-top: -15px;

    input[type="checkbox"] {
      width: 15px;
      margin-top: 13px;
      margin-right: 5px;
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
  
  .text-danger {
    color: red;
    font-size: 12px;
  }
}

label {
  font-size: 10px;
  color: #353535;
}

.logo {
  flex-basis: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--main);
  border-top-left-radius: 12%;
  border-bottom-left-radius: 12%;

  img {
    width: 70%;
  }
}

.slide-in-enter-active {
  transition: transform 0.8s ease-out, opacity 0.8s ease-out;
}

.slide-in-enter-from {
  transform: translateX(100px); /* Start from the right */
  opacity: 0;
}

.slide-in-enter-to {
  transform: translateX(0); /* Move to normal position */
  opacity: 1;
}


@media (max-width: 500px) {
  .container {
    padding: 10px;
  }
    .signup-card-wrapper {
    display: flex;
    flex-direction: row;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    width: 80%;
  }

  .signup-card {
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
        width: 20px;
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

@media (max-width: 400px) {
  .signup-card {
    padding: 0px 28px 0px 29px;
    flex-basis: 100%;
  }

  .down {
    padding-top: 11px;
    padding-bottom: 12px;
  }

}
</style>