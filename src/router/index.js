import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '../stores/useAuthStore.js';

const routes = [
  {
    path: "/",
    name: "landing",
    component: () => import('../components/UserSide/LandingPage.vue'),
    beforeEnter: [checkIfNotLogged],
  },
  // {
  //   path: "/register",
  //   name: "register",
  //   component: () => import('../components/auth/Register.vue'),
  //   beforeEnter: [checkIfNotLogged],
  // },
  {
    path: "/admin-login",
    name: "admin-login",
    component: () => import('../components/auth/AdminLogin.vue'),
    beforeEnter: [checkIfNotLogged],
  },

  // ADMIN
  {
    path: "/admin-dashboard",
    name: "admin-dashboard",
    component: () => import('../components/AdminSide/AdminDashboard.vue'),
    beforeEnter: [checkIfLogged, checkIfAdmin],
  },
  {
    path: "/repair-list",
    name: "repair-list",
    component: () => import('../components/AdminSide/RepairList.vue'),
    beforeEnter: [checkIfLogged, checkIfAdmin],
  },
  {
    path: "/repair-form/:id?/:view?",
    name: "repair-form",
    component: () => import('../components/AdminSide/RepairForm.vue'),
    props: route => ({
      id: route.params.id ? Number(route.params.id) : null, 
      view: route.params.view === 'view' 
    }),
    beforeEnter: [checkIfLogged, checkIfAdmin],
  },  
  {
    path: "/repair-history",
    name: "repair-history",
    component: () => import('../components/AdminSide/RepairHistory.vue'),
    beforeEnter: [checkIfLogged, checkIfAdmin],
  },
  {
    path: "/inquiries",
    name: "inquiries",
    component: () => import('../components/AdminSide/InquiriesList.vue'),
    beforeEnter: [checkIfLogged, checkIfAdmin],
  },
  {
    path: "/inquiries-view/:id?",
    name: "inquiries-view",
    component: () => import('../components/AdminSide/InquiriesView.vue'),
    props: route => ({ id: Number(route.params.id) }),
    beforeEnter: [checkIfLogged, checkIfAdmin],
  },
  {
    path: "/responded-list",
    name: "responded-list",
    component: () => import('../components/AdminSide/RespondedList.vue'),
    beforeEnter: [checkIfLogged, checkIfAdmin],
  },
  {
    path: "/service-list",
    name: "service-list",
    component: () => import('../components/AdminSide/ServiceList.vue'),
    beforeEnter: [checkIfLogged, checkIfAdmin],
  },
  {
    path: '/service-form/:id?',
    name: 'ServiceForm',
    component: () => import('../components/AdminSide/ServiceForm.vue'),
    props: true,
    beforeEnter: [checkIfLogged, checkIfAdmin],
  },

  // LANDING PAGE
  {
    path: '/services',
    name: 'services',
    component: () => import('../components/UserSide/Services.vue'),
    beforeEnter: [checkIfNotLogged],
  },
  {
    path: '/checkstatus',
    name: 'checkstatus',
    component: () => import('../components/UserSide/CheckStatus.vue'),
    beforeEnter: [checkIfNotLogged],
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../components/UserSide/ContactUs.vue'),
    beforeEnter: [checkIfNotLogged],
  },
  {
    path: '/terms-and-conditions',
    name: 'terms-and-conditions',
    component: () => import('../components/UserSide/TermsAndConditions.vue'),
    beforeEnter: [checkIfNotLogged],
  },
];

function checkIfLogged(to, from, next) {
  const store = useAuthStore();
  if (!store.access_token) {
    next('/'); 
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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
