<template>
  <v-app>
    <div class="app">
      <template v-if="!isLoginPage && !isRegisterPage && !isLandingPage && !isAdminLoginPage">
        <template v-if="isAdmin">
          <AdminSidebar />
          <div class="headerAndContent">
            <AdminHeader />
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <Component :is="Component" />
              </transition>
            </router-view>
          </div>
        </template>
        <template v-else>
          <Sidebar />
          <div class="headerAndContent">
            <Header />
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <Component :is="Component" />
              </transition>
            </router-view>
          </div>
        </template>
      </template>
      <template v-else>
        <router-view />
      </template>
    </div>
  </v-app>
</template>

<script>
import Header from './components/layouts/Header.vue';
import Sidebar from './components/layouts/Sidebar.vue';
import AdminHeader from './components/layouts/AdminHeader.vue';
import AdminSidebar from './components/layouts/AdminSideBar.vue';
import { useAuthStore } from './stores/useAuthStore.js';

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    AdminHeader,
    AdminSidebar,
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/login';
    },
    isRegisterPage() {
      return this.$route.path === '/register';
    },
    isLandingPage() {
      return this.$route.path === '/';
    },
    isAdminLoginPage() {
      return this.$route.path === '/admin-login';
    },
    isAdmin() {
      const store = useAuthStore();
      return store.isAdmin; // Checking if user is admin
    },
  },
};
</script>