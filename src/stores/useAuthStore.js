import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    access_token: localStorage.getItem('authToken') || null,
    isEmailVerified: JSON.parse(localStorage.getItem('isEmailVerified')) || false,
    errors: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.access_token,
    isAdmin: (state) => state.user?.role === 1,
    isUser: (state) => state.user?.role === 0,
  },
  actions: {
    setUser(user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
    },
    setToken(token) {
      localStorage.setItem('authToken', token);
      this.access_token = token;
    },
    setEmailVerified(status) {
      localStorage.setItem('isEmailVerified', JSON.stringify(status));
      this.isEmailVerified = status;
    },
    clearStoredData() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('isEmailVerified');
      this.access_token = null;
      this.user = null;
      this.isEmailVerified = false;
    },
    setErrors(errors) {
      this.errors = errors;
    },
    clearErrors() {
      this.errors = null;
    },
    logout() {
      this.clearStoredData();
      this.clearErrors();
    },
  },
});
