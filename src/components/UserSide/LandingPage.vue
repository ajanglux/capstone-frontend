<template>
    <div class="landing-page">
        
      <header>
        <div class="button-container">
          <button @click="handleClick('Button 1')" class="button">Home</button>
          <button @click="handleClick('Button 2')" class="button">Our Services</button>
          <button @click="handleClick('Button 3')" class="button">Contact Us</button>
        </div>

        <img class="app-logo" src="/src/assets/techfix.png" alt="">

        <h2 class="title">Welcome to <br>TechFix</h2>
        <p class="p1">Your repair starts here!</p>
      </header>

      <main>

      </main>
 
      <footer>
        <p>&copy; 2024 TechFix. All rights reserved.</p>
      </footer>

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
    padding: 20px;
    margin-top: 100px;
    border-radius: 10px;
  }
  
  .title {
    margin: 0;
    font-size: 2.0em;
    text-align: justify;
    color: rgb(255, 255, 255);
  }

  .p1 {
    text-align: justify;
    color: rgb(255, 255, 255);
  } 

  .logo {
    width: 250px;
    height: 250px;
  }

  header {
    font-size: 1.2em;
    margin-top: -2vh;
    margin-right: 120vh;
  }

  main {

  }

  .button-container {
    display: flex;
    justify-content: center;
    width: 400px;
    margin: 20px auto;
}

  .button {
    position: relative;
    color: white;
    border: none;
    padding: 1px 2px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;

    margin: 2vh;
  }

  .nav-link:hover {
    background-color: #0056b3;
  }

  footer {
    margin-top: 20px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
  
  footer p {
    margin: 0;
    font-size: 0.9em;
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
  