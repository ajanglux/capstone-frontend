<template>
  <div class="landing-page">
    <!-- Top Section (existing design) -->
    <div class="top-section">
      <div class="content-section">
        <img class="app-logo" src="/src/assets/techfix.png" alt="TechFix Logo">
        
        <div class="title">
          <h2>Welcome to <br>TechFix</h2>
        </div>
        <p>Your repair starts here!</p>
      </div>
      
      <div class="image-container">
        <img class="side-image" src="C:/Users/Seann/Documents/GitHub/capstone-frontend/src/assets/Computer Check Up.jpg" 
        alt="Home Repair Picture service">
        <img class="side-image side-image-2" src="C:/Users/Seann/Documents/GitHub/capstone-frontend/src/assets/Hardware and Software Removal.jpg" 
        alt="Home Repair Picture service 2">
        
        <!-- Introductory text below images -->
        <div class="intro-text">
          <p></p>
        </div>
      </div>
    </div>

    <!-- Scrollable Section Below (for new content) -->
    <div class="scrollable-section">
      <div class="more-info">
        <h3>More Information</h3>
        <p>
          Add Additionalc content here
       </p> 
        <!-- Additional content can be placed here -->
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
/* General page styling */
.landing-page {
  font-family: 'Poppins';
  color: #fff;
  background-color: var(--header);
  display: flex;
  flex-direction: column;
}

/* Top section with original content */
.top-section {
  background-color: var(--header); /* Background color to match the rest */
  padding-bottom: 50px; /* Adding some space to separate from the scrollable section */

  margin-right: 130vh;
  margin-top: 10vh;
}

.content-section {
  text-align: center;
  padding: 20px 0;
}

.title {
  margin: 0;
  font-size: 2.5em;
  color: var(--light);
}

p {
  margin-top: 15px;
  font-size: 1.7em;
  color: var(--light);
}

.app-logo {
  width: 350px;
  height: 350px;
  margin-top: 10px;
}

/* Container for overlapping images */
.image-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-left: 140vh;
  bottom: 60vh;
}

.side-image {
  width: 500px;
  height: auto;
  position: relative;
  z-index: 1;
}

.side-image-2 {
  position: absolute;
  top: 120px;
  left: -60px;
  width: 500px;
  height: auto;
  z-index: 0;
  opacity: 0.7;
}

/* Introductory text */
.intro-text {
  margin-top: 20px;
  text-align: center;
  color: var(--light);
}

.intro-text p {
  font-size: 1.5em;
  line-height: 1.4em;
  max-width: 600px;
}

/* Scrollable section for new content */
.scrollable-section {
  padding: 40px 20px;
  background-color: #0F4C7BFF;
  color: #333;
  overflow-y: auto;
}

.more-info {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.more-info h3 {
  font-size: 2em;
  margin-bottom: 20px;
}

.more-info p {
  font-size: 1.2em;
  line-height: 1.6em;
}

/* Responsive styling */
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

  .side-image, .side-image-2 {
    width: 100%;
    height: auto;
  }

  .more-info h3 {
    font-size: 1.8em;
  }

  .more-info p {
    font-size: 1em;
  }
}
</style>
