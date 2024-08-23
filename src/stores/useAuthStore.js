import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        user: null,
        access_token: localStorage.getItem('authToken') || null,
        errors: null
    }),
    getters: {
        isAuthenticated: (state) => !!state.access_token,
    },
    actions: {
        setUser(user) {
            this.user = user
        },
        setToken(token) {
            localStorage.setItem('authToken', token)
            this.access_token = token
        },
        clearStoredData() {
            localStorage.removeItem('authToken')
            this.access_token = null
            this.user = null
        },
        setErrors(errors) {
            this.errors = errors
        },
        clearErrors() {
            this.errors = null
        },
        logout() {
            this.clearStoredData();
            this.clearErrors();
        }
    },
});
