import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import "vue-toastification/dist/index.css"
import '../src/css/style.css'
import '../src/css/table.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(Toast)
    .mount('#app')