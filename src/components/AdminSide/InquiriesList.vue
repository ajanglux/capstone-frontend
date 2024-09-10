<template>
    <div class="content">
      <div class="container">
        <div class="card-header">
          <h2>LIST OF INQUIRIES</h2>
        </div>
        <div class="table-body">
          <!-- <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{{ success }}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div> -->
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>Inquirer</th>
                <th>Email</th>
                <th>Message</th>
                <th>Contact No.</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SAMPLE</td>
                <td>SAMPLE</td>
                <td>SAMPLE</td>
                <td>SAMPLE</td>
                <td>SAMPLE</td>
                <td>
                  <span>
                    ON-GOING
                  </span>
                </td>
                <td class="actions">
                  <button class="btn btn-success btn-sm me-1">View</button>
                  <button class="btn btn-danger btn-sm me-1">Delete</button>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <!-- <td colspan="7"><strong>No bookings found.</strong></td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  
  </script>

<style scoped>
.input-group-text {
  width: 150px;
}
</style>
  