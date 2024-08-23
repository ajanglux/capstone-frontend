import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from '../stores/useAuthStore.js'

//User side
import Home from "../components/UserSide/Home.vue"
import Login from "../components/auth/Login.vue"
import Register from "../components/auth/Register.vue"
import BookingForm from "../components/UserSide/BookingForm.vue"
import Profile from "../components/UserSide/Profile.vue"
import BookingList from '../components/UserSide/BookingList.vue';
import LandingPage from '../components/UserSide/LandingPage.vue'
import Appointment from "../components/UserSide/Appointment.vue"

// Admin side
// import AdminBookingList from "../components/AdminSide/AdminBookingList.vue"


function checkIfLogged(to, from, next) {
    const store = useAuthStore();
    if (!store.access_token) {
        next('/login'); // Redirect to login if not logged in
    } else {
        next(); // Proceed to the route
    }
}

function checkIfNotLogged(to, from, next) {
    const store = useAuthStore();
    if (store.access_token) {
        next('/home'); // Redirect to home if already logged in
    } else {
        next(); // Proceed to the route
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
            path: "/home",
            name: "home",
            component: Home,
            beforeEnter: [checkIfLogged],
        },
        {
            path: '/appointments',
            name: 'appointments',
            component: Appointment,
            beforeEnter: [checkIfLogged],
        },
        {
            path: '/booking/create',
            name: 'addBooking',
            component: BookingForm,
            beforeEnter: [checkIfLogged],
        },
        {
            path: '/booking/:id/edit',
            name: 'EditBooking',
            component: BookingForm,
            beforeEnter: [checkIfLogged],
            props: true
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            beforeEnter: [checkIfLogged],
        },
        {
            path: '/bookinglist',
            name: 'bookingList',
            component: BookingList,
            beforeEnter: [checkIfLogged],
        },
        // {
        //     path: "/admin",
        //     name: "admin",
        //     component: AdminBookingList,
        // },
    ],
})

export default router