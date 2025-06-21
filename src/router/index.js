import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '../stores/useAuthStore.js';

const routes = [
  {
    path: "/",
    name: "landing",
    component: () => import('../components/UserSide/LandingPage.vue'),
    beforeEnter: [checkIfNotLogged],
  },
  {
    path: "/register",
    name: "register",
    component: () => import('../components/auth/Register.vue'),
    beforeEnter: [checkIfNotLogged],
  },
  {
    path: '/email-verification',
    name: 'email-verification',
    component: () => import('../components/auth/EmailVerification.vue'),
    beforeEnter: [checkIfNotLogged],
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/auth/ForgotPassword.vue'),
    beforeEnter: [checkIfNotLogged],
  },    
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('../components/auth/ResetPassword.vue'),
    beforeEnter: [checkIfNotLogged],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/auth/Login.vue'),
    beforeEnter: (to, from, next) => {
      const store = useAuthStore();
      if (store.access_token) {
        next('/home');
      } else {
        next();
      }
    },
  },

  {
    path: '/change-password',
    name: 'change-password',
    component: () => import('../components/auth/ChangePassword.vue'),
    beforeEnter: [checkIfLogged, checkIfUser],
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
    beforeEnter: [checkIfLogged],
  },
  {
    path: "/user-form/:id?/:view?",
    name: "user-form",
    component: () => import('../components/UserSide/UserForm.vue'),
    props: route => ({
      id: route.params.id ? Number(route.params.id) : null, 
      view: route.params.view === 'view' 
    }),
    beforeEnter: [checkIfLogged],
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
    beforeEnter: [checkIfLogged],
  },
  {
    path: "/user-inquiries-view/:id?",
    name: "user-inquiries-view",
    component: () => import('../components/UserSide/UserInquiriesView.vue'),
    props: route => ({ id: Number(route.params.id) }),
    beforeEnter: [checkIfLogged],
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
  {
    path: "/users",
    name: "users",
    component: () => import('../components/AdminSide/UsersList.vue'),
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
    path: '/status',
    name: 'status',
    component: () => import('../components/UserSide/CheckStatus.vue'),
    beforeEnter: [checkIfNotLogged],
  },
  {
    path: '/terms-and-conditions',
    name: 'terms-and-conditions',
    component: () => import('../components/UserSide/TermsAndConditions.vue'),
    beforeEnter: [checkIfNotLogged],
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: () => import('../components/UserSide/PrivacyPolicy.vue'),
    beforeEnter: [checkIfNotLogged],
  },

  //AUTH

  {
    path: '/home',
    name: 'home',
    component: () => import('../components/UserSide/Home.vue'),
    beforeEnter: [checkIfLogged, checkIfUser],
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../components/UserSide/ContactUs.vue'),
    beforeEnter: [checkIfLogged, checkIfUser],
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/UserSide/Profile.vue'),
    beforeEnter: [checkIfLogged, checkIfUser],
  },
  {
    path: '/user-history',
    name: 'user-history',
    component: () => import('../components/UserSide/UserHistory.vue'),
    beforeEnter: [checkIfLogged, checkIfUser],
  },

  //Userside Forms

  {
    path: '/form-1',
    name: 'form-1',
    component: () => import('../components/ServicesForms/Form1.vue'),
    beforeEnter: [checkIfLogged, checkIfUser],
  },
  {
    path: '/form-2',
    name: 'form-2',
    component: () => import('../components/ServicesForms/Form2.vue'),
    beforeEnter: [checkIfLogged, checkIfUser],
  },
  {
    path: '/form-3',
    name: 'form-3',
    component: () => import('../components/ServicesForms/Form3.vue'),
    beforeEnter: [checkIfLogged, checkIfUser],
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
  routes,
});

export default router;
