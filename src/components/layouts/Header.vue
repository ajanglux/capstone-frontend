<template>
    <nav class="navbar">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">
                SAMPLE PA LANG DONUT JUDGE
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
                <ul v-else class="navbar-nav">
                    <!-- <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/">
                        <i class="bi bi-house-door-fill"></i> Home </router-link>
                    </li> -->
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/profile">
                            <i class="bi bi-person-check-fill"></i> {{ store.user.name }}
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="#" class="nav-link" @click="userLogout" style="cursor:pointer">
                            <i class="bi bi-box-arrow-left"></i> Logout
                        </router-link>
                    </li>
                </ul>
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

<style>
.navbar {
    width: 100%;
    height: 70px;
    background-color: var(--main);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.200);
    align-content: space-evenly;
}

.navbar-nav {
    padding-right: 10px;
    display: flex;
    list-style: none;
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