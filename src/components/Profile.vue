<template>
    <div className="container">
        <h1>PROFILE PAGE</h1>
            <p>User Information</p>
                <p>Name: {{ store.user.name }}</p>
                <p>Email: {{ store.user.email }}</p>
    </div>
</template>

<script setup>
    import { useAuthStore } from '../stores/useAuthStore.js'
    import router from '../router'
    import { onMounted } from 'vue'
    import { useToast } from "vue-toastification"
    import { BASE_URL } from '../helpers/baseUrl.js'
    import { getHeaderConfig } from '../helpers/headerConfig'

    const toast = useToast()

    const store = useAuthStore()

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
</style>