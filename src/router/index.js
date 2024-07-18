import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../components/Home.vue"
import Login from "../components/auth/Login.vue"
import Register from "../components/auth/Register.vue"
import BookingForm from "../components/BookingForm.vue"
import Profile from "../components/Profile.vue"
import BookingList from '../components/BookingList.vue';
import { useAuthStore } from '../stores/useAuthStore.js'


function checkIfLogged() {
    const store = useAuthStore();
    if (!store.access_token) return '/login'
}

function checkIfNotLogged() {
    const store = useAuthStore();
    if (store.access_token) return '/'
}


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            beforeEnter: [checkIfLogged],
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
            path: '/booking/create',
            name: 'addBooking',
            component: BookingForm,
            beforeEnter: [checkIfLogged],
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
        }
    ],
})

export default router