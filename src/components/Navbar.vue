<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/"><img src="@/assets/logo.png" style="width: 32px; height: 28px;"> Senrysk</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/system-data"><i class="bi bi-clipboard-data"></i> System Data</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/users"><i class="bi bi-people"></i> Users</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/agents"><i class="bi bi-cpu"></i> Agents</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-code-slash"></i> Software Packages
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link class="nav-link dropdown-item" to="/apps"><i class="bi bi-code-square"></i> Apps</router-link>
                </li>
                <li>
                  <router-link class="nav-link dropdown-item" to="/pippackages"><i class="fa-brands fa-python"></i> Pip Packages</router-link>
                </li>
                <li>
                  <router-link class="nav-link dropdown-item" to="/npmpackages"><i class="fa-brands fa-npm"></i> Npm Packages</router-link>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle"></i> {{ userName }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link class="nav-link dropdown-item" to="/user/myprofile"><i class="bi bi-person-lines-fill"></i> My Profile</router-link>
                </li>
                <li>
                  <router-link class="nav-link dropdown-item" to="/user/lastlogins"><i class="bi bi-people"></i> Last Logins</router-link>
                </li>
                <li>
                  <a href="#" class="nav-link dropdown-item" @click.prevent="logout"><i class="bi bi-box-arrow-in-right"></i> Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>
  
<script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    // ... Your other component options
    name: 'Navbar',
    data() {
      return {
        userName: sessionStorage.getItem("name") || ''
      };
    },
    methods: {
      async logout() {
        // Get the JWT token from sessionStorage
        const jwtToken = sessionStorage.getItem("jwtToken");
  
        if (jwtToken) {
          try {
            const backend_url = process.env.VUE_APP_SENTRYSK_BACKEND_URL;
            const API_URL = `${backend_url}/user/logout`;
            // Send a POST request to the logout endpoint with Authorization header
            await axios.post(API_URL, null, {
              headers: {
                Authorization: jwtToken,
              },
            });
  
            // Clear the JWT token and session expiration from sessionStorage
            sessionStorage.removeItem("jwtToken");
            sessionStorage.removeItem("tokenExpiration");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("name");
  
            // Show a logout success message with SweetAlert
            Swal.fire({
              icon: "success",
              title: "Logged out",
              text: "You have been successfully logged out.",
            });
  
            // Redirect to the login page
            this.$router.push("/login"); // You can change "/login" to the actual login route
          } catch (error) {
            console.error("Logout failed:", error);
  
            // Handle logout error and show an error message with SweetAlert
            Swal.fire({
              icon: "error",
              title: "Logout error",
              text: "An error occurred during the logout process.",
            });
          }
        } else {
          // User is not authenticated (no JWT token), redirect to the login page
          this.$router.push("/login"); // You can change "/login" to the actual login route
        }
      },
    },
  };
</script>
