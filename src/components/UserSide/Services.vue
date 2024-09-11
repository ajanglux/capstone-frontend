<template>
<div class="content-container">
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

<style scoped>
.services {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #fff;
  background: var(--grey);
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: var(--header);
  min-height: 100vh;
  width: 100%;
  margin-top: 80px;
}

h1 {
  text-align: center;
  font-size: 4.5em;
  font-weight: bold;
  margin: 0 0 20px 0;
  color: #fff;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr); 
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 8vh;
}

.grid-item-1, .grid-item-2, .grid-item-3, .grid-item-4, .grid-item-5, .grid-item-6 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-size: 2.5em;
  font-weight: bolder;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1); 
  height: 100%;
  overflow: hidden;
}

/* Specific background images for grid items */
.grid-item-1 {
  background-image: url('C:\Users\Seann\Documents\GitHub\capstone-frontend\src\assets\Hardware Cleaning BG.PNG');
}
.grid-item-2 {
  background-image: url('C:\Users\Seann\Documents\GitHub\capstone-frontend\src\assets\Virus & Malware Removal.PNG');
}
.grid-item-3 {
  background-image: url('/C:\Users\Seann\Documents\GitHub\capstone-frontend\src\assets\Hardware and Software Removal.PNG');
}
.grid-item-4 {
  background-image: url('C:\Users\Seann\Documents\GitHub\capstone-frontend\src\assets\Networking.PNG');
}
.grid-item-5 {
  background-image: url('C:\Users\Seann\Documents\GitHub\capstone-frontend\src\assets\Reprogram and Reformat.PNG');
}
.grid-item-6 {
  background-image: url('C:\Users\Seann\Documents\GitHub\capstone-frontend\src\assets\Computer Check Up.jpg');
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, auto);
  }
}


</style>