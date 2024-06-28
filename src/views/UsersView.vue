<template>
    <Navbar /> <!-- Include the Navbar component here -->
    <div class="container">
        <table class="table table-striped table-bordered dt-responsive nowrap" id="usersTable">
        <thead>
            <tr>
            <th>#</th>
            <th>name</th>
            <th>email</th>
            <th>created</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
                <td>
                   <b>{{ user.id }}</b>
                </td>
                <td>
                    {{ user.name + user.lastname }}
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
    