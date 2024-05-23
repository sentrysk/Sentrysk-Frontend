<template>
    <!-- Modal -->
    <div class="modal fade" id="updatePasswordModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updatePasswordModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="updatePasswordModalLabel">Update Password</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-4 input-group">
                        <span class="input-group-text"><i class="bi bi-lock"></i></span>
                        <input
                        :type="showPassword ? 'text' : 'Current Password'"
                        v-model="current_password"
                        class="form-control"
                        placeholder="Current Password"
                        required
                        />
                        <button type="button" class="btn btn-outline-secondary" @click="togglePasswordVisibility">
                        <i :class="['bi', showPassword ? 'bi-eye-slash' : 'bi-eye']"></i>
                        </button>
                    </div>
                    <div class="mb-4 input-group">
                        <span class="input-group-text"><i class="bi bi-lock"></i></span>
                        <input
                        :type="showPassword ? 'text' : 'New Password'"
                        v-model="new_password"
                        class="form-control"
                        placeholder="New Password"
                        required
                        />
                        <button type="button" class="btn btn-outline-secondary" @click="togglePasswordVisibility">
                        <i :class="['bi', showPassword ? 'bi-eye-slash' : 'bi-eye']"></i>
                        </button>
                    </div>
                    <div class="mb-4 input-group">
                        <span class="input-group-text"><i class="bi bi-lock"></i></span>
                        <input
                        :type="showPassword ? 'text' : 'New Password Repeat'"
                        v-model="new_password_repeat"
                        class="form-control"
                        placeholder="New Password Repeat"
                        required
                        />
                        <button type="button" class="btn btn-outline-secondary" @click="togglePasswordVisibility">
                        <i :class="['bi', showPassword ? 'bi-eye-slash' : 'bi-eye']"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button class="btn btn-primary is-success" @click="updatePassword">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'UpdatePasswordModal',
  methods:  {
    async updatePassword(){

    }
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