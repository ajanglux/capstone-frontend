<template>
    <nav class="navbar">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="dropdown">
            <button class="username">
              <span> ADMIN </span>
            </button>
            <div class="dropdown-content">
              <router-link to="#" class="nav-link" @click="userLogout" style="cursor: pointer">
                <i class="bi bi-box-arrow-left"></i> Logout
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import axios from "axios";
  import router from "../../router";
  import { useToast } from "vue-toastification";
  import { BASE_URL } from "../../helpers/baseUrl.js";
  import { getHeaderConfig } from "../../helpers/headerConfig";
  import { useAuthStore } from "../../stores/useAuthStore";
  
  const toast = useToast();
  const store = useAuthStore();
  
  const userLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/user/logout`, {}, getHeaderConfig(store.access_token));
      toast.success("Logout successfully", { timeout: 3000 });
      store.clearStoredData();
      router.push("/admin-login");
    } catch (error) {
      console.log(error);
    }
  };
  </script>
  
  <style lang="scss">
  .navbar {
    width: 100%;
    height: 70px;
    background-color: var(--header);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    align-content: space-evenly;
    color: var(--light);
    padding-right: 20px;
  }
  
  .dropdown {
    position: relative;
    display: inline-block;
  
    .username {
      font-weight: 600;
      letter-spacing: 0.5px;
      font-size: 20px;
      color: var(--light);
      background-color: var(--main-hover);
      padding: 3px 10px;
      border-radius: 5px;
      transition: all 0.3s ease-out;
  
      &:hover {
        background-color: var(--main);
      }
  
      span {
        font-family: "Poppins";
      }
    }
  
    .dropdown-content {
      opacity: 0;
      visibility: hidden;
      position: absolute;
      background-color: white;
      width: 150px;
      right: 0;
      border-radius: 8px;
      transform: translateY(-10px);
      transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
  
      .nav-link {
        padding: 10px;
        color: black;
        font-weight: 500;
        text-decoration: none;
        display: block;
        text-align: center;
        transition: all 0.3s ease-in-out;
      }
  
      .nav-link:hover {
        background-color: var(--main);
        color: white;
        border-radius: 8px;
      }
    }
  }
  
  .dropdown:hover .dropdown-content {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .container-fluid {
    display: flex;
    flex-wrap: inherit;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    gap: 1rem;
  }
  </style>
  