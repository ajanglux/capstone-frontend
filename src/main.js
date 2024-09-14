import { createApp } from 'vue'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import "vue-toastification/dist/index.css"
import '../src/css/style.css'
import '../src/css/table.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const pinia = createPinia()
const vuetify = createVuetify({
    components,
    directives
  })

createApp(App)
    .use(router)
    .use(pinia)
    .use(Toast)
    .use(vuetify)
    .mount('#app')