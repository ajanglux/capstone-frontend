import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '../stores/useAuthStore.js';

import Home from "../components/UserSide/Home.vue";
import Login from "../components/auth/Login.vue";
import AdminLoginVue from "../components/auth/AdminLogin.vue";

// User Side
import Register from "../components/auth/Register.vue";
import BookingForm from "../components/UserSide/BookingForm.vue";
import Profile from "../components/UserSide/Profile.vue";
import BookingList from '../components/UserSide/BookingList.vue';
import LandingPage from '../components/UserSide/LandingPage.vue';
import Appointment from "../components/UserSide/Appointment.vue";

// Admin Side
import AdminBookingList from '../components/AdminSide/AdminBookingList.vue';
import AdminDashboard from '../components/AdminSide/AdminDashboard.vue';
import AdminHistory from '../components/AdminSide/AdminHistory.vue';
import BookingView from "../components/AdminSide/BookingView.vue";
import ProfileView from "../components/AdminSide/ProfileView.vue";

function checkIfLogged(to, from, next) {
  const store = useAuthStore();
  if (!store.access_token) {
    next('/login'); 
  } else {
    next(); 
  }
}

function checkIfNotLogged(to, from, next) {
  const store = useAuthStore();
  if (store.access_token) {
    next('/home'); 
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
    next('/login'); 
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
      path: "/login",
      name: "login",
      component: Login,
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
      path: "/admin-bookinglist",
      name: "admin-bookinglist",
      component: AdminBookingList,
      beforeEnter: [checkIfLogged, checkIfAdmin],
    },
    {
      path: '/admin/user-profile/:userId',
      name: 'AdminUserProfile',
      component: ProfileView,
      beforeEnter: [checkIfLogged, checkIfAdmin],
      props: true
    },
    {
      path: '/booking/:bookingId',
      name: 'BookingDetails',
      component: BookingView,
      beforeEnter: [checkIfLogged, checkIfAdmin],
      props: true,
    },
    {
      path: "/admin-history",
      name: "admin-history",
      component: AdminHistory,
      beforeEnter: [checkIfLogged, checkIfAdmin],
    },

    //USERS
    {
      path: "/home",
      name: "home",
      component: Home,
      beforeEnter: [checkIfLogged, checkIfUser], 
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: Appointment,
      beforeEnter: [checkIfLogged, checkIfUser], 
    },
    {
      path: '/booking/create',
      name: 'addBooking',
      component: BookingForm,
      beforeEnter: [checkIfLogged, checkIfUser], 
    },
    {
      path: '/booking/:id/edit',
      name: 'EditBooking',
      component: BookingForm,
      beforeEnter: [checkIfLogged, checkIfUser], 
      props: true,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: [checkIfLogged, checkIfUser], 
    },
    {
      path: '/bookinglist',
      name: 'bookingList',
      component: BookingList,
      beforeEnter: [checkIfLogged, checkIfUser], 
    },
  ],
});

export default router;
