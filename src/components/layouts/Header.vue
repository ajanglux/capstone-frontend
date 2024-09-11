<template>
<div class="landing-page">
    <header>
    <div class="button-container">
        <router-link class="button" active-class="active" to="/">
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

</div> 
</template>
<script setup>

</script>

<style scoped>
header {
    background-color: var(--header);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000; /* Ensures header stays above other content */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 25px;
    font-size: 1.2em;
}

.button-container { 
    display: flex;
    gap: 10px; /* Space between buttons */
    margin-right: 20px; /* Adjust to create space from the right edge */
}

.button { 
    font-family: 'Poppins';
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 10px;
    background-color: var(--main); /* Background color for buttons */
    text-decoration: none; /* Remove underline for router-link */
    display: flex;
}

.button:hover { 
    background-color: var(--main-hover);
}

</style>