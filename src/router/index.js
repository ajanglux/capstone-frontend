import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '../stores/useAuthStore.js';

import AdminLoginVue from "../components/auth/AdminLogin.vue";

// User Side
import Register from "../components/auth/Register.vue";
import Profile from "../components/UserSide/Profile.vue";;
import LandingPage from '../components/UserSide/LandingPage.vue';

// Admin Side
import AdminDashboard from '../components/AdminSide/AdminDashboard.vue';
import InquiriesList from '../components/AdminSide/InquiriesList.vue';
import BookingView from "../components/AdminSide/BookingView.vue";

import RepairList from '../components/AdminSide/RepairList.vue';
import RepairForm from '../components/AdminSide/RepairForm.vue';

import ServiceList from '../components/AdminSide/ServiceList.vue';
import ServiceForm from '../components/AdminSide/ServiceForm.vue';

function checkIfLogged(to, from, next) {
  const store = useAuthStore();
  if (!store.access_token) {
    next('/admin-login'); 
  } else {
    next(); 
  }
}

function checkIfNotLogged(to, from, next) {
  const store = useAuthStore();
  if (store.access_token) {
    next('/'); 
  } else {
    next(); 
  }
}

function checkIfAdmin(to, from, next) {
  const store = useAuthStore();
  if (store.user?.role === 1) {
    next(); 
  } else {
    next('/admin-login'); 
  }
}

function checkIfUser(to, from, next) {
  const store = useAuthStore();
  if (store.user?.role === 0) {
    next(); 
  } else {
    next('/'); 
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingPage,
      beforeEnter: [checkIfNotLogged],
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      beforeEnter: [checkIfNotLogged],
    },
    {
      path: "/admin-login",
      name: "admin-login",
      component: AdminLoginVue,
      beforeEnter: [checkIfNotLogged],
    },

    // ADMIN
    {
      path: "/admin-dashboard",
      name: "admin-dashboard",
      component: AdminDashboard,
      beforeEnter: [checkIfLogged, checkIfAdmin],
    },
    {
      path: "/repair-list",
      name: "repair-list",
      component: RepairList,
      beforeEnter: [checkIfLogged, checkIfAdmin],
    },
    {
      path: '/booking/:bookingId',
      name: 'BookingDetails',
      component: BookingView,
      beforeEnter: [checkIfLogged, checkIfAdmin],
      props: true,
    },
    {
      path: "/inquiries",
      name: "inquiries",
      component: InquiriesList,
      beforeEnter: [checkIfLogged, checkIfAdmin],
    },
    {
      path: "/repair-form",
      name: "repair-form",
      component: RepairForm,
      beforeEnter: [checkIfLogged, checkIfAdmin],
    },
    {
      path: "/service-list",
      name: "service-list",
      component: ServiceList,
      beforeEnter: [checkIfLogged, checkIfAdmin],
    },
    {
      path: "/service-form",
      name: "service-form",
      component: ServiceForm,
      beforeEnter: [checkIfLogged, checkIfAdmin],
    },




    //USERS (ignore mo muna yong ibang components gagamitin ko pa ata)
    
    // checkIfNotLogged ang ilagay mo sa beforeEnter kapag mag a-add ka components
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: [checkIfLogged, checkIfUser], 
    },
  ],
});

export default router;
