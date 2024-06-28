<template>
    <Navbar /> <!-- Include the Navbar component here -->
    <div class="container">
        <table class="table table-striped table-bordered dt-responsive nowrap" id="usersTable">
        <thead>
            <tr>
            <th>Actions</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created Date</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
                <td>
                    <router-link class="navbar-brand" :to="'/users/'+user.id">
                        <button type="button" class="btn btn-primary">
                            <i class="bi bi-arrow-right-circle-fill"></i>
                        </button>
                    </router-link>
                </td>
                <td>
                    {{ user.name + " " + user.lastname }}
                </td>
                <td>
                    {{ user.email }}
                </td>
                <td>
                    {{ user.created }}
                </td>
            </tr>
        </tbody>
        </table>
    </div>
  </template>
    
  <script>
    import Navbar from '../components/Navbar.vue'
    import { getAllUsers } from '@/utils/requestUtils';
    import $ from "jquery";

    export default {
      components: {
        Navbar, // Declare Navbar as a component
      },
      data() {
        return {
          users: [],
        };
      },
      mounted() {
        this.getAgents();
      },
      methods: {
        async getAgents() {
            // Retrieve Agent Config
            this.users = await getAllUsers();

            // Make table to Data Table
            $(document).ready(() => {
                $('#usersTable').DataTable({
                    responsive: true,
                    searching: true,
                    lengthChange: true,
                    pageLength: 10,
                    order: [[3, 'desc']],
                    lengthMenu: [
                        [ 10, 25, 50, 100 ],
                        [ 10, 25, 50, 100 ]
                    ],
                });
                // Style length Menu
                const pageEntrySize = document.getElementById('usersTable_length')
                pageEntrySize.style = "margin-right:100%"
            });
        },
      },
    };
  </script>
    
  <style scoped>
    /* Add your custom styles here */
    .table {
      margin-top: 20px;
    }
    
    .table thead th {
      background-color: #007bff; /* Blue header background color */
      color: white;
    }
    
    .table tbody tr:nth-child(odd) {
      background-color: #f2f2f2; /* Alternate row background color */
    }
    
    .table tbody tr:hover {
      background-color: #dcdcdc; /* Hover row background color */
    }
    
    .table td,
    .table th {
      vertical-align: middle;
    }
  </style>
    