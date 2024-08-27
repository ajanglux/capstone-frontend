<template>
    <nav :class="['navbar', { 'navbar-expanded': isSidebarVisible }]">
        <div class="container-fluid">
            <div class="menu">
                <button class="menu-toggle" @click="toggleSidebar">
                    <i class='bx bx-menu'></i>
                </button>
            </div>
            <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> -->
            <div class="collapse navbar-collapse">
                <ul v-if="!store.user" class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/register">
                           <i class="bi bi-person-add"></i> Register
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/login">
                            <i class="bi bi-box-arrow-right"></i> Login
                        </router-link>
                    </li>
                </ul>
                <div v-else class="dropdown">
                    <!-- <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/">
                        <i class="bi bi-house-door-fill"></i> Home </router-link>
                    </li> -->
                    <button class="username">
                        <span> {{ store.user.name }} </span>
                    </button>
                    <div class="dropdown-content">
                        <router-link class="nav-link" aria-current="page" to="/profile">
                            <i class="bi bi-person-check-fill"></i> Profile
                        </router-link>
                        <router-link to="#" class="nav-link" @click="userLogout" style="cursor:pointer">
                            <i class="bi bi-box-arrow-left"></i> Logout
                        </router-link>
                    </div>

                    <!-- <div class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/profile">
                            <i class="bi bi-person-check-fill"></i> {{ store.user.name }}
                        </router-link>
                    </div>
                    <div class="nav-item">
                        <router-link to="#" class="nav-link" @click="userLogout" style="cursor:pointer">
                            <i class="bi bi-box-arrow-left"></i> Logout
                        </router-link>
                    </div> -->
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { useAuthStore } from '../../stores/useAuthStore.js'
    import router from '../../router'
    import { onMounted } from 'vue'
    import axios from 'axios'
    import { useToast } from "vue-toastification"
    import { BASE_URL } from '../../helpers/baseUrl.js'
    import { getHeaderConfig } from '../../helpers/headerConfig'
    import { isSidebarVisible, toggleSidebar } from '../../stores/store.js';

    const toast = useToast()

    const store = useAuthStore()

    const userLogout = async () => {
        try {
            await axios.post(`${BASE_URL}/user/logout`, {}, getHeaderConfig(store.access_token));
            toast.success("Logout successfully", {
                timeout: 3000
            })
            store.clearStoredData();
            router.push('/login');
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user`, getHeaderConfig(store.access_token));
            store.setToken(response.data.currentToken)
            store.setUser(response.data.user);
        } catch (error) {
            if(error?.response?.status === 401) {
                store.clearStoredData()
            }
            console.log(error);
        }
    }

    onMounted(() => {
        if(store.access_token) fetchCurrentUser()
    })
</script>

<style scoped>
.navbar {
    height: 70px;
    margin-left: 0px;
    width: 100%; /* Full width when sidebar is hidden */
    background-color: var(--header);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.200);
    align-content: space-evenly;
    padding: 10px 20px;
    color: var(--light);
    transition: margin-left 0.3s ease, width 0.3s ease;

    .menu {
        i {
            font-size: 24px;
            color: var(--light);
        }
    }
}

.navbar-expanded {
    margin-left: 250px; /* Adjust this value to match the sidebar width */
    width: calc(100% - 250px); /* Adjust the width to fit the content */
}

/* .navbar-nav {
    padding-right: 10px;
    display: flex;
    list-style: none;
} */

.dropdown {
    position: relative;
    display: inline-block;
    margin-top: -3px;

    .username {
        font-weight: 600;
        letter-spacing: 0.5px;
        font-size: 20px;
        color: var(--light);
        border-radius: 7px;
        background-color: var(--main);
        padding: 4px 15px;
        transition: all 0.3s ease-in-out;

        span {
            font-family: 'Poppins';
        }
    }

    .username:hover {
        background-color: var(--main-hover);
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: var(--light2);
        width: 150px;
        right: 0;
        border-radius: 7px;
        box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);

        .nav-link {
            padding: 10px;
            color: black;
            font-weight: 500;
            text-decoration: none;
            display: block;
            text-align: center;
            transition: all 0.3s ease-in-out;
        }

        .nav-link:hover {
            background-color: var(--grey);
            color: var(--light);
            border-radius: 6px;
        }
    }

}

.dropdown:hover .dropdown-content {
    display: block;
}

.container-fluid {
    display: flex;
    flex-wrap: inherit;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    gap: 1rem;
    /* right: auto; */
    /* padding-left: 80pc; */
}
</style>