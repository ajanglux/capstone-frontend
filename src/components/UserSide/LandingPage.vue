<template>
  <div class="landing-page">
    <div class="top-section">

      <div class="title">
          <h2>Welcome to <br>TechFix</h2>
          <p>Your trusted partner for all your device repair needs. Providing a comprehensive system where you can explore a wide range of shop offers, And ensuring you get the best service options available. Once you've submitted your device for repair, you'll receive a unique code that allows you to conveniently track the progress of your repair in real-time. Additionally, our platform makes it easy for you to send inquiries directly through the app, giving you a smooth and hassle-free experience from start to finish. We're here to make repairs easier and more accessible for you!</p>
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
  height: auto;
  width: auto;
  min-height: 100vh;
  min-width: 100vw; 
  padding: 0;
}

.top-section {
  display: flex;

  .title {
    margin-top: 8pc;
    font-size: 2.5em;
    color: var(--light);
    margin-left: 70px;

    h2 { 
      line-height: 1.2em;
      width: 400px;
      transition: all 0.3s ease-out;
    }

    p {
      font-size: 18px;
      padding-top: 20px;
      transition: all 0.3s ease-out;
    }
  }

  .side-image {
    width: 800px;
    height: 100%;
    margin-top: 32vh;
    margin-left: 15px;
    margin-right: 10px;
    transition: all 0.3s ease-out;
  }
}

@media (max-width: 1265px) {
  .top-section {
    .side-image {
      width: 700px;
    }
  }
}

@media (max-width: 1165px) {
  .top-section {
    .title {
      font-size: 2em;
    }

    .side-image {
      width: 50%;
    }
  }
}

@media (max-width: 1024px) {
  .top-section {
    .title {
      margin-top: 8pc;

      p {
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 500px) {
  .top-section {
    display: flex;
    flex-direction: column;

    .title {
      order: 2;
      font-size: 1.5em;
      margin: 30px;
      margin-top: 2pc;

      h2 { 
        width: 300px;
      }

      p {
        font-size: 15px;
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
