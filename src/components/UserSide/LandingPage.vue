<template>
    <div class="landing-page">
        
      <header>
        <h1>Welcome to TechFix</h1>
        <p>Your repair starts here!</p>
      </header>

      <main>
        <div class="nav-item">
          <router-link class="nav-link" aria-current="page" to="/register">
            Register
          </router-link>
  
          <router-link class="nav-link" aria-current="page" to="/login">
            Login
          </router-link>
        </div>
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
  
  <style>
  /* Background image and general page styling */
  .landing-page {
    font-family: Arial, sans-serif;
    text-align: center;
    color: #fff;
    background: url('C:\Users\Seann\Documents\GitHub\capstone-frontend\src\assets\White BG.jpg') no-repeat center center fixed;
    background-size: cover;
    min-height: 100vh;
    min-width: 225vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  /* Header styling */
  header {
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    padding: 20px;
    margin-top: 100px;
    border-radius: 10px;
  }
  
  header h1 {
    margin: 0;
    font-size: 2.5em;
  }
  
  header p {
    font-size: 1.5em;
  }
  
  /* Main content styling */
  main {
    margin: 20px 0;
  }
  
  .nav-item {
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    gap: 15px; /* Space between the links */
  }
  
  .nav-link {
    display: inline-block;
    margin: 10px;
    padding: 10px 10px;
    text-decoration: none;
    color: #fff;
    background-color: #4287d1;
    border-radius: 5px;
    font-size: 1.0rem;
  }
  
  .nav-link:hover {
    background-color: #0056b3;
  }
  
  /* Footer styling */
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
    header h1 {
      font-size: 2em;
    }
  
    header p {
      font-size: 1.2em;
    }
  
    .nav-link {
      padding: 10px 20px;
      font-size: 1em;
    }
  }
  </style>
  