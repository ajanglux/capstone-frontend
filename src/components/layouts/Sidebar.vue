<template>
    <aside>
        <!-- <img class="sna-logo" src="/src/assets/SNA Logo with BG.png" alt=""> -->
        <h2 class="sp-text">Welcome <br> User</h2>
        <br>
        <hr>
        <div class="menu-toggle-wrap">
            <!-- <button class="menu-toggle" @click="ToggleMenu"> 
                <span class="material-icons">keyboard_double_arrow_right</span> 
            </button> -->
        </div>
        <div class="menu">
            <router-link class="button" to="/home">
                <!-- <span class="material-icons">home</span> -->
                <span class="text">Home</span>
            </router-link>
            <router-link class="button" to="/appointments">
                <!-- <span class="material-icons">home</span> -->
                <span class="text">Appointments</span>
            </router-link>
            <router-link class="button" to="/bookinglist">
                <!-- <span class="material-icons">home</span> -->
                <span class="text">History</span>
            </router-link>
            <!-- <router-link class="button" to="/items">
                <span class="material-icons">inventory</span>
                <span class="text">Items</span>
            </router-link>
            <router-link class="button" to="/borrowing">
                <span class="material-icons">pending_actions</span>
                <span class="text">Borrowing</span>
            </router-link>
            <router-link class="button" to="/damaged">
                <span class="material-icons">construction</span>
                <span class="text">Damaged Items</span>
            </router-link>
            <router-link class="button" to="/unusable">
                <span class="material-icons">dangerous</span>
                <span class="text">Unusable Items</span>
            </router-link> -->
        </div>
        <!-- <button class="menu-logout" @click="logout">
            <span class="material-icons">logout</span>
            <span class="text">Logout</span>
        </button> -->
    </aside>
</template>




<script setup>


</script>

<style>

    aside {
        min-width: 220px;
        background-color: var(--main);
        height: 100vh;
        padding: 20px;
        display: block;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);
        z-index: 999;
        
        /* flex-direction: column;
        width: calc(2.5rem + 32px);
        min-height: 100vh;
        overflow: hidden;
        padding: 1rem;
        background-color: var(--dark);
        color: var(--light);
        position: -webkit-sticky;
        position: sticky;
        transition: 0.2s ease-out; */

        .menu {
            display: inline-grid;
        }
    }

</style>