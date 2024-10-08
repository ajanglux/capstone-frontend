<template>
  <div class="landing-page">
    <div class="top-section">

      <div class="title">
          <h2>Welcome to <br>TechFix</h2>
          <p>Your trusted partner for all your device repair needs. 
          <br>Providing a comprehensive system where you can explore a wide range of shop offers, And ensuring you get the best service options available. Once you've submitted your device for repair, you'll receive a unique code that allows you to conveniently track the progress of your repair in real-time. Additionally, our platform makes it easy for you to send inquiries directly through the app, giving you a smooth and hassle-free experience from start to finish. We're here to make repairs easier and more accessible for you!</p>
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

<style lang="scss" scoped>
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
      font-size: 18px;
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

@media (max-width: 1024px) {
  .landing-page {
    height: auto;
  }

  .top-section {
    .title {
      margin-top: 8pc;
      font-size: 2.5em;
      color: var(--light);
      margin-left: 70px;

      p {
        font-size: 18px;
        padding-top: 20px;
      }
    }

    .side-image {
      width: 100%;
      height: auto;
      margin-top: 32vh;
      margin-left: 15px;
      margin-right: 10px;

    }
  }
}

@media (max-width: 500px) {
  .landing-page {
    height: auto;
  }

  .top-section {
    display: flex;
    flex-direction: column;

    .title {
      order: 2;
      font-size: 1.5em;
      margin: 30px;
      margin-top: 2pc;

      p {
        font-size: 16px;
        padding-top: 20px;
      }
    }

    .side-image {
      order: 1;
      width: 100%;
      height: auto;
      margin-top: 13vh;
      margin-left: 0;
      margin-right: 0;

    }
  }
}
</style>
