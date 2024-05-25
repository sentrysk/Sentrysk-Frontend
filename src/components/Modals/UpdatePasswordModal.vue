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
                    <button class="btn btn-primary" type="submit">Update</button>
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
          const API_URL = "http://localhost:8000/user/updatepass"
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
            });
  
            this.$router.push('/login');
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