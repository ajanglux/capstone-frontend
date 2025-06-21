<template>
<div class="landing-page">
    <header :class="{ 'hide-header': isHeaderHidden }">
        <div class="header-top">
            <div class="left-side">
                <img class="app-logo" src="/src/assets/techfix-no.png" alt="TechFix Logo" />
                <h3>TechFix</h3>
            </div>
            <div v-if="!isViewTerms" class="menu-icon" @click="toggleDropdown">
                <i :class="isDropdownOpen ? 'bx bx-x' : 'bx bx-menu'"></i>
            </div>
        </div>

        <div v-if="!isViewTerms" class="button-container" :class="{ open: isDropdownOpen }">
            <router-link class="button" active-class="active" to="/" @click="closeDropdown">
            <span class="text">Home</span>
            </router-link>
            <router-link class="button" active-class="active" to="/services" @click="closeDropdown">
            <span class="text">Services</span>
            </router-link>
            <router-link class="button" active-class="active" to="/status" @click="closeDropdown">
            <span class="text">Status</span>
            </router-link>
        </div>
    </header>

    <div v-if="isDropdownOpen && !isViewTerms" class="overlay" @click.stop="closeDropdown"></div>
</div> 
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const isDropdownOpen = ref(false);
const route = useRoute();
const isHeaderHidden = ref(false);
let lastScrollY = window.scrollY;

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const isViewTerms = computed(() => route.path === '/terms-and-conditions');

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isHeaderHidden.value = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
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
    transition: transform 0.3s ease-in-out;

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

.hide-header {
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
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