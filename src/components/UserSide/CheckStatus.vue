<template>
  <div class="background-container">
    <div class="exclusive-content">
      <!-- Access Code Form -->
      <div v-if="!accessGranted" class="access-form">
        <h2>Enter Access Code</h2>
        <input v-model="accessCode" type="text" placeholder="Enter code here" />
        <button @click="validateCode">Submit</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
  
      <!-- Check Status Section -->
      <div v-if="accessGranted" class="check-status">
        <h2>Check Repair Status</h2>
        <router-link class="status-button" :to="statusLink">Check Status</router-link>
      </div>
  
      <!-- Exclusive Content View -->
      <div v-else class="content-box">
        <h2>Exclusive Content</h2>
        <p>This information is available only to users with the correct code.</p>
        <button @click="viewDetails">View Details</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    accessCode: '', // User input for the code
    validCode: '12345', // The correct access code (you can replace this with dynamic logic)
    accessGranted: false, // Whether the user is granted access or not
    errorMessage: '', // Error message for incorrect code
  };
},
computed: {
  // Compute the link for the Check Status button
  statusLink() {
    return this.accessGranted ? '/checkstatus' : '#'; // Set link to # if not granted
  }
},
methods: {
  // Function to validate the access code
  validateCode() {
    if (this.accessCode === this.validCode) {
      this.accessGranted = true; // Grant access if the code matches
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Invalid code. Please try again.';
    }
  },
  // Function to view more details
  viewDetails() {
    alert('Here are the exclusive details!'); // Replace with actual details or routing
  }
}
};
</script>


<style scoped>
/* Styling for background and container */
.background-container {
position: relative;
background: var(--light);
background-size: cover;
height: 100vh;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
color: #fff;
padding: 0;
}

/* Container for exclusive content */
.exclusive-content {
background-color: #2a2a2a;
padding: 20px;
border-radius: 10px;
text-align: center;
width: 400px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Styling for the check status section */
.check-status {
margin-top: 30px;
text-align: center;
}

.check-status h2 {
color: #fff;
margin-bottom: 10px;
}

.status-button {
padding: 10px 20px;
background-color: #008cba;
border: none;
border-radius: 5px;
color: white;
cursor: pointer;
text-decoration: none;
}

.status-button:hover {
background-color: #005f6b;
}

/* Styling for the access form */
.access-form {
display: flex;
flex-direction: column;
align-items: center;
}

.access-form h2 {
margin-bottom: 15px;
color: #fff;
}

.access-form input {
padding: 10px;
border-radius: 5px;
border: none;
width: 100%;
margin-bottom: 10px;
}

.access-form button {
padding: 10px;
background-color: #008cba;
border: none;
border-radius: 5px;
color: white;
cursor: pointer;
}

.access-form button:hover {
background-color: #005f6b;
}

.error-message {
color: #ff4c4c;
margin-top: 10px;
}

/* Styling for the exclusive content box */
.content-box {
display: flex;
flex-direction: column;
align-items: center;
}

.content-box h2 {
margin-bottom: 15px;
color: #fff;
}

.content-box p {
margin-bottom: 20px;
}

.content-box button {
padding: 10px;
background-color: #00c853;
border: none;
border-radius: 5px;
color: white;
cursor: pointer;
}

.content-box button:hover {
background-color: #009624;
}
</style>
