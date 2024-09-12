<template>
<div class="content-container">
  <h1>We Offer</h1>

  <div class="cards">
    <div class="card">
        <div class="img">
          <img src="../../assets/Hardware and Software Removal.PNG" >
        </div>
        <div class="info">
            <h2> Service </h2>
            <p> Description </p>
        </div>
    </div>

    <div class="card">
        <div class="img">
          <img src="../../assets/Computer Check Up.jpg" >
        </div>
        <div class="info">
            <h2> Service </h2>
            <p> sample ulit kasi ayoko na ng yoko sample ulit kasi ayoko na ng yoko sample ulit kasi ayoko na ng yoko sample ulit kasi ayoko na ng yoko sample ulit kasi ayoko na ng yoko </p>
        </div>
    </div>

    <div class="card">
        <div class="img">
          <img src="../../assets/Virus & Malware Removal.PNG" >
        </div>
        <div class="info">
            <h2> Service </h2>
            <p> sample ulit kasi ayoko na ng yoko </p>
        </div>
    </div>

    <div class="card">
        <div class="img">
          <img src="../../assets/Virus & Malware Removal.PNG" >
        </div>
        <div class="info">
            <h2> Service </h2>
            <p> sample ulit kasi ayoko na ng yoko </p>
        </div>
    </div>
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

  h1 {
    text-align: center;
    font-size: 4.5em;
    font-weight: bold;
    margin: 0 0 20px 0;
    color: #fff;
  }
}

.cards {
  display: grid;
  justify-content: center;
  align-items: start;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 30px;
  padding: 0 100px;
  margin-bottom: 50px;
  height: 100%;
  align-items: stretch;
  transition: all 0.5s ease;

    .card {
        flex: 1;
        padding: 20px;
        /* background-color: var(--grey); */
        color: var(--light2);
        /* box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.322); */
        transition: all 0.3s ease-in-out;
        display: flex;
        flex-direction: column;

        &:hover {
          background-color: var(--main-hover);
          border-radius: 20px;
        }

        .img {
          width: 100%;
          margin-bottom: 10px;

          img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            object-position: center;
            align-content: center;
            border-radius: 10px;
          }
        }

        .info {
          h2 {
            font-size: 35px;
          }
        }
    }
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, auto);
  }
}


</style>