<template>
  <div class="landing-page">
    <div class="top-section">

      <div class="title">
          <h2>Welcome to <br>TechFix</h2>
          <p>In today's fast-paced digital age, where technology has become an integral part of both our personal and professional lives, ensuring that your devices—whether it's a laptop, In today's fast-paced digital age, where technology has become an integral part of both our personal and professional lives, ensuring that your devices—whether, In today's fast-paced digital age, where technology has become an integral part of both our personal and professional lives, ensuring that your devices—whether, In today's fast-paced digital age, where technology has become an integral part of both our personal and professional lives, ensuring that your devices—whether, In today's fast-paced digital age, where technology has become an integral part of both our personal and professional lives, ensuring that your devices—whether it's a laptop, In today's fast-paced digital age, where technology has become an integral part of both our personal and professional lives, ensuring that your devices—whether, In today's fast-paced digital age, where technology has become an </p>
      </div>
    
        <img class="side-image" src="/src/assets/clipart.png" 
        alt="Home Repair Picture service">
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
.landing-page {
  font-family: 'Poppins';
  color: #fff;
  background-color: var(--header);
  height: 100vh;
}

.top-section {
  display: flex;

  .title {
  margin-top: 8pc;
  font-size: 2.5em;
  color: var(--light);
  margin-left: 70px;
  

  p {
    font-size: 0.4em;
    padding-top: 20px;
  }
  
}

  .side-image {
    width: 800px;
    height: 450;
    margin-top: 32vh;
    margin-left: 15px;
    margin-right: 10px;

  }
}

@media (max-width: 600px) {
  .title {
    font-size: 2em;
  }

  p {
    font-size: 1.2em;
  }

  .intro-text p {
    font-size: 1.2em;
  }

  .side-image{
    width: 100%;
    height: auto;
  }
}

</style>
