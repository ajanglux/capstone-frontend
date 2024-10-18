<template>
<div class="landing-page">
    <header>
        <div class="header-top">
            <div class="left-side">
                <img class="app-logo" src="/src/assets/techfix-no.png" alt="TechFix Logo" />
                <h3>TechFix</h3>
            </div>

            <!-- Menu Icon for small screens -->
            <div class="menu-icon" @click="toggleDropdown">
                <i :class="isDropdownOpen ? 'bx bx-x' : 'bx bx-menu'"></i>
            </div>
        </div>

        <div class="button-container" :class="{ open: isDropdownOpen }">
            <router-link class="button" active-class="active" to="/" @click="closeDropdown">
                <span class="text">Home</span>
            </router-link>
            <router-link class="button" active-class="active" to="/services" @click="closeDropdown">
                <span class="text">Services</span>
            </router-link>
            <router-link class="button" active-class="active" to="/checkstatus" @click="closeDropdown">
                <span class="text">Status</span>
            </router-link>
            <router-link class="button" active-class="active" to="/contact" @click="closeDropdown">
                <span class="text">Contact</span>
            </router-link>
        </div>
    </header>

    <!-- Overlay for dark effect -->
    <div class="overlay" v-if="isDropdownOpen" @click.stop="closeDropdown"></div>
</div> 
</template>
<script setup>
import { ref } from 'vue';

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
    isDropdownOpen.value = false;
};
</script>

<style lang="scss" scoped>
header {
    background-color: var(--header);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px;
    font-size: 1em;

    .header-top {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
    }

    .left-side {
        display: flex;

        img {
            width: 50px;
            height: auto;
        }
    }

    h3 {
        display: flex;
        color: azure;
        padding-left: 10px;
        display: flex;
        align-items: center;
    }

    .menu-icon {
        display: none;
        font-size: 24px;
        color: white;
        cursor: pointer;
    }
}

.button-container {
    display: flex;
    justify-content: end;
    gap: 10px;
    margin-right: 20px;
    width: 100%;

    .button {
        font-family: 'Poppins';
        color: white;
        border: none;
        padding: 8px 16px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 10px;
        background-color: var(--main);
        text-decoration: none;
        display: flex;
        justify-content: center;
        transition: all 0.2s ease-in-out, padding 0.3s ease;

        &:hover {
            background-color: var(--main-hover);
        }
    }
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
}

@media (max-width: 550px) {
    header {
        flex-direction: column;
        padding: 15px;

        .left-side {
            img {
                width: 48px;
            }
        }

        .header-top {
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
        }

        .menu-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            height: 35px;
            width: 35px;
            border-radius: 5px;
            background-color: var(--main);
        }
    }

    .button-container {
        display: flex; 
        flex-direction: column;
        gap: 0;
        margin-right: 0;
        max-height: 0; 
        overflow: hidden; 
        transition: max-height 0.4s ease, padding 0.4s ease;
        
        &.open {
            width: 100%;
            max-height: 500px; 
            padding: 10px 0;

            .button {
                width: 100%;
                padding: 15px 0;
                font-size: 14px;
                cursor: pointer;
                background-color: transparent;
                display: flex;
                justify-content: center;
                transition: all 0.2s ease-in-out, padding 0.3s ease;

                &.active {
                    background-color: var(--main-hover);
                }
            }
        }
    }
}
</style>