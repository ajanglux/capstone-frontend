<template>
<div class="landing-page">
  <img class="app-logo" src="/src/assets/techfix.png" alt="">
  
  <div class="title">
    <h2>Welcome to <br>TechFix</h2>
  </div>
  <p>Your repair starts here!</p>

</div> 
</template>
  
  <script scoped>
  export default {
    name: 'LandingPage'
  }
  </script>
  
<style scoped>
/* Background image and general page styling */
.landing-page {
  font-family: 'Poppins';
  text-align: center;
  color: #fff;
  background-color: var(--header);
  min-height: 100vh;
  min-width: 225vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  margin: 0;
  font-size: 2.5em;
  text-align: justify;
  color: var(--light);
  margin-right: 150vh;
}
p {
  margin-top: 15px;
  font-size: 1.7em;
  text-align: justify;
  color: var(--light);
  margin-right: 155vh;
}

.app-logo {
  width: 350px;
  height: 350px;
  margin-top: 10px;
  margin-right: 120vh;
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
  