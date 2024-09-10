<template>
    <div class="landing-page">
        
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

        <img class="app-logo" src="/src/assets/techfix.png" alt="">

        <h2 class="title">Welcome to <br>TechFix</h2>
        <p class="p1">Your repair starts here!</p>


      <main>

      </main>
 
    </div> 
  </template>
  
  <script>
  export default {
    name: 'LandingPage'
  }
  </script>
  
  <style scoped>
  /* Background image and general page styling */
  .landing-page {
    font-family: Arial, sans-serif;
    text-align: center;
    color: #fff;
    /* background: url('C:\Users\Seann\Documents\GitHub\capstone-frontend\src\assets\BG(1).PNG') no-repeat center center fixed; */
    background-color: var(--main);
    min-height: 100vh;
    min-width: 225vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  /* Header styling */
  header {
  background-color: rgb(16, 17, 104);
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-end; /* Align everything to the right */
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  font-size: 1.2em;
}
  
  .title {
    margin: 0;
    font-size: 2.0em;
    text-align: justify;
    color: rgb(255, 255, 255);

    margin-right: 120vh;
  }

  .p1 {
    text-align: justify;
    color: rgb(255, 255, 255);

    margin-right: 120vh;
  } 

  .app-logo {
    width: 350px;
    height: 350px;

    margin-top: 15vh;
    margin-right: 120vh;
  }

  .button-container { 
  display: flex;
  gap: 10px; /* Space between buttons */
  margin-right: 20px; /* Adjust to create space from the right edge */
}

.button { 
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5); /* Background color for buttons */
  text-decoration: none; /* Remove underline for router-link */
  display: flex;
  transition: background-color 0.3s ease;
}

  .button:hover { 
    background-color: rgba(0, 0, 0, 0.7);
  }


  .nav-link:hover {
    background-color: #0056b3;
  }
  
  /* Responsive styling */
  @media (max-width: 600px) {
    header h2 {
      font-size: 2em;
    }
  
    .nav-link {
      padding: 10px 20px;
      font-size: 1em;
    }
  }
  </style>
  