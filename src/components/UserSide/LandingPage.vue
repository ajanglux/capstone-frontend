<template>
  <div class="landing-page">
    <Transition name="slide-in" appear>
        <div class="top-section">
          <div class="title">
              <h2>Welcome to <br>TechFix</h2>
              <p>Your trusted partner for all your device repair needs. Providing a comprehensive system where you can explore a wide range of service offers and ensuring you get the best service options available. Once you've submitted your device for repair, you'll receive a unique code that allows you to conveniently track the progress of your repair in real-time. Additionally, our platform makes it easy for you to send inquiries directly through the app, giving you a smooth and hassle-free experience from start to finish. We're here to make repairs easier and more accessible for you!</p>
          
              <p>
                <router-link class="link" to="/register">Sign up</router-link> or 
                <router-link class="link" to="/login">Login</router-link>
                to get started.
              </p>
            </div>

            <img class="side-image" src="/src/assets/pngegg.png" 
            alt="Home Repair Picture service">
        </div>
    </Transition>

    <div class="faq-section">
      <h2 class="help">Helpful Questions</h2>
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <div class="faq-question" @click="toggleFAQ(index)">
          {{ faq.question }}
          <span class="arrow" :class="{ 'rotate': activeIndex === index }">&#9660;</span>
        </div>
        <div v-if="activeIndex === index" class="faq-answer">
          {{ faq.answer }}
        </div>
      </div>
    </div>

    <div class="about-section">
      <h2>About Us</h2>
      <p>TechFix is a trusted computer repair service dedicated to providing high-quality repairs, diagnostics, and maintenance for all types of devices. Our team of skilled technicians is passionate about delivering reliable and efficient solutions to keep your devices running smoothly.</p>
      
      <h3>Our Mission</h3>
      <p>At TechFix, we aim to simplify technology repairs by offering fast, affordable, and professional services. We believe in transparency, customer satisfaction, and providing top-notch solutions for every tech issue.</p>
    
      <h3>What We Offer</h3>
      <p class="offer"> <strong>Expert Repairs</strong> - Our technicians are trained to handle a wide range of computer and device issues.</p>
      <p class="offer"> <strong>Fast Turnaround</strong> - We understand the importance of time, so we ensure quick and efficient service.</p>
      <p class="offer"> <strong>Affordable Pricing</strong> - Quality service should nott be expensive. We offer competitive pricing with no hidden charges.</p>
      <p class="offer-1"> <strong>Customer-Centric Approach</strong> - Your satisfaction is our priority. We ensure excellent service and clear communication.</p>
    </div>

    <div class="start">
      <button class="starter">
        <p> <router-link class="huhu" to="/register">Get Started<i class='bx bx-chevron-right'></i></router-link></p>
      </button>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="social-icons">
          <p><i class='bx bx-phone' ></i> 0966 190 8734</p>
          <p><i class='bx bx-envelope' ></i> techfixph.online@gmail.com</p>
          <p><i class='bx bx-location-plus' ></i> 12 street hansen East Tapinac, Olongapo City</p>
          <a href="https://www.facebook.com/profile.php?id=100070807001007" target="_blank"><i class='bx bxl-facebook-circle' ></i> Facebook</a>
        </div>
        <div class="titles">
          <p class="rights">&copy; 2024 TechFix. All Rights Reserved.</p>
          <!-- <p class="rights-1">TechFix</p> -->
          <img class="footer-logo" src="/src/assets/techfix.png" alt="TechFix Logo" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script scoped>
export default {
  name: 'LandingPage',
  data() {
    return {
      activeIndex: null,
      faqs: [
        { question: "How does TechFix work?", answer: "TechFix allows you to submit your device for repair, track its status using a unique code, and receive updates from the admin about what is happening to your device." },
        { question: "What services do you offer?", answer: "We provide repair services for laptops and other computer devices, along with various other services you may need. Please visit the 'Services' section in the upper right corner of your screen to explore our available offers." },
        { question: "How can I track my repair?", answer: "First, you need to log in or sign up for an account to make a repair request. After submitting your device, you'll receive a unique code to check real-time updates on the status of your repair. You can enter this code in the 'Status' section to track your device without logging in." }
      ]
    };
  },
  methods: {
    toggleFAQ(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    }
  }
};
</script>

<style lang="scss" scoped>
.landing-page {
  font-family: 'Poppins';
  color: var(--header);
  background-color: var(--light);
  height: auto;
  width: auto;
  min-height: 100vh;
  min-width: 100vw; 
  padding: 0;
}

.top-section {
  display: flex;
  margin-bottom: 25px;

  .title {
    margin-top: 8pc;
    font-size: 2.5em;
    color: var(--header);
    margin-left: 70px;

    h2 { 
      line-height: 1.2em;
      width: 400px;
      transition: all 0.3s ease-out;
      margin-top: 36px;
    }

    p {
      font-size: 18px;
      padding-top: 37px;
      transition: all 0.3s ease-out;
    }

    .link {
      text-decoration: none;
      padding: 3px 10px;
      margin: 0 3px;
      background-color: var(--main-hover);
      color: var(--light);
      letter-spacing: 0.5px;
      border-radius: 5px;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: var(--main);
        text-decoration: underline;
      }
    }
  }

  .side-image {
    width: 500px;
    height: 100%;
    margin-top: 22vh;
    margin-left: 15px;
    margin-right: 48px;
    transition: all 0.3s ease-out;
  }
}

// about
.about-section {
  padding: 20px 75px;
  background-color: var(--light);
  color: var(--header);

  h2 {
    font-size: 2.5em;
    margin-bottom: 20px;
    text-align: center;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  h3 {
    margin-bottom: 10px;
    font-size: 25px;
  }

  .offer {
    margin-bottom: 10px;
  }

  .offer-1 {
    margin-bottom: 36px;
  }
}

.start {
  margin: 0px 40pc 20px 40pc;
  padding: 18px;
  padding-left: 35px;
  background-color: var(--header);
  border-radius: 5px;

  .starter {
    font-size: 24px;
    display: contents;
    color: var(--light);

    .huhu {
      text-decoration: none;
      color: var(--light);

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

// footer
.footer {
  background-color: var(--header);
  color: var(--light);
  // text-align: center;
  padding-top: 33px;
}

.footer-content {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-evenly;

  .rights {
    margin-top: 10px;
    font-size: 12px;
    margin-right: 21pc;
  }

}

.footer-links {
  margin: 10px 0;
  
  a {
    color: var(--light);
    text-decoration: none;
    margin: 0 15px;
    transition: 0.3s;

    &:hover {
      text-decoration: underline;
    }
  }
}

.titles {
  display: flex;
  align-items: center;
}

.footer-logo {
  width: 150px;
  height: 145px;
  margin-right: 20pc;

}

.social-icons {
  font-size: 12px;
  
  a {
    color: var(--light);
    text-decoration: none;
    // margin: 0 10px;
    font-weight: bold;
    transition: 0.3s;
    margin-top: 10px;

    &:hover {
      color: gray;
    }
    
    i {
      margin-top: 10px;
    }
  }

  p {
    margin-top: 10px;
  }
}

// facts
.faq-section {
  margin-left: 45px;
  margin-right: 45px;
  padding: 30px;
  font-family: 'Poppins', sans-serif;
}

.help {
  font-size: 2.5em;
}

.faq-item {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.faq-question {
  color: var(--light2);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: var(--header);
  border-radius: 5px;
}

.faq-answer {
  padding: 15px;
  font-size: 16px;
  background: var(--grey);
  color: var(--light);
  transition: all 0.3s ease-in-out;
}

.arrow {
  transition: transform 0.3s ease-in-out;
}

.rotate {
  transform: rotate(180deg);
}

.slide-in-enter-active {
  transition: transform 0.8s ease-out, opacity 0.8s ease-out;
}

.slide-in-enter-from {
  transform: translateX(-100px); 
  opacity: 0;
}

.slide-in-enter-to {
  transform: translateX(0);
  opacity: 1;
}

@media (max-width: 1500px) {
  .start {
    margin: 0px 35pc 20px 35pc;
  }
}

@media (max-width: 1340px) {
  .start {
    margin: 0px 30pc 20px 30pc;
  }
}

@media (max-width: 1265px) {
  .top-section {
    .side-image {
      width: 700px;
    }
  }
  .start {
    margin: 0px 28pc 20px 28pc;
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
  .footer-logo {
    margin-right: 8pc;
  }

  .footer-content .rights {
    margin-right: 12pc;
  }

  .start {
    margin: 0px 24pc 20px 24pc;
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

  .footer-logo {
    margin-right: 3pc;
  }

  .footer-content .rights {
    margin-right: 8pc;
  }

  .start {
    margin: 0px 20pc 20px 20pc;
  }
}

@media (max-width: 850px) {
  .top-section {
    display: flex;
    flex-direction: column;

    .title {
      order: 2;
      font-size: 1.5em;
      margin: 30px;
      margin-top: 2pc;

      h2 { 
        width: 661px;
        text-align: center;
        margin-top: 0px;
      }

      p {
        font-size: 15px;
        padding-top: 20px;
      }
    }

    .side-image {
      order: 1;
      width: 50%;
      height: auto;
      margin-top: 13vh;
      margin-left: 201px;
      margin-right: 0;
    }
  }
  .faq-section {
    margin-left: 7px;
    margin-right: 8px;
  }

  .about-section {
    padding: 8px 34px;
  }

  .footer-logo {
    margin-right: 3pc;
  }

  .footer-content .rights {
    margin-right: 4pc;
  }

  .start {
    margin: 0px 15pc 20px 15pc;
  }
}

@media (max-width: 700px) {
  .top-section {
    margin-bottom: 0px;
    .title {
      h2 { 
        width: 496px;
        text-align: center;
      }
    }
    .side-image {
      width: 60%;
      margin-left: 137px;
    }
  }
  .footer-logo {
    margin-right: 0;
  }

  .footer-content .rights {
    margin-right: 0;
  }

  .start {
    margin: 0px 10pc 20px 10pc;
  }
}

@media (max-width: 560px) {
  .top-section {
    .title {
      h2 { 
        width: 465px;
        text-align: center;
      }
    }
  }
  .footer-logo {
    margin-right: 0;
  }

  .footer-content .rights {
    margin-right: 0;
  }

  .start {
    margin: 0px 6pc 20px 6pc;
  }
}

@media (max-width: 500px) {
  .top-section {
    // display: flex;
    // flex-direction: column;
  
    .title {
      order: 2;
      font-size: 1.5em;
      margin: 30px;
      margin-top: 1pc;
      margin-bottom: 3pc;

      h2 { 
        width: 411px;
      }

      p {
        font-size: 15px;
        padding-top: 20px;
      }
    }

    .side-image {
      margin-left: 116px;
    }
  }
  .footer {
    text-align: center;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
  }
  .titles[data-v-dc07f395] {
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    padding-bottom: 20px;
  }
}

@media (max-width: 450px) {
  .top-section {
    .title {
      h2 { 
        width: 347px;
      }
    }
    .side-image {
      margin-left: 100px;
    }
  }
}

@media (max-width: 400px) {
  .top-section .title h2 {
    width: 313px;
  }

  .top-section .side-image {
    margin-left: 86px;
    margin-top: 17vh;
  }

  .start {
    margin: 0px 5pc 20px 5pc;
  }

}
</style>
