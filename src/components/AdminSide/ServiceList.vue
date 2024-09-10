<template>
    <div class="content">
      <div class="container">
        <div class="card-header">
          <h2>LIST OF SERVICES</h2>
          <router-link class="button" to="/service-form">
          <span class="text"> <i class='bx bxs-plus-square' ></i> ADD SERVICE</span>
          </router-link>
        </div>
        <div class="table-body">
          <!-- <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{{ success }}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div> -->
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Number</th>
                <th>Date Created</th>
                <th>Service</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Sample</td>
                <td>LCD Replacement</td>
                <td>Sample</td>
                <td class="actions">
                  <button class="btn btn-success btn-sm me-1">View</button>
                  <button class="btn btn-danger btn-sm me-1">Delete</button>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <!-- <td colspan="8"><strong>No bookings found.</strong></td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  </script>
  
  
  
  