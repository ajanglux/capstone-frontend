<template>

<header>
<div class="button-container">
        <router-link class="button" active-class="active" to="/home">
          <span class="text">Home</span>
        </router-link>
        <router-link class="button" active-class="active" to="/services">
          <span class="text">Our Services</span>
        </router-link>
        <router-link class="button" active-class="active" to="/contact">
          <span class="text">Contact Us</span>
        </router-link>
      </div> 
</header>

    <div class="background-container">
      <div class="container">
        
        <div class="contact-info">
          <h1>Contact Us</h1>
          <br/>
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
          <form class="contact-form">
            <label for="fullName">Full Name</label>
            <input type="text" id="fullName" name="fullName" required />
  
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
  
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" required />
  
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="4" required></textarea>
  
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactUs',
  };
  </script>
  
  <style scoped>
.background-container {
  position: relative;
  background: url('@/assets/BG(3).PNG') no-repeat center center;
  background-size: cover;
  height: 95vh; /* Reduced height to create a smaller appearance */
  width: 95%; /* Reduced width slightly */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding-top: 80px; /* Adjusted padding to make it proportional */
}

.button-container { 
  margin-right: 40px; /* Reduced margin for a smaller appearance */
  display: flex;
  gap: 10px;
}

.container {
  display: flex;
  justify-content: space-between;
  padding: 15px; /* Reduced padding */
  background: #001d6b;
  border-radius: 8px;
  max-width: 1100px; /* Slightly reduced max-width */
  margin: 0 auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); /* Reduced shadow size for balance */
  margin-right: 8vh;
}

.contact-info {
  flex: 2;
  padding: 15px; /* Reduced padding */
  background: #ffffff;
  border-radius: 8px;
  margin-right: 40px; /* Reduced margin between sections */
}

.contact-info h1 {
  font-size: 2.2em; /* Slightly smaller heading */
  margin-bottom: 15px;
  color: #333;
}

.contact-detail {
  display: flex;
  align-items: center;
  margin-bottom: 15px; /* Reduced margin between details */
}

.contact-detail i {
  margin-right: 10px;
  font-size: 1.3em; /* Slightly reduced icon size */
  color: #007bff;
}

.contact-detail h4 {
  font-size: 1.1em; /* Reduced text size */
  margin: 0;
  color: #333;
}

.contact-form-container {
  flex: 2.5;
  padding: 15px; /* Reduced padding */
  background: #ffffff;
  border-radius: 8px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.contact-form label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.contact-form input,
.contact-form textarea {
  padding: 8px; /* Slightly reduced padding */
  margin-bottom: 15px; /* Reduced space between fields */
  border: 1px solid #ddd;
  border-radius: 4px;
}

.contact-form textarea {
  resize: vertical;
}

.contact-form button {
  padding: 8px 18px; /* Reduced button size slightly */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
}

.contact-form button:hover {
  background-color: #0056b3;
}
  </style>