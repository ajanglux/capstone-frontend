<template>
    <aside>
        <div class="logo">
            <img class="app-logo" src="/src/assets/techfix.png" alt="">
        </div>
        <!-- <h2 class="sp-text">Welcome <br> User</h2> -->
        <div class="menu-toggle-wrap">
            <!-- <button class="menu-toggle" @click="ToggleMenu"> 
                <span class="material-icons">keyboard_double_arrow_right</span> 
            </button> -->
        </div>
        <div class="menu">
            <router-link class="button" active-class="active" to="/admin-dashboard">
                <i class='bx bxs-home' ></i>
                <span class="text">Dashboard</span>
            </router-link>
            <router-link class="button" active-class="active" to="/admin-bookinglist">
                <i class='bx bxs-book-add'></i>
                <span class="text">Appointments</span>
            </router-link>
            <router-link class="button" active-class="active" to="/admin-history">
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


</script>

<style>

    aside {
        min-width: 250px;
        background-color: var(--main);
        height: 100vh;
        /* padding: 20px; */
        display: block;
        position: fixed;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);
        z-index: 999;
        color: var(--light);

        .logo {
            align-items: center;
            display: flex;
            justify-content: center;

            .app-logo {
                width: 200px;
                height: 200px;
            }
        }

        h2 {
            margin: 50px 0;
            padding: 20px;
            text-align: center;
        }
        
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
            width: 100%;
            margin-top: 20px;

            i {
                font-size: 20px;
            }

            .text {
                font-size: 16px;
                position: absolute;
                margin-left: 5px;
            }

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

</style>