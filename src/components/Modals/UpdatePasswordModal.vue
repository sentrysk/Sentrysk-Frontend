<template>
    <!-- Modal -->
    <div class="modal fade" id="updatePasswordModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updatePasswordModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <form @submit.prevent="updatePassword">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="updatePasswordModalLabel">Update Password</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card mt-5 shadow">
                        <div class="card-body">
                            <div class="mb-4 input-group">
                                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                                <input
                                    :type="showCurrentPassword ? 'text' : 'password'"
                                    v-model="currentPassword"
                                    class="form-control"
                                    placeholder="Password"
                                    autocomplete="off"
                                    required
                                />
                                <button type="button" class="btn btn-outline-secondary" @click="toggleCurrentPasswordVisibility">
                                    <i :class="['bi', showCurrentPassword ? 'bi-eye-slash' : 'bi-eye']"></i>
                                </button>
                            </div>
                            <div class="mb-4 input-group">
                                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                                <input
                                    :type="showNewPassword ? 'text' : 'password'"
                                    v-model="newPassword"
                                    class="form-control"
                                    placeholder="Password"
                                    autocomplete="off"
                                    required
                                />
                                <button type="button" class="btn btn-outline-secondary" @click="toggleNewPasswordVisibility">
                                    <i :class="['bi', showNewPassword ? 'bi-eye-slash' : 'bi-eye']"></i>
                                </button>
                            </div>
                            <div class="mb-4 input-group">
                                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                                <input
                                    :type="showNewPasswordRepeat ? 'text' : 'password'"
                                    v-model="newPasswordRepeat"
                                    class="form-control"
                                    placeholder="Password"
                                    autocomplete="off"
                                    required
                                />
                                <button type="button" class="btn btn-outline-secondary" @click="toggleNewPasswordRepeatVisibility">
                                    <i :class="['bi', showNewPasswordRepeat ? 'bi-eye-slash' : 'bi-eye']"></i>
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button class="btn btn-primary" type="submit" data-bs-dismiss="modal">Update</button>
                </div>
            </div>
            </form>
        </div>
    </div>
</template>


<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'UpdatePasswordModal',
  data() {
      return {
        currentPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
        showCurrentPassword: false,
        showNewPassword: false,
        showNewPasswordRepeat: false,
      };
    },
  methods:  {
    async logout() {
        // Get the JWT token from sessionStorage
        const jwtToken = sessionStorage.getItem("jwtToken");
  
        if (jwtToken) {
          try {
            const backend_url = process.env.VUE_APP_SENTRYSK_BACKEND_URL;
            const API_URL = `${backend_url}/user/logout`
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
    async updatePassword(){
        const passwordData = {
            current_password: this.currentPassword,
            new_password: this.newPassword,
            new_password_repeat: this.newPasswordRepeat
        };

        // Check if newPassword and newPasswordRepeat same
        if(this.newPassword != this.newPasswordRepeat){
            Swal.fire({
                icon: 'error',
                title: 'Passwords not match',
                text: 'New Password and Repeat does not match',
            });
            return; // End this function
        }

        try {
          const backend_url = process.env.VUE_APP_SENTRYSK_BACKEND_URL;
          const API_URL = `${backend_url}/user/updatepass`
          const response = await axios.post(API_URL, passwordData, {
            headers: {
                Authorization: sessionStorage.getItem('jwtToken')
            }
          });
  
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Password Update Successful',
              text: 'Your password has been updated successfully.',
            }).then((result) => {
                this.logout(); // Call Logout function to logout
            });
          }
        } catch (error) {
          // Handle registration error (e.g., show an error message)
          Swal.fire({
            icon: 'error',
            title: 'Password Update Failed',
            text: 'An error occurred during password update. Please try again later.',
          });
          console.error('Password Update Failed:', error);
        }
    },
    toggleCurrentPasswordVisibility() {
        this.showCurrentPassword = !this.showCurrentPassword;
    },
    toggleNewPasswordVisibility() {
        this.showNewPassword = !this.showNewPassword;
    },
    toggleNewPasswordRepeatVisibility() {
        this.showNewPasswordRepeat = !this.showNewPasswordRepeat;
    },
  }
};
</script>

<style scoped>
.bi{
  font-size: 3rem;
  margin: 2rem;
}
.fab{
  font-size: 3rem;
  margin: 2rem;
}
</style>