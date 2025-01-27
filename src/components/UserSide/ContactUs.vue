<template>
  <div class="background-container">
    <div class="con-container">
      <form class="contact-form" @submit.prevent="saveCustomerDetail">
        <div class="contact-info">
          <h2>Enter Inquiries</h2> 
          <div class="input-group mb-4">
            <textarea v-model="customerDetail.description" class="form-control" placeholder="" required></textarea>
            <p v-if="descriptionError" class="error-message">Description is required.</p>
          </div>
          <div class="button">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>

    <SuccessModal v-if="showSuccessModal" @close="showSuccessModal = false"/>
    <ProfileModal v-if="showProfileModal" @close="showProfileModal = false"/>

    <div class="con-info">
      <h2>Contact Us</h2>
      <p>For further questions, inquiries, or assistance, feel free to reach out to us. Our team is here to help and ensure you have the best experience with TechFix!</p>
    </div>

    <div class="cards">
      <div class="card">
        <div class="info">
          <p>Email:</p>
          <h1>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=raymart.williams@brandcomph.com" target="_blank">
              raymart.williams@brandcomph.com
            </a>
          </h1>
        </div>
      </div>

      <div class="card">
        <div class="info">
          <p>Contact Number:</p>
          <h1><a href="tel:+639661908734">+639661908734</a></h1>
        </div>
      </div>

      <div class="card">
        <div class="info">
          <p>Address:</p>
          <h1 class="address">Robtess Tower 1 Unit A #9 Hansen 12 street East Tapinac Olongapo City, Zambales (store)</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../helpers/baseUrl';
import { useToast } from 'vue-toastification'; 
import { useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';
import { getHeaderConfig } from '../../helpers/headerConfig';

import ProfileModal from './Profile.vue';

const authStore = useAuthStore();
const userProfile = authStore.user;

const customerDetail = ref({
  user_id: authStore.user.id,
  description: '',
});

const route = useRoute();
const addressError = ref(false);
const descriptionError = ref(false);
const toast = useToast();
const isTermsChecked = ref(false);
const termsError = ref(false);

const showProfileModal = ref(false);

const isAddressValid = computed(() => !addressError.value);

const saveCustomerDetail = async () => {
  descriptionError.value = !customerDetail.value.description.trim();

   // Check if profile data is incomplete
  if (!userProfile.first_name || !userProfile.last_name || !userProfile.address || !userProfile.phone_number) {
    toast.error('Please complete your profile information (First Name, Last Name, Address, Phone Number) before submitting.', { timeout: 3000 });
    console.log('Showing Profile Modal');
    // Show the profile modal after the toast message / ayaw lumabas
    showProfileModal.value = true;
    return;
  }

    // Check for existing inquiry with status not 'Completed'
  try {
    const response = await axios.get(`${BASE_URL}/customer-details/check-inquiries`, getHeaderConfig(authStore.access_token));
    if (response.data && response.data.hasPendingInquiry) {
      toast.error('You already have an ongoing inquiry that is not completed. Please wait until it is resolved.', { timeout: 4000 });
      return;
    }
  } catch (error) {
    console.error('Error checking existing inquiries:', error);
    toast.error('An error occurred while checking existing inquiries.', { timeout: 4000 });
    return;
  }

  if (descriptionError.value) {
    toast.error('Description is required.');
    return;
  }

  try {
    await axios.post(`${BASE_URL}/customer-details`, customerDetail.value);
    toast.success("Details saved successfully", { timeout: 3000 })
    resetForm();
  } catch (error) {
    console.error('Error saving customer details:', error);
    toast.error('An error occurred while saving customer details.');
  }
};

const resetForm = () => {
  customerDetail.value = {
    description: ''
  };
  descriptionError.value = false;
};

onMounted(() => {
  if (route.query.service) {
    customerDetail.value.description = route.query.service;
  }
});
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
  padding-bottom: 50px;
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

        .button {
          display: flex;
          justify-content: flex-end;
          padding-top: 10px;

          button {
            background-color: var(--main);
            color: white;
            padding: 10px 15px;
            border-radius: 10px;
          }

          button:hover {
            background-color: var(--main-hover);
          }
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
    width: 90%;    
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

      a {
        text-decoration: none;
        color: var(--header);
      }
      a:hover {
        color: var(--main);
      }

      
      p {
        font-size: 16px;
      }

      h1 {
        font-size: 13px;
      }

      .address {
        font-size: 12px;
      }
    }
  }

  .card:nth-child(3) {
    flex-basis: 100%;
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
  .background-container {
    height: auto;
    width: 100%;
  }
  .con-container {
    margin: 0 5pc 2pc 5pc;
    .contact-form {
      .contact-info {
        h2 { font-size: 20px; }
      }
    }
  }

  .con-info {
    margin-left: 5pc;
    margin-right: 5pc;
    h2 { font-size: 20px; }
  }

  .cards {
    padding: 20px 5pc 0 5pc;
  }
}

@media (max-width: 700px) {
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