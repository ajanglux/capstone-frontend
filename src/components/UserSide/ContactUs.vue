<template>
  <div class="background-container">
    <div class="con-container">
      <form class="contact-form" @submit.prevent="saveCustomerDetail">
        <div class="contact-info">
          <h2>Enter Information For Inquiries</h2> 
          <div class="input-group mb-4">
            <textarea v-model="customerDetail.description" class="form-control" placeholder="Short Device Issue Description" required></textarea>
            <p v-if="descriptionError" class="error-message">Description is required.</p>
          </div>
        </div>

        <div class="contact-form-container">
          <div class="name">
            <input v-model="customerDetail.first_name" type="text" id="firstName" name="firstName" placeholder="Firstname" required style="text-transform: capitalize;"/>
            <input v-model="customerDetail.last_name" type="text" id="lastName" name="lastName" placeholder="Lastname" required style="text-transform: capitalize;"/>
          </div>
          <input v-model="customerDetail.phone_number" type="text" id="phone" name="phone" required @input="validatePhoneNumber"placeholder="Phone Number"/>
          <p v-if="phoneNumberError" class="error-message">Phone number must be exactly 11 digits and numeric.</p>
          <input v-model="customerDetail.email" type="email" id="email" name="email" placeholder="Email" />
          <input v-model="customerDetail.address" type="text" id="address" name="address" placeholder="Barangay / Street or Municipality / City or Province" required @input="validateAddress" style="text-transform: capitalize;"/>
          <p v-if="addressError" class="error-message">Address must include Barangay, Street, and City separated by comma (,).</p>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    <SuccessModal v-if="showSuccessModal" @close="showSuccessModal = false" />

    <div class="con-info">
      <h2>Contact Us</h2>
      <p>For any questions, inquiries, or assistance, feel free to reach out to us. Our team is here to help and ensure you have the best experience with TechFix!</p>
    </div>

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
  address: '',
  description: '',
});

const showSuccessModal = ref(false);
const addressError = ref(false);
const descriptionError = ref(false);

const validatePhoneNumber = (event) => {
  const input = event.target;
  const value = input.value.replace(/\D/g, '');
  if (value.length > 11) {
    input.value = value.slice(0, 11);
  } else {
    input.value = value;
  }
};

const validateAddress = () => {
  const addressParts = customerDetail.value.address.split(',');
  addressError.value = addressParts.length < 3;
};

const isAddressValid = computed(() => !addressError.value);

const saveCustomerDetail = async () => {
  descriptionError.value = !customerDetail.value.description.trim();

  if (!isAddressValid.value) {
    alert('Address must include Barangay, Street, and City.');
    return;
  }

  if (descriptionError.value) {
    alert('Description is required.');
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
    address: '',
    description: ''
  };
  addressError.value = false;
  descriptionError.value = false;
};
</script>

  
<style lang="scss" scoped>
.background-container {
  position: relative;
  background: var(--header);
  background-size: cover;
  height: auto;
  width: auto;
  min-height: 100vh;
  min-width: 100vw; 
  justify-content: center;
  align-items: center;
  padding: 0;
  z-index: 1;
}

.con-container {
  display: flex;
  gap: 20px;
  padding-top: 8pc;
  margin: 0 17pc 2pc 17pc;

  .contact-form {
      display: flex;
      flex-direction: row;
      gap: 20px;
      width: 100%;

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

        display: flex;
        flex-direction: column;
        width: 100%;

        .name {
          display: flex;
          gap: 1pc;
        }

        input {
          font-family: 'Poppins';
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

.con-info {
  background: var(--light);
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  padding: 15px;
  margin-left: 17pc;
  margin-right: 17pc;
  text-align: justify;
}

.cards {
  display: flex;
  margin-top: 1pc;
  gap: 30px;
  width: 100%;
  align-items: stretch;
  transition: all 0.5s ease;
  padding: 20px 17pc 0 17pc;

  .card {
    width: 100%;    
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

textarea {
  font-family: 'Poppins';
  height: 155px;
  width: 100%;
  resize: none;
  border-radius: 10px;
  outline: none;
  border: none;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  background-color: var(--light2);
  margin-top: 1pc;
}
input:hover, textarea:hover {
    background-color: var(--light2);
}

.error-message {
  color: red;
  font-size: 12px;
}

@media (max-width: 1250px) {
  .con-container {
    margin: 0 15pc 2pc 15pc;
  }

  .con-info {
    margin-left: 15pc;
    margin-right: 15pc;
  }

  .cards {
    padding: 20px 15pc 0 15pc;
  }
}

@media (max-width: 1150px) {
  .con-container {
    margin: 0 10pc 2pc 10pc;
  }

  .con-info {
    margin-left: 10pc;
    margin-right: 10pc;
  }

  .cards {
    padding: 20px 10pc 0 10pc;
  }
}

@media (max-width: 990px) {
  .con-container {
    .contact-form {
      .contact-info {
        h2 { font-size: 20px; }
      }
    }
  }

  .con-info {
    h2 { font-size: 20px; }
  }

  .cards {
    padding: 20px 10pc 0 10pc;
  }
}

@media (max-width: 500px) {
  .background-container {
    height: auto;
    padding-bottom: 30px;
  }

  .con-container {
    padding-top: 5pc;
    margin: 2pc 2pc 2pc 2pc;

    .contact-form {
        display: flex;
        flex-direction: column;
        width: 100%;

        .contact-info {
          width: 100%;
          h2 { font-size: 18px; }
        }

        .contact-form-container {
          .name {
            display: flex;
            flex-direction: column;
            gap: 0;
          }
        }
      }
    }

  .con-info {
    padding: 15px;
    margin: 2pc 2pc 0 2pc;
    h2 { font-size: 18px; }
    p { font-size: 14px; }
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