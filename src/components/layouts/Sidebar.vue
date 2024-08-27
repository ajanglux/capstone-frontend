<template>
    <aside :class="{ 'hide': !isSidebarVisible }">
        <div class="logo">
            <img class="app-logo" src="/src/assets/techfix.png" alt="">
        </div>
        <!-- <h2 class="sp-text">Welcome <br> User</h2> -->
        <div class="menu">
            <router-link class="button" active-class="active" to="/home">
                <i class='bx bxs-home' ></i>
                <span class="text">Home</span>
            </router-link>
            <router-link class="button" active-class="active" to="/appointments">
                <i class='bx bxs-book-add'></i>
                <span class="text">Appointments</span>
            </router-link>
            <router-link class="button" active-class="active" to="/bookinglist">
                <i class='bx bx-history' ></i>
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
    import { isSidebarVisible } from '../../stores/store.js';
</script>

<style scoped>
.hide {
    transform: translateX(-100%);
}

aside {
    min-width: 250px;
    background-color: var(--main);
    height: 100vh;
    display: block;
    position: fixed;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);
    z-index: 999;
    color: var(--light);
    transition: transform 0.3s ease-in-out;

    .logo {
        display: flex;
        justify-content: center;
        padding: 20px;
    }

    .menu {
        margin-top: 20px;

        .button {
            color: var(--light);
            text-decoration: none;
            padding: 15px 20px;
            transition: all 0.3s ease-in-out;
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
        }

        .button:hover {
            background-color: var(--light);
            color: black;
        }

        .button.active {
            background-color: var(--light);
            color: black;
        }
    }
}

/* @media screen and (max-width: 1024px) {
    aside {
        transform: translateX(-100%);
    }
} */

/* @media screen and (max-width: 1024px) {
    .hide {
        transform: translateX(-100%);
    }

    .navbar {
        margin-left: 0px;
        width: 100%;
    }

    .content-expanded {
        padding-left: 40px;
    }
} */
</style>