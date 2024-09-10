<template>
    <div class="content-container">

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

    <h1>We Offer</h1>

    <div class="grid-container">
            <div class="grid-item-1">Hardware <br>Cleaning</div>
            <div class="grid-item-2">Virus/Malware <br>Removal</div>
            <div class="grid-item-3">Software or Hardware <br>Removal</div>
            <div class="grid-item-4">Networking</div>
            <div class="grid-item-5">Reformat & <br> Reprogram</div>
            <div class="grid-item-6">Check Up for <br> Computer</div>
        </div>

    </div>
</template>

<script setup>
</script>

<style>
.services {
    font-family: Arial, sans-serif;
    text-align: center;
    color: #fff;
    background: url('C:\Users\Seann\Documents\GitHub\capstone-frontend\src\assets\BG(1).PNG') no-repeat center center fixed;
    background-size: cover;
    min-height: 100vh;
    min-width: 225vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

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

  .content-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  padding: 20px;
}

h1 {
  text-align: center;
  font-size: 4.5em; /* Adjust font size */
  font-weight: bold; /* Make font bold */
  margin: 0 0 20px 0; /* Remove top margin and add bottom margin */
  color: #fff; /* White color for text */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns of equal width */
  grid-template-rows: repeat(2, 1fr); /* 2 rows of equal height */
  gap: 20px; /* Space between grid items */
  width: 200vh;
  height: 60vh;
  max-width: 1200px; /* Optional: Set a max width for the grid container */
  margin-bottom: 8vh;
}

.grid-item-1, .grid-item-2, .grid-item-3, .grid-item-4, .grid-item-5, .grid-item-6 {
  position: relative;
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 0px;
  text-align: center;
  font-size: 2.5em;
  font-weight: bolder;
  color: #ffffff; /* Text color */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1); /* Adds a shadow to text */
  overflow: hidden; /* Ensure content does not overflow the border radius */
}

/* Specific background images for grid items */
.grid-item-1 {
  background-image: url('@/assets/Hardware Cleaning BG.PNG');
}
.grid-item-2 {
  background-image: url('@/assets/Virus & Malware Removal.PNG');
}
.grid-item-3 {
  background-image: url('@/assets/Hardware and Software Removal.PNG');
}
.grid-item-4 {
  background-image: url('@/assets/Networking.PNG');
}
.grid-item-5 {
  background-image: url('@/assets/Reprogram and Reformat.PNG');
}
.grid-item-6 {
  background-image: url('@/assets/Computer Check Up.jpg');
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr; /* Single column layout on smaller screens */
    grid-template-rows: repeat(6, auto); /* Adjust rows to fit content */
  }
}
</style>