<template>
    <aside>
        <div class="logo">
            <img class="app-logo" src="/src/assets/techfix.png" alt="">
        </div>
        <div class="menu-toggle-wrap">
        </div>
        <div class="menu">
            <router-link class="button" active-class="active" to="/admin-dashboard">
                <i class='bx bx-grid-alt'></i>
                <span class="text">Dashboard</span>
            </router-link>
            <router-link class="button" active-class="active" to="/repair-list">
                <i class='bx bx-list-plus' ></i>
                <span class="text">Repair List</span>
            </router-link>
            <router-link class="button" active-class="active" to="/inquiries">
                <i class='bx bx-list-ul'></i>
                <span class="text">Inquiries</span>
            </router-link>
            <router-link class="button" active-class="active" to="/service-list">
                <i class='bx bx-cog' ></i>
                <span class="text">Services</span>
            </router-link>
        </div>
    </aside>
</template>

<script setup>
</script>

<style lang="scss">

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
            padding: 20px 0;

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
                background-color: var(--light2);
                color: black;
            }

            .button.active {
                background-color: var(--light);
                color: black;
            }
        }
    }

</style>