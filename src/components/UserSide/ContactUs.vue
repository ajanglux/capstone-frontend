<template>
  <div class="background-container">
    <div class="container">
      <div class="contact-info">
        <h1 class="h1">Contact Us</h1>
        <br />
        <br>
        <div class="contact-detail">
          <i class="fas fa-envelope"></i>
          <h4>Email: intelvision@yahoo.com</h4>
        </div>
        <br>
        <div class="contact-detail">
          <i class="fas fa-phone"></i>
          <h4>Contact No.: 123-456-7890</h4>
        </div>
        <br>
        <div class="contact-detail">
          <i class="fas fa-map-marker-alt"></i>
          <h4>Address: 1234 Elm Street, City, Country</h4>
        </div>
      </div>

      <div class="contact-form-container">
        <form class="contact-form" @submit.prevent="saveCustomerDetail">
          <label for="firstName">First Name</label>
          <input v-model="customerDetail.first_name" type="text" id="firstName" name="firstName" required />

          <label for="lastName">Last Name</label>
          <input v-model="customerDetail.last_name" type="text" id="lastName" name="lastName" required />

          <label for="phone">Phone Number</label>
          <input 
            v-model="customerDetail.phone_number" 
            type="text" 
            id="phone" 
            name="phone" 
            required 
            @input="validatePhoneNumber"
            placeholder="09"
          />
          <p v-if="phoneNumberError" class="error-message">Phone number must be exactly 11 digits and numeric.</p>

          <label for="email">Email</label>
          <input v-model="customerDetail.email" type="email" id="email" name="email" />

          <label for="address">Address</label>
          <input v-model="customerDetail.address" type="text" id="address" name="address" />

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    <SuccessModal v-if="showSuccessModal" @close="showSuccessModal = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import SuccessModal from '../layouts/SuccessModal.vue';

const customerDetail = ref({
  first_name: '',
  last_name: '',
  phone_number: '',
  email: '',
  address: ''
});

const showSuccessModal = ref(false);
const phoneNumberError = ref(false);

const validatePhoneNumber = (event) => {
  const input = event.target;
  const value = input.value.replace(/\D/g, '');

  customerDetail.value.phone_number = value;
  phoneNumberError.value = value.length !== 11;
};

const isPhoneNumberValid = computed(() => customerDetail.value.phone_number.length === 11);

const saveCustomerDetail = async () => {
  if (!isPhoneNumberValid.value) {
    alert('Phone number must be exactly 11 digits.');
    return;
  }

  try {
    await axios.post(`${BASE_URL}/customer-details`, customerDetail.value);
    showSuccessModal.value = true;
    resetForm();
  } catch (error) {
    console.error('Error saving customer details:', error);
    alert('An error occurred while saving customer details.');
  }
};

const resetForm = () => {
  customerDetail.value = {
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    address: ''
  };
  phoneNumberError.value = false;
};
</script>
  
<style scoped>
.background-container {
  position: relative;
  background: var(--light);
  background-size: cover;
  height: 100vh;
  width: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  z-index: 1;
}

.container {
  display: flex;
  justify-content: space-between;
  padding: 50px;
  padding-right: 32px;
  background: var(--header);
  border-radius: 5px;
  max-width: 1100px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  margin: 0 0px;
}

.h1 {
  position: relative;
  margin-left: 14vh;
}

.contact-info, .contact-form-container {
  flex: 1;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  margin-right: 20px;
}

.contact-info {
  margin-right: 40px;
}

.contact-info h1 {
  font-family: 'Poppins';
  font-size: 2.2em;
  margin-bottom: 15px;
  color: #333;
}

.contact-detail {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.contact-detail i {
  font-family: 'Poppins';
  margin-right: 10px;
  font-size: 1.3em;
  color: #007bff;
}

.contact-detail h4 {
  font-family: 'Poppins';
  font-size: 1.1em;
  margin: 0;
  color: #333;
}

.contact-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.contact-form label {
  font-family: 'Poppins';
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.contact-form input,
.contact-form textarea {
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.contact-form textarea {
  resize: vertical;
}

.contact-form button {
  padding: 8px 18px;
  background-color: var(--main);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
}

.contact-form button:hover {
  background-color: var(--main-hover);
}

.error-message {
  color: red;
  font-size: 12px;
}
</style>