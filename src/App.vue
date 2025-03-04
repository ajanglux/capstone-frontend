<template>
  <v-app>
    <div class="app">
      <template v-if="!isRegisterPage && !isAdminLoginPage && !isLoginPage && !isForgotPass && !isResetPass ">
        <template v-if="isAdmin">
          <AdminSidebar />
          <div class="headerAndContent">
            <AdminHeader />
            <router-view v-slot="{ Component }" :key="$route.fullPath">
              <transition name="fade" mode="out-in">
                <Component :is="Component" />
              </transition>
            </router-view>
          </div>
        </template>
        <template v-else-if="isUser">
          <div class="headerAndContent">
            <UserHeader />
            <router-view v-slot="{ Component }" :key="$route.fullPath">
              <transition name="fade" mode="out-in">
                <Component :is="Component" />
              </transition>
            </router-view>
          </div>
        </template>
        <template v-else>
          <Sidebar v-if="!isLandingPage" />
          <div class="headerAndContent">
            <Header v-if="isLandingPage || !isAdmin" />
            <router-view v-slot="{ Component }" :key="$route.fullPath">
              <transition name="fade" mode="out-in">
                <Component :is="Component" />
              </transition>
            </router-view>
          </div>
        </template>
      </template>
      <template v-else>
        <router-view :key="$route.fullPath" />
      </template>
    </div>
  </v-app>
</template>

<script>
import Header from './components/layouts/Header.vue';
import AdminHeader from './components/layouts/AdminHeader.vue';
import AdminSidebar from './components/layouts/AdminSideBar.vue';
import UserHeader from './components/layouts/UserHeader.vue';
import { useAuthStore } from './stores/useAuthStore.js';

export default {
  name: 'App',
  components: {
    Header,
    AdminHeader,
    AdminSidebar,
    UserHeader,
  },
  computed: {
    isUser() {
      const store = useAuthStore();
      return store.isUser; // correctly checks if user is a regular user
    },
    isRegisterPage() {
      return this.$route.path === '/register';
    },
    isLoginPage() {
      return this.$route.path === '/login';
    },
    isViewTerms() {
      return this.$route.path === '/terms-and-condtions';
    },
    isForgotPass() {
      return this.$route.path === '/forgot-password';
    },
    isResetPass() {
      return this.$route.path === '/reset-password';
    },
    // isForm1() {
    //   return this.$route.path === '/form-1';
    // },
    // isForm2() {
    //   return this.$route.path === '/form-2';
    // },
    // isForm3() {
    //   return this.$route.path === '/form-3';
    // },


    // ADMIN
    isAdmin() {
      const store = useAuthStore();
      return store.isAdmin; // correctly checks if user is admin
    },
    isLandingPage() {
      return this.$route.path === '/';
    },
    isAdminLoginPage() {
      return this.$route.path === '/admin-login';
    }
  },
};
</script>
