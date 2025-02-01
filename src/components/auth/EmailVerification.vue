<template>
    <div class="container">
        <div class="login-card-wrapper">
            <div class="login-card">
                <div class="header">
                    <h3>Email Verification</h3>
                </div>
                <div v-if="status === 'pending'" class="card-body">
                    <p>Please check your inbox for the verification email. If you didn't receive it, click the button below.</p>
                    <button @click="resendVerificationEmail" :disabled="isResending">Resend Verification Email</button>
                </div>
            
                <div v-if="status === 'verified'" class="card-body">
                    <h3>Email Verified</h3>
                    <p>Your email has been successfully verified!</p>
                </div>
            
                <div v-if="status === 'failed'" class="card-body">
                    <h3>Email Verification Failed</h3>
                    <p>There was an error verifying your email. Please try again later.</p>
                </div>

                <div class="down">
                    <p><router-link class="primary" to="/login">Email Verified</router-link></p>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        status: 'pending', // pending, verified, failed
        isResending: false
      };
    },
    created() {
      this.checkVerificationStatus();
    },
    methods: {
      checkVerificationStatus() {
        axios.get('/api/email/verify')
          .then(response => {
            this.status = 'verified';
          })
          .catch(error => {
            if (error.response && error.response.status === 403) {
              this.status = 'pending';
            } else {
              this.status = 'failed';
            }
          });
      },
      resendVerificationEmail() {
        this.isResending = true;
        axios.post('/api/email/resend')
          .then(response => {
            this.isResending = false;
            alert('A new verification email has been sent.');
          })
          .catch(error => {
            this.isResending = false;
            console.error(error);
            alert('Failed to resend verification email. Please try again later.');
          });
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgb(12, 68, 110);
  padding: 30px;
}

.login-card-wrapper {
  display: flex;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  width: 60%;
}

.login-card {
  width: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background-color: var(--light);
  padding: 60px;
  align-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  .header h3 {
    font-weight: 700;
    font-size: 50px;
    letter-spacing: 0.5px;
    margin-bottom: 30px;
    color: var(--main);
    text-align: center;
    font-family: 'Poppins';
    }

    h3, p {
        font-size: 12px;
        color: black;
        margin-top: 15.5px;
        padding-left: 3px;
      }

}
  </style>
  