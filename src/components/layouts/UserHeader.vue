<template>
    <div class="landing-page">
        <header>
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
                <router-link class="button" active-class="active" to="/home" @click="closeDropdown">
                <span class="text">Home</span>
                </router-link>

                <!-- <a class="button" @click="openInquireModal">
                    <span class="text">Ticket</span>
                </a> -->

                <router-link class="button" active-class="active" to="/user-history" @click="closeDropdown">
                <span class="text">Tickets</span>
                </router-link>

                <div class="dropdown">
                    <button class="button">
                    <span> {{ store.user?.first_name || 'User' }} </span>
                    </button>
                    <div class="dropdown-content">
                    <a class="nav-link" @click="openProfileModal" style="cursor: pointer">Profile</a>
                    <a class="nav-link" @click="openChangePassword" style="cursor: pointer">Change Password</a>
                    <router-link to="#" class="nav-link" @click="userLogout" style="cursor: pointer">
                        <i class="bi bi-box-arrow-left"></i> Logout
                    </router-link>
                    </div>
                </div>
            </div>
        </header>

        <ProfileModal :isModalOpen="isProfileModalOpen" @closeModal="closeProfileModal" />

        <ChangePasswordModal :isModalOpen="isChangePasswordModalOpen" @closeModal="closeChangePasswordModal" />

        <div v-if="isDropdownOpen && !isViewTerms" class="overlay" @click.stop="closeDropdown"></div>
    </div> 
</template>
  
<script setup>
import { useAuthStore } from '../../stores/useAuthStore.js'
import router from '../../router'
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { BASE_URL } from '../../helpers/baseUrl.js'
import { getHeaderConfig } from '../../helpers/headerConfig'
import { useRoute } from 'vue-router';

const ProfileModal = defineAsyncComponent(() => import('../UserSide/Profile.vue'));
const ChangePasswordModal = defineAsyncComponent(() => import("../auth/ChangePassword.vue"));

const store = useAuthStore()
const isDropdownOpen = ref(false);
const isProfileModalOpen = ref(false);
const isChangePasswordModalOpen = ref(false);
const route = useRoute();

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
    isDropdownOpen.value = false;
};

const openProfileModal = () => {
    isProfileModalOpen.value = true;
};
const closeProfileModal = () => {
    isProfileModalOpen.value = false;
};

const openChangePassword = () => {
    isChangePasswordModalOpen.value = true;
};
const closeChangePasswordModal = () => {
    isChangePasswordModalOpen.value = false;
};

const isViewTerms = computed(() => route.path === '/terms-and-conditions');

const showToast = (icon, title) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

const userLogout = async () => {
    try {
        await axios.post(`${BASE_URL}/user/logout`, {}, getHeaderConfig(store.access_token));
        showToast("success", "Logout successfully")
        store.clearStoredData();
        router.push('/');
    } catch (error) {
        console.log(error);
    }
}

const fetchCurrentUser = async () => {
try {
    const response = await axios.get(`${BASE_URL}/user`, getHeaderConfig(store.access_token));
    store.setToken(response.data.currentToken); 
    store.setUser(response.data.user);
} catch (error) {
    if(error?.response?.status === 401) {
        store.clearStoredData();
    }
    console.log(error);
}
}

onMounted(() => {
    if(store.access_token) fetchCurrentUser()
})
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
            padding-bottom: 90px;

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
    .dropdown-content{

        display: contents;
        
        .nav-link {
            padding: 10px;
            color: white;
            font-weight: 350;
        }
    }
}
</style>