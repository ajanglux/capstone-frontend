<template>
  <div class="background-container">
    <div class="con-container">
      <div class="contact-info">
        <h2>Contact Us</h2>
        <p> Sample Sample Sample Sample Sample Sample Sample Sample Sample Sample Sample Sample 
          Sample Sample Sample Sample Sample Sample Sample Sample Sample Sample Sample Sample 
          Sample Sample Sample Sample Sample Sample Sample Sample Sample Sample Sample Sample 
          Sample Sample Sample Sample Sample Sample Sample Sample Sample Sample Sample Sample 
          Sample Sample Sample Sample Sample Sample Sample Sample </p>
        <p1></p1>
      </div>

      <div class="contact-form-container">
        <form class="contact-form" @submit.prevent="saveCustomerDetail">
          <div class="name">
            <input v-model="customerDetail.first_name" type="text" id="firstName" name="firstName" placeholder="Firstname" required />

            <input v-model="customerDetail.last_name" type="text" id="lastName" name="lastName" placeholder="Lastname" required />
          </div>

          <input 
            v-model="customerDetail.phone_number" 
            type="text" 
            id="phone" 
            name="phone" 
            required 
            @input="validatePhoneNumber"
            placeholder="Phone Number"
          />
          <p v-if="phoneNumberError" class="error-message">Phone number must be exactly 11 digits and numeric.</p>

          <input v-model="customerDetail.email" type="email" id="email" name="email" placeholder="Email" />

          <input 
            v-model="customerDetail.address" 
            type="text" 
            id="address" 
            name="address" 
            placeholder="Barangay / Street or Municipality / City or Province" 
            required 
            @input="validateAddress"
          />
          <p v-if="addressError" class="error-message">Address must include Barangay, Street, and City separated by comma (,).</p>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    <SuccessModal v-if="showSuccessModal" @close="showSuccessModal = false" />

    <div class="cards">
      <div class="card">
        <div class="info">
          <p>Email:</p>
          <h1>intelvision@yahoo.com</h1>
        </div>
      </div>

      <div class="card">
        <div class="info">
          <p>Contact Number:</p>
          <h1>123-456-7890</h1>
        </div>
      </div>

      <div class="card">
        <div class="info">
          <p>Address:</p>
          <h1>1234 Elm Street, City, Country</h1>
        </div>
      </div>
    </div>
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
const addressError = ref(false);

const validatePhoneNumber = (event) => {
  const input = event.target;
  const value = input.value.replace(/\D/g, '');

  customerDetail.value.phone_number = value;
  phoneNumberError.value = value.length !== 11;
};

const validateAddress = () => {
  const addressParts = customerDetail.value.address.split(',');
  addressError.value = addressParts.length < 3;
};

const isPhoneNumberValid = computed(() => customerDetail.value.phone_number.length === 11);
const isAddressValid = computed(() => !addressError.value);

const saveCustomerDetail = async () => {
  if (!isPhoneNumberValid.value) {
    alert('Phone number must be exactly 11 digits.');
    return;
  }

  if (!isAddressValid.value) {
    alert('Address must include Barangay, Street, and City.');
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
  addressError.value = false;
};
</script>

  
<style lang="scss" scoped>
.background-container {
  position: relative;
  background: var(--header);
  background-size: cover;
  height: 100vh;
  width: 100vw; 
  justify-content: center;
  align-items: center;
  padding: 0;
  z-index: 1;
}

.con-container {
  display: flex;
  gap: 20px;
  padding-top: 10.5pc;
  margin: 0 17pc 1.5pc 17pc;

  .contact-info {
    background: var(--light);
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    padding: 25px;
    width: 100%;
  }

  .contact-form-container {
    flex: 1;
    background: var(--header);
    border-radius: 15px;

    .contact-form {
      display: flex;
      flex-direction: column;
      width: 100%;

      .name {
        display: flex;
        gap: 1pc;
      }

      input {
        padding: 8px;
        margin-bottom: 20px;
        border-radius: 10px;
        background-color: var(--light);
        outline: none;
        border: 2px solid transparent;

        &:focus {
          border: 2px solid var(--grey);
        }

      }

      button {
        background-color: var(--main);
        color: white;
        padding: 10px;
        margin-left: 100px;
        margin-right: 100px;
        border-radius: 13px;
      }

      button:hover {
        background-color: var(--main-hover);

      }
    }
  }
}

.cards {
  display: flex;
  margin-top: 3pc;
  gap: 30px;
  width: 100%;
  align-items: stretch;
  transition: all 0.5s ease;
  padding: 20px 0 0 17pc;

  .card {
    width: 25%;    
    padding: 20px;
    border-radius: 5px;
    background-color: var(--light);
    color: #333;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      
      p {
        font-size: 16px;
      }

      h1 {
        font-size: 16px;
      }
    }
  }
}

.error-message {
  color: red;
  font-size: 12px;
}

@media (max-width: 500px) {
  .background-container {
    height: auto;
    padding-bottom: 30px;
  }

  .con-container {
    display: flex;
    flex-direction: column;
    padding-top: 6.5pc;
    margin: 0 2pc 1.5pc 2pc;

    .contact-form-container {
      flex: 1;
      background: var(--header);
      border-radius: 15px;

      .contact-form {
        .name {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
      }
    }
  }

  .cards {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 2pc 0 2pc;

    .card {
      width: 100%;    
    }
  }
}
</style>