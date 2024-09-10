<template>
    <div class="content">
      <div class="container">
        <div class="card-header">
          <h2>LIST OF REPAIR</h2>
          <router-link class="button" to="/repair-form">
          <span class="text"> <i class='bx bxs-plus-square' ></i> ADD REPAIR INFO</span>
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
                <th>No.</th>
                <th>Date Created</th>
                <th>Code</th>
                <th>Client</th>
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
                <td>
                  <span>
                    ON GOING
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

<style>

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  /* border-bottom: 1px solid var(--main); */

  .button {
    font-size: 16px;
    font-weight: 600;
    color: var(--light);
    background-color: var(--header);
    width: 170px;
    height: 35px;
    padding-left: 20px;
    text-align: center;
    align-content: space-evenly;
    margin-top: -10px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
    transition: .3s;

    i {
      position: absolute;
      margin-top: 4px;
      margin-left: -20px;
    }
  }

  .button:hover {
    box-shadow: 0px 8px 15px -10px rgb(125, 125, 125);
    box-shadow: none;
    background: var(--header);
    cursor: pointer;
    text-decoration: none;
  }
}

.table-body {
  width: 100%;
  padding: 10px;
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  background-color: var(--light);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  overflow-y: auto;

  table {
    border-collapse: collapse;
    width: 100%;
    color: black;

    th {
        background-color: var(--main);
        color: white;
        font-weight: 600;
        letter-spacing: 0.5px;
        font-size: 16px;
        padding-top: 5px;
    }

    th, td {
        font-family: 'Poppins';
        text-align: center;
        padding: 15px;
    }

    td { font-size: 14px; }
    tr { transition: all 0.3s ease; } 
    tr:hover { background-color: var(--light2); }

    .actions {
      display: flex;
      column-gap: 5px;
      justify-content: center;

      .btn-warning {
        background-color: var(--main);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
      }

      .btn-secondary {
        background-color: var(--grey);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
      }

      .btn-success {
        background-color: var(--main);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
      }

      .btn-danger {
        background-color: var(--redbtn);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
      }

      .btn-success {
        background-color: var(--main);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }
}

</style>
  
  
  
  