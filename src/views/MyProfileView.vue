<template>
    <Navbar /> <!-- Include the Navbar component here -->
    <div class="container">
        <div class="card">
          <div class="card-header bg-dark text-white">
            <h1 class="text-center">
              My profile
            </h1>
          </div>
            <div class="card-body">
              <div class="mb-3 input-group">
                <span class="input-group-text"><i class="bi bi-person-badge"></i></span>
                <input type="text" id="myName" class="form-control" placeholder="Name" disabled/>
              </div>
              <div class="mb-3 input-group">
                <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                <input type="email" id="myEmail" class="form-control" placeholder="Email" disabled/>
              </div>
              <div class="mb-3 input-group">
                <span class="input-group-text"><i class="bi bi-calendar-week"></i></span>
                <input type="text" id="myCreated" class="form-control" placeholder="Created" disabled/>
              </div>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-warning btn-sm d-flex" data-bs-toggle="modal" data-bs-target="#updatePasswordModal">
                <i class="bi bi-lock"></i> Update Password
            </button>
            </div>
        </div>
    </div>
    <UpdatePasswordModal></UpdatePasswordModal>
</template>
  
<script>
  import Navbar from '@/components/Navbar.vue';
  import UpdatePasswordModal from '@/components/Modals/UpdatePasswordModal.vue';
  import { formatToLocalTime, calculateDatetimeDifference } from '@/utils/timeUtils';
  import { getLoggedUserInfo } from '@/utils/requestUtils';
  
  export default {
    name: 'DashboardLastLoginsView',
    components: {
      Navbar,
      UpdatePasswordModal
    },
    data(){
        return{
            name:"",
            lastname:"",
            email:"",
            created:""
        }
    },
    mounted(){
        this.fillLoggedUserInfo();
    },
    methods:{
        async fillLoggedUserInfo(){
            const loggedUserData = await getLoggedUserInfo(sessionStorage.getItem('jwtToken'));

            this.name = loggedUserData.data.name;
            this.lastname = loggedUserData.data.lastname;
            this.email = loggedUserData.data.email;
            this.created = loggedUserData.data.created;

            // Set Local Create Time and Time Diff
            this.localCreateTime = formatToLocalTime(this.created);
            this.timeDiff = calculateDatetimeDifference(this.created);

            document.getElementById('myName').value = this.name + " " + this.lastname;
            document.getElementById('myEmail').value = this.email;
            document.getElementById('myCreated').value = this.localCreateTime + " (" + this.timeDiff + ")";
        }
    }
  }
</script>

<style>
  #dashboardLastLoginsTable{
    margin-top: 5rem;
  }
</style>
  