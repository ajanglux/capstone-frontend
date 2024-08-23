<template>
  <v-app>
   <div class="app">
     <template v-if="!isLoginPage && !isRegisterPage"> 
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
     <template v-else>
       <router-view />
     </template>
   </div>
 </v-app>
</template>

<script>
import Header from './components/layouts/Header.vue'
import Sidebar from './components/layouts/Sidebar.vue'

export default {
 name: 'App',
 components: {
   Header,
   Sidebar,
 },
 computed: {
   isLoginPage() {
     return this.$route.path === '/login';
   },
   isRegisterPage() {
     return this.$route.path === '/register';
   },
 },
};

</script>
